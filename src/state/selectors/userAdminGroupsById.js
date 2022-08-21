import {atom, selectorFamily} from "recoil";
import {DataStore} from "aws-amplify";
import {Groups} from "../../models";
import {groupsByUserIdVersion} from "./groupsByUserId";

export const userAdminGroupsById = selectorFamily({
    key: 'userAdminGroupsById',
    get: (userId) => async ({get}) => {
        if(!userId) return;
        get(groupsByUserIdVersion)
        const groups = await DataStore.query(Groups, c => c.memberId("contains", userId));
        return groups.filter(group => {
            return group.additionalAdmins.includes(userId) || group.createdBy === userId;
        })
    }
});
