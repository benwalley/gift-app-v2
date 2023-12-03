import React, {useEffect, useState} from 'react';
import {IconButton, ListItem, ListItemAvatar, Tooltip} from "@mui/material";
import useRecoilHook from "../../hooks/useRecoilHook";
import {userById} from "../../state/selectors/userByWishlistId";
import UserAvatar from "../UserAvatar";
import ListItemText from "@mui/material/ListItemText";
import {DataStore} from "aws-amplify";
import {Users} from "../../models";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from "@mui/material/Button";

export default function OtherUserGettingThisItem(props) {
    const {userId, wantsToGet, getting} = props
    const user = useRecoilHook(userById(userId))

    function isStatusShared() {
        return false
    }

    return (
        <>
            {user?.id && <ListItem>
                <ListItemAvatar>
                    <UserAvatar user={user} name={user?.username}/>
                </ListItemAvatar>
                <ListItemText primary={user.username}/>
                {/*<Tooltip title={"If both of you are going in on this item, you can share the status so if one of you updates it, the other will see the changes."}>*/}
                {/*    <Button variant={'outlined'}>{isStatusShared() ? 'Un-share status' : "Share Status"}</Button>*/}
                {/*</Tooltip>*/}


                {wantsToGet && <Tooltip title={`${user?.username || "this user"} wants to go in on this`}><GroupIcon size="medium" sx={{
                    borderRadius: '1em',
                    padding: '4px',
                    width: '35px',
                    height: '35px',
                    color: 'white',
                    marginLeft: '10px',
                    background: 'var(--secondary-color)',
                    opacity: .8,
                }}/></Tooltip>}
                {getting && <Tooltip title={`${user?.username || "this user"} is getting this`}><GroupIcon size="medium" sx={{
                    borderRadius: '1em',
                    padding: '4px',
                    width: '35px',
                    height: '35px',
                    color: 'white',
                    marginLeft: '10px',
                    background: 'var(--primary-color)',
                    opacity: .8,
                }}/></Tooltip>}
            </ListItem>}
        </>

    );
}

