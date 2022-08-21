import {atom, selector} from "recoil";
import {currentUser} from "./currentUser";
import {DataStore} from "aws-amplify";
import {WishlistItem} from "../../models";

export const currentUserWishlistVersion = atom({
    key: 'currentUserWishlistVersion',
    default: 0,
});

export const currentUserWishlist = selector({
    key: 'currentUserWishlist',
    get: async ({get}) => {
        get(currentUserWishlistVersion)
        const user = get(currentUser)
        const wishlist = await DataStore.query(WishlistItem, c => c.ownerId("eq", user?.id));
        return (wishlist)
    },
});

export const updateCurrentUserWishlist = selector({
    key: 'updateCurrentUserWishlist',
    get: ({get}) => {
    },
    set: ({get, set}) => {
        const version = get(currentUserWishlistVersion);
        set(currentUserWishlistVersion, version + 1)
    }
});
