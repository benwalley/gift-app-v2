import {atom, selector} from "recoil";
import {currentUser} from "./currentUser";
import {DataStore} from "aws-amplify";
import {Groups, WishlistItem} from "../../models";

export const haventGottenVersion = atom({
    key: 'haventGottenVersion',
    default: 0,
});

export const haventGotten = selector({
    key: 'haventGotten',
    get: async ({get}) => {
        get(haventGottenVersion)
        const user = get(currentUser)
        const groups = await DataStore.query(Groups, c => c.memberId("contains", user?.id));
        const giftsYoureGetting = await DataStore.query(WishlistItem, c => c.gottenBy("contains", user?.id));
        const allUsers = groups.map(group => {
            return group.memberId
        }).flat()

        const givingToIds = giftsYoureGetting.map(gift => {
            return gift.ownerId;
        })

        const usersYoureNotGettingFor = allUsers.filter(userId => {
            return !givingToIds.includes(userId);
        })
        const filteredResults = [...new Set(usersYoureNotGettingFor)]
        return filteredResults
    },
});

export const updateHaventGotten = selector({
    key: 'updateHaventGotten',
    get: ({get}) => {
    },
    set: ({get, set}) => {
        const version = get(haventGottenVersion);
        set(haventGottenVersion, version + 1)
    }
});
