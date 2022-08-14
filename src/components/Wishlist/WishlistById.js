import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {wishlistByUserId} from "../../state/selectors/wishlistByUserId";
import useRecoilHook from "../../hooks/useRecoilHook";
import Tile from "./Tile/Tile";
import {useParams} from "react-router-dom";
import {userById} from "../../state/selectors/userByWishlistId";
import Filters from "./Filters";
import {useSetRecoilState} from "recoil";


const WishlistContainerEl = styled.div`
  background: var(--background-color);
  padding: 20px;
`

const WishlistTileContainerEl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`

export default function WishlistById() {
    let {wishlistId} = useParams();
    const user = useRecoilHook(userById(wishlistId))
    const [filters, setFilters] = useState({})
    const wishlistById = useRecoilHook(wishlistByUserId({wishlistId: wishlistId || false, filters: filters}));
    const updateWishlist = useSetRecoilState(wishlistByUserId(user.id))

    useEffect(() => {
        updateWishlist(0)
    }, [updateWishlist]);

    const renderWishlistItems = () => {
        const wishlist = wishlistById;
        if(!wishlist) return
        return wishlist.map(item => {
            return <Tile tile={item} key={item.id}></Tile>
        })
    }

    return (
        <WishlistContainerEl>
            <Filters filters={filters} setFilters={setFilters}/>
            <h1>{user?.username && user.username}</h1>
            <WishlistTileContainerEl>
                {renderWishlistItems()}
            </WishlistTileContainerEl>
        </WishlistContainerEl>
    );
}

