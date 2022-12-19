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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import Box from "@mui/material/Box";
import useImageSrc from "../../../hooks/useImageSrc";
import {canUserEdit} from "../../../state/selectors/canUserEdit";
import useBooleanRecoilHook from "../../../hooks/useBooleanRecoilHook";
import useCanUserSeeBadges from "../../../hooks/useCanUserSeeBadges";
import {canUserDelete} from "../../../state/selectors/canUserDelete";
import GetThisDialog from "../../GetThisDialog";
import WantToGetThisDialog from "../../WantToGetThisDialog";
import {text} from "../../../text";


const PriorityPriceEl = styled.div`
    display: flex;
    justify-content: space-between;
`

const CustomAddedByEl = styled.div`
    color: var(--pink-color);
    font-size: 0.7em;
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
    const canEdit = useBooleanRecoilHook(canUserEdit({userId: user?.id, itemId: tile?.id}))
    const canDelete = useBooleanRecoilHook(canUserDelete({userId: user?.id, itemId: tile?.id}))
    const canSeeBadges = useCanUserSeeBadges(user?.id, tile?.id)
    const [customAddedByName, setCustomAddedByName] = useState()
    const navigate = useNavigate()
    const imageUrl = useImageSrc(tile?.images[0])
    const [getThisDialogOpen, setGetThisDialogOpen] = useState(false)
    const [wantToGetThisDialogOpen, setWantToGetThisDialogOpen] = useState(false)
    const [hasSubusers, setHasSubusers] = useState(false);

    useEffect(() => {
        const getSubusers = async () => {
            const subusers = await DataStore.query(Users, c => c.parentId("eq", user?.id).isUser('eq', true));
            if(subusers?.length > 0) {
                setHasSubusers(true);
            }
        }
        getSubusers()
    }, [user]);

    useEffect(() => {
        if(!tile || !user) return
        const getOwner = async () => {
            const tileOwner = await DataStore.query(Users, tile.ownerId)
            setItemOwner(tileOwner)
        }
        getOwner()

    }, [tile, user]);

    useEffect(() => {
        if(!tile || !user || !tile.custom) return
        const getCustomCreatedBy = async () => {
            const creator = await DataStore.query(Users, tile.createdById)
            setCustomAddedByName(creator)
        }
        getCustomCreatedBy()

    }, [tile, user]);

    async function handleToggleGetting(e) {
        e.preventDefault()
        if(hasSubusers) {
            setGetThisDialogOpen(true);
        } else {
            await toggleAmplifyArrayItem(WishlistItem, tile.id, 'gottenBy', user.id)
            updateWishlist(1);
        }
    }

    async function handleToggleWantToGoIn(e) {
        e.preventDefault()
        if(hasSubusers) {
            setWantToGetThisDialogOpen(true);
        } else {
            await toggleAmplifyArrayItem(WishlistItem, tile.id, 'wantsToGet', user.id)
            updateWishlist(1);
        }
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

    const customAddedUsername = () => {
        return customAddedByName?.username ?? 'A user someone besides the list owner'
    }

    return (
        <Card sx={{display: 'grid', gridTemplateRows: '1fr 56px', position: 'relative', minWidth: '275px', borderRadius: '10px'}}>
            {canSeeBadges && <TopBadges getting={tile.gottenBy} wantsToGet={tile.wantsToGet}/>}
            <CardActionArea onClick={handleClick}>
                {tile?.images?.length > 0 &&
                    <CardMedia
                        component="img"
                        height="140"
                        image={imageUrl}
                        alt={tile.name}
                        sx={{
                            width: 'auto',
                            margin: "10px auto 0",
                            maxWidth: '90%',
                        }}
                    />}
                <CardContent sx={{display: 'grid', gridTemplateRows: '1fr 24px'}}>
                    <h3>{tile.name}
                        {customAddedByName && <CustomAddedByEl>
                            {`Added by ${customAddedUsername()} (${itemOwner?.username || 'The list owner'} can't see this item).`}
                        </CustomAddedByEl>}
                    </h3>
                    <PriorityPriceEl>
                        <Priority/>
                        {tile.price && <Price/>}
                    </PriorityPriceEl>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {canSeeBadges && <Tooltip title={text.getTooltipText}>
                    <IconButton aria-label="Mark as gotten" onClick={handleToggleGetting}>
                        <AttachMoneyIcon color="darkGreen"/>
                    </IconButton>
                </Tooltip>}
                {canSeeBadges && <Tooltip title={text.wantToGetTooltipText}>
                    <IconButton aria-label="Say you or a subuser want to go in on this" onClick={handleToggleWantToGoIn}>
                        <GroupAddIcon color="secondary"/>
                    </IconButton>
                </Tooltip>}
                {canEdit && <Tooltip title="Edit">
                    <IconButton aria-label="Edit" onClick={handleEdit}>
                        <EditIcon color="primary"/>
                    </IconButton>
                </Tooltip>}
                {canDelete && <Tooltip title="Delete">
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
            <GetThisDialog
                item={tile}
                open={getThisDialogOpen}
                setOpen={setGetThisDialogOpen}
            />
            <WantToGetThisDialog
                item={tile}
                open={wantToGetThisDialogOpen}
                setOpen={setWantToGetThisDialogOpen}
            />
        </Card>
    );
}

