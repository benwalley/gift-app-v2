import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {Alert, Chip, IconButton, Snackbar, Stack, TextField, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {Auth, DataStore} from "aws-amplify";
import {Groups, Users} from "../../../models";
import {currentUser, updateCurrentUser} from "../../../state/selectors/currentUser";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {updateSubUsers} from "../../../state/selectors/subUsers";
import CloseIcon from '@mui/icons-material/Close';
import GroupPicker from "../../GroupPicker";
import {toggleValueInArray} from "../../../helpers/toggleValueInArray";
import toggleAmplifyArrayItem from "../../../helpers/toggleAmplifyArrayItem";

const ContainerEl = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    background: white;
    padding: var(--tile-padding);
    border-radius: 10px;
    box-shadow: var(--tile-box-shadow);
`

const FormEl = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
`

export default function AddSubuserForm(props) {
    const user = useRecoilHook(currentUser)
    const [name, setName] = useState('')
    const updateSubUser = useSetRecoilState(updateSubUsers)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [selectedGroups, setSelectedGroups] = useState([])
    const updateCurrentuser = useSetRecoilState(updateCurrentUser)

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
        try {
            const userData = {
                "username": name,
                "parentId": user.id
            }
            const subuser = await DataStore.save(
                new Users(userData)
            );
            // set groups
            for(const groupId of selectedGroups) {
                const original = await DataStore.query(Groups, groupId);
                const oldMembers = [...original.memberId];
                oldMembers.push(subuser.id)

                await DataStore.save(Groups.copyOf(original, updated => {
                    try {
                        updated.memberId = oldMembers;
                    } catch (e) {
                        console.log(e)
                    }
                }))
            }
            setName('')
            setSnackbarOpen(true)
            updateCurrentuser(0)
            updateSubUser(1)
        } catch(e) {
            console.log(e)
        }



    }

    return (
        <ContainerEl>
            <h2>Add Subuser</h2>
            <GroupPicker userId={user.id} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
            <FormEl onSubmit={handleSubmit}>
                <TextField value={name} onChange={(e) => setName(e.target.value)} id="name" label="username" variant="outlined"/>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </FormEl>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message="Subuser Added"
                action={closeAction}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Subuser Added
                </Alert>
            </Snackbar>
        </ContainerEl>
    );
}

