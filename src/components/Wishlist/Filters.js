import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import GroupPicker from "../GroupPicker";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import selectedGroupsState from "../../state/atoms/selectedGroupsState";
import {useRecoilState} from "recoil";

const FiltersEl = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`

const FiltersRowEl = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
`

const H4El = styled.h4`
  margin: 0;
`

//TODO: add toggle on subuser pages, where you can select whether to show who's getting things. (someday make it password protected)
export default function Filters(props) {
    const {filters, setFilters} = props
    const [selectedGroups, setSelectedGroups] = useRecoilState(selectedGroupsState)
    const user = useRecoilHook(currentUser)

    useEffect(() => {
        const filtersCopy = {...filters}
        filtersCopy.groups = selectedGroups;
        setFilters(filtersCopy)
    }, [selectedGroups]);

    return (
        <FiltersEl>
            <FiltersRowEl>
                <H4El>Groups</H4El>
                <GroupPicker userId={user.id} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups}/>
            </FiltersRowEl>
            <FiltersRowEl>
                <H4El>Other Filters</H4El>
                <div>

                </div>
                {/*<ul>*/}
                {/*    <li>Gotten/not gotten</li>*/}
                {/*    <li>Someone wants to go in on</li>*/}
                {/*    <li>price</li>*/}
                {/*    <li>tag name</li>*/}
                {/*</ul>*/}
            </FiltersRowEl>
        </FiltersEl>
    );
}

