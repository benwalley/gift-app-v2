import {atom, selector} from "recoil";
import {currentUser} from "./currentUser";
import {DataStore} from "aws-amplify";
import {WishlistItem} from "../../models";

export const giftsYourGettingVersion = atom({
    key: 'giftsYourGettingVersion',
    default: 0,
});

export const giftsYourGetting = selector({
    key: 'giftsYourGetting',
    get: async ({get}) => {
        get(giftsYourGettingVersion)
        const user = get(currentUser)
        const gifts = await DataStore.query(WishlistItem, c => c.gottenBy("contains", user?.id));
        return (gifts)
    },
});

export const updateGiftsYourGetting = selector({
    key: 'updateGiftsYourGetting',
    get: ({get}) => {
    },
    set: ({get, set}) => {
        const version = get(giftsYourGettingVersion);
        set(giftsYourGettingVersion, version + 1)
    }
});
