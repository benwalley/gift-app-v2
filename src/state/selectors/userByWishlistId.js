import {atom, selectorFamily} from "recoil";
import {DataStore} from "aws-amplify";
import {Users} from "../../models";

const userByIdVersion = atom({
    key: 'userByIdVersion',
    default: 0,
});

export const userById = selectorFamily({
    key: 'userById',
    get: (id) => async ({get}) => {
        if(!id) return;
        get(userByIdVersion)
        const user = await DataStore.query(Users, id);
        return user
    },

    set: (wishlistId) => ({get, set}, newValue) => {
        set(userByIdVersion, get(userByIdVersion) + 1);
    },
});
