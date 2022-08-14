import React, {} from 'react';
import styled from "@emotion/styled";
import NewGroupForm from "./NewGroupForm";
import YourGroupList from "./YourGroupList";
import InviteUserToGroupsForm from "./InviteUserToGroupsForm";
import GroupsYourInvitedTo from "./GroupsYourInvitedTo";
import Divider from "@mui/material/Divider";

const PageContainerEl = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto 1fr;
    gap: 20px;
    background: var(--background-color);
`

const H1El = styled.h1`
    grid-column: 1/-1
`


export default function GroupsPage(props) {


    return (
        <PageContainerEl>
            <H1El>Groups</H1El>
            <YourGroupList/>
            <NewGroupForm/>
            <InviteUserToGroupsForm/>
            <GroupsYourInvitedTo/>
        </PageContainerEl>
    );
}

