import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import DashboardDrawer from "./DashboardDrawer";
import {Outlet, useNavigate} from "react-router-dom";
import {Alert, Drawer, Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useRecoilState, useSetRecoilState} from "recoil";
import addItemModalOpen from "../state/atoms/addItemModalOpen";
import {currentUser, updateCurrentUser} from "../state/selectors/currentUser";
import useRecoilHook from "../hooks/useRecoilHook";
import AreYouSureDialog from "./AreYouSureDialog";
import {groupsByUserId} from "../state/selectors/groupsByUserId";
import {Auth, DataStore, Hub} from "aws-amplify";
import {Users} from "../models";
import leftNavOpen from "../state/atoms/leftNavOpen";
import CustomUpdateMessage from "./CustomUpdateMessage";

const DashboardEl = styled.div`
    margin-top: var(--header-height);
    padding-bottom: 80px;
    @media only screen and (min-width: 1000px) {
        padding-left:250px;
    }
`

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};

export default function Dashboard() {
    const setAddModalOpen = useSetRecoilState(addItemModalOpen)
    const user = useRecoilHook(currentUser)
    const navigate = useNavigate()
    const groups = useRecoilHook(groupsByUserId(user?.id))
    const [areYouSureOpen, setAreYouSureOpen] = useState(false)
    const [mobileOpen, setMobileOpen] = useRecoilState(leftNavOpen)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }


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
            <Drawer
                variant={"temporary"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                <DashboardDrawer/>
            </Drawer>
            <Drawer
                variant={"permanent"}
                sx={{
                    [`& .MuiDrawer-paper`]: { top: '60px'},
                    display: { xs: 'none', md: 'block' },
                }}
            >
                <DashboardDrawer/>
            </Drawer>
            <CustomUpdateMessage/>
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

