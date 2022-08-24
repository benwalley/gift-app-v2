import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {wishlistByUserId} from "../../state/selectors/wishlistByUserId";
import useRecoilHook from "../../hooks/useRecoilHook";
import Tile from "./Tile/Tile";
import {useParams} from "react-router-dom";
import {userById} from "../../state/selectors/userByWishlistId";
import Filters from "./Filters";
import {useSetRecoilState} from "recoil";
import ActionsBar from "./ActionsBar";
import {Typography} from "@mui/material";


const WishlistContainerEl = styled.div`
  background: var(--background-color);
  padding: var(--mobile-page-margin);
  max-width: var(--max-content-width);
  margin: 0 auto;
  
  @media only screen and (min-width: 600px) {
    padding: var(--desktop-page-margin);
  }
`

const WishlistTileContainerEl = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--mobile-page-margin);
  
  @media only screen and (min-width: 600px) {
    gap: var(--desktop-page-margin);
  }
  
  @media only screen and (min-width: 630px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media only screen and (min-width: 910px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media only screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media only screen and (min-width: 1160px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

`

export default function WishlistById() {
    let {wishlistId} = useParams();
    const user = useRecoilHook(userById(wishlistId))
    const [filters, setFilters] = useState({})
    const wishlistById = useRecoilHook(wishlistByUserId({wishlistId: wishlistId || false, filters: filters}));
    const updateWishlist = useSetRecoilState(wishlistByUserId(user?.id || false))

    useEffect(() => {
        updateWishlist(0)
    }, [updateWishlist]);

    const renderWishlistItems = () => {
        const wishlist = wishlistById;
        if(!wishlist) return;
        return wishlist.map(item => {
            return <Tile tile={item} key={item.id}></Tile>
        })
    }

    return (
        <WishlistContainerEl>
            <ActionsBar/>
            <Filters filters={filters} setFilters={setFilters}/>
            <h1>{user?.username && user?.username}</h1>
            <WishlistTileContainerEl>
                {wishlistById && wishlistById.length === 0 && <Typography sx={{gridColumn: '1/-1'}}>There are no items in this wishlist for the selected group(s)</Typography>}
                {renderWishlistItems()}
            </WishlistTileContainerEl>
        </WishlistContainerEl>
    );
}

