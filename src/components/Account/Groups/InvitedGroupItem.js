import React  from 'react';
import ListItem from "@mui/material/ListItem";
import {Avatar, IconButton, ListItemAvatar, Tooltip} from "@mui/material";
import stringToColor from "../../../helpers/stringToColor";
import {getFirstLetters} from "../../../helpers/nameFirstLetters";
import ListItemText from "@mui/material/ListItemText";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {currentUser} from "../../../state/selectors/currentUser";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {DataStore} from "aws-amplify";
import {Groups} from "../../../models";
import {useSetRecoilState} from "recoil";
import {groupsByUserId} from "../../../state/selectors/groupsByUserId";
import {invitedByEmail} from "../../../state/selectors/invitedByEmail";

const listItemStyle = {
    display: "grid",
    gridTemplateColumns: '50px 1fr 30px auto auto auto',
    borderTop: '1px solid var(--border-color-light)'
}

export default function InvitedGroupItem(props) {
    const {group} = props;
    const myUser = useRecoilHook(currentUser)
    const updateGroups = useSetRecoilState(groupsByUserId(myUser?.id))
    const updateInvites = useSetRecoilState(invitedByEmail(myUser?.email))

    async function handleJoin() {
        const original = await DataStore.query(Groups, group.id);
        const invitedCopy = [...original.invitedEmail];
        invitedCopy.splice(invitedCopy.indexOf(myUser.email), 1)
        const memberCopy = [...original.memberId]
        memberCopy.push(myUser.id);
        await DataStore.save(Groups.copyOf(original, updated => {
            updated.invitedEmail = invitedCopy;
            updated.memberId = memberCopy
        }))
        updateGroups(0);
        updateInvites(0)
    }


    return (
        <ListItem sx={listItemStyle}>
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
            <Tooltip title={"Join this group"}>
                <IconButton edge="end" aria-label="delete" size={"medium"} color={"darkGreen"} onClick={handleJoin}>
                    <PersonAddIcon/>
                </IconButton>
            </Tooltip>

        </ListItem>
    );
}

