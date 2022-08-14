import * as React from 'react';
import useRecoilHook from "../hooks/useRecoilHook";

import {groupsByUserId} from "../state/selectors/groupsByUserId";
import {Chip, Stack} from "@mui/material";
import {toggleValueInArray} from "../helpers/toggleValueInArray";
import {useEffect} from "react";


export default function GroupPicker(props) {
    const {userId, selectedGroups, setSelectedGroups} = props;

    const groups = useRecoilHook(groupsByUserId(userId))

    useEffect(() => {

    }, [userId, groups, selectedGroups, setSelectedGroups]);

    useEffect(() => {
        if(!groups || groups.length === 0) return;
        // make sure no groups are selected if they aren't usable groups anymore.
        const selectedCopy = [...selectedGroups];
        const filteredSelected = selectedCopy.filter(selectedId => {
            return groups.some(group => {
                return group.id === selectedId
            })
        })
        setSelectedGroups(filteredSelected);
        if(!groups || selectedGroups.length > 0 ) return
        setSelectedGroups(groups.map(group => group.id))
    }, [groups, selectedGroups.length, setSelectedGroups]);

    const isGroupSelected = (group) => {
        return selectedGroups.includes(group.id)
    }

    function handleClick(group) {
        setSelectedGroups(toggleValueInArray(selectedGroups, group.id))
    }


    return (
        <Stack direction="row" spacing={1}>
            {groups && groups.map(group => {
                return <Chip key={group.id} variant={isGroupSelected(group) ? "filled" : "outlined"}  color={"secondary"} label={group.groupName} onClick={() => handleClick(group)} />
            })}
        </Stack>
    );
}
