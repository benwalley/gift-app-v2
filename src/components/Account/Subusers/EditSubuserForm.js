import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {Alert, IconButton, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {DataStore} from "aws-amplify";
import {Users} from "../../../models";
import {currentUser} from "../../../state/selectors/currentUser";
import {useSetRecoilState} from "recoil";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {updateSubUsers} from "../../../state/selectors/subUsers";
import CloseIcon from '@mui/icons-material/Close';
import GroupPicker from "../../GroupPicker";
import {Groups} from "../../../models";
import {groupsByUserId} from "../../../state/selectors/groupsByUserId";
import ImageUpload from "../../ImageUpload/ImageUpload";

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

export default function EditSubuserForm(props) {
    const {initialName, user, afterSubmit} = props
    const [name, setName] = useState('')
    const updateSubUser = useSetRecoilState(updateSubUsers)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const parentUser = useRecoilHook(currentUser)
    const [selectedGroups, setSelectedGroups] = useState([])
    const [image, setImage] = useState('')
    const updateGroups = useSetRecoilState(groupsByUserId(user?.id))

    useEffect(() => {
        setName(initialName)
    }, [initialName]);

    useEffect(() => {
        if(user.image) {
            setImage(user.image)
        }
    }, [user]);

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
        const original = await DataStore.query(Users, user?.id);
        await DataStore.save(Users.copyOf(original, updated => {
            updated.username = name;
            updated.image = image;
        }))

        // set groups
        const parentGroups = await DataStore.query(Groups, c => c.memberId("contains", parentUser.id));
        for (const group of parentGroups) {
            if(selectedGroups.includes(group.id)) {
                // add to the group
                if(!group.memberId.includes(user?.id)) {
                    const oldMembers = [...group.memberId];
                    oldMembers.push(user?.id)
                    await DataStore.save(Groups.copyOf(group, updated => {
                        try {
                            updated.memberId = oldMembers;
                        } catch (e) {
                            console.log(e)
                        }
                    }))
                }
            } else {
                // remove from the group
                if(group.memberId.includes(user?.id)) {
                    const oldMembers = [...group.memberId];
                    oldMembers.splice(oldMembers.indexOf(user?.id), 1);
                    await DataStore.save(Groups.copyOf(group, updated => {
                        try {
                            updated.memberId = oldMembers;
                        } catch (e) {
                            console.log(e)
                        }
                    }))
                }
            }
        }

        afterSubmit()
        setSnackbarOpen(true)
        updateSubUser(1)
        updateGroups(0)
    }

    return (
        <ContainerEl>
            <h2>Edit Sub-list</h2>
            <FormEl onSubmit={handleSubmit}>
                <GroupPicker userId={parentUser.id} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
                <TextField value={name} onChange={(e) => setName(e.target.value)} id="name" label="username" variant="outlined"/>
                <ImageUpload image={image} setImage={setImage} maxSize={80}/>
                <Button type="submit" color="primary" variant="contained">Save</Button>
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

