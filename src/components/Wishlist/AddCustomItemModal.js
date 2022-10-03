import React, {useEffect, useState} from 'react';
import {TextField, Button, Rating} from "@mui/material";
import {DataStore} from 'aws-amplify'
import {useSetRecoilState} from "recoil";
import styled from '@emotion/styled'
import {updateCurrentUserWishlist} from "../../state/selectors/currentUserWishlist";
import {wishlistByUserId} from "../../state/selectors/wishlistByUserId";
import {currentUser} from "../../state/selectors/currentUser";
import useRecoilHook from "../../hooks/useRecoilHook";
import {WishlistItem} from "../../models";
import GroupPicker from "../GroupPicker";


const styles = {
    width: '100%',
    marginTop: '30px'
}


//TODO: don't let the user see this.
export default function AddCustomItemModal(props) {
    const {afterSubmit, addToId} = props
    const [name, setName] = useState('')
    const [note, setNote] = useState('')
    const [selectedGroups, setSelectedGroups] = useState([])
    const updateAddToWishlist = useSetRecoilState(wishlistByUserId(addToId))

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!name) return;
            if (!addToId) return;

            const itemData = {
                "images": [],
                "name": name,
                "link": '',
                "note": note,
                "gottenBy": [],
                "wantsToGet": [],
                "price": '',
                "custom": true,
                "ownerId": addToId,
                "wishlistItemComments": [],
                "priority": '',
                'groups': selectedGroups
            }
            const response = await DataStore.save(
                new WishlistItem(itemData)
            );
            updateAddToWishlist(0)
        } catch(e) {
            // handle error
            console.log(e)
        }

        afterSubmit()
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{"Add Custom Item To Wishlist"}</h2>
            <h4>Groups</h4>
            <GroupPicker userId={addToId} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
            <TextField value={name} onChange={(e) => setName(e.target.value)} sx={styles} id="name" label="Item Name"
                       variant="outlined"/>
            <TextField value={note} onChange={(e) => setNote(e.target.value)} sx={styles} id="note" label="Note"
                       multiline
                       variant="outlined"/>
            <Button type="submit" sx={{marginTop: '30px', marginLeft: 'auto', display: 'block'}} variant="contained"
                    size="large">Add Item</Button>
        </form>
    );
}


