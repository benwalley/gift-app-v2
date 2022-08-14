import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {Alert, Chip, IconButton, Snackbar, Stack, TextField, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {Auth, DataStore} from "aws-amplify";
import {Users} from "../../models";
import {currentUser} from "../../state/selectors/currentUser";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import useRecoilHook from "../../hooks/useRecoilHook";
import {updateSubUsers} from "../../state/selectors/subUsers";
import CloseIcon from '@mui/icons-material/Close';

const ContainerEl = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    border-bottom: rgba(0, 0, 0, 0.12);
`

const FormEl = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
`

export default function SuccessSnackbar(props) {
    const {message, snackbarOpen, setSnackbarOpen, time} = props

    const handleCloseSnackbar = () => setSnackbarOpen(false)

    const closeAction = (
        <>
            <IconButton
                size="medium"
                aria-label="close"
                color="inherit"
                bgcolor="primary"
                onClick={handleCloseSnackbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={time || 4000}
            onClose={handleCloseSnackbar}
            message={message}
            action={closeAction}
        >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

