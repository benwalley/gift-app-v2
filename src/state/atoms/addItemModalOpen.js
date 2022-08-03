import {atom} from "recoil";

const addItemModalOpenState = atom({
    key: 'AddItemModalOpenState',
    default: false,
});

export default addItemModalOpenState
