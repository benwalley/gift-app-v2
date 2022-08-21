import {atom, selectorFamily} from "recoil";
import {DataStore} from "aws-amplify";
import {Groups} from "../../models";

const invitedByEmailVersion = atom({
    key: 'invitedByEmailVersion',
    default: 0,
});

export const invitedByEmail = selectorFamily({
    key: 'invitedByEmail',
    get: (email) => async ({get}) => {
        try {
            if(!email) return;
            get(invitedByEmailVersion)
            const groups = await DataStore.query(Groups, c => c.invitedEmail("contains", email));
            return groups
        } catch(e) {
            console.log(e)
        }

    },

    set: (wishlistId) => ({get, set}, newValue) => {
        set(invitedByEmailVersion, get(invitedByEmailVersion) + 1);
    },
});
