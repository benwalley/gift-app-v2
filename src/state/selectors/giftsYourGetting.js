import {atom, selector} from "recoil";
import {currentUser} from "./currentUser";
import {DataStore} from "aws-amplify";
import {Groups, WishlistItem} from "../../models";
import {selectedPlanningUser} from "./selectedPlanningUser";

export const giftsYourGettingVersion = atom({
    key: 'giftsYourGettingVersion',
    default: 0,
});

export const giftsYourGetting = selector({
    key: 'giftsYourGetting',
    get: async ({get}) => {
        get(giftsYourGettingVersion)
        const user = get(selectedPlanningUser)
        const groups = await DataStore.query(Groups, c => c.memberId("contains", user?.id));
        const gifts = await DataStore.query(WishlistItem, c => c.gottenBy("contains", user?.id));
        return (gifts.filter(gift => {
            for(const group of groups) {
                if(gift.groups.includes(group.id)) {
                    return true
                }
            }
            return false
        }))
    },
    set: ({get, set}) => {
        const version = get(giftsYourGettingVersion);
        set(giftsYourGettingVersion, version + 1)
    }
});

export const updateGiftsYourGetting = selector({
    key: 'updateGiftsYourGetting',
    get: ({get}) => {
    },
    set: ({get, set}) => {
        const version = get(giftsYourGettingVersion);
        set(giftsYourGettingVersion, version + 1)
    }
});
