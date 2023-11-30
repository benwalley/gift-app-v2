import React, {useEffect, useState} from 'react';
import {Avatar, IconButton, ListItem, ListItemAvatar, Tooltip} from "@mui/material";
import stringToColor from "../../helpers/stringToColor";
import {getFirstLetters} from "../../helpers/nameFirstLetters";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import useRecoilHook from "../../hooks/useRecoilHook";
import {userById} from "../../state/selectors/userByWishlistId";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {Link} from "react-router-dom";
import {DataStore} from "aws-amplify";
import {Planning, Users, WishlistItem} from "../../models";
import {currentUser} from "../../state/selectors/currentUser";
import {useSetRecoilState} from "recoil";
import {updateMyPlanningData} from "../../state/selectors/myPlanningData";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Divider} from "@aws-amplify/ui-react";
import UserAvatar from "../UserAvatar";

export default function NotGettingListItem(props) {
    const {userId} = props
    const myUser = useRecoilHook(currentUser)
    const user = useRecoilHook(userById(userId))
    const updatePlanning = useSetRecoilState(updateMyPlanningData)


    const username = () => {
        if(user?.username) {
            return user.username
        }
        return 'loading...'
    }

    function userExists() {
        if (!user || user.length === 0) {
            return false
        }
        return true;
    }

    async function handleAdd() {
        const planningData = await DataStore.query(Planning, (c) => c.and(c => [
            c.giftFromId("eq", myUser?.id),
            c.giftForId('eq', user.id)
        ]));
        if(!planningData?.length) {
            const insertData = {
                giftForId: user.id,
                giftFromId: myUser.id,
                wantToGetGifts: true,
            }
            const newPlanning = await DataStore.save(
                new Planning(insertData)
            );
        } else {
            const original = planningData[0]
            const newP = await DataStore.save(Planning.copyOf(original, updated => {
                updated.wantToGetGifts = true;
            }))
        }
        updatePlanning(0)

    }

    return (<>
        {!userExists() && ''}
        {userExists() && <ListItem disableGutters divider>
            <ListItemAvatar>
                <UserAvatar user={user} name={user?.username}/>
            </ListItemAvatar>
            <Tooltip title={`Go to ${username()} list`} disableInteractive={true}>
                <ListItemText primary={<Link to={`/wishlist/${user.id}`}>{username()}</Link>} />
            </Tooltip>
            <Tooltip title={`I want to get a gift for ${username()}`} disableInteractive={true}>
                <IconButton color={'darkGreen'} onClick={handleAdd}>
                    <PersonAddIcon/>
                </IconButton>
            </Tooltip>

        </ListItem>}
    </>

    );
}

