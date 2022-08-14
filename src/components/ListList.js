import * as React from 'react';
import {allUsers} from "../state/selectors/allUsers";
import useRecoilHook from "../hooks/useRecoilHook";
import UserListItem from "./UserListItem";
import styled from '@emotion/styled'
import List from "@mui/material/List";
import GroupPicker from "./GroupPicker";
import {useEffect, useState} from "react";
import {currentUser} from "../state/selectors/currentUser";
import {allUsersByGroup} from "../state/selectors/allUsersByGroup";
import {useRecoilState} from "recoil";
import selectedGroupsState from "../state/atoms/selectedGroupsState";

const ListContainerEl = styled.div`
  background: var(--background-color);
  padding: 20px;
`

export default function ListList(props) {
    const {} = props;
    const user = useRecoilHook(currentUser)
    const [selectedGroups, setSelectedGroups] = useRecoilState(selectedGroupsState)
    const users = useRecoilHook(allUsersByGroup)

    const renderUsers = () => {
        return users.map(user => {
            return <UserListItem key={user?.id} user={user}/>
        })
    }

    return (
        <ListContainerEl>
            <h1>Lists</h1>
            <div>
                <h4>Groups</h4>
                <GroupPicker userId={user.id} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
            </div>
            <List>
                {renderUsers()}
            </List>
        </ListContainerEl>
    );
}
