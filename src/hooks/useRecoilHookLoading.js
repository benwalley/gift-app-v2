import {useRecoilValueLoadable} from "recoil";
import {useEffect, useState} from 'react';

export default function useRecoilHookLoading(recoilSelector, initialValue) {
    const updateValue = useRecoilValueLoadable(recoilSelector)
    const [value, setValue] = useState({data: initialValue || [], status: 'loading'})

    useEffect(() => {
        if(updateValue.state === 'loading') {
            setValue({data: value.data, status: 'loading'})
        }
        if(updateValue.state === "hasValue") {
            setValue({data: updateValue.contents, status: 'ready'})
        }
    }, [updateValue]);
    return value
}
