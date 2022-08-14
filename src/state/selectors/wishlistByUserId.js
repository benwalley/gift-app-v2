import {atom, selectorFamily} from "recoil";
import {DataStore} from "aws-amplify";
import {WishlistItem} from "../../models";

const wishlistByUserIdVersion = atom({
    key: 'wishlistByUserIdVersion',
    default: 0,
});

export const wishlistByUserId = selectorFamily({
    key: 'wishlistByUserId',
    get: ({wishlistId, filters}) => async ({get}) => {
        if(wishlistId === false || !wishlistId) return;
        get(wishlistByUserIdVersion)
        const wishlist = await DataStore.query(WishlistItem, c => c.ownerId("eq", wishlistId));
        if(!filters) return wishlist;
        return wishlist.filter(wishlistItem => {
            if(filters.groups) {
                return wishlistItem.groups.some(item => filters.groups.includes(item))
            }
        })
    },

    set: (wishlistId) => ({get, set}, newValue) => {
        set(wishlistByUserIdVersion, get(wishlistByUserIdVersion) + 1);
    },
});
