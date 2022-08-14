import {atom, selector} from "recoil";
import {currentUser} from "./currentUser";
import {DataStore} from "aws-amplify";
import {Users, WishlistItem} from "../../models";

export const allUsersVersion = atom({
    key: 'allUsersVersion',
    default: 0,
});

export const allUsers = selector({
    key: 'allUsers',
    get: async ({get}) => {
        get(allUsersVersion)
        const user = get(currentUser)
        const users = await DataStore.query(Users);
        return (users)
    },
});

export const updateAllUsers = selector({
    key: 'updateAllUsers',
    get: ({get}) => {
    },
    set: ({get, set}) => {
        const version = get(allUsersVersion);
        set(allUsersVersion, version + 1)
    }
});
