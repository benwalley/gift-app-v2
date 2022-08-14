import React, {useEffect, useState} from 'react';
import {TextField, Button} from "@mui/material";
import {DataStore} from 'aws-amplify'
import {WishlistItem} from "../models";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {updateCurrentUserWishlist} from "../state/selectors/currentUserWishlist";
import {currentUser} from "../state/selectors/currentUser";
import useRecoilHook from "../hooks/useRecoilHook";
import SubuserChips from "./SubuserChips";
import {wishlistByUserId} from "../state/selectors/wishlistByUserId";
import GroupPicker from "./GroupPicker";

const styles = {
    width: '100%',
    marginTop: '30px'
}

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
    const [selectedGroups, setSelectedGroups] = useState([])
    const updateAddToWishlist = useSetRecoilState(wishlistByUserId(addToId))
    const user = useRecoilHook(currentUser)

    const isEdit = () => {
        if(initialData) return true;
        return false
    }

    useEffect(() => {
        // set initial add to did to the current user.
        setAddToId(user.id)
    }, [user]);

    async function handleSubmitEdit(e) {
        e.preventDefault()
        if (!name) return;
        if (!user || user.length === 0) return;

        const original = await DataStore.query(WishlistItem, initialData.id);
        await DataStore.save(WishlistItem.copyOf(original, updated => {
            try {
                updated.name = name;
                updated.price = price;
                updated.priority = priority;
                updated.link = link;
                updated.note = note;
                updated.images = [image]
            } catch (e) {
                console.log(e)
            }
        }))

        updateWishlist(0)
        updateAddToWishlist(0)
        afterSubmit()
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!name) return;
            if (!addToId) return;

            const itemData = {
                "images": [image],
                "name": name,
                "link": link,
                "note": note,
                "gottenBy": [],
                "wantsToGet": [],
                "price": price,
                "ownerId": addToId,
                "wishlistItemComments": [],
                "priority": priority,
                'groups': selectedGroups
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
        }
    }, [initialData]);

    return (
        <form onSubmit={initialData ? handleSubmitEdit : handleSubmit}>
            <h2>{isEdit() ? "Edit Wishlist Item" : "Add Item To Your Wishlist"}</h2>
            <h4>Users</h4>
            <SubuserChips selectedId={addToId} setSelectedId={setAddToId}/>
            <h4>Groups</h4>
            <GroupPicker userId={addToId} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
            <TextField value={name} onChange={(e) => setName(e.target.value)} sx={styles} id="name" label="Item Name"
                       variant="outlined"/>
            <TextField value={price} onChange={(e) => setPrice(e.target.value)} sx={styles} id="price"
                       label="Approximate Price" variant="outlined"/>
            <TextField value={priority} onChange={(e) => setPriority(e.target.value)} sx={styles} id="priority"
                       label="Priority (1-10)" variant="outlined"/>
            <TextField value={link} onChange={(e) => setLink(e.target.value)} sx={styles} id="link" label="Link"
                       variant="outlined"/>
            <TextField value={note} onChange={(e) => setNote(e.target.value)} sx={styles} id="note" label="Note"
                       multiline
                       variant="outlined"/>

            <TextField value={image} onChange={(e) => setImage(e.target.value)} sx={styles} id="image" label="Image"
                       variant="outlined"/>
            <Button type="submit" sx={{marginTop: '30px', marginLeft: 'auto', display: 'block'}} variant="contained"
                    size="large">Submit</Button>
        </form>
    );
}


