import React, {useEffect} from 'react';
import useRecoilHook from "../../hooks/useRecoilHook";
import {giftsYourGetting, updateGiftsYourGetting} from "../../state/selectors/giftsYourGetting";
import List from "@mui/material/List";
import {ListItem} from "@mui/material";
import {useSetRecoilState} from "recoil";
import Divider from "@mui/material/Divider";
import {Link} from "react-router-dom";
import GiftGivingItem from "./GiftGivingItem";

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
                return <ListItem sx={{display: 'flex', justifyContent: 'space-between'}} key={gift.id} divider>
                    <GiftGivingItem gift={gift}/>
                </ListItem>
            })}
        </List>
    );
}

