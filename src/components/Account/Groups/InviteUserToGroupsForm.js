import React, {useState} from 'react';
import styled from "@emotion/styled";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {DataStore} from "aws-amplify";
import {currentUser} from "../../../state/selectors/currentUser";
import useRecoilHook from "../../../hooks/useRecoilHook";
import SuccessSnackbar from "../../Snackbars/SuccessSnackbar";
import {Groups} from "../../../models";
import {useSetRecoilState} from "recoil";
import {groupsByUserId} from "../../../state/selectors/groupsByUserId";
import GroupPicker from "../../GroupPicker";
import ErrorSnackbar from "../../Snackbars/ErrorSnackbar";

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

export default function InviteUserToGroupsForm(props) {
    const user = useRecoilHook(currentUser)
    const [email, setEmail] = useState('')
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
    const updateGroup = useSetRecoilState(groupsByUserId(user.id))
    const [selectedGroups, setSelectedGroups] = useState([])


    async function handleSubmit(e) {
        e.preventDefault();
        if(!email) return;
        if(selectedGroups.length === 0) {
            setErrorSnackbarOpen(true)
            return;
        }
        await Promise.all(selectedGroups.map(async group => {
            const original = await DataStore.query(Groups, group);
            const invitedEmailCopy = [...original.invitedEmail]
            invitedEmailCopy.push(email)
            await DataStore.save(Groups.copyOf(original, updated => {
                updated.invitedEmail = [...new Set(invitedEmailCopy)];
            }))
        }))

        setEmail('')
        setSuccessSnackbarOpen(true)
        updateGroup(0)
    }

    return (
        <ContainerEl>
            <h2>Invite user to groups</h2>
            <GroupPicker userId={user.id} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
            <FormEl onSubmit={handleSubmit}>
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="email" label="Email Address" variant="outlined"/>
                <Button type="submit" color="primary" variant="contained">Invite</Button>
            </FormEl>
            <SuccessSnackbar message={"user Invited"} snackbarOpen={successSnackbarOpen} setSnackbarOpen={setSuccessSnackbarOpen}/>
            <ErrorSnackbar message={"You must select a group"} snackbarOpen={errorSnackbarOpen} setSnackbarOpen={setErrorSnackbarOpen}/>
        </ContainerEl>
    );
}

