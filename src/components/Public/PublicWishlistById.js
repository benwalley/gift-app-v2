import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {DataStore} from "aws-amplify";
import {Users, WishlistItem} from "../../models";
import PublicWishlistTile from "./publicWishlistTile";
import styled from "@emotion/styled";
import PublicLoginSuggestion from "./publicLoginSuggestion";

const PublicWishlistContainerEl = styled.div`
    padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
`

const WishlistTileContainerEl = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--mobile-page-margin);
  padding: 0 0 30px;
  
  @media only screen and (min-width: 600px) {
    gap: var(--desktop-page-margin);
  }
  
  @media only screen and (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media only screen and (min-width: 1050px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media only screen and (min-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

export default function PublicWishlistById() {
    let {wishlistId} = useParams();
    const [wishlist, setWishlist] = useState([])
    const [user, setUser] = useState()

    useEffect( () => {
        const updateWishlist = async () => {
            const wishlist = await DataStore.query(WishlistItem, c => c.ownerId("eq", wishlistId));
            // make sure it's in a public group.
            setWishlist(wishlist.filter(wishlistItem => wishlistItem.isPublic && !wishlistItem.custom))
        }

        updateWishlist()

    }, [wishlistId]);

    useEffect( () => {
        const updateUser = async () => {
            const user = await DataStore.query(Users, wishlistId);
            // make sure it's in a public group.
            setUser(user)
        }

        updateUser()

    }, [wishlistId]);



    return (
        <>{wishlist.length > 0 && <PublicWishlistContainerEl>
            <h1>{user?.username}</h1>
            <PublicLoginSuggestion/>
            <WishlistTileContainerEl>
                {wishlist.map(item => {
                    return <PublicWishlistTile tile={item} key={item.id}/>
                })}
            </WishlistTileContainerEl>
        </PublicWishlistContainerEl>}
        </>
    );
}

