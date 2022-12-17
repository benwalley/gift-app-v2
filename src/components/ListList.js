import * as React from 'react';
import useRecoilHook from "../hooks/useRecoilHook";
import UserListItem from "./UserListItem";
import styled from '@emotion/styled'
import List from "@mui/material/List";
import GroupPicker from "./GroupPicker";
import {useEffect, useState} from "react";
import {currentUser, updateCurrentUser} from "../state/selectors/currentUser";
import {allUsersByGroup} from "../state/selectors/allUsersByGroup";
import {useRecoilState, useSetRecoilState} from "recoil";
import selectedGroupsState from "../state/atoms/selectedGroupsState";
import Tile from "./Home/Tile";
import {Groups, Users} from "../models";
import {DataStore} from "aws-amplify";
import Sort from "./Actions/Sort";
import CustomAccordion from "./CustomAccordion";
import {sortAZ, sortZA} from "../helpers/sort";
import userListSort from "../state/atoms/userListSort";

const ListContainerEl = styled.div`
  background: var(--background-color);
  padding: var(--mobile-page-margin);
  display: grid;
  gap: 10px;
  grid-template-rows: auto auto auto auto 1fr;
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
    const [selectedSortBy, setSelectedSortBy] = useRecoilState(userListSort)
    const [sortedUsers, setSortedUsers] = useState([])
    const [searchText, setSearchText] = useState('')
    const [numberResults, setNumberResults] = useState(-1)
    const users = useRecoilHook(allUsersByGroup)
    const updateUsers = useSetRecoilState(allUsersByGroup)

    useEffect(() => {
        updateUsers(0)
    }, [updateUsers]);

    useEffect(() => {
        if(!selectedSortBy) setSortedUsers([])
        const usersCopy = [...users]
        // filter
        const filteredUsers = usersCopy.filter(item => {
            const name = item.username || ''
            return name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        })
        setNumberResults(filteredUsers.length);
        // sort
        if(selectedSortBy === 'a-z') {
            filteredUsers.sort(sortAZ)
            setSortedUsers(filteredUsers)
        }
        if(selectedSortBy === 'z-a') {
            filteredUsers.sort(sortZA)
            setSortedUsers(filteredUsers)
        }

    }, [searchText, selectedSortBy, users])


    const renderUsers = () => {
        return sortedUsers.map(user => {
            return <UserListItem key={user?.id} user={user}/>
        })
    }

    return (
        <ListContainerEl>
            <H1El>Lists</H1El>
            <Sort sortBy={selectedSortBy}
                  setSortBy={setSelectedSortBy}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  numberResults={numberResults}
            />
            <CustomAccordion title={"Groups"}>
                <GroupPicker userId={user?.id} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
            </CustomAccordion>
            <Tile>
                <List>
                    {renderUsers()}
                </List>
            </Tile>
        </ListContainerEl>
    );
}
