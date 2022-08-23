import * as React from 'react';
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser, updateCurrentUser} from "../../state/selectors/currentUser";
import styled from "@emotion/styled";
import {IconButton, Tooltip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import EditUserForm from "../Account/EditUserForm";
import CustomModal from "../CustomModal";
import {useEffect, useState} from "react";
import {useSetRecoilState} from "recoil";
import Divider from "@mui/material/Divider";


const RowEl = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    margin: 10px 0;
`

const EmailEl = styled.span`
    overflow: auto;
    white-space: nowrap;
`

export default function UserInfo(props) {
    const user = useRecoilHook(currentUser)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const updateUser = useSetRecoilState(updateCurrentUser)

    useEffect(() => {
        updateUser(0)
    }, [updateUser]);

    const afterSubmitEdit = async () => {
        setEditModalOpen(false);
        updateUser(0)
    }

    return (
        <>
            <h3>Your Info</h3>
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
            <CustomModal open={editModalOpen} setOpen={setEditModalOpen} size={"small"}>
                <EditUserForm initialName={user?.username} user={user} afterSubmit={afterSubmitEdit}/>
            </CustomModal>
        </>

    );
}
