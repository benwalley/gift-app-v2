import * as React from 'react';
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser, updateCurrentUser} from "../../state/selectors/currentUser";
import styled from "@emotion/styled";
import {Avatar, IconButton, Stack, Tooltip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import EditUserForm from "../Account/EditUserForm";
import CustomModal from "../CustomModal";
import {useEffect, useState} from "react";
import {useSetRecoilState} from "recoil";
import Divider from "@mui/material/Divider";
import ImageUpload from "../ImageUpload/ImageUpload";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import UserAvatar from "../UserAvatar";
import {DataStore} from "aws-amplify";
import {Users} from "../../models";
import LoopIcon from '@mui/icons-material/Loop';
import SingleImageUpload from "../ImageUpload/SingleImageUpload";


const RowEl = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    margin: 10px 0;
    min-height: 40px;
`

const EmailEl = styled.span`
    overflow: auto;
    white-space: nowrap;
`

const ProfileEl = styled.div`
    margin: 10px 0;
`

export default function UserInfo(props) {
    const user = useRecoilHook(currentUser)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const updateUser = useSetRecoilState(updateCurrentUser)
    const[image, setImage] = useState('')
    const [loadingImage, setLoadingImage] = useState(false)

    useEffect(() => {
        updateUser(0)
    }, [updateUser]);

    useEffect(() => {
       if(user) setImage(user.image)
    }, [user]);

    const afterSubmitEdit = async () => {
        setEditModalOpen(false);
        updateUser(0)
    }

    async function handleSaveProfilePicture() {
        setLoadingImage(true)
        const original = await DataStore.query(Users, user?.id);
        await DataStore.save(Users.copyOf(original, updated => {
            updated.image = image;
        }))
        updateUser(0)
        setLoadingImage(false)
    }

    async function handleDeleteProfilePicture() {
        const original = await DataStore.query(Users, user?.id);
        await DataStore.save(Users.copyOf(original, updated => {
            updated.image = '';
        }))
        updateUser(0)
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h3>Your Info</h3>
                <span>{<UserAvatar name={user?.username} user={user}/>}</span>
            </Box>
            <Divider/>
            <RowEl>
                <b>Username:</b>
                <span>{user?.username}</span>
                <Tooltip title={"Edit username"}>
                    <IconButton edge="end" aria-label="delete" size={"medium"} color={"primary"} onClick={() => setEditModalOpen(true)}>
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
            </RowEl>

            <Divider/>

            <RowEl>
                <b>Email:</b>
                <EmailEl>{user?.email}</EmailEl>
            </RowEl>

            <Divider/>

            <ProfileEl>
                <b>Profile Picture</b>
                <SingleImageUpload image={image} setImage={setImage} maxSize={80}/>
                <Stack direction={'column'} spacing={3}>
                    <Button
                        type="button"
                        color="primary"
                        variant="contained"
                        onClick={handleSaveProfilePicture}
                        sx={{marginTop: '20px', width: '100%'}}
                        disabled={loadingImage}
                    >
                        {loadingImage ? 'Saving...' : 'Save Profile Picture'}
                    </Button>
                    <Button
                        type="button"
                        color="secondary"
                        variant="contained"
                        onClick={handleDeleteProfilePicture}
                        sx={{marginTop: '20px', width: '100%'}}
                    >
                        Delete Profile Picture
                    </Button>
                </Stack>
            </ProfileEl>

            <CustomModal open={editModalOpen} setOpen={setEditModalOpen} size={"small"}>
                <EditUserForm initialName={user?.username} user={user} afterSubmit={afterSubmitEdit}/>
            </CustomModal>
        </>

    );
}
