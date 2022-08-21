import * as React from 'react';
import {subUsers} from "../state/selectors/subUsers";
import useRecoilHook from "../hooks/useRecoilHook";
import {Chip, Stack} from "@mui/material";
import {currentUser} from "../state/selectors/currentUser";

export default function SubuserChips(props) {
    const {selectedId, setSelectedId} = props
    const subusers = useRecoilHook(subUsers)
    const userData = useRecoilHook(currentUser)

    async function handleClick(user) {
        setSelectedId(user?.id)
    }

    return (
        <Stack direction="row" spacing={1}>
            {subusers && subusers.map(user => {
                return <Chip key={user?.id} variant={selectedId === user?.id ? "filled" : "outlined"}  color={"secondary"} label={user?.username} onClick={() => handleClick(user)} />
            })}
            <Chip variant={selectedId === userData.id ? "filled" : "outlined"} color={"secondary"} label={`${userData.username} (You)`} onClick={() => handleClick(userData)} />
        </Stack>
    );
}
