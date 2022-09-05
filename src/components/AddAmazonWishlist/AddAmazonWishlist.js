import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {currentUser, updateCurrentUser} from "../../state/selectors/currentUser";
import useRecoilHook from "../../hooks/useRecoilHook";
import AddWishlistForm from "./AddWishlistForm";
import Tile from "../Home/Tile";
import WishlistItemTile from "./WishlistItemTile";
import Button from "@mui/material/Button";
import {DataStore} from "aws-amplify";
import {WishlistItem} from "../../models";
import {useSetRecoilState} from "recoil";
import {wishlistByUserId} from "../../state/selectors/wishlistByUserId";
import GroupPicker from "../GroupPicker";
import SubuserChips from "../SubuserChips";
import SuccessSnackbar from "../Snackbars/SuccessSnackbar";
import HowToUse from "./HowToUse";
import {useNavigate} from "react-router-dom";


const ContainerEl = styled.div`
    background: var(--background-color);
    padding: 20px;
    display: grid;
    gap: 20px;
    grid-template-rows: auto auto auto auto auto 1fr;
    max-width: var(--max-content-width)
`


const DisclaimerEl = styled.h2`
    display: block;
    color: var(--delete-red);
    
    @media only screen and (min-width: 768px) {
        display: none;
    }
`

const WishlistTileContainerEl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px 0;
  
`

const ActionButtonsEl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px 0;
  
`

const FullWidthEl = styled.div`
  grid-column: 1/-1;
  
`

export default function AddAmazonWishlist(props) {
    const user = useRecoilHook(currentUser)
    const [source, setSource] = useState('')
    const [wishlist, setWishlist] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [loadingItems, setLoadingItems] = useState(false)
    const [addToId, setAddToId] = useState()
    const [selectedGroups, setSelectedGroups] = useState([])
    const [isCreating, setIsCreating] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const updateWishlist = useSetRecoilState(wishlistByUserId(addToId))
    const navigate = useNavigate()
    const updateUser = useSetRecoilState(updateCurrentUser)

    useEffect(() => {
        updateUser(0)
    }, [updateUser]);

    useEffect(() => {
        setAddToId(user?.id)
    }, [user?.id]);

    function stringToHtml (string) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(string, 'text/html');
        return doc.querySelectorAll("#g-items > li.g-item-sortable");
    };

    async function afterSubmit() {
        const wishlistItems = stringToHtml(source)
        const wishlistData = [];
        setLoadingItems(true)

        for(const item of wishlistItems) {
            const itemId = item.dataset.itemid;
            const image = item.querySelector(`#itemImage_${itemId} img`);
            const imageSrc = image.src;
            const imageAlt = image.alt;
            const anchor = image.parentElement
            const url = anchor.href;
            const nameEl = item.querySelector(`#itemName_${itemId}`);
            const name = nameEl.title;
            const price = item.dataset.price;

            wishlistData.push({
                id: itemId || '',
                imageSrc: imageSrc || '',
                imageAlt: imageAlt || '',
                url: url || '',
                name: name || '',
                price: !price || price === "-Infinity" ? '' : price,
            })
        }
        setLoadingItems(false)
        setWishlist(wishlistData)
    };

    function handleSelectAll() {
        setSelectedItems(wishlist)
    }

    function handleDeselectAll() {
        setSelectedItems([])
    }

    async function handleCreateItems(e) {
        setIsCreating(true)
        e.preventDefault()
        try {
            for(const item of selectedItems) {
                try {
                    if (!item.name && !item.imageAlt) break;
                    if (!addToId) break;

                    const itemData = {
                        "images": [item.imageSrc || ''],
                        "name": item.name || item.imageAlt || '',
                        "link": item.url || '',
                        "note": '',
                        "gottenBy": [],
                        "wantsToGet": [],
                        "price": item.price.toString(),
                        "ownerId": addToId,
                        "wishlistItemComments": [],
                        "priority": '',
                        'groups': selectedGroups
                    }
                    const response = await DataStore.save(
                        new WishlistItem(itemData)
                    );
                } catch(e) {
                    // handle error
                    console.log(e)
                }
            }
            setIsCreating(false)
            updateWishlist(0)
            setSnackbarOpen(true);
            navigate(`/wishlist/${addToId}`)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <ContainerEl>
            <h1>Import Amazon Wishlist</h1>
            <DisclaimerEl>You'll have to use a desktop computer to import an amazon wishlist</DisclaimerEl>
            <HowToUse/>
            <Tile>
                <AddWishlistForm source={source} setSource={setSource} afterSubmit={afterSubmit} loadingItems={loadingItems}/>
            </Tile>
            {wishlist && wishlist.length > 0 && <h2>Select the items you want to add to your wishlist</h2>}
            {wishlist && wishlist.length > 0 && <ActionButtonsEl>
                <FullWidthEl>
                    <h3>Select User to add items to.</h3>
                    <SubuserChips selectedId={addToId} setSelectedId={setAddToId}/>
                </FullWidthEl>
                <FullWidthEl>
                    <h3>Select groups to add items to</h3>
                    <GroupPicker userId={addToId} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
                </FullWidthEl>
                <Button
                    variant={"outlined"}
                    onClick={handleSelectAll}
                >
                    Select All
                </Button>
                <Button
                    variant={"outlined"}
                    onClick={handleDeselectAll}
                >
                    De-select All
                </Button>
                <Button
                    variant={"contained"}
                    color={"secondary"}
                    disabled={selectedItems.length === 0 ? true : false }
                    onClick={handleCreateItems}
                >
                    {isCreating ? 'Creating Items' : 'Create Wishlist Items'}
                </Button>


            </ActionButtonsEl>}
            <WishlistTileContainerEl>
                {wishlist.map(item => {
                    return <WishlistItemTile key={item.id} data={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
                })}
            </WishlistTileContainerEl>
            <SuccessSnackbar message={'Items created'} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} time={10000}/>
        </ContainerEl>
    );
}

