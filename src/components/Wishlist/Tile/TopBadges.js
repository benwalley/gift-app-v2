import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {Chip, Stack, Tooltip} from "@mui/material";
import GroupIcon from '@mui/icons-material/Group';
import {currentUser} from "../../../state/selectors/currentUser";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {DataStore} from "aws-amplify";
import {Users, WishlistItem} from "../../../models";

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
    const user = useRecoilHook(currentUser);
    const [usersGetting, setUsersGetting] = useState([])
    const [usersWantToGet, setUsersWantToGet] = useState([])

    useEffect(() => {
        async function updateUsersGetting() {
            const usersList = await Promise.all(getting.map(async (userId) => {
                const userData = await DataStore.query(Users, userId);
                return userData?.username || 'A user';
            }))
            setUsersGetting(usersList)
        }

        updateUsersGetting();
    }, [getting]);

    useEffect(() => {
        async function updateUsersGetting() {
            const usersList = await Promise.all(wantsToGet.map(async (userId) => {
                const userData = await DataStore.query(Users, userId);
                return userData?.username || 'A user';
            }))
            setUsersWantToGet(usersList)
        }

        updateUsersGetting();
    }, [wantsToGet]);

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

    const renderGettingAsString = (list) => {
        const listCopy = [...list];
        let returnString = '';
        for(let i = 0; i < listCopy.length; i++) {
            returnString += listCopy[i];
            if(i < (listCopy.length - 1)) {
                if(listCopy.length > 2) {
                    returnString += ','
                }

                returnString += ' '

                if(i === listCopy.length - 2) {
                    returnString += 'and '
                }
            } else {
                if(listCopy.length === 1) {
                    returnString += ' is getting this';
                } else if (listCopy.length > 1) {
                    returnString += ' are getting this';
                }
            }
        }

        return returnString;
    }

    const renderWantsToGetAsString = (list) => {
        const listCopy = [...list];
        let returnString = '';
        for(let i = 0; i < listCopy.length; i++) {
            returnString += listCopy[i];
            if(i < (listCopy.length - 1)) {
                if(listCopy.length > 2) {
                    returnString += ','
                }

                returnString += ' '

                if(i === listCopy.length - 2) {
                    returnString += 'and '
                }
            } else {
                if(listCopy.length === 1) {
                    returnString += ' wants to go in on this';
                } else if (listCopy.length > 1) {
                    returnString += ' want to go in on this';
                }
            }
        }

        return returnString;
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
                {/*TODO: set proper suffix*/}
                {showSomeoneElseWantsToGet() && <Tooltip title={renderWantsToGetAsString(usersWantToGet)}>
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
                {showSomeoneElseGetting() && <Tooltip title={renderGettingAsString(usersGetting)}>
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

