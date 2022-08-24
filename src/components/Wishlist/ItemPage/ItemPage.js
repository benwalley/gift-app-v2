import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {useParams} from "react-router-dom";
import {wishlistItemById} from "../../../state/selectors/wishlistItemById";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {Chip, IconButton, Stack, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Tile from "../../Home/Tile";
import useCurrency from "../../../hooks/useCurrency";
import AddItemForm from "../../AddItemForm";
import CustomModal from "../../CustomModal";
import ActionsBar from "./ActionsBar";
import {useSetRecoilState} from "recoil";
import {DataStore} from "aws-amplify";
import {Users, WishlistItem} from '../../../models'
import Button from "@mui/material/Button";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import toggleAmplifyArrayItem from "../../../helpers/toggleAmplifyArrayItem";
import {currentUser} from "../../../state/selectors/currentUser";

const ItemPageContainerEl = styled.div`
  background: var(--background-color);
  padding: var(--mobile-page-margin);
  max-width: var(--max-content-width);
  margin: 0 auto;
  
  @media only screen and (min-width: 600px) {
    padding: var(--desktop-page-margin);
  }
`

const ItemPageEl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  padding: 0;
  
  @media only screen and (min-width: 700px) {
     padding: 0 20px 20px;
  }
`

const ImagePlaceholderEl = styled.div`
    background: linear-gradient(200deg, #e6e6e6, #f8f8f8);
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
`

const H1El = styled.h1`
    grid-column: 1/-1;
    margin: 10px 0 20px;
`

const ImageEl = styled.img`
    max-width: 100%;
    width: 100%;
    aspect-ratio: 1/1;
    background: var(--background-grey);
`

const DetailsEl = styled.div`
    padding: 0 20px;
    display: grid;
    gap: 20px;
    grid-template-rows: auto auto auto auto 1fr;
`

const AEl = styled.a`
    color: var(--primary-color)
`

export default function ItemPage(props) {
    let {itemId} = useParams();
    const user = useRecoilHook(currentUser)
    const itemData = useRecoilHook(wishlistItemById(itemId))
    const price = useCurrency(itemData.price)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const updateItem = useSetRecoilState(wishlistItemById(itemId))
    const [gottenBy, setGottenBy] = useState([]);
    const [wantsToGet, setWantsToGet] = useState([]);
    const [canGet, setCanGet] = useState(false)
    const [parentId, setParentId] = useState()
    const [canEdit, setCanEdit] = useState(false)

    useEffect(() => {
        if(user?.id === itemData.ownerId || user?.id === parentId) {
            setCanEdit(true)
        } else {
            setCanEdit(false)
        }
    }, [parentId, itemData.ownerId, user?.id]);

    useEffect(() => {
        if(!itemData || !user) return
        const getOwner = async () => {
            const itemOwner = await DataStore.query(Users, itemData.ownerId)
            setParentId(itemOwner.parentId)
        }
        getOwner()

    }, [itemData, user]);

    useEffect(() => {
        updateItem(0)
    }, [updateItem]);

    useEffect(() => {
        if(!itemData) return;
        async function updateGetting() {
            // update gottenBy
            if(itemData.gottenBy && itemData.gottenBy.length > 0) {
                const gottenNames = await Promise.all(itemData.gottenBy.map(async id => {
                    const user = await DataStore.query(Users, id);
                    return <Chip color={"primary"} size={"small"} key={user?.id} label={user?.username || 'unnamed'} />


                }))
                setGottenBy(gottenNames)
            } else {
                setGottenBy([])
            }
            if(itemData.wantsToGet && itemData.wantsToGet.length > 0) {
                // update wantsToGet
                const wantsToGetNames = await Promise.all(itemData.wantsToGet.map(async id => {
                    const user = await DataStore.query(Users, id);
                    return <Chip color={"secondary"} size={"small"} key={user?.id} label={user?.username || 'unnamed'} />
                }))
                setWantsToGet(wantsToGetNames)
            } else {
                setWantsToGet([])
            }
        }

        updateGetting()

    }, [itemData]);

    useEffect(() => {
        function updateCanGet() {
            if(itemData.ownerId === user.id) {
                setCanGet(false);
                return;
            }
            if(parentId && parentId !== user?.id) {
                // The list is not a subuser, so we can show badges
                setCanGet(true)
                return;
            }
            if(parentId === user?.id && !user?.subuserModeOn) {
                // list is subuser, but subuser mode is not on.
                setCanGet(true)
                return;
            }
            setCanGet(false)
        }
        if(user && itemData) {
            updateCanGet()
        }
    }, [itemData, parentId, user]);

    function ImageElement() {
        if (!itemData || !itemData?.images || itemData.images.length === 0 || itemData.images[0] === '') return <ImagePlaceholderEl/>
        return <ImageEl  src={itemData.images[0]} alt={itemData.name}/>
    }

    const handleEdit = () => {
        setEditModalOpen(true)
    }

    const renderLinkName = () => {
        try {
            const domain = new URL(itemData.link).host;
            return `Link to item on ${domain}`
        } catch(e) {
            return false
        }
    }

    const gettingThis = () => {
        if(!itemData?.gottenBy) return false;
        return itemData.gottenBy.includes(user.id);
    }

    const wantsToGetThis = () => {
        if(!itemData?.wantsToGet) return false;
        return itemData.wantsToGet.includes(user.id);
    }

    async function handleToggleGetting(e) {
        e.preventDefault()
        if (!itemData?.ownerId) return;
        await toggleAmplifyArrayItem(WishlistItem, itemData.id, 'gottenBy', user?.id)
        updateItem(1)
    }

    async function handleToggleWantToGoIn(e) {
        e.preventDefault()
        if (!user) return;
        await toggleAmplifyArrayItem(WishlistItem, itemData.id, 'wantsToGet', user?.id)
        updateItem(1)
    }

    return (
        <ItemPageContainerEl>
            <ActionsBar/>
            <Tile>
                <ItemPageEl>
                    <H1El>
                        <span>{itemData && itemData.name}</span>
                        {canEdit && <Tooltip title="Edit Item">
                            <IconButton aria-label="Edit" onClick={handleEdit}>
                                <EditIcon color="primary"/>
                            </IconButton>
                        </Tooltip>}
                    </H1El>
                    <ImageElement/>
                    <DetailsEl>
                        {itemData?.note && <div><b>Note: </b><div>{itemData.note}</div></div>}
                        {itemData?.priority && <div><b>Priority: </b>{itemData.priority}/10</div>}
                        {itemData?.link && renderLinkName() && <AEl href={itemData.link}>{renderLinkName()}</AEl>}
                        {itemData?.price && <div><b>Price: </b><span>~ {price}</span></div>}
                        {canGet && gottenBy.length > 0 && <div><b>Gotten By: </b><Stack direction="row" spacing={1}>{gottenBy}</Stack></div>}
                        {canGet && wantsToGet.length > 0 && <div><b>Want to go in with someone: </b><Stack direction="row" spacing={1}>{wantsToGet}</Stack></div>}
                        {canGet && <Stack direction={{xs: "column", md: 'row'}} spacing={1} sx={{marginTop: 'auto'}}>
                            <Button
                                variant={"contained"}
                                color={"green"}
                                startIcon={<AttachMoneyIcon />}
                                onClick={handleToggleGetting}
                            >{gettingThis() ? "Don't get this" : "Get this"}</Button>
                            <Button
                                variant={"contained"}
                                color={"secondary"}
                                startIcon={<GroupAddIcon />}
                                onClick={handleToggleWantToGoIn}
                            >{wantsToGetThis() ? "Say you don't want to go in on this" : "Say you want to go in on this"}</Button>
                        </Stack>}
                    </DetailsEl>
                </ItemPageEl>
            </Tile>
            <CustomModal open={editModalOpen} setOpen={setEditModalOpen} size="large">
                <AddItemForm initialData={itemData} afterSubmit={() => setEditModalOpen(false)}/>
            </CustomModal>
        </ItemPageContainerEl>
    );
}

