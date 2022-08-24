import * as React from 'react';
import useRecoilHook from "../hooks/useRecoilHook";
import UserListItem from "./UserListItem";
import styled from '@emotion/styled'
import List from "@mui/material/List";
import GroupPicker from "./GroupPicker";
import {useEffect} from "react";
import {currentUser, updateCurrentUser} from "../state/selectors/currentUser";
import {allUsersByGroup} from "../state/selectors/allUsersByGroup";
import {useRecoilState, useSetRecoilState} from "recoil";
import selectedGroupsState from "../state/atoms/selectedGroupsState";
import Tile from "./Home/Tile";

const ListContainerEl = styled.div`
  background: var(--background-color);
  padding: var(--mobile-page-margin);
  display: grid;
  gap: 20px;
  grid-template-rows: auto auto auto 1fr;
  max-width: var(--max-content-width);
  margin: 0 auto;
  
  @media only screen and (min-width: 600px) {
        padding: var(--desktop-page-margin);
    }
`

const H1El = styled.h1`
  margin: 20px 0 0;
`

const H4El = styled.h4`
  margin: 0 0 20px;
`

export default function ListList() {
    const user = useRecoilHook(currentUser)
    const [selectedGroups, setSelectedGroups] = useRecoilState(selectedGroupsState)
    const users = useRecoilHook(allUsersByGroup)
    const updateUser = useSetRecoilState(updateCurrentUser)
    const updateUsers = useSetRecoilState(allUsersByGroup)

    useEffect(() => {
        updateUser(0)
        updateUsers(0)
    }, [updateUser, updateUsers]);

    const renderUsers = () => {
        return users.map(user => {
            return <UserListItem key={user?.id} user={user}/>
        })
    }

    return (
        <ListContainerEl>
            <H1El>Lists</H1El>
            <div>
                <H4El>Groups</H4El>
                <GroupPicker userId={user?.id} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
            </div>
            <Tile>
                <List>
                    {renderUsers()}
                </List>
            </Tile>
        </ListContainerEl>
    );
}
