import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import useRecoilHook from "../../hooks/useRecoilHook";
import {giftsYourGetting, updateGiftsYourGetting} from "../../state/selectors/giftsYourGetting";
import List from "@mui/material/List";
import {ListItem} from "@mui/material";
import {useSetRecoilState} from "recoil";


const DashboardBodyEl = styled.div`
    background: var(--background-color);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
   
`

export default function GiftGivingOverview() {
    const gifts = useRecoilHook(giftsYourGetting)
    const updateGifts = useSetRecoilState(updateGiftsYourGetting)

    useEffect(() => {
        updateGifts(0)
    }, [updateGifts]);

    return (
        <List>
            <h3>Gifts You're Giving</h3>
            {gifts && gifts.map(gift => {
                return <ListItem key={gift.id} divider>
                    {gift.name.slice(0, 20)}
                </ListItem>
            })}
        </List>
    );
}

