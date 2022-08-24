import React, {useEffect, useState} from 'react';
import useRecoilHook from "../../hooks/useRecoilHook";
import {TextField} from "@mui/material";
import {currentUser} from "../../state/selectors/currentUser";
import {DataStore} from "aws-amplify";
import {Users} from "../../models";
import styled from "@emotion/styled";


const StatusEl = styled.p`
    color: #188c3e;
    height: 15px;
`

export default function Notes() {
    const user = useRecoilHook(currentUser)
    const [value, setValue] = useState('')
    const [timeoutVar, setTimeoutVar] = useState()
    const [statusText, setStatusText] = useState('')


    useEffect(() => {
        if(user && user.notes) {
            setValue(user.notes)
        }
    }, [user]);

    function handleChange(e) {
        if(timeoutVar) clearTimeout(timeoutVar);
        setValue(e.target.value);
        setTimeoutVar(setTimeout(updateDatabase, 1000))
    }

    async function updateDatabase() {
        const original = await DataStore.query(Users, user.id);
        await DataStore.save(Users.copyOf(original, updated => {
            updated.notes = value;
        }))
        setStatusText('Saved')
        setTimeout(() => setStatusText(''), 3000)
    }

    return (
        <>
            <h3>Notes</h3>
            <p>Notes will be saved to your account and are visible only to you.</p>
            <TextField
                id="outlined-multiline-static"
                label="Personal Notes"
                multiline
                minRows={4}
                value={value}
                onChange={handleChange}
                sx={{width: '100%'}}
            />
            <StatusEl>{statusText}</StatusEl>
        </>
    );
}

