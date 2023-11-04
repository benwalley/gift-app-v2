import {atom} from "recoil";

const userListItemsCountUpdater = atom({
    key: 'userListItemsCountUpdater',
    default: 0,
});

export default userListItemsCountUpdater
