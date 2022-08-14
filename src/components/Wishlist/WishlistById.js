import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import {updateCurrentUserWishlist} from "../../state/selectors/currentUserWishlist";
import {wishlistByUserId} from "../../state/selectors/wishlistByUserId";
import useRecoilHook from "../../hooks/useRecoilHook";
import Tile from "./Tile/Tile";
import {useParams} from "react-router-dom";
import {userById} from "../../state/selectors/userByWishlistId";
import Filters from "./Filters";


const WishlistContainerEl = styled.div`
  background: var(--background-color);
  padding: 20px;
`

const WishlistTileContainerEl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`

//TODO: add toggle on subuser pages, where you can select whether to show who's getting things. (someday make it password protected)
export default function WishlistById() {
    let {wishlistId} = useParams();
    const user = useRecoilHook(userById(wishlistId))
    const [filters, setFilters] = useState({})
    const wishlistById = useRecoilHook(wishlistByUserId({wishlistId: wishlistId || false, filters: filters}));


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

