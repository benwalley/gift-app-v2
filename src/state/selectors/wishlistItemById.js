import {atom, selectorFamily} from "recoil";
import {DataStore} from "aws-amplify";
import {WishlistItem} from "../../models";

const wishlistItemByIdVersion = atom({
    key: 'wishlistItemByIdVersion',
    default: 0,
});

export const wishlistItemById = selectorFamily({
    key: 'wishlistItemById',
    get: (itemId) => async ({get}) => {
        if(!itemId) return;
        get(wishlistItemByIdVersion)
        const item = await DataStore.query(WishlistItem, itemId);
        return item
    },

    set: (wishlistId) => ({get, set}, newValue) => {
        set(wishlistItemByIdVersion, get(wishlistItemByIdVersion) + 1);
    },
});
