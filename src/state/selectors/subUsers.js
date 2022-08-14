import {atom, selector} from "recoil";
import {currentUser} from "./currentUser";
import {DataStore} from "aws-amplify";
import {Users} from "../../models";

export const subUserVersion = atom({
    key: 'subUserVersion',
    default: 0,
});

export const subUsers = selector({
    key: 'subUsers',
    get: async ({get}) => {
        try {
            get(subUserVersion)
            const user = get(currentUser)
            const subUsers = await DataStore.query(Users, c => c.parentId("eq", user.id));
            return (subUsers)
        } catch(e) {

        }

    },
});

export const updateSubUsers = selector({
    key: 'updateSubUsers',
    get: ({get}) => {},
    set: ({get, set}) => {
        const version = get(subUserVersion);
        set(subUserVersion, version + 100)
    }
});
