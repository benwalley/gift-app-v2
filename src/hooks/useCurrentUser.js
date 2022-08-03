import {DataStore} from "aws-amplify";
import {Users} from "../models";
import {Auth} from 'aws-amplify';
import {useEffect, useState} from "react";


export default async function useCurrentUser() {
    const [user, setUser] = useState()
    const username = Auth.user.username

    useEffect(() => {
        async function getUser() {
            let users = await DataStore.query(Users, c => c.authUsername("eq", username));
            setUser(users[0])
        }

        getUser()
    }, [username]);

    return user
}
