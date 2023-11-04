import React, {useEffect, useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
    DialogActions,
    DialogContent,
    ListItem,
    ListItemAvatar,
    Tooltip
} from "@mui/material";
import Button from "@mui/material/Button";
import useRecoilHook from "../hooks/useRecoilHook";
import {currentUser} from "../state/selectors/currentUser";
import {DataStore} from "aws-amplify";
import {Users, WishlistItem} from "../models";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import UserAvatar from "./UserAvatar";
import toggleAmplifyArrayItem from "../helpers/toggleAmplifyArrayItem";
import {useSetRecoilState} from "recoil";
import {wishlistByUserId} from "../state/selectors/wishlistByUserId";
import GroupsIcon from '@mui/icons-material/Groups';
import {wishlistItemById} from "../state/selectors/wishlistItemById";

export default function WantToGetThisDialog(props) {
    const {item, open, setOpen} = props
    const [availableUsers, setAvailableUsers] = useState([])
    const myUser = useRecoilHook(currentUser)
    const updateWishlist = useSetRecoilState(wishlistByUserId(item?.ownerId))
    const updateItem = useSetRecoilState(wishlistItemById(item?.id))



    useEffect(() => {
        if(!myUser || Array.isArray(myUser)) return;
        const asyncUsers = async () => {
            const subusers = await DataStore.query(Users, c => c.parentId("eq", myUser?.id).isUser('eq', true));
            setAvailableUsers([myUser, ...subusers])
        }
        asyncUsers()
    }, [myUser]);


    async function toggleGetThis(userId) {
        if (!userId) return;
        await toggleAmplifyArrayItem(WishlistItem, item.id, 'wantsToGet', userId)
        updateWishlist(1);
        updateItem(1)
    }

    function handleDone() {
        setOpen(false)
    }

    return (
        <Dialog
            maxWidth="xs"
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>Who wants to go in on this?</DialogTitle>
            <DialogContent sx={{padding: '0 0 10px 0'}}>
                <List component="div" role="group">
                {availableUsers && availableUsers.map(user => (
                    <ListItem
                        button
                        key={user.id}
                        secondaryAction={
                            item?.wantsToGet?.includes(user?.id) && <Tooltip title={`${user?.username || 'This user'} wants to go in on this.`}>
                                <GroupsIcon color={'secondary'}/>
                            </Tooltip>
                        }
                        onClick={() => toggleGetThis(user?.id)}
                    >
                        <ListItemAvatar>
                            <UserAvatar user={user}
                                        name={user?.username}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={user?.username} />
                    </ListItem>
                ))}
                </List>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleDone}>
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}

