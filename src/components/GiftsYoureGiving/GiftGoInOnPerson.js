import React, {useEffect, useState} from 'react';
import {Avatar, Checkbox, Chip, Collapse, IconButton, ListItem, ListItemAvatar, Stack, Tooltip} from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import GiftGivingItem from "./GiftGivingItem";
import ListItemText from "@mui/material/ListItemText";
import {DataStore} from "aws-amplify";
import {Giving, Users} from "../../models";
import useCurrency from "../../hooks/useCurrency";
import {Link} from "react-router-dom";
import CustomModal from "../CustomModal";
import UserAvatar from "../UserAvatar";
import checkedTotalsIds from "../../state/atoms/checkedTotalsIds";
import {useRecoilState, useRecoilValue} from "recoil";
import GiftGoInOnItem from "./GiftGoInOnItem";
import checkedWantToGoInOnTotalsIds from "../../state/atoms/checkedWantToGoInOnTotalsIds";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import Button from "@mui/material/Button";
import {selectedPlanningUser} from "../../state/selectors/selectedPlanningUser";


export default function GiftGoInOnPerson(props) {
    const {giftArray} = props
    const [open, setOpen] = useState(false)
    const [gottenForUser, setGottenForUser] = useState()
    const [calculatedPrice, setCalculatedPrice] = useState(0)
    const price = useCurrency(calculatedPrice)
    const [checkedIds, setCheckedIds] = useRecoilState(checkedWantToGoInOnTotalsIds)
        const selectedUser = useRecoilHook(selectedPlanningUser)


    useEffect( () => {
        const updateGottenForName = async () => {
            const giftOwner = await DataStore.query(Users, giftArray[0]?.ownerId);
            if(giftOwner) {
                setGottenForUser(giftOwner)
            }
        }
        updateGottenForName()
        updateTotalPrice();
    }, [giftArray]);

    function handleClick() {
        setOpen(!open);
    }

    function isChecked() {
        if(!gottenForUser?.id) return true
        return checkedIds.includes(gottenForUser?.id)
    }

    async function updateTotalPrice() {
        let total = 0;
        if (!giftArray?.length) setCalculatedPrice(0)
        for (const item of giftArray) {
            if (checkedIds.includes(item.ownerId)) {
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

    const handleCheckboxChange = (event) => {
        if(!gottenForUser?.id) return;
        const checkedCopy = new Set(checkedIds);
        const checked = event.target.checked
        if(checked) {
            checkedCopy.add(gottenForUser.id);
        } else {
            checkedCopy.delete(gottenForUser.id)
        }
        setCheckedIds(Array.from(checkedCopy));
    };

    return (
        <ListItem
            disablePadding
        >
            <ListItemButton sx={{paddingLeft: 0}} onClick={handleClick} divider>
                <Tooltip title={isChecked() ? "Don't include this item in the totals calculation" : "Include this item in the totals calculation"} disableInteractive={true}>
                    <Checkbox checked={isChecked()}
                              onChange={handleCheckboxChange}
                              onClick={(e) => e.stopPropagation()}
                    />
                </Tooltip>

                <ListItemAvatar>
                    <UserAvatar user={gottenForUser} name={gottenForUser?.username}/>
                </ListItemAvatar>
                <ListItemText primary={<Tooltip title={`Go to ${gottenForUser?.username} list`} disableInteractive={true}>
                    <Link to={`/wishlist/${gottenForUser?.id}`}>{gottenForUser?.username || 'Link to list'}</Link>
                </Tooltip>} />

                <Tooltip title={`You want to go in on ${giftArray?.length} gift${giftArray?.length > 1 ? 's' : ''} for ${gottenForUser?.username}`} disableInteractive={true}>
                    <Chip label={giftArray ? giftArray.length : '...'} color={'secondary'} size={'small'} sx={{fontWeight: 'bold', margin: '0 7px'}}/>
                </Tooltip>
                <span style={{padding: '0 7px'}}>
                    {price}
                </span>
            </ListItemButton>
            <CustomModal size={"large"} open={open} setOpen={setOpen} unmountOnExit>
                <h2>{gottenForUser?.username}</h2>
                <List component="div" disablePadding>
                    {giftArray.map(gift => {
                        return <GiftGoInOnItem key={gift.id} gift={gift}/>
                    })}
                </List>
                <Button sx={{marginTop: '20px', float: 'right'}} onClick={() => setOpen(false)} variant={'contained'}>Done</Button>
            </CustomModal>
        </ListItem>

    );
}

