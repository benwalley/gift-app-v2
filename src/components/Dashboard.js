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
import AreYouSureDialog from "./AreYouSureDialog";
import {groupsByUserId} from "../state/selectors/groupsByUserId";
import {Auth, DataStore} from "aws-amplify";
import {Users} from "../models";

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
    const navigate = useNavigate()
    const groups = useRecoilHook(groupsByUserId(user?.id))
    const [areYouSureOpen, setAreYouSureOpen] = useState(false)

    useEffect(() => {
        const createUserIfNeeded = async () => {
            try {
                const currentUser = await DataStore.query(Users, c => c.authUsername("eq", Auth.user.username));
                if (currentUser.length === 0) {
                    const userData = {
                        "username": Auth.user.attributes.name,
                        "authUsername": Auth.user.username,
                        "email": Auth.user.attributes.email,
                        "subuserModeOn": false
                    }
                    const newUser = await DataStore.save(
                        new Users(userData)
                    );
                }
            } catch(e) {
                console.log(e)
            }

        }

        createUserIfNeeded()
    }, []);

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

