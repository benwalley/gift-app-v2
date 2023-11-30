import React, {useEffect, useState} from 'react';
import List from "@mui/material/List";
import {ListItem, ListItemAvatar} from "@mui/material";
import UserAvatar from "../UserAvatar";
import OtherUserGettingThisItem from "./OtherUserGettingThisItem";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import {Divider} from "@aws-amplify/ui-react";

export default function OtherUsersGettingThisList(props) {
    const {gift} = props
    const myUser = useRecoilHook(currentUser);

    function gottenByList() {
        if(gift.gottenBy?.length === 0) return [];
        return gift.gottenBy.filter(id => {
            return id !== myUser?.id
        })
    }

    function wantsToGetList() {
        if(gift.wantsToGet?.length === 0) return [];
        return gift.wantsToGet.filter(id => {
            return id !== myUser?.id
        })
    }

    return (
        <List >
            {gottenByList().map(userId => {
                return <OtherUserGettingThisItem key={userId} userId={userId} getting={true}/>
            })}
            {wantsToGetList().map(userId => {
                return <OtherUserGettingThisItem key={userId} userId={userId} wantsToGet={true}/>
            })}
        </List>
    );
}

