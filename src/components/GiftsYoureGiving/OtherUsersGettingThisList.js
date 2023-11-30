import React, {useEffect, useState} from 'react';
import List from "@mui/material/List";
import {ListItem, ListItemAvatar} from "@mui/material";
import UserAvatar from "../UserAvatar";
import OtherUserGettingThisItem from "./OtherUserGettingThisItem";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import {Divider} from "@aws-amplify/ui-react";
import {useRecoilValue} from "recoil";
import {selectedPlanningUser} from "../../state/selectors/selectedPlanningUser";

export default function OtherUsersGettingThisList(props) {
    const {gift} = props
        const selectedUser = useRecoilHook(selectedPlanningUser)
    function gottenByList() {
        if(gift.gottenBy?.length === 0) return [];
        return gift.gottenBy.filter(id => {
            return id !== selectedUser?.id
        })
    }

    function wantsToGetList() {
        if(gift.wantsToGet?.length === 0) return [];
        return gift.wantsToGet.filter(id => {
            return id !== selectedUser?.id
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

