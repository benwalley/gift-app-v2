import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {DataStore} from "aws-amplify";
import {Giving, Planning, Users, WishlistItem} from "../../models";
import {
    Checkbox, Collapse,
    FormControl,
    IconButton, InputAdornment, InputLabel,
    ListItem, OutlinedInput,
    Stack,
    StepLabel,
    Stepper,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip, Typography
} from "@mui/material";
import CallMadeIcon from '@mui/icons-material/CallMade';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LinkIcon from '@mui/icons-material/Link';
import useCurrency from "../../hooks/useCurrency";
import ImageRender from "../ImageRender";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import Button from "@mui/material/Button";
import OtherUsersGettingThisList from "./OtherUsersGettingThisList";
import {useRecoilState, useSetRecoilState} from "recoil";
import {giftsYourGetting} from "../../state/selectors/giftsYourGetting";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {selectedPlanningUser} from "../../state/selectors/selectedPlanningUser";

const imageContainerStyles = {
    width: '75px',
    height: '75px',
    background: '#e2e2e2',
    flexShrink: 0,
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center'
}

const imageStyles = {
    maxWidth: '75px',
    maxHeight: '75px',
    objectFit: 'contain'
}

const bottomRowStyles = {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '20px',
    marginTop: '20px',
    width: '100%',
    justifyContent: 'space-between',
}

