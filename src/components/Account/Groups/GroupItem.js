import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import ListItem from "@mui/material/ListItem";
import {Avatar, IconButton, ListItemAvatar, Tooltip} from "@mui/material";
import stringToColor from "../../../helpers/stringToColor";
import {getFirstLetters} from "../../../helpers/nameFirstLetters";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import GppGoodIcon from '@mui/icons-material/GppGood';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import {DataStore} from "aws-amplify";
import {Groups, Users} from "../../../models";
import AreYouSureDialog from "../../AreYouSureDialog";
import GroupMember from "./GroupMember";
import {useSetRecoilState} from "recoil";
import {groupsByUserId} from "../../../state/selectors/groupsByUserId";
import GroupInvited from "./GroupInvited";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {currentUser} from "../../../state/selectors/currentUser";
import Box from "@mui/material/Box";

const UsersEl = styled.div`
    grid-column: 1/-1;
    background: var(--amplify-colors-background-disabled);
    padding: 0 5px 5px;
    @media only screen and (min-width: 1000px) {
        padding: padding: 0 15px 15px;;
    }
    margin: 10px 0;
    border-radius: 10px;
`

const H4El = styled.h4`
    margin-top: 10px;
    margin-bottom: 10px;
`

const ActionsEl = styled.div`
    @media only screen and (max-width: 599px) {
        grid-column: 1/-1;
    }
    display: flex;
    align-items: center;
`

const listItemStyle = {
    display: "grid",
    gridTemplateColumns: {xs: '50px 1fr', sm: '50px 1fr auto'},
    borderTop: '1px solid var(--border-color-light)',
    padding: {xs: '10px 0', sm: '10px 15px'}
}

export default function GroupItem(props) {
    const {group} = props;
    const [usersExpanded, setUsersExpanded] = useState(false);
    const [membersData, setMembersData] = useState([])
    const [areYouSureOpen, setAreYouSureOpen] = useState(false)
    const updateGroups = useSetRecoilState(groupsByUserId(group.id))
    const myUser = useRecoilHook(currentUser)

    async function handleDeleteGroup() {
        if(isCreator()) {
            const todelete = await DataStore.query(Groups, group.id);
            DataStore.delete(todelete);
        } else {
            // just leave the group
            const original = await DataStore.query(Groups, group.id);
            const membersCopy = [...original.memberId];
            membersCopy.splice(membersCopy.indexOf(myUser.id), 1)
            await DataStore.save(Users.copyOf(original, updated => {
                updated.memberId = membersCopy;
            }))
        }
        updateGroups(0)
    }

    const isAdmin = () => {
        return group.additionalAdmins.includes(myUser?.id)
    }

    const isCreator = () => {
        return group.createdBy === myUser?.id
    }

    const handleToggleUsers = () => {
        setUsersExpanded(!usersExpanded)
    }

    useEffect(() => {
        async function getUsers() {
            // get list of members
            if (group.memberId) {
                const memberIds = group.memberId
                const members = await Promise.all(memberIds.map(async id => {
                        if (id) {
                            return await DataStore.query(Users, id);
                        }
                    })
                )
                const filteredMembers = members.filter(Boolean)
                setMembersData(filteredMembers)
            }
        }

        getUsers()
    }, [group.invitedEmail, group.memberId]);


    return (
        <Box sx={listItemStyle}>
            <ListItemAvatar>
                <Avatar
                    sx={{bgcolor: stringToColor(group.groupName)}}
                    alt={group.groupName}
                >
                    {getFirstLetters(group.groupName)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={group.groupName}
            />
            <ActionsEl>
                <div>
                    {isCreator() && <Tooltip title="You are the creator of this group">
                        <LocalPoliceIcon color={"secondary"}/>
                    </Tooltip>}
                </div>
                <div>
                    {isAdmin() && <Tooltip title="You are an admin of this group">
                        <GppGoodIcon color={"darkGreen"}/>
                    </Tooltip>}
                </div>
                <Button onClick={handleToggleUsers}>{usersExpanded ? "Hide Users" : "Show Users"}</Button>
                <IconButton edge="end" aria-label="delete" size={"medium"} color={"deleteRed"}
                            onClick={() => setAreYouSureOpen(true)}>
                    <DeleteIcon/>
                </IconButton>
            </ActionsEl>

            {usersExpanded && <UsersEl>
                <H4El>Members</H4El>
                {membersData.map(member => {
                    return <GroupMember key={member?.id} user={member} group={group}/>
                })}
                <H4El>Invited</H4El>
                {group && group.invitedEmail && group.invitedEmail.map(email => {
                    return <GroupInvited key={email} email={email} group={group}/>
                })}
            </UsersEl>}
            <AreYouSureDialog
                text={isCreator() ? `Are you sure you want to delete the group ${group.groupName}?` : `Are you sure you want to leave the group ${group.groupName}?`}
                open={areYouSureOpen}
                setOpen={setAreYouSureOpen}
                confirmHandler={handleDeleteGroup}
                confirmText={isCreator() ? "Delete" : "leave"}
            />
        </Box>
    );
}
