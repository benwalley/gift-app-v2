import {atom, selectorFamily} from "recoil";
import {DataStore} from "aws-amplify";
import {WishlistItem} from "../../models";
import {currentUser} from "./currentUser";
import {groupsByUserId} from "./groupsByUserId";

const wishlistByUserIdVersion = atom({
    key: 'wishlistByUserIdVersion',
    default: 0,
});

export const wishlistByUserId = selectorFamily({
    key: 'wishlistByUserId',
    get: ({wishlistId, filters}) => async ({get}) => {
        if(wishlistId === false || !wishlistId) return;
        get(wishlistByUserIdVersion)
        const user = get(currentUser);
        if(!user) return [];
        const userGroups = get(groupsByUserId(user.id))
        const wishlist = await DataStore.query(WishlistItem, c => c.ownerId("eq", wishlistId));
        const filteredItems = wishlist.filter(wishlistItem => {
            // if any of the wishlist item groups are the same as any of the user groups
            return wishlistItem.groups.some(itemGroupId => {
                // return true if item id is in user groups
                return userGroups.some(group => group.id === itemGroupId);
            })
        })
        if(!filters) return filteredItems;
        return filteredItems.filter(wishlistItem => {
            if(filters.groups) {
                return wishlistItem.groups.some(item => filters.groups.includes(item))
            }
        })
    },

    set: (wishlistId) => ({get, set}, newValue) => {
        set(wishlistByUserIdVersion, get(wishlistByUserIdVersion) + 1);
    },
});
