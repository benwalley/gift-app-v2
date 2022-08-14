import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import useRecoilHook from "../../hooks/useRecoilHook";
import List from "@mui/material/List";
import {Avatar, Chip, ListItem, ListItemAvatar, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import {subUsers, updateSubUsers} from "../../state/selectors/subUsers";
import {useSetRecoilState} from "recoil";
import SubUser from "../Account/Subusers/SubUser";
import stringToColor from "../../helpers/stringToColor";
import {getFirstLetters} from "../../helpers/nameFirstLetters";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export default function SubuserOverview() {
    const subusers = useRecoilHook(subUsers)
    const updateSubusers = useSetRecoilState(updateSubUsers)

    useEffect(() => {
        updateSubusers(0)
    }, [updateSubusers]);

    return (
        <div>
            <h3>Your Subusers</h3>
            <Divider/>
            <List>
                {subusers && subusers.map(user => {
                    return <ListItem key={user.id} divider disablePadding sx={{padding: '2px'}}>
                        <ListItemAvatar>
                            <Avatar
                                sx={{bgcolor: stringToColor(user.username), width: '24px', height: '24px', fontSize: '12px'}}
                                alt={user.username}
                            >
                                {getFirstLetters(user.username)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.username}
                        />
                    </ListItem>
                })}
            </List>
            <Link to={"/account/subusers"}>Subusers Page</Link>
        </div>
    );
}

