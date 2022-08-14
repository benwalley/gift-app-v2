import {atom} from "recoil";

const selectedGroupsState = atom({
    key: 'selectedGroupsState',
    default: [],
});

export default selectedGroupsState
