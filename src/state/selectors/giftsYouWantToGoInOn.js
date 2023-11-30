import {atom, selector} from "recoil";
import {currentUser} from "./currentUser";
import {DataStore} from "aws-amplify";
import {Groups, WishlistItem} from "../../models";
import {selectedPlanningUser} from "./selectedPlanningUser";

export const giftsYouWantToGoInOnVersion = atom({
    key: 'giftsYouWantToGoInOnVersion',
    default: 0,
});

export const giftsYouWantToGoInOn = selector({
    key: 'giftsYouWantToGoInOn',
    get: async ({get}) => {
        get(giftsYouWantToGoInOnVersion)
        const user = get(selectedPlanningUser)
        const groups = await DataStore.query(Groups, c => c.memberId("contains", user?.id));
        const gifts = await DataStore.query(WishlistItem, c => c.wantsToGet("contains", user?.id));
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
        const version = get(giftsYouWantToGoInOnVersion);
        set(giftsYouWantToGoInOnVersion, version + 1)
    }
});

export const updateGiftsYouWantToGoInOn = selector({
    key: 'updateGiftsYouWantToGoInOn',
    get: ({get}) => {
    },
    set: ({get, set}) => {
        const version = get(giftsYouWantToGoInOnVersion);
        set(giftsYouWantToGoInOnVersion, version + 1)
    }
});
