import {selector} from "recoil";
import {DataStore} from "aws-amplify";
import {Users} from "../../models";
import selectedPlanningUserId from "../atoms/selectedPlanningUserId";

export const selectedPlanningUser = selector({
    key: 'selectedPlanningUser',
    get: async ({get}) => {
        const planningUserId = get(selectedPlanningUserId)
        if(!planningUserId) return undefined;
        const planningUser = await DataStore.query(Users, planningUserId)
        return planningUser;
    }
});

