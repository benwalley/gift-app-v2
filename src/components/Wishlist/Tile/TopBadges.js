import React from 'react';
import styled from "@emotion/styled";
import {Chip, Stack, Tooltip} from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import {currentUser} from "../../../state/selectors/currentUser";
import useRecoilHook from "../../../hooks/useRecoilHook";

const BadgesEl = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 10px;
`

const chipStyles = {
    boxShadow: '2px 2px 5px 0px #6a6a6a',
}

export default function TopBadges(props) {
    const {getting, wantsToGet} = props;
    const user = useRecoilHook(currentUser)

    const showWantsToGet = () => {
        if(!user || !wantsToGet || wantsToGet.length === 0) return false;
        if (wantsToGet.includes(user?.id)) return true;
        return false;
    }

    const showGetting = () => {
        if(!user || !getting || getting.length === 0) return false;
        if (getting.includes(user?.id)) return true;
        return false;
    }

    const otherUsersWant = () => {
        return wantsToGet.some(id => {
            return id !== user.id
        })
    }

    const otherUsersGetting = () => {
        return getting.some(id => {
            return id !== user.id
        })
    }

    const showSomeoneElseWantsToGet = () => otherUsersWant()

    const showSomeoneElseGetting = () => otherUsersGetting()

    return (
        <BadgesEl>
            <Stack direction="row" spacing={1}>
                {showWantsToGet() && <Chip label="Want To Get" color="secondary" size="small" sx={chipStyles}/>}
                {showGetting() && <Chip label="Getting" color="primary" size="small" sx={chipStyles}/>}
            </Stack>
            <Stack direction="column" spacing={5}>
                {showSomeoneElseWantsToGet() && <Tooltip title="Someone else wants someone to go in on this.">
                    <GroupIcon size="medium" sx={{
                        borderRadius: '1em',
                        padding: '4px',
                        width: '35px',
                        height: '35px',
                        color: 'white',
                        background: 'var(--secondary-color)',
                        opacity: .8,
                        position: 'absolute',
                        right: '5px',
                        top: '5px'
                    }}/>
                </Tooltip>}
                {showSomeoneElseGetting() && <Tooltip title="Someone else is getting this.">
                    <GroupIcon size="medium" sx={{
                        borderRadius: '1em',
                        padding: '4px',
                        width: '35px',
                        height: '35px',
                        color: 'white',
                        background: 'var(--primary-color)',
                        opacity: .8,
                        position: 'absolute',
                        right: '5px',
                        top: '5px'
                    }}/>
                </Tooltip>}
            </Stack>
        </BadgesEl>
    );
}

