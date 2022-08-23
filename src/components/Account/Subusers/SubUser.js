import React, {useEffect, useState} from 'react';
import {Avatar, Chip, IconButton, ListItem, ListItemAvatar, Stack, Tooltip} from "@mui/material";
import stringToColor from "../../../helpers/stringToColor";
import {getFirstLetters} from "../../../helpers/nameFirstLetters";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import styled from '@emotion/styled'
import CustomModal from "../../CustomModal";
import {DataStore} from "aws-amplify";
import {Users} from "../../../models";
import {updateSubUsers} from "../../../state/selectors/subUsers";
import {useSetRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";
import useRecoilHook from "../../../hooks/useRecoilHook";
import {groupsByUserId} from "../../../state/selectors/groupsByUserId";
import EditSubuserForm from "./EditSubuserForm";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const SubuserNameEl = styled.div`
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export default function SubUser(props) {
    const {user} = props
    const [editModalOpen, setEditModalOpen] = useState(false)
    const update = useSetRecoilState(updateSubUsers)
    const navigate = useNavigate();
    const groups = useRecoilHook(groupsByUserId(user?.id))
    const updateGroups = useSetRecoilState(groupsByUserId(user?.id))

    useEffect(() => {
        updateGroups(0)
    }, [updateGroups]);

    async function handleDelete() {
        const todelete = await DataStore.query(Users, user?.id);
        DataStore.delete(todelete);
        update(0)
    }

    return (
        <ListItem >
            <ListItemAvatar sx={{
                display: { xs: 'none', sm: 'block' },
            }}>
                <Avatar
                    sx={{bgcolor: stringToColor(user?.username)}}
                    alt={user?.username}
                >
                    {getFirstLetters(user?.username)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                sx={{}}
                primary={<SubuserNameEl>{user?.username}</SubuserNameEl>}
                secondary={<Stack direction="row" spacing={1}>
                    {groups.map(group =>
                        <Chip key={group.id} color={"secondary"} size={"small"} key={group.id} label={group.groupName} />
                    )}
                </Stack>}
            />
            <Tooltip title={"View List"}>
                <IconButton aria-label="View List" size={"medium"} color={"primary"} onClick={() => navigate(`/wishlist/${user?.id}`)}>
                    <FormatListBulletedIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Edit Subuser"}>
                <IconButton edge="end" aria-label="edit" size={"medium"} color={"primary"} onClick={() => setEditModalOpen(true)}>
                    <EditIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Delete Subuser"}>
                <IconButton edge="end" aria-label="delete" size={"medium"} color={"deleteRed"} onClick={handleDelete}>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
            <CustomModal open={editModalOpen} setOpen={setEditModalOpen} size={"small"}>
                <EditSubuserForm initialName={user?.username} user={user} afterSubmit={() => setEditModalOpen(false)}/>
            </CustomModal>
        </ListItem>
    );
}

