import {atom} from "recoil";

const authUsername = atom({
    key: 'authUsername',
    default: undefined,
});

export default authUsername
