import React, {useEffect, useState} from 'react';
import {Avatar, Checkbox, Chip, Collapse, IconButton, ListItem, ListItemAvatar, Stack, Tooltip} from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import GiftGivingItem from "./GiftGivingItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {DataStore} from "aws-amplify";
import {Users} from "../../models";
import stringToColor from "../../helpers/stringToColor";
import {getFirstLetters} from "../../helpers/nameFirstLetters";
import {Divider} from "@aws-amplify/ui-react";
import useCurrency from "../../hooks/useCurrency";
import {Link} from "react-router-dom";
import ProductPicker from "../Account/Groups/ProductPicker";
import CustomModal from "../CustomModal";
import UserAvatar from "../UserAvatar";
import CommentIcon from '@mui/icons-material/Comment';
import checkedTotalsIds from "../../state/atoms/checkedTotalsIds";
import {useRecoilState} from "recoil";
import StatusBar from "../GiftsYoureGiving/StatusBar";


export default function GiftGivingPerson(props) {
    const {giftArray} = props
    const [open, setOpen] = useState(false)
    const [gottenForUser, setGottenForUser] = useState()
    const [calculatedPrice, setCalculatedPrice] = useState(0)
    const price = useCurrency(calculatedPrice)
    const [checkedIds, setCheckedIds] = useRecoilState(checkedTotalsIds)



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

    function updateTotalPrice() {
        let total = 0;
        if(!giftArray?.length) setCalculatedPrice(0)
        for(const item of giftArray) {
            if(item.price) {
                total += parseFloat(item.price)
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
                <span style={{padding: '0 7px'}}>
                    {price}
                </span>
                <Tooltip title={`You're getting ${gottenForUser?.username}, ${giftArray?.length} gifts`} disableInteractive={true}>
                    <Chip label={giftArray ? giftArray.length : '...'} color={'secondary'} size={'small'} sx={{fontWeight: 'bold', margin: '0 7px'}}/>
                </Tooltip>
                <StatusBar giftArray={giftArray}/>
            </ListItemButton>
            <CustomModal size={"large"} open={open} setOpen={setOpen} unmountOnExit>
                <h2>{gottenForUser?.username}</h2>
                <List component="div" disablePadding>
                    {giftArray.map(gift => {
                        return <GiftGivingItem key={gift.id} gift={gift}/>
                    })}
                </List>
            </CustomModal>
        </ListItem>

    );
}

