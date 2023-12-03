import {atom} from "recoil";

const selectedPlanningUserId = atom({
    key: 'selectedPlanningUserId',
    default: undefined,
});

export default selectedPlanningUserId
