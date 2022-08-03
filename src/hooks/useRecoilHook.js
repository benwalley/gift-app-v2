import {useRecoilValueLoadable} from "recoil";
import {useEffect, useState} from 'react';

export default function useRecoilHook(recoilSelector) {
    const updateValue = useRecoilValueLoadable(recoilSelector)
    const [value, setValue] = useState([])

    useEffect(() => {
        if(updateValue.state === "hasValue") {
            setValue(updateValue.contents);
        }
    }, [updateValue]);
    return value
}
