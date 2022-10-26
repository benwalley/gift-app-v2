import * as React from 'react';
import {currentUser} from "../state/selectors/currentUser";
import {Avatar, ListItem} from "@mui/material";
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
import {useRecoilValue} from "recoil";

export default function UserListItem(props) {
    const {user} = props;
    const myUser = useRecoilHook(currentUser)
    let navigate = useNavigate();
    const [count, setCount] = useState()
    const selectedGroups = useRecoilValue(selectedGroupsState)


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
        const filteredItems = items.filter(item => {
            for(const group of selectedGroups) {
                if(item.groups.includes(group) && !item.custom) {
                    return true;
                }
            }
            return false
        })
        setCount(filteredItems.length)
    }
    useEffect(() => {
        updateItemsCount()
    }, [user, updateItemsCount]);

    return (
        <ListItem disablePadding divider>
            <ListItemButton onClick={handleItemClick} sx={{gap: '10px'}}>

                <UserAvatar user={user} name={user?.username}/>
                <UsernameEl>
                    {user?.username}
                    {user?.id === myUser.id && <span> (You)</span>}
                </UsernameEl>
                {user.isUser && <SubuserIcon/>}
                {count && `(${count})`}
            </ListItemButton>
        </ListItem>
    )
}

