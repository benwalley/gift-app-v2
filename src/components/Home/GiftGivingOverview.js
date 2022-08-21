import React, {useEffect} from 'react';
import useRecoilHook from "../../hooks/useRecoilHook";
import {giftsYourGetting, updateGiftsYourGetting} from "../../state/selectors/giftsYourGetting";
import List from "@mui/material/List";
import {ListItem} from "@mui/material";
import {useSetRecoilState} from "recoil";
import Divider from "@mui/material/Divider";

export default function GiftGivingOverview() {
    const gifts = useRecoilHook(giftsYourGetting)
    const updateGifts = useSetRecoilState(updateGiftsYourGetting)

    useEffect(() => {
        updateGifts(0)
    }, [updateGifts]);

    return (
        <List>
            <h3>Gifts You're Giving</h3>
            <Divider/>
            {gifts && gifts.length === 0 && <p>You haven't marked any gifts as gotten</p>}
            {gifts && gifts.map(gift => {
                return <ListItem key={gift.id} divider>
                    {gift.name.slice(0, 20)}
                </ListItem>
            })}
        </List>
    );
}

