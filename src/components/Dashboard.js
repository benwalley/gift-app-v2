import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import DashboardDrawer from "./DashboardDrawer";
import {Outlet, useNavigate} from "react-router-dom";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useSetRecoilState} from "recoil";
import addItemModalOpen from "../state/atoms/addItemModalOpen";
import {currentUser, updateCurrentUser} from "../state/selectors/currentUser";
import useRecoilHook from "../hooks/useRecoilHook";
import { Hub } from 'aws-amplify';
import AreYouSureDialog from "./AreYouSureDialog";
import {groupsByUserId} from "../state/selectors/groupsByUserId";


const DashboardEl = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
`

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};

export default function Dashboard() {
    const setAddModalOpen = useSetRecoilState(addItemModalOpen)
    const user = useRecoilHook(currentUser)
    const updateUser = useSetRecoilState(updateCurrentUser)
    const navigate = useNavigate()
    const groups = useRecoilHook(groupsByUserId(user.id))
    const [areYouSureOpen, setAreYouSureOpen] = useState(false)

    useEffect(() => {
        updateUser(0)
    }, [updateUser]);

    function handleAddButtonClick(e) {
        e.preventDefault();
        if( groups && groups.length > 0) {
            setAddModalOpen(true)
        } else {
            setAreYouSureOpen(true)
        }
    }

    return (
        <DashboardEl>
            <DashboardDrawer/>
            <Outlet/>
            <Fab color="primary" aria-label="add" onClick={handleAddButtonClick} sx={fabStyle}>
                <AddIcon />
            </Fab>
            <AreYouSureDialog
                text={`You must create or join a group in order to add items to your wishlist.`}
                open={areYouSureOpen}
                setOpen={setAreYouSureOpen}
                confirmHandler={() => navigate('/account/groups')}
                confirmText={"Go To Groups Page"}
            />
        </DashboardEl>

    );
}

