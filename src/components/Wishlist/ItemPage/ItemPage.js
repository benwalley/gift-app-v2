import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {useParams} from "react-router-dom";
import {wishlistItemById} from "../../../state/selectors/wishlistItemById";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {Chip, IconButton, Rating, Stack, Tooltip} from "@mui/material";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useImageSrc from "../../../hooks/useImageSrc";
import useBooleanRecoilHook from "../../../hooks/useBooleanRecoilHook";
import {canUserEdit} from "../../../state/selectors/canUserEdit";
import useCanUserSeeBadges from "../../../hooks/useCanUserSeeBadges";
import GetThisDialog from "../../GetThisDialog";
import WantToGetThisDialog from "../../WantToGetThisDialog";
import {text} from "../../../text";
import ImageList from "../../ImageList/ImageList";

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
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  padding: 0;
  gap: 10px;
  
  @media only screen and (min-width: 700px) {
     padding: 0 20px 20px;
     grid-template-columns: 50% 50%;
     grid-template-rows: auto 1fr;
     gap: 0;
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

const PriorityEl = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const ImageEl = styled.img`
    max-width: 100%;
    width: 100%;
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

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: 'var(--heart-icon-hover)',
    },
    '& .MuiRating-iconHover': {
        color: 'var(--heart-icon-hover)',
    },
});

const CustomAddedByEl = styled.div`
    color: var(--pink-color);
    font-size: 0.5em;
`

export default function ItemPage(props) {
    let {itemId} = useParams();
    const user = useRecoilHook(currentUser)
    const itemData = useRecoilHook(wishlistItemById(itemId))
    const price = useCurrency(itemData?.price)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const updateItem = useSetRecoilState(wishlistItemById(itemId))
    const [gottenBy, setGottenBy] = useState([]);
    const [wantsToGet, setWantsToGet] = useState([]);
    const canGet = useCanUserSeeBadges(user?.id, itemId)
    const [itemOwner, setItemOwner] = useState()
    const canEdit = useBooleanRecoilHook(canUserEdit({userId: user?.id, itemId}))
    const imageUrl = useImageSrc(itemData?.images?.[0])
    const [customAddedByName, setCustomAddedByName] = useState()
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
        if(!itemData || !user || !itemData.custom) return
        const getCustomCreatedBy = async () => {
            const creator = await DataStore.query(Users, itemData.createdById)
            setCustomAddedByName(creator)
        }
        getCustomCreatedBy()

    }, [itemData, user]);

    useEffect(() => {
        if(!itemData || !user) return
        const getOwner = async () => {
            const owner = await DataStore.query(Users, itemData.ownerId)
            setItemOwner(owner)
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


    function ImageElement() {
        if (!itemData || !itemData?.images || itemData.images.length === 0 || itemData.images[0] === '') return <ImagePlaceholderEl/>
        return <ImageList images={itemData.images}/>
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

    async function handleToggleGetting(e) {
        e.preventDefault()
        if(hasSubusers) {
            setGetThisDialogOpen(true);
        } else {
            await toggleAmplifyArrayItem(WishlistItem, itemData.id, 'gottenBy', user.id)
            updateItem(1);
        }
    }

    async function handleToggleWantToGoIn(e) {
        e.preventDefault()
        if(hasSubusers) {
            setGetThisDialogOpen(true);
        } else {
            await toggleAmplifyArrayItem(WishlistItem, itemData.id, 'wantsToGet', user.id)
            updateItem(1);
        }
    }

    const renderPriority = () => {
        return <StyledRating
            name="priority"
            readOnly
            label={"Priority"}
            getLabelText={(priority) => `${priority} Heart${priority !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            value={parseFloat(itemData?.priority)}
        />
    }

    const customAddedUsername = () => {
        return customAddedByName?.username ?? 'A user someone besides the list owner'
    }

    return (
        <ItemPageContainerEl>
            <ActionsBar/>
            <Tile>
                <ItemPageEl>
                    <H1El>
                        <span>
                            {itemData && itemData.name}
                            {customAddedByName && <CustomAddedByEl>
                                {`Added by ${customAddedUsername()} (${itemOwner?.username || 'The list owner'} can't see this item).`}
                            </CustomAddedByEl>}
                        </span>
                        {canEdit && <Tooltip title="Edit Item">
                            <IconButton aria-label="Edit" onClick={handleEdit}>
                                <EditIcon color="primary"/>
                            </IconButton>
                        </Tooltip>}
                    </H1El>
                    <ImageElement/>
                    <DetailsEl>
                        {itemData?.note && <div><b>Note: </b><div>{itemData.note}</div></div>}
                        {itemData?.priority && <PriorityEl><b>Priority: </b>{renderPriority()}</PriorityEl>}
                        {itemData?.link && renderLinkName() && <AEl href={itemData.link} target={'_blank'}>{renderLinkName()}</AEl>}
                        {itemData?.price && <div><b>Price: </b><span>~ {price}</span></div>}
                        {canGet && gottenBy.length > 0 && <div><b>Gotten By: </b><Stack direction="row" spacing={1}>{gottenBy}</Stack></div>}
                        {canGet && wantsToGet.length > 0 && <div><b>Want to go in with someone: </b><Stack direction="row" spacing={1}>{wantsToGet}</Stack></div>}
                        {canGet && <Stack direction={{xs: "column", md: 'row'}} spacing={2} sx={{marginTop: 'auto'}}>
                            <Tooltip title={text.getTooltipText}>
                                <Button
                                    variant={"contained"}
                                    color={"green"}
                                    startIcon={<AttachMoneyIcon />}
                                    onClick={handleToggleGetting}
                                >{text.getText}</Button>
                            </Tooltip>
                            <Tooltip title={text.wantToGetTooltipText}>
                                <Button
                                    variant={"contained"}
                                    color={"secondary"}
                                    startIcon={<GroupAddIcon />}
                                    onClick={handleToggleWantToGoIn}
                                >{text.wantToGet}</Button>
                            </Tooltip>
                        </Stack>}
                    </DetailsEl>
                </ItemPageEl>
            </Tile>
            <CustomModal open={editModalOpen} setOpen={setEditModalOpen} size="large">
                <AddItemForm initialData={itemData} afterSubmit={() => setEditModalOpen(false)}/>
            </CustomModal>
            <GetThisDialog
                item={itemData}
                open={getThisDialogOpen}
                setOpen={setGetThisDialogOpen}
            />
            <WantToGetThisDialog
                item={itemData}
                open={wantToGetThisDialogOpen}
                setOpen={setWantToGetThisDialogOpen}
            />
        </ItemPageContainerEl>
    );
}

