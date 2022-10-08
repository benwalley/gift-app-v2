import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import Card from "@mui/material/Card";
import {CardMedia, CardContent, CardActions, CardActionArea, IconButton, Tooltip, Rating, Switch} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
import * as PropTypes from "prop-types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import Box from "@mui/material/Box";


const PriorityPriceEl = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: 'var(--heart-icon-hover)',
    },
    '& .MuiRating-iconHover': {
        color: 'var(--heart-icon-hover)',
    },
});

export default function Tile(props) {
    const {tile} = props;
    const user = useRecoilHook(currentUser);
    const updateWishlist = useSetRecoilState(wishlistByUserId(user?.id))
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [itemOwner, setItemOwner] = useState()
    const [canEdit, setCanEdit] = useState(false)
    const [canSeeBadges, setCanSeeBadges] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(!tile || !user) return
        const getOwner = async () => {
            const tileOwner = await DataStore.query(Users, tile.ownerId)
            setItemOwner(tileOwner)
        }
        getOwner()

    }, [tile, user]);

    useEffect(() => {
        if(user?.id === tile.ownerId || user?.id === itemOwner?.parentId) {
            setCanEdit(true)
        } else {
            setCanEdit(false)
        }
    }, [itemOwner?.parentId, tile.ownerId, user?.id]);

    useEffect(() => {
        if(!itemOwner) {
            setCanSeeBadges(false);
            return;
        }

        if(user?.id === tile.ownerId) {
            // this is your list, so you can never see badges
            setCanSeeBadges(false)
            return;
        }
        if(itemOwner?.parentId && itemOwner?.parentId !== user?.id) {
            // The list is not your subuser, so we can show badges
            setCanSeeBadges(true)
            return;
        }
        if(!itemOwner?.parentId) {
            setCanSeeBadges(true);
            return;
        }
        if(itemOwner?.parentId === user?.id && !user?.subuserModeOn && itemOwner?.isUser) {
            // list is subuser, but subuser mode is not on and subuser is user.
            setCanSeeBadges(true)
            return;
        }
        setCanSeeBadges(false)
    }, [itemOwner?.parentId, tile.ownerId, user]);


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

    async function handleToggleIsPublic(e) {
        e.preventDefault();
        const original = await DataStore.query(WishlistItem, tile.id);
        await DataStore.save(Users.copyOf(original, updated => {
            updated.isPublic = !original.isPublic;
        }))
        updateWishlist(1)
    }

    function Priority() {
        if (!tile.priority) return;
        return <Tooltip title="Priority">
            <StyledRating
                name="priority"
                readOnly
                label={"Priority"}
                getLabelText={(priority) => `${priority} Heart${priority !== 1 ? 's' : ''}`}
                precision={0.5}
                size={'small'}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                value={parseFloat(tile?.priority)}
            />
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
        <Card sx={{display: 'grid', gridTemplateRows: '1fr 56px', position: 'relative', minWidth: '275px', borderRadius: '10px'}}>
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
                            margin: "10px auto 0",
                            maxWidth: '90%',
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
                {canEdit && <Tooltip title={tile.isPublic ? "Item is visible publicly" : "Item is not visible publicly"}>
                        <Box sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
                            {tile.isPublic ? <PublicIcon/> : <PublicOffIcon/>}
                            <Switch
                                checked={tile.isPublic}
                                color={"secondary"}
                                onChange={handleToggleIsPublic}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Box>
                </Tooltip>}
            </CardActions>
            <CustomModal open={editModalOpen} setOpen={setEditModalOpen} size="large">
                <AddItemForm initialData={tile} afterSubmit={() => setEditModalOpen(false)}/>
            </CustomModal>
        </Card>
    );
}

