import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {currentUserWishlist} from "../../state/selectors/currentUserWishlist";
import useRecoilHook from "../../hooks/useRecoilHook";
import Tile from "./Tile/Tile";


const WishlistContainerEl = styled.div`
  background: var(--background-color);
  padding: 20px;
`

const WishlistTileContainerEl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`


export default function Wishlist() {
    const wishlist = useRecoilHook(currentUserWishlist)

    const renderWishlistItems = () => {
        if(!wishlist) return
        return wishlist.map(item => {
            return <Tile tile={item} key={item.id}></Tile>
        })
    }

    return (
        <WishlistContainerEl>
            <WishlistTileContainerEl>
                {renderWishlistItems()}
            </WishlistTileContainerEl>
        </WishlistContainerEl>
    );
}

