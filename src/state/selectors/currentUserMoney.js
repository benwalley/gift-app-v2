import {atom, selector} from "recoil";
import {currentUser} from "./currentUser";
import {DataStore} from "aws-amplify";
import {Money} from "../../models";

export const currentUserMoneyVersion = atom({
    key: 'currentUserMoneyVersion',
    default: 0,
});

export const currentUserMoney = selector({
    key: 'currentUserMoney',
    get: async ({get}) => {
        try {
            get(currentUserMoneyVersion)
            const user = get(currentUser)
            const money = await DataStore.query(Money, c => c.ownerId("eq", user?.id));
            return (money)
        } catch(e) {
            console.log(e)
        }

    },
});

export const updateCurrentUserMoney = selector({
    key: 'updateCurrentUserMoney',
    get: ({get}) => {
    },
    set: ({get, set}) => {
        const version = get(currentUserMoneyVersion);
        set(currentUserMoneyVersion, version + 1)
    }
});
