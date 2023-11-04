import React, {useEffect, useState} from 'react';
import {TextField, Button, Rating} from "@mui/material";
import {DataStore} from 'aws-amplify'
import {useSetRecoilState} from "recoil";
import styled from '@emotion/styled'
import {updateCurrentUserWishlist} from "../../state/selectors/currentUserWishlist";
import {wishlistByUserId} from "../../state/selectors/wishlistByUserId";
import {currentUser} from "../../state/selectors/currentUser";
import useRecoilHook from "../../hooks/useRecoilHook";
import {Groups, Users, WishlistItem} from "../../models";
import GroupPicker from "../GroupPicker";
import ImageUpload from "../ImageUpload/ImageUpload";
import SingleImageUpload from "../ImageUpload/SingleImageUpload";


const styles = {
    width: '100%',
    marginTop: '30px'
}

const NoticeEl = styled.div`
    color: var(--pink-color);
`


//TODO: don't let the user see this.
export default function AddCustomItemModal(props) {
    const {afterSubmit, addToId} = props
    const [name, setName] = useState('')
    const [note, setNote] = useState('')
    const [price, setPrice] = useState('')
    const [link, setLink] = useState('')
    const [image, setImage] = useState('')
    const [selectedGroups, setSelectedGroups] = useState([])
    const updateAddToWishlist = useSetRecoilState(wishlistByUserId(addToId))
    const myUser = useRecoilHook(currentUser)
    const [sameGroups, setSameGroups] = useState([])
    const [userData, setUserData] = useState()

    useEffect(() => {
        const updateUserData = async () => {
            const user = await DataStore.query(Users, addToId);
            setUserData(user)
        }

        if(addToId) {
            updateUserData()
        }

    }, [addToId]);

    useEffect(() => {
        const updateGroups = async () => {
            const groups = await DataStore.query(Groups, c =>
                c.memberId("contains", addToId).memberId('contains', myUser.id));
            setSameGroups(groups)
        }

        if(addToId && myUser?.id) {
            updateGroups()
        }

    }, [myUser, addToId]);

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
                "custom": true,
                "ownerId": addToId,
                "wishlistItemComments": [],
                "priority": '',
                'groups': selectedGroups,
                'createdById': myUser.id
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
            <h2>{`Add Custom Item To ${userData?.username || ''} wishlist`}</h2>
            <NoticeEl>{`${userData?.username || 'the user'} will not be able to see this item`}</NoticeEl>
            <h4>Groups</h4>
            <GroupPicker userId={myUser.id} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups} groupsOverride={sameGroups}/>
            <TextField value={name} onChange={(e) => setName(e.target.value)} sx={styles} id="name" label="Item Name"
                       variant="outlined"/>
            <TextField value={price} onChange={(e) => setPrice(e.target.value)} sx={styles} id="name" label="Approximate Price"
                       variant="outlined"/>
            <TextField value={link} onChange={(e) => setLink(e.target.value)} sx={styles} id="name" label="Link"
                       variant="outlined"/>
            <TextField value={note} onChange={(e) => setNote(e.target.value)} sx={styles} id="note" label="Note"
                       multiline
                       variant="outlined"/>
            <SingleImageUpload image={image} setImage={setImage}/>
            <Button type="submit" sx={{marginTop: '30px', marginLeft: 'auto', display: 'block'}} variant="contained"
                    size="large">Add Item</Button>
        </form>
    );
}


