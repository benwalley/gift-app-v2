import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import NewGroupForm from "./NewGroupForm";
import YourGroupList from "./YourGroupList";
import InviteUserToGroupsForm from "./InviteUserToGroupsForm";
import GroupsYourInvitedTo from "./GroupsYourInvitedTo";
import {useSetRecoilState} from "recoil";
import {allUsersByGroup} from "../../../state/selectors/allUsersByGroup";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {currentUser} from "../../../state/selectors/currentUser";
import {userAdminGroupsById} from "../../../state/selectors/userAdminGroupsById";
import Tile from "../../Home/Tile";
import Box from "@mui/material/Box";

const PageContainerEl = styled.div`
    padding: var(--mobile-page-margin);
    padding-bottom: 100px;
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    gap: 20px;
    background: var(--background-color);
    max-width: var(--max-content-width);
  margin: 0 auto;
    
    @media only screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
    
    @media only screen and (min-width: 1000px) {
        padding: var(--desktop-page-margin);
    }
`

const H1El = styled.h1`
    grid-column: 1/-1
`

export default function GroupsPage(props) {
    const user = useRecoilHook(currentUser)
    const updateGroups = useSetRecoilState(allUsersByGroup)
    const adminGroups = useRecoilHook(userAdminGroupsById(user?.id))

    useEffect(() => {
        updateGroups(0);
    }, [updateGroups]);

    return (
        <PageContainerEl>
            <H1El>Groups</H1El>
            <Box sx={{gridColumn: '1/-1'}}>
                <Tile>
                    <p>Each wishlist item is assigned to a group(s), and only people in that group can see them.</p>
                    <p>A group can be a group of people, for instance a family, or it can be used to separate your items however you want, for instance
                    a private group that is just for you to see.</p>
                </Tile>
            </Box>
            <YourGroupList/>
            <NewGroupForm/>
            {adminGroups && adminGroups.length > 0 && <InviteUserToGroupsForm/>}
            <GroupsYourInvitedTo/>
        </PageContainerEl>
    );
}