export default function GiftGivingItem(props) {
    const {gift} = props
    const [gottenForName, setGottenForName] = useState()
    const selectedUser = useRecoilHook(selectedPlanningUser)
    const [gettingData, setGettingData] = useState()
    const [actualPrice, setActualPrice] = useState('');
    const [otherUsersExpanded, setOtherUsersExpanded] = useState(false)
    const [priceTimeout, setPriceTimeout] = useState(0)
    const setGivingData = useSetRecoilState(giftsYourGetting);
    const price = useCurrency(calculatedPrice());
    const [deleting, setDeleting] = useState(false);

    function calculatedPrice() {
        if(gettingData?.actualPrice !== undefined && gettingData?.actualPrice !== '') {
            return parseFloat(gettingData.actualPrice) || 0;
        }
        return parseFloat(gift.price) || 0
    }


    useEffect(() => {
        if(gettingData?.actualPrice) {
            setActualPrice(gettingData.actualPrice);
        }
    }, [gettingData]);

    useEffect(() => {
        clearTimeout(priceTimeout);
        const timeout = setTimeout(() => {
            setPriceValue(actualPrice);
        }, 300)
        setPriceTimeout(timeout)
    }, [actualPrice]);

    function setPriceValue(price) {
        updateGettingDataItem('actualPrice', price);
    }


    const handleAlignment = (event, newStatus) => {
        updateGettingDataItem('status', newStatus);
    };

    function addGiverId(id) {
        if(!gettingData) return;
        const newIds = [...new Set(gettingData.giverIds), id]
        updateGettingDataItem('giverIds', newIds);
    }

    async function updateGettingDataItem(itemName, itemValue) {
        if(!gettingData) {
            await updateGettingData();
            return;
        }

        const original = await DataStore.query(Giving, gettingData?.id);
        const newData = await DataStore.save(Giving.copyOf(original, updated => {
            updated[itemName]  = itemValue;
        }))
        setGettingData(newData);
        setGivingData(0);

    }

    useEffect( () => {
        if(!gift || !selectedUser || selectedUser.length === 0) return;
        const updateGottenForName = async () => {
            const giftOwner = await DataStore.query(Users, gift?.ownerId);
            if(giftOwner) {
                setGottenForName(giftOwner.username)
            }
        }
        updateGottenForName()
        updateGettingData()
    }, [gift, selectedUser]);

    async function updateGettingData() {
        if(!gift?.id || !selectedUser.id) return;
        const existingData = await DataStore.query(Giving, (c) => c.and(c => [
            c.giftId("eq", gift?.id),
            c.giverIds('contains', selectedUser.id)
        ]));

        if(existingData === undefined || existingData.length === 0) {
            // create line item
            const newData = {
                status: 'goingToGet',
                giftId: gift.id,
                giverIds: [selectedUser.id]
            }
            const newItem = await DataStore.save(
                new Giving(newData)
            );
            setGettingData(newItem);
            return newItem;
        }
        setGettingData(existingData[0])
        return existingData[0]
    }

    function itemStatus() {
        return gettingData?.status
    }

    function handlePriceChange(e) {
        const value = e.target.value;
        const filtered = value.replace(/[^0-9.]/g, '');
        setActualPrice(filtered)
    }

    function handleToggleOtherUsers() {
        setOtherUsersExpanded(!otherUsersExpanded)
    }

    function otherUsersGetting() {
        if(!gift || !selectedUser?.id) return false;
        const combined = [...gift.gottenBy || [], ...gift.wantsToGet || []];
        const filtered = combined.filter(id => {
            return id !== selectedUser.id;
        })
        return filtered.length > 0;
    }

    async function handleRemove() {
        setDeleting(true);
        const giftCopy = structuredClone(gift);
        const gottenByCopy = new Set(giftCopy.gottenBy || []);
        gottenByCopy.delete(selectedUser.id);

        // set gift value;
        const original = await DataStore.query(WishlistItem, gift.id);
        await DataStore.save(WishlistItem.copyOf(original, updated => {
            updated.gottenBy = Array.from(gottenByCopy);
        }))

        setGivingData(0)
    }

    const deletingOverlayStyles = {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        zIndex: 2,
        backdropFilter: "blur(2px)",
        background: 'rgba(0,0,0,0.3)',
        fontSize: '2em',
    }

    return (
        <ListItem disablePadding sx={{display: 'flex', flexDirection: 'column'}} key={gift.id} divider>
            {deleting && <div style={deletingOverlayStyles}>Deleting...</div>}
            <div style={{
                display: 'flex',
                gap: '20px',
                width: '100%',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                {gift?.images?.length > 0 && <div style={imageContainerStyles}>
                    <ImageRender styles={imageStyles} src={gift.images[0]}/>
                </div>}
                <Tooltip title={`Go to gift page`} disableInteractive={true}>
                    <Link style={{marginRight: 'auto', maxWidth: '500px'}} to={`/wishlist/item/${gift.id}`}>{gift.name}</Link>
                </Tooltip>
                <span>{price}</span>

                <div>
                    <p style={{margin: 0, fontSize: '0.8em', color: '#444444'}}>Status</p>
                    <ToggleButtonGroup
                        value={itemStatus()}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="Gift Status"
                        size={'small'}
                        color={'secondary'}
                    >
                        <ToggleButton value="goingToGet" aria-label="Going to get">
                            <Tooltip title={"Going to get"} disableInteractive={true}>
                                <CheckBoxIcon/>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton value="ordered" aria-label="Ordered">
                            <Tooltip title={"Ordered"} disableInteractive={true}>
                                <StoreIcon/>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton value="gotten" aria-label="Gotten">
                            <Tooltip title={"Gotten"} disableInteractive={true}>
                                <LocalShippingIcon/>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton value="wrapped" aria-label="Wrapped">
                            <Tooltip title={"Wrapped"} disableInteractive={true}>
                                <CardGiftcardIcon/>
                            </Tooltip>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
            <div style={bottomRowStyles}>
                <FormControl size={'small'}>
                    <InputLabel htmlFor="actual-price">Actual Price</InputLabel>
                    <OutlinedInput
                        id="actual-price"
                        value={actualPrice}
                        onChange={handlePriceChange}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Actual Price"
                    />
                </FormControl>
                {otherUsersGetting() && <Button onClick={handleToggleOtherUsers}
                                                sx={{marginLeft: 'auto'}}>
                    {otherUsersExpanded ? 'Hide Other users' : 'Show Other Users'}
                </Button>}
                <Tooltip title={"I don't want to get this."}>
                    <IconButton color='deleteRed' onClick={handleRemove}>
                        <HighlightOffIcon/>
                    </IconButton>
                </Tooltip>
                {/*<Tooltip title="Click if you are the one buying this item." disableInteractive={true}>*/}
                {/*    <Checkbox icon={<RemoveShoppingCartIcon />} checkedIcon={<ShoppingCartIcon />} />*/}
                {/*</Tooltip>*/}
            </div>
            <Collapse sx={{width: '100%', borderTop: '1px solid #dfdfdf', background: '#ebf5fd'}} in={otherUsersExpanded} timeout="auto" unmountOnExit>
                <OtherUsersGettingThisList gift={gift}/>
            </Collapse>
        </ListItem>

    );
}

