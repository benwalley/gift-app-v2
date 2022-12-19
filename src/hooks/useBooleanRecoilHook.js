import {useRecoilValueLoadable} from "recoil";
import {useEffect, useState} from 'react';

export default function useBooleanRecoilHook(recoilSelector) {
    const updateValue = useRecoilValueLoadable(recoilSelector)
    const [value, setValue] = useState(false)

    useEffect(() => {
        if(updateValue.state === "hasValue") {
            setValue(updateValue.contents);
        }
    }, [updateValue]);
    return value
}
