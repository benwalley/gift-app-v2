import React, {useEffect, useState} from 'react';
import List from "@mui/material/List";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import {haventGotten} from "../../state/selectors/haventGotten";
import HaventGottenListItem from "./HaventGottenListItem";
import {myPlanningData} from "../../state/selectors/myPlanningData";
import {Typography} from "@mui/material";

export default function HaventGottenList(props) {
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
            if(userData === undefined) return true;
            if(userData?.wantToGetGifts) return true;
            return false;
        })
        setFilteredList(filtered);
    }

    function noContent() {
        return <Typography color={'secondary'}>Congratulations! You've planned gifts for everyone who has a list</Typography>
    }

    return (
        <>
            {filteredList === undefined && ''}
            {filteredList.length === 0 && noContent()}
            {filteredList?.length > 0 && <List>
                {filteredList.map(userId => {
                    return <HaventGottenListItem key={userId} userId={userId}/>
                })}
            </List>}
        </>

    );
}

