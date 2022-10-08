import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import PublicWishlistById from "./PublicWishlistById";
import PublicItemPage from "./PublicItemPage";


export default function PublicMain() {
    return (
        <Routes>
            <Route path='/'>
                <Route path="public/wishlist/:wishlistId" element={<PublicWishlistById/>}/>
                <Route path="public/wishlist/item/:itemId" element={<PublicItemPage/>}/>
            </Route>
        </Routes>
    );
}

