import {atom} from "recoil";

const currencyCode = atom({
    key: 'currencyCode',
    default: 'USD',
});

export default currencyCode
