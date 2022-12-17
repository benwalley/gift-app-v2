import {atom} from "recoil";

const userListSort = atom({
    key: 'userListSort',
    default: 'a-z',
});

export default userListSort
