import {atom, selector} from "recoil";
import {currentUser} from "./currentUser";
import {DataStore} from "aws-amplify";
import {Groups, Planning, WishlistItem} from "../../models";

export const myPlanningDataVersion = atom({
    key: 'myPlanningDataVersion',
    default: 0,
});

export const myPlanningData = selector({
    key: 'myPlanningData',
    get: async ({get}) => {
        get(myPlanningDataVersion)
        const user = get(currentUser)
        const planningData = await DataStore.query(Planning, c => c.giftFromId("eq", user?.id))
        return planningData;
    },
});

export const updateMyPlanningData = selector({
    key: 'updateMyPlanningData',
    get: ({get}) => {
    },
    set: ({get, set}) => {
        const version = get(myPlanningDataVersion);
        set(myPlanningDataVersion, version + 1)
    }
});
