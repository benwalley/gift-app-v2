import React from 'react';
import styled from "@emotion/styled";
import List from "@mui/material/List";
import GroupItem from "./GroupItem";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {groupsByUserId} from "../../../state/selectors/groupsByUserId";
import {currentUser} from "../../../state/selectors/currentUser";

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
    const groups = useRecoilHook(groupsByUserId(user?.id))

    return (
        <ContainerEl>
            <h2>Your Groups</h2>
           <List>
               {groups && groups.map(group => {
                   return <GroupItem key={group.id} group={group}/>
               })}
           </List>
        </ContainerEl>
    );
}

