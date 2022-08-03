import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import {Auth} from "aws-amplify";
import isLoggedIn from "../helpers/isLoggedIn";

// import { useNavigate } from "react-router-dom";



export default function SignOut() {
    // let navigate = useNavigate();

    async function signOut(e) {
        e.preventDefault()
        try {
            await Auth.signOut();
            // navigate('/')
            window.location.reload()
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const renderButton = () => {
        if(isLoggedIn()) {
            return <Button color="secondary" variant="contained" onClick={signOut}>Sign Out</Button>
        }
    }

    return renderButton()
}

