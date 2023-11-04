import * as React from 'react';
import {currentUser} from "../state/selectors/currentUser";
import {Avatar, Chip, ListItem} from "@mui/material";
import stringToColor from "../helpers/stringToColor";
import styled from '@emotion/styled'
import {useNavigate} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import {getFirstLetters} from "../helpers/nameFirstLetters";
import useRecoilHook from "../hooks/useRecoilHook";
import SubuserIcon from "./SubuserIcon";
import UserAvatar from "./UserAvatar";
import {useEffect, useState} from "react";
import selectedGroupsState from "../state/atoms/selectedGroupsState";
import {DataStore} from "aws-amplify";
import {Users, WishlistItem} from "../models";
import {useRecoilState, useRecoilValue} from "recoil";
import userListItemsCountUpdater from "../state/atoms/userListItemsCountUpdater";

export default function UserListItem(props) {
    const {user} = props;
    const myUser = useRecoilHook(currentUser)
    let navigate = useNavigate();
    const [count, setCount] = useState()
    const [countUnseen, setCountUnseen] = useState(0);
    const selectedGroups = useRecoilValue(selectedGroupsState)
    const userListUpdaterVersion = useRecoilValue(userListItemsCountUpdater)


    const handleItemClick = (e) => {
        e.preventDefault();
        navigate(`/wishlist/${user?.id}`)
    }

    const UsernameEl = styled.div`
        padding-left: 10px;
    `

    async function updateItemsCount() {
        if (!user || !selectedGroups) return;
        const items = await DataStore.query(WishlistItem, c => c.ownerId("eq", user?.id));
        let unseenCount = 0
        const filteredItems = items.filter(item => {
            for(const group of selectedGroups) {
                if(item.seenBy && !item.seenBy?.includes(myUser?.id)) {
                    unseenCount++
                }
                if(item.groups.includes(group) && !item.custom) {
                    return true;
                }
            }
            return false
        })
        setCountUnseen(unseenCount);
        setCount(filteredItems.length)
    }
    useEffect(() => {
        updateItemsCount()
    }, [user, updateItemsCount, userListUpdaterVersion]);

    return (
        <ListItem disablePadding divider>
            <ListItemButton onClick={handleItemClick} sx={{gap: '10px'}}>

                <UserAvatar user={user} name={user?.username}/>
                <UsernameEl>
                    {user?.username}
                    {user?.id === myUser.id && <span> (You)</span>}
                </UsernameEl>
                {user.isUser && <SubuserIcon/>}
                {count && <span>({count})</span>}
                {countUnseen > 0 && <Chip label={`${countUnseen} `}
                                          sx={{fontWeight: 'bold', marginLeft: 'auto'}}
                                          color="secondary"/>}
            </ListItemButton>
        </ListItem>
    )
}

