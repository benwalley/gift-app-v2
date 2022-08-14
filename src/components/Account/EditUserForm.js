import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {Alert, IconButton, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {DataStore} from "aws-amplify";
import {Users} from "../../models";
import {useSetRecoilState} from "recoil";
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

export default function EditUserForm(props) {
    const {initialName, user, afterSubmit} = props
    const [name, setName] = useState('')
    const updateSubUser = useSetRecoilState(updateSubUsers)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    useEffect(() => {
        setName(initialName)
    }, [initialName]);

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

    async function handleSubmit(e) {
        e.preventDefault();
        if(!user) return;
        const original = await DataStore.query(Users, user.id);
        await DataStore.save(Users.copyOf(original, updated => {
            updated.username = name;
        }))
        afterSubmit()
        setSnackbarOpen(true)
        updateSubUser(1)
    }

    return (
        <ContainerEl>
            <h2>Edit Name</h2>
            <FormEl onSubmit={handleSubmit}>
                <TextField value={name} onChange={(e) => setName(e.target.value)} id="name" label="username" variant="outlined"/>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </FormEl>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message="Subuser Saved"
                action={closeAction}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Subuser Saved
                </Alert>
            </Snackbar>
        </ContainerEl>
    );
}

