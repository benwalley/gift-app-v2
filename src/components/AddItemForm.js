import React, {useEffect, useState} from 'react';
import {TextField, Button} from "@mui/material";
import {Amplify, API, DataStore, graphqlOperation} from 'aws-amplify'
import {WishlistItem} from "../models";
import getCurrentUser from "../helpers/getCurrentUser";
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {
    updateCurrentUserWishlist
} from "../state/selectors/currentUserWishlist";
import useCurrentUser from "../hooks/useCurrentUser";


const styles = {
    width: '100%',
    marginTop: '30px'
}


export default function AddItemForm(props) {
    const {afterSubmit, initialData} = props
    const updateWishlist = useSetRecoilState(updateCurrentUserWishlist)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [priority, setPriority] = useState('')
    const [link, setLink] = useState('')
    const [note, setNote] = useState('')
    const [image, setImage] = useState('')

    const user = useRecoilValue(useCurrentUser)

    async function handleSubmitEdit(e) {
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
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!name) return;
            if (!user || user.length === 0) return;

            const itemData = {
                "images": [image],
                "name": name,
                "link": link,
                "note": note,
                "gottenBy": [],
                "wantsToGet": [],
                "price": price,
                "ownerId": user.id,
                "wishlistItemComments": [],
                "priority": priority,
                'groupIds': [1]
            }
            const response = await DataStore.save(
                new WishlistItem(itemData)
            );
            updateWishlist(0)
        } catch(e) {
            // handle error
            console.log(e)
        }

        setName('')
        setPrice('')
        setPriority('')
        setLink('')
        setNote('')
        setImage('')
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
            setImage(initialData.iamge || '')
        }
    }, [initialData]);

    return (
        <form onSubmit={initialData ? handleSubmitEdit : handleSubmit}>
            <h2>Add Item To Your Wishlist</h2>
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
            <TextField value={image} onChange={(e) => setImage(e.target.value)} sx={styles} id="image" label="Image Url"
                       variant="outlined"/>
            <Button type="submit" sx={{marginTop: '30px', marginLeft: 'auto', display: 'block'}} variant="contained"
                    size="large">Submit</Button>
        </form>
    );
}


