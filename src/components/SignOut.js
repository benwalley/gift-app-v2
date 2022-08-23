import React from 'react';
import Button from "@mui/material/Button";
import {Auth} from "aws-amplify";
import isLoggedIn from "../helpers/isLoggedIn";

export default function SignOut() {
    async function signOut(e) {
        e.preventDefault()
        try {
            await Auth.signOut();
            window.location.href = "/"
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const renderButton = () => {
        if(isLoggedIn()) {
            return <Button
                color="secondary"
                variant="contained"
                onClick={signOut}
                size={"small"}
                sx={{
                    padding: {md: '6px 16px'}
                }}
            >Sign Out</Button>
        }
    }

    return renderButton()
}

