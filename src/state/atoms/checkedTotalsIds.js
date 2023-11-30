import {atom} from "recoil";

const checkedTotalsIds = atom({
    key: 'checkedTotalsIds',
    default: [],
});

export default checkedTotalsIds
