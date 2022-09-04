import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {Alert, FormControlLabel, IconButton, Snackbar, Switch, TextField, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import {DataStore} from "aws-amplify";
import {Groups, Users} from "../../../models";
import {currentUser, updateCurrentUser} from "../../../state/selectors/currentUser";
import {useSetRecoilState} from "recoil";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {updateSubUsers} from "../../../state/selectors/subUsers";
import CloseIcon from '@mui/icons-material/Close';
import GroupPicker from "../../GroupPicker";
import AreYouSureDialog from "../../AreYouSureDialog";
import {groupsByUserId} from "../../../state/selectors/groupsByUserId";
import {useNavigate} from "react-router-dom";
import HelpIcon from '@mui/icons-material/Help';

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

const IsUserEl = styled.div`
    display: flex;
    align-items: center;
`

export default function AddSubuserForm(props) {
    const user = useRecoilHook(currentUser)
    const [name, setName] = useState('')
    const [isUser, setIsUser] = useState(false)
    const updateSubUser = useSetRecoilState(updateSubUsers)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [selectedGroups, setSelectedGroups] = useState([])
    const updateCurrentuser = useSetRecoilState(updateCurrentUser)
    const [areYouSureOpen, setAreYouSureOpen] = useState(false)
    const groups = useRecoilHook(groupsByUserId(user?.id))
    const updateGroups = useSetRecoilState(groupsByUserId(user?.id))
    const updateUser = useSetRecoilState(updateCurrentUser)
    const navigate = useNavigate()

    const handleCloseSnackbar = () => setSnackbarOpen(false)

    useEffect(() => {
        updateUser(0)
        updateGroups(0)
    }, [updateGroups, updateUser]);

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
        if( !groups ||  groups.length === 0) {
            setAreYouSureOpen(true)
            return;
        }
        try {
            const userData = {
                "username": name,
                "parentId": user?.id,
                'isUser': isUser,
            }
            const subuser = await DataStore.save(
                new Users(userData)
            );
            // set groups
            for(const groupId of selectedGroups) {
                const original = await DataStore.query(Groups, groupId);
                const oldMembers = [...original.memberId];
                oldMembers.push(subuser?.id)

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
            <h2>Add Sub-list</h2>
            <GroupPicker userId={user?.id} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
            <FormEl onSubmit={handleSubmit}>
                <TextField value={name} onChange={(e) => setName(e.target.value)} id="name" label="username" variant="outlined"/>
                <IsUserEl>
                    <FormControlLabel control={<Switch value={isUser} onChange={(e) => setIsUser(e.target.checked)} />} label="Is User" />
                    <Tooltip title={
                        <span>Turn on <em>Is User</em> if you're creating the list for another user.
                        This will allow you to see who is getting them gifts, and allow you to say you're getting gifts for them.</span>
                    }>
                        <HelpIcon color={'primary'}/>
                    </Tooltip>
                </IsUserEl>
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </FormEl>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                message="Sub-list Added"
                action={closeAction}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Sub-list Added
                </Alert>
            </Snackbar>
            <AreYouSureDialog
                text={`You must create or join a group in order to create a sub-list`}
                open={areYouSureOpen}
                setOpen={setAreYouSureOpen}
                confirmHandler={() => navigate('/account/groups')}
                confirmText={"Go To Groups Page"}
            />
        </ContainerEl>
    );
}

