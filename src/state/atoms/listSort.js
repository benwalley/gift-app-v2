import {atom} from "recoil";

const listSort = atom({
    key: 'listSort',
    default: 'newest first',
});

export default listSort
