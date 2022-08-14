import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import List from "@mui/material/List";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {currentUser} from "../../../state/selectors/currentUser";
import InvitedGroupItem from "./InvitedGroupItem";
import {invitedByEmail} from "../../../state/selectors/invitedByEmail";
import {useSetRecoilState} from "recoil";

const ContainerEl = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    border-bottom: rgba(0, 0, 0, 0.12);
    grid-column: 1/-1;
    background: white;
    padding: var(--tile-padding);
    border-radius: 10px;
    box-shadow: var(--tile-box-shadow);
`

export default function YourGroupList(props) {
    const user = useRecoilHook(currentUser)
    const groups = useRecoilHook(invitedByEmail(user.email))
    const updateGroups = useSetRecoilState(invitedByEmail(user.email))

    useEffect(() => {
        updateGroups(0)
    }, [updateGroups]);

    return (
        <ContainerEl>
            <h2>Groups you're invited to</h2>
            <List>
                {groups && groups.map(group => {
                    return <InvitedGroupItem key={group.id} group={group}/>
                })}
            </List>
        </ContainerEl>
    );
}

