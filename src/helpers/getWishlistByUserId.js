import {DataStore} from "aws-amplify";
import {WishlistItem} from "../models";

export default async function getWishlistByUserId(userId) {
    if(!userId) return;
    let myWishlist = await DataStore.query(WishlistItem, c => c.ownerId("eq", userId));
    return(myWishlist)
}
