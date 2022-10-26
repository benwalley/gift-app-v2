import React, {useEffect} from 'react';
import useRecoilHook from "../../hooks/useRecoilHook";
import {giftsYourGetting, updateGiftsYourGetting} from "../../state/selectors/giftsYourGetting";
import List from "@mui/material/List";
import {ListItem} from "@mui/material";
import {useSetRecoilState} from "recoil";
import Divider from "@mui/material/Divider";
import {Link} from "react-router-dom";

export default function GiftGivingOverview() {
    const gifts = useRecoilHook(giftsYourGetting)
    const updateGifts = useSetRecoilState(updateGiftsYourGetting)

    useEffect(() => {
        updateGifts(0)
    }, [updateGifts]);

    //TODO: add name of person you're getting it for
    // TODO: only show items in your groups
    return (
        <List>
            <h3>Gifts You're Giving</h3>
            <Divider/>
            {gifts && gifts.length === 0 && <p>You haven't marked any gifts as gotten</p>}
            {gifts && gifts.map(gift => {
                return <ListItem key={gift.id} divider>
                    <span>{gift.name.slice(0, 20)}</span><Link to={`/wishlist/${gift.ownerId}`}>Link to list</Link>
                </ListItem>
            })}
        </List>
    );
}

