import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import DashboardDrawer from "./DashboardDrawer";
import {Outlet, useNavigate} from "react-router-dom";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useRecoilRefresher_UNSTABLE, useSetRecoilState} from "recoil";
import addItemModalOpen from "../state/atoms/addItemModalOpen";
import {currentUser, updateCurrentUser} from "../state/selectors/currentUser";
import {onAuthUIStateChange} from "@aws-amplify/ui-components";
import useRecoilHook from "../hooks/useRecoilHook";


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

    useEffect(() => {
        updateUser(0)
    }, []);

    function handleAddButtonClick(e) {
        e.preventDefault();
        setAddModalOpen(true)
    }

    return (
        <DashboardEl>
            <DashboardDrawer/>
            <Outlet/>
            <Fab color="primary" aria-label="add" onClick={handleAddButtonClick} sx={fabStyle}>
                <AddIcon />
            </Fab>
        </DashboardEl>

    );
}

