import React, {useEffect, useState} from 'react';
import ListItem from "@mui/material/ListItem";
import {Avatar, IconButton} from "@mui/material";
import stringToColor from "../../../helpers/stringToColor";
import {getFirstLetters} from "../../../helpers/nameFirstLetters";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {currentUser} from "../../../state/selectors/currentUser";
import DeleteIcon from "@mui/icons-material/Delete";
import AreYouSureDialog from "../../AreYouSureDialog";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import toggleAmplifyArrayItem from "../../../helpers/toggleAmplifyArrayItem";
import {Groups} from "../../../models";
import {useSetRecoilState} from "recoil";
import {groupsByUserId} from "../../../state/selectors/groupsByUserId";

const listItemStyle = {
    display: "grid",
    gridTemplateColumns: '40px 1fr auto auto auto',
    background: 'white',
    borderRadius: '50px',
    marginBottom: '5px',
    paddingTop: '2px',
    paddingBottom: '2px'
}

export default function GroupMember(props) {
    const {user, group} = props;
    const myUser = useRecoilHook(currentUser)
    const [areYouSureOpen, setAreYouSureOpen] = useState(false);
    const navigate = useNavigate()
    const updateGroups = useSetRecoilState(groupsByUserId(myUser.id))

    async function handleDeleteFromGroup() {
        await toggleAmplifyArrayItem(Groups, group.id, 'memberId', user.id);
    }

    const isAdmin = () => {
        return group.additionalAdmins.includes(user.id)
    }

    const isCreator = () => {
        return group.createdBy === user.id
    }

    async function handleToggleAdmin() {
        await toggleAmplifyArrayItem(Groups, group.id, 'additionalAdmins', user.id);
        updateGroups(0)
    }

    function CreatorActions() {
        if (group.createdBy !== myUser.id) return;
        if (isCreator()) return
        return <>
            <IconButton
                edge="end"
                aria-label={isAdmin() ? "remove admin" : "add admin"}
                size={"medium"}
                color={isAdmin() ? "deleteRed" : "darkGreen"}
                onClick={handleToggleAdmin}
            >
                <AddModeratorIcon/>
            </IconButton>
            <IconButton
                edge="end"
                aria-label="delete"
                size={"medium"}
                color={"deleteRed"}
                onClick={() => setAreYouSureOpen(true)}
            >
                <DeleteIcon/>
            </IconButton>
        </>
    }

    return (
        <ListItem sx={listItemStyle}>
            <Avatar
                sx={{
                    bgcolor: stringToColor(user.username),
                    width: 24,
                    height: 24,
                    fontSize: 12,
                }}
                alt={user.username}
            >
                {getFirstLetters(user.username)}
            </Avatar>
            <div>
                {user.username}
                {user.id === myUser.id && <span> (You)</span>}
            </div>
            <Button onClick={() => navigate(`/wishlist/${user.id}`)}>View List</Button>
            <CreatorActions/>
            <AreYouSureDialog
                text={`Are you sure you want to remove this user from the group?`}
                open={areYouSureOpen}
                setOpen={setAreYouSureOpen}
                confirmHandler={handleDeleteFromGroup}
                confirmText={"Remove"}
            />
        </ListItem>
    );
}

