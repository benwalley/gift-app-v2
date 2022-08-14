import {atom, selector} from "recoil";
import {Auth, DataStore} from "aws-amplify";
import {Users} from "../../models";

async function createUser() {
    const userData = {
        "username": Auth.user.attributes.name,
        "authUsername": Auth.user.username,
        "email": Auth.user.attributes.email,
        "subuserModeOn": false
    }
    const newUser = await DataStore.save(
        new Users(userData)
    );
    return newUser
}

export const currentUserVersion = atom({
    key: 'currentUserVersion',
    default: 0,
});

export const currentUser = selector({
    key: 'currentUser',
    get: async ({get}) => {
        get(currentUserVersion)
        const username = Auth.user.username;
        let users = await DataStore.query(Users, c => c.authUsername("eq", username));
        if(users.length > 0) {
            const returnValue = users[0]
            return returnValue

        }
        const user = await createUser();
        return user;
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

