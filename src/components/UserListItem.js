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

export default function UserListItem(props) {
    const {user} = props;
    const myUser = useRecoilHook(currentUser)
    let navigate = useNavigate();

    const handleItemClick = (e) => {
        e.preventDefault();
        navigate(`/wishlist/${user?.id}`)
    }

    const UsernameEl = styled.div`
        padding-left: 10px;
    `

    return (
        <ListItem disablePadding divider>
            <ListItemButton onClick={handleItemClick} sx={{gap: '10px'}}>

                <UserAvatar user={user} name={user?.username}/>
                <UsernameEl>
                    {user?.username}
                    {user?.id === myUser.id && <span> (You)</span>}
                </UsernameEl>
                {user.isUser && <SubuserIcon/>}
            </ListItemButton>
        </ListItem>
    )
}

