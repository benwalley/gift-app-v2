import {selector} from "recoil";
import {Auth, DataStore} from "aws-amplify";
import {Users} from "../../models";


export const currentUser = selector({
    key: 'currentUser',
    get: async ({get}) => {
        const username = Auth.user.username;
        let users = await DataStore.query(Users, c => c.authUsername("eq", username));
        const returnValue = users[0]
        return returnValue
    }
});


