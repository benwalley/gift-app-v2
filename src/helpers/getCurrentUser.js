import {DataStore} from "aws-amplify";
import {Users} from "../models";
import {Auth} from 'aws-amplify';


export default async function getCurrentUser() {
    const username = Auth.user.username
    return users[0]
}

