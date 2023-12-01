import React, {useEffect, useState} from 'react';
import useRecoilHook from "../../hooks/useRecoilHook";
import {giftsYourGetting, updateGiftsYourGetting} from "../../state/selectors/giftsYourGetting";
import List from "@mui/material/List";
import {IconButton, ListItem, Stack, Tooltip} from "@mui/material";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import Divider from "@mui/material/Divider";
import {Link} from "react-router-dom";
import GiftGivingPerson from "./GiftGivingPerson";
import useCurrency from "../../hooks/useCurrency";
import Button from "@mui/material/Button";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import checkedTotalsIds from "../../state/atoms/checkedTotalsIds";
import {DataStore} from "aws-amplify";
import {Giving} from "../../models";
import {currentUser} from "../../state/selectors/currentUser";
import {selectedPlanningUser} from "../../state/selectors/selectedPlanningUser";

export default function GiftGivingOverview() {
    const gifts = useRecoilHook(giftsYourGetting)
    const updateGifts = useSetRecoilState(updateGiftsYourGetting)
    const [calculatedPrice, setCalculatedPrice] = useState(0)
    const price = useCurrency(calculatedPrice)
    const [totalsIds, setTotalsIds] = useRecoilState(checkedTotalsIds);
    const selectedUser = useRecoilHook(selectedPlanningUser)


    useEffect(() => {
        updateGifts(0)
    }, [updateGifts]);

    useEffect(() => {
        updateTotalPrice()
    }, [gifts,totalsIds]);

    useEffect(() => {
        handleSelectAll()
    }, [gifts]);

    function groupedGifts() {
        if(!gifts?.length) return [];
        const giftsByUser = {}
        for(const gift of gifts) {
            const usersGifts = giftsByUser[gift.ownerId] || [];
            usersGifts.push(gift);
            giftsByUser[gift.ownerId] = usersGifts;
        }
        const resultArray = Object.values(giftsByUser);
        return resultArray;
    }

    async function updateTotalPrice() {
        let total = 0;
        if (!gifts?.length) setCalculatedPrice(0)
        for (const item of gifts) {
            if (totalsIds.includes(item.ownerId)) {
                const itemPrice = item.price || 0;
                const customData = await DataStore.query(Giving, (c) => c.and(c => [
                    c.giftId("eq", item?.id),
                    c.giverIds('contains', selectedUser.id)
                ]));
                if(customData?.length > 0) {
                    const customPrice = customData[0].actualPrice;
                    if(customPrice) {
                        total += parseFloat(customPrice) || 0
                        continue
                    }
                }
                total += parseFloat(itemPrice) || 0
            }
        }
        setCalculatedPrice(total)
    }

    const priceCheckboxActionStyles = {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 'auto',
        width: '150px',

    }

    function handleSelectAll() {
        if(!groupedGifts()?.length > 0) return
        const personIds = groupedGifts().map(giftArray => {
            return giftArray[0].ownerId;
        })
        setTotalsIds(personIds);
    }

    function handleDeselectAll() {
        setTotalsIds([]);
    }

    return (
        <List>
            <h3 style={{color: 'var(--primary-color)'}}>Gifts You're Giving</h3>
            <Divider/>
            {gifts && gifts.length === 0 && <p>You haven't marked any gifts as gotten</p>}
            {gifts && gifts.length > 0 && <div style={priceCheckboxActionStyles}>
                <p style={{fontSize: '0.8em', margin: 0}}>Include in Total Price</p>
                <Tooltip title='Select All' disableInteractive={true}>
                    <IconButton color={'darkGreen'} sx={{margin: 'auto'}} size={'small'} onClick={handleSelectAll}>
                        <DoneAllIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title='De-select All' disableInteractive={true}>
                    <IconButton color='deleteRed' sx={{margin: 'auto'}} size={'small'} onClick={handleDeselectAll}>
                        <RemoveDoneIcon/>
                    </IconButton>
                </Tooltip>
            </div>}
            {gifts && gifts.length > 0 && groupedGifts().map(giftArray => {
                return <GiftGivingPerson key={giftArray[0].ownerId} giftArray={giftArray}/>
            })}
            {gifts && gifts.length > 0 && <Stack direction={'row'} justifyContent={'space-between'} sx={{padding: '10px 0'}}>
                <strong>Total approximate price</strong>
                <strong>{price}</strong>
            </Stack>}
        </List>
    );
}

