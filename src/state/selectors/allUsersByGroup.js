import {atom, selector, selectorFamily} from "recoil";
import {DataStore} from "aws-amplify";
import {Groups, Users} from "../../models";
import selectedGroupsState from "../atoms/selectedGroupsState";

const allUsersByGroupVersion = atom({
    key: 'allUsersByGroupVersion',
    default: 0,
});

export const allUsersByGroup = selector({
    key: 'allUsersByGroup',
    get: async ({get}) => {
        get(allUsersByGroupVersion)
        const groupIds = get(selectedGroupsState)
        const groupMembers = await Promise.all(groupIds.map(async groupId => {
            const groupData = await DataStore.query(Groups, groupId);
            return groupData.memberId;
        }))

        const filteredMembers = [...new Set(groupMembers.flat())]

        const users = await Promise.all(filteredMembers.map(async memberId => {
            return await DataStore.query(Users, memberId);
        }))

        return users.filter(Boolean).flat()
    },

    set: (wishlistId) => ({get, set}, newValue) => {
        set(allUsersByGroupVersion, get(allUsersByGroupVersion) + 1);
    },
});
