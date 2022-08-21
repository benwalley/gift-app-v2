import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import Card from "@mui/material/Card";
import {CardMedia, CardContent, CardActions, CardActionArea, IconButton, Tooltip} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import useCurrency from "../../../hooks/useCurrency";
import TopBadges from "./TopBadges";
import {Users, WishlistItem} from "../../../models";
import {DataStore} from "aws-amplify";
import {currentUser} from "../../../state/selectors/currentUser";
import { useSetRecoilState} from "recoil";
import toggleAmplifyArrayItem from "../../../helpers/toggleAmplifyArrayItem";
import AddItemForm from "../../AddItemForm";
import CustomModal from "../../CustomModal";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {wishlistByUserId} from "../../../state/selectors/wishlistByUserId";
import {useNavigate} from "react-router-dom";



const PriorityPriceEl = styled.div`
    display: flex;
    justify-content: space-between;
`


export default function Tile(props) {
    const {tile} = props;
    const user = useRecoilHook(currentUser);
    const updateWishlist = useSetRecoilState(wishlistByUserId(user?.id))
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [parentId, setParentId] = useState()
    const [canEdit, setCanEdit] = useState(false)
    const [canSeeBadges, setCanSeeBadges] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(!tile || !user) return
        const getOwner = async () => {
            const tileOwner = await DataStore.query(Users, tile.ownerId)
            setParentId(tileOwner.parentId)
        }
        getOwner()

    }, [tile, user]);

    useEffect(() => {
        if(user?.id === tile.ownerId || user?.id === parentId) {
            setCanEdit(true)
        } else {
            setCanEdit(false)
        }
    }, [parentId, tile.ownerId, user?.id]);

    useEffect(() => {
        if(user?.id === tile.ownerId) {
            // this is your list, so you can never see badges
            setCanSeeBadges(false)
            return;
        }
        if(parentId && parentId !== user?.id) {
            // The list is not a subuser, so we can show badges
            setCanSeeBadges(true)
            return;
        }
        if(parentId === user?.id && !user?.subuserModeOn) {
            // list is subuser, but subuser mode is not on.
            setCanSeeBadges(true)
            return;
        }
        setCanSeeBadges(false)
    }, [parentId, tile.ownerId, user]);


    async function handleToggleGetting(e) {
        e.preventDefault()
        if (!user) return;
        await toggleAmplifyArrayItem(WishlistItem, tile.id, 'gottenBy', user?.id)
        updateWishlist(1)
    }

    async function handleToggleWantToGoIn(e) {
        e.preventDefault()
        if (!user) return;
        await toggleAmplifyArrayItem(WishlistItem, tile.id, 'wantsToGet', user?.id)
        updateWishlist(1)
    }

    function Priority() {
        if (!tile.priority) return;
        return <Tooltip title="Priority">
            <span>{`${tile.priority}/10`}</span>
        </Tooltip>
    }

    function Price() {
        const priceString = useCurrency(tile.price)
        return <div>
            <span>Price: ~</span>
            <span>{priceString}</span>
        </div>
    }

    function handleEdit() {
        setEditModalOpen(true)
    }

    async function handleDelete(e) {
        e.preventDefault();
        const id = tile.id
        const todelete = await DataStore.query(WishlistItem, id);
        await DataStore.delete(todelete);
        updateWishlist(0)
    }

    const handleClick = () => {
        navigate(`/wishlist/item/${tile.id}`)
    }

    return (
        <Card sx={{display: 'grid', gridTemplateRows: '1fr 56px', position: 'relative', minWidth: '275px'}}>
            {canSeeBadges && <TopBadges getting={tile.gottenBy} wantsToGet={tile.wantsToGet}/>}
            <CardActionArea onClick={handleClick}>
                {tile?.images?.length > 0 &&
                    <CardMedia
                        component="img"
                        height="140"
                        image={tile?.images[0]}
                        alt={tile.name}
                        sx={{
                            width: 'auto',
                            margin: "0 auto"
                        }}
                    />}
                <CardContent sx={{display: 'grid', gridTemplateRows: '1fr 24px'}}>
                    <h3>{tile.name}</h3>
                    <PriorityPriceEl>
                        <Priority/>
                        {tile.price && <Price/>}
                    </PriorityPriceEl>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {canSeeBadges && <Tooltip title="Mark as bought">
                    <IconButton aria-label="Mark as bought" onClick={handleToggleGetting}>
                        <AttachMoneyIcon color="darkGreen"/>
                    </IconButton>
                </Tooltip>}
                {canSeeBadges && <Tooltip title="I want to go in on this with someone">
                    <IconButton aria-label="I want to go in on this with someone" onClick={handleToggleWantToGoIn}>
                        <GroupAddIcon color="secondary"/>
                    </IconButton>
                </Tooltip>}
                {canEdit && <Tooltip title="Edit">
                    <IconButton aria-label="Edit" onClick={handleEdit}>
                        <EditIcon color="primary"/>
                    </IconButton>
                </Tooltip>}
                {canEdit && <Tooltip title="Delete">
                    <IconButton aria-label="Delete" onClick={handleDelete}>
                        <DeleteIcon color="deleteRed"/>
                    </IconButton>
                </Tooltip>}
            </CardActions>
            <CustomModal open={editModalOpen} setOpen={setEditModalOpen} size="large">
                <AddItemForm initialData={tile} afterSubmit={() => setEditModalOpen(false)}/>
            </CustomModal>
        </Card>
    );
}

