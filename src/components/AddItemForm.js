import React, {useEffect, useState} from 'react';
import {TextField, Button, Rating, Typography, Switch} from "@mui/material";
import {DataStore} from 'aws-amplify'
import {WishlistItem} from "../models";
import {useSetRecoilState} from "recoil";
import {updateCurrentUserWishlist} from "../state/selectors/currentUserWishlist";
import {currentUser} from "../state/selectors/currentUser";
import useRecoilHook from "../hooks/useRecoilHook";
import SubuserChips from "./SubuserChips";
import {wishlistByUserId} from "../state/selectors/wishlistByUserId";
import GroupPicker from "./GroupPicker";
import {wishlistItemById} from "../state/selectors/wishlistItemById";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from '@emotion/styled'
import ImageUpload from "./ImageUpload/ImageUpload";


const styles = {
    width: '100%',
    marginTop: '30px'
}

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: 'var(--heart-icon-filled)',
    },
    '& .MuiRating-iconHover': {
        color: 'var(--heart-icon-hover)',
    },
});

const H2El = styled.h2`
    margin-right: auto;
`

const TitleAndSwitchEl = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

//TODO: have the ability to add 'tags' to items to filter with. (like wedding, or baby)
export default function AddItemForm(props) {
    const {afterSubmit, initialData} = props
    const updateWishlist = useSetRecoilState(updateCurrentUserWishlist)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [priority, setPriority] = useState('')
    const [link, setLink] = useState('')
    const [note, setNote] = useState('')
    const [image, setImage] = useState('')
    const [addToId, setAddToId] = useState('')
    const [isPublic, setIsPublic] = useState(true)
    const [selectedGroups, setSelectedGroups] = useState([])
    const updateAddToWishlist = useSetRecoilState(wishlistByUserId(addToId))
    const user = useRecoilHook(currentUser)
    const updateItem = useSetRecoilState(wishlistItemById(initialData?.id))

    const isEdit = () => {
        if(initialData) return true;
        return false
    }

    useEffect(() => {
        // set initial add to did to the current user.
        setAddToId(user?.id)
    }, [user]);

    async function handleSubmitEdit(e) {
        e.preventDefault()
        if (!name) return;
        if (!user || user?.length === 0) return;

        const original = await DataStore.query(WishlistItem, initialData.id);
        await DataStore.save(WishlistItem.copyOf(original, updated => {
            try {
                updated.name = name;
                updated.price = price;
                updated.priority = priority;
                updated.link = fixLink(link);
                updated.note = note;
                updated.images = [image]
                updated.isPublic = isPublic
                updated.groups = selectedGroups
            } catch (e) {
                console.log(e)
            }
        }))

        updateWishlist(0)
        updateAddToWishlist(0)
        updateItem(0)
        afterSubmit()
    }

    function fixLink(link) {
        // if the link is good, return it as is
        if(link.slice(0, 8) === "https://" || link.slice(0, 7) === "http://") return link;
        // if the link has https:// anywhere in it, make that the beginning
        const index = link.indexOf("https://")
        if(index > 0) {
            const sliced = link.slice(index, -1);
            return sliced;
        }
        return `https://${link}`
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!name) return;
            if (!addToId) return;

            const itemData = {
                "images": [image],
                "name": name,
                "link": fixLink(link),
                "note": note,
                "gottenBy": [],
                "wantsToGet": [],
                "price": price,
                "ownerId": addToId,
                "wishlistItemComments": [],
                "priority": priority,
                'groups': selectedGroups,
                'isPublic': isPublic,
            }
            const response = await DataStore.save(
                new WishlistItem(itemData)
            );
            updateWishlist(0)
            updateAddToWishlist(0)
        } catch(e) {
            // handle error
            console.log(e)
        }

        afterSubmit()
    }

    useEffect(() => {
        if(initialData) {
            // set values to the editing
            setName(initialData.name)
            setPrice(initialData.price || '')
            setPriority(initialData.priority || '')
            setLink(initialData.link || '')
            setNote(initialData.note || '')
            setImage(initialData?.images[0] || '')
            setSelectedGroups(initialData?.groups)
            setIsPublic(initialData?.isPublic)
        }
    }, [initialData]);

    return (
        <form onSubmit={initialData ? handleSubmitEdit : handleSubmit}>
            <TitleAndSwitchEl>
                <H2El>{isEdit() ? "Edit Wishlist Item" : "Add Item To Your Wishlist"}</H2El>
                <Switch
                    checked={isPublic}
                    color={"secondary"}
                    onChange={() => setIsPublic(!isPublic)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <div>{isPublic ? "Publicly Visible" : "Not Publicly Visible"}</div>
            </TitleAndSwitchEl>
            {!isEdit() && <h4>Users</h4>}
            {!isEdit() && <SubuserChips selectedId={addToId} setSelectedId={setAddToId}/>}
            <h4>Groups</h4>
            <GroupPicker userId={addToId} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
            <TextField value={name} onChange={(e) => setName(e.target.value)} sx={styles} id="name" label="Item Name"
                       variant="outlined"/>
            <TextField value={price} onChange={(e) => setPrice(e.target.value)} sx={styles} id="price"
                       label="Approximate Price" variant="outlined"/>
            <Typography component="legend" sx={{marginTop: '30px'}}>Priority</Typography>
            <StyledRating
                name="priority"
                defaultValue={2.5}
                label={"Priority"}
                getLabelText={(priority) => `${priority} Heart${priority !== 1 ? 's' : ''}`}
                precision={0.5}
                size={"large"}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                value={parseFloat(priority)}
                onChange={(e) => setPriority(e.target.value)}
            />
            <TextField value={link} onChange={(e) => setLink(e.target.value)} sx={styles} id="link" label="Link"
                       variant="outlined"/>
            <TextField value={note} onChange={(e) => setNote(e.target.value)} sx={styles} id="note" label="Note"
                       multiline
                       variant="outlined"/>

            <ImageUpload image={image} setImage={setImage}/>
            <Button type="submit" sx={{marginTop: '30px', marginLeft: 'auto', display: 'block'}} variant="contained"
                    size="large">Add Item</Button>
        </form>
    );
}


