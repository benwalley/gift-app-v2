import React, {useEffect} from 'react';
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser, updateCurrentUser} from "../../state/selectors/currentUser";
import {Switch} from "@mui/material";
import {Users} from "../../models";
import {DataStore} from "aws-amplify";
import {useSetRecoilState} from "recoil";
import Divider from "@mui/material/Divider";

export default function SubuserToggle() {
    const user = useRecoilHook(currentUser)
    const updateUser = useSetRecoilState(updateCurrentUser)

    useEffect(() => {
        updateUser()
    }, [updateUser]);

    const handleChange = async () => {
        const original = await DataStore.query(Users, user.id);
        await DataStore.save(Users.copyOf(original, updated => {
            updated.subuserModeOn = !original.subuserModeOn;
        }))
        updateUser(0)
    }

    return (
        <>
            <h3>Subuser Mode</h3>
            <Divider/>
            <p>Turn on Subuser Mode to prevent subusers from seeing what other people are getting them.</p>
            <Switch
                checked={user.subuserModeOn || false}
                color={"secondary"}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <h4>{user.subuserModeOn ? "Subuser Mode on" : "Subuser Mode off"}</h4>
        </>
    );
}

