import React, {useEffect, useState} from 'react';
import {Autocomplete, ListItem, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {myUsers} from "../../state/selectors/MyUsers";
import useRecoilHook from "../../hooks/useRecoilHook";
import UserAvatar from "../UserAvatar";
import selectedPlanningUserId from "../../state/atoms/selectedPlanningUserId";
import {useRecoilState} from "recoil";
import {currentUser} from "../../state/selectors/currentUser";

export default function UserSelect(props) {
    const {} = props
    const myUsersList = useRecoilHook(myUsers)
    const [selectedUser, setSelectedUser] = useState()
    const [selectedId, setSelectedId] = useRecoilState(selectedPlanningUserId)
    const mainUser = useRecoilHook(currentUser)

    useEffect(() => {
        if(!myUsersList || myUsersList.length === 0 || !mainUser || mainUser.length === 0) return;
        if(myUsersList.length === 1) {
            setSelectedId(myUsersList[0].id);
            setSelectedUser(myUsersList[0])
        } else {
            setSelectedUser(mainUser)
            setSelectedId(mainUser.id);
        }
    }, [myUsersList]);

    function handleChange(e, newValue) {
        setSelectedUser(newValue)
        setSelectedId(newValue.id)
    }

    function getLabel(user){
        return user.username
    }

    function showSelect() {
        if(myUsersList?.length > 1) {
            return true;
        }
        return false
    }

    return (
        <>
            {showSelect && selectedUser && <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={myUsersList}
                sx={{ width: 300 }}
                onChange={handleChange}
                defaultValue={selectedUser}
                getOptionLabel={getLabel}
                renderInput={(params) => <TextField  {...params} label="Select a User" />}
                renderOption={(props, user) => (
                    <Box component="li" {...props}>
                        <UserAvatar user={user}
                                    name={user?.username}
                                    sx={{
                                        marginRight: '15px',
                                    }}
                        />
                        {user.username}
                    </Box>
                )}
            />}
        </>
    );
}

