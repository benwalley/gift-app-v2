import * as React from 'react';
import useRecoilHook from "../hooks/useRecoilHook";

import {groupsByUserId} from "../state/selectors/groupsByUserId";
import {Chip, Stack} from "@mui/material";
import {toggleValueInArray} from "../helpers/toggleValueInArray";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";

export default function SingleGroupPicker(props) {
    const {userId, selectedGroups, setSelectedGroups, groupsOverride, hasContinueButton, afterContinueButton, continueButtonText} = props;
    const allGroups = useRecoilHook(groupsByUserId(userId))
    const [groups, setGroups] = useState([])

    useEffect(() => {
        if(groupsOverride) {
            setGroups(groupsOverride);
        } else {
            setGroups(allGroups)
        }
    }, [allGroups, groups, groupsOverride]);

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

    function handleContinueClick(e) {
        e.preventDefault();

        if(afterContinueButton) {
            afterContinueButton()
        }
    }

    return (
        <>
            <Stack direction="row" sx={{flexWrap: 'wrap', gap: '10px'}}>
                {groups && groups.map(group => {
                    return <Chip key={group.id} variant={isGroupSelected(group) ? "filled" : "outlined"}  color={"secondary"} label={group.groupName} onClick={() => handleClick(group)} />
                })}
            </Stack>
            {hasContinueButton && <Button onClick={handleContinueClick}>{continueButtonText || 'Continue'}</Button>}
        </>

    );
}
