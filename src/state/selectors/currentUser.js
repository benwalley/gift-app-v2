import {atom, selector} from "recoil";
import {Auth, DataStore, SortDirection} from "aws-amplify";
import {Users} from "../../models";

export const currentUserVersion = atom({
    key: 'currentUserVersion',
    default: 0,
});

export const currentUser = selector({
    key: 'currentUser',
    get: async ({get}) => {
        get(currentUserVersion)
        const username = Auth.user?.username;
        let users = await DataStore.query(Users, c => c.authUsername("eq", username), {sort: s => s.createdAt(SortDirection.ASCENDING)});
        if(users.length > 0) {
            const returnValue = users[0]
            return returnValue
        }
    }
});

export const updateCurrentUser = selector({
    key: 'updateCurrentUser',
    get: ({get}) => {
    },
    set: ({get, set}) => {
        const version = get(currentUserVersion);
        set(currentUserVersion, version + 1)
    }
});

