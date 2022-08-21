import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import NewGroupForm from "./NewGroupForm";
import YourGroupList from "./YourGroupList";
import InviteUserToGroupsForm from "./InviteUserToGroupsForm";
import GroupsYourInvitedTo from "./GroupsYourInvitedTo";
import {useSetRecoilState} from "recoil";
import {allUsersByGroup} from "../../../state/selectors/allUsersByGroup";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {groupsByUserId} from "../../../state/selectors/groupsByUserId";
import {currentUser} from "../../../state/selectors/currentUser";
import {userAdminGroupsById} from "../../../state/selectors/userAdminGroupsById";

const PageContainerEl = styled.div`
    padding: 20px;
    padding-bottom: 100px;
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
    const user = useRecoilHook(currentUser)
    const updateGroups = useSetRecoilState(allUsersByGroup)
    const adminGroups = useRecoilHook(userAdminGroupsById(user?.id))

    useEffect(() => {
        updateGroups(0);
    }, [updateGroups]);

    return (
        <PageContainerEl>
            <H1El>Groups</H1El>
            <YourGroupList/>
            <NewGroupForm/>
            {adminGroups && adminGroups.length > 0 && <InviteUserToGroupsForm/>}
            <GroupsYourInvitedTo/>
        </PageContainerEl>
    );
}

