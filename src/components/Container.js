import React, {useEffect} from 'react';
import {useSetRecoilState} from "recoil";
import {updateCurrentUser} from "../state/selectors/currentUser";
import {Auth, DataStore, Hub} from "aws-amplify";
import {Users} from "../models";
import {allUsersByGroup} from "../state/selectors/allUsersByGroup";
import {groupsByUserIdVersion} from "../state/selectors/groupsByUserId";

export default function Dashboard({children}) {
    const updateUser = useSetRecoilState(updateCurrentUser)
    const updateGroups = useSetRecoilState(allUsersByGroup)
    const updateUsers = useSetRecoilState(allUsersByGroup)
    const updateGroupsByUserId = useSetRecoilState(groupsByUserIdVersion)

    useEffect(() => {
        const listenForAuth = async () => {
            Hub.listen('auth', async (data) => {
                if (data.payload.event === 'signIn') {
                    console.log('signed in')
                    await DataStore.clear();
                    await DataStore.start();
                }
            });

            // Create listener
            const listener = Hub.listen("datastore", async hubData => {
                const  { event, data } = hubData.payload;
                if (event === "ready") {
                    createUserIfNeeded()
                    // // Remove listener
                    listener();
                }
            })


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
                // update everything to initialize
                updateUser(0);
                updateGroups(0);
                updateUsers(0)
                updateGroupsByUserId(0)
            } catch(e) {
                console.log(e)
            }
        }

        listenForAuth()
    }, [updateGroups, updateGroupsByUserId, updateUser, updateUsers]);

    return (
        <>
            {children}
        </>
    );
}

