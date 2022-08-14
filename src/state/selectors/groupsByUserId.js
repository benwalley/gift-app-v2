import {atom, selectorFamily} from "recoil";
import {DataStore} from "aws-amplify";
import {Groups} from "../../models";

const groupsByUserIdVersion = atom({
    key: 'groupsByUserIdVersion',
    default: 0,
});

export const groupsByUserId = selectorFamily({
    key: 'groupsByUserId',
    get: (userId) => async ({get}) => {
        if(!userId) return;
        get(groupsByUserIdVersion)
        const groups = await DataStore.query(Groups, c => c.memberId("contains", userId));
        return groups
    },

    set: (wishlistId) => ({get, set}, newValue) => {
        set(groupsByUserIdVersion, get(groupsByUserIdVersion) + 1);
    },
});
