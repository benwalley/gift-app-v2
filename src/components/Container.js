import React, {useEffect} from 'react';
import {useSetRecoilState} from "recoil";
import {updateCurrentUser} from "../state/selectors/currentUser";
import {Auth, DataStore, Hub} from "aws-amplify";
import {Users} from "../models";

export default function Dashboard({children}) {
    const updateUser = useSetRecoilState(updateCurrentUser)

    useEffect(() => {
        const listenForAuth = async () => {
            Hub.listen('auth', async (data) => {
                if (data.payload.event === 'signIn') {
                    await DataStore.clear();
                    await DataStore.start();
                    createUserIfNeeded()
                }
            });
        }
        const createUserIfNeeded = async () => {
            try {
                const currentUser = await DataStore.query(Users, c => c.authUsername("eq", Auth.user.username));
                if (!currentUser || currentUser.length === 0) {
                    const userData = {
                        "username": Auth.user.attributes.name,
                        "authUsername": Auth.user.username,
                        "email": Auth.user.attributes.email,
                        "subuserModeOn": false
                    }
                    const newUser = await DataStore.save(
                        new Users(userData)
                    );
                }
                updateUser(0);
            } catch(e) {
                console.log(e)
            }
        }

        listenForAuth()
    }, [updateUser]);

    return (
        <>
            {children}
        </>
    );
}

