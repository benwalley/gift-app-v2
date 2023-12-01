import {atom, selector} from "recoil";
import {DataStore} from "aws-amplify";
import {Groups, Users} from "../../models";
import {currentUser} from "./currentUser";

const myUsersVersion = atom({
    key: 'myUsersVersion',
    default: 0,
});

export const myUsers = selector({
    key: 'myUsers',
    get: async ({get}) => {
        get(myUsersVersion)
        const myUser = get(currentUser);
        const subusers = await DataStore.query(Users, c => c.parentId("eq", myUser?.id).isUser('eq', true));
        return([myUser, ...subusers])
    },

    set: ({get, set}) => {
        set(myUsersVersion, get(myUsers) + 1);
    },
});
