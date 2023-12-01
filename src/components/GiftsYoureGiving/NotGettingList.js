import React, {useEffect, useState} from 'react';
import List from "@mui/material/List";
import {Avatar, ListItem, ListItemAvatar, Tooltip} from "@mui/material";
import stringToColor from "../../helpers/stringToColor";
import {getFirstLetters} from "../../helpers/nameFirstLetters";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import useRecoilHook from "../../hooks/useRecoilHook";
import {haventGotten} from "../../state/selectors/haventGotten";
import {myPlanningData} from "../../state/selectors/myPlanningData";
import HaventGottenListItem from "./HaventGottenListItem";
import NotGettingListItem from "./NotGettingListItem";


export default function NotGettingList(props) {
    const {} = props
    const haventGottenUserIds = useRecoilHook(haventGotten)
    const [filteredList, setFilteredList] = useState([])
    const planningData = useRecoilHook(myPlanningData)

    useEffect(() => {
        if(!haventGottenUserIds?.length) return;
        updateFilteredList()
    }, [haventGottenUserIds, planningData]);

    function updateFilteredList() {
        const filtered = haventGottenUserIds.filter(userId => {
            const userData = planningData.find(item => {
                return item.giftForId === userId;
            })
            if(userData === undefined) return false;
            if(!userData?.wantToGetGifts) return true;
            return false;
        })
        setFilteredList(filtered);
    }

    return (
        <List>
            {filteredList.map(userId => {
                return <NotGettingListItem key={userId} userId={userId}/>
            })}
        </List>
    );
}

