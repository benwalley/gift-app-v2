import React, {useEffect, useState} from 'react';
import ListItem from "@mui/material/ListItem";
import {Avatar, IconButton} from "@mui/material";
import stringToColor from "../../../helpers/stringToColor";
import {getFirstLetters} from "../../../helpers/nameFirstLetters";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {currentUser} from "../../../state/selectors/currentUser";
import DeleteIcon from "@mui/icons-material/Delete";
import AreYouSureDialog from "../../AreYouSureDialog";
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
    paddingBottom: '2px',
}

export default function GroupInvited(props) {
    const {email, group} = props;
    const myUser = useRecoilHook(currentUser)
    const [areYouSureOpen, setAreYouSureOpen] = useState(false);
    const updateGroups = useSetRecoilState(groupsByUserId(myUser?.id))

    useEffect(() => {
        updateGroups(0)
    }, [updateGroups]);

    async function handleDeleteFromGroup() {
        await toggleAmplifyArrayItem(Groups, group.id, 'invitedEmail', email);
        updateGroups(0)
    }

    function CreatorActions() {
        if (group.createdBy !== myUser?.id) return;
        return <>
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
                    bgcolor: stringToColor(email),
                    width: 24,
                    height: 24,
                    fontSize: 12
                }}
                alt={email}
            >
                {getFirstLetters(email)}
            </Avatar>
            <div>
                {email}
            </div>
            <CreatorActions/>
            <AreYouSureDialog
                text={`Are you sure you want to un-invite this user?`}
                open={areYouSureOpen}
                setOpen={setAreYouSureOpen}
                confirmHandler={handleDeleteFromGroup}
                confirmText={"Un-invite"}
            />
        </ListItem>
    );
}

