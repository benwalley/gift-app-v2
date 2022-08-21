import React, {useEffect} from 'react';
import useRecoilHook from "../../hooks/useRecoilHook";
import List from "@mui/material/List";
import {Avatar, ListItem, ListItemAvatar} from "@mui/material";
import {Link} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {groupsByUserId} from "../../state/selectors/groupsByUserId";
import {currentUser} from "../../state/selectors/currentUser";
import stringToColor from "../../helpers/stringToColor";
import {getFirstLetters} from "../../helpers/nameFirstLetters";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export default function GroupsOverview() {
    const user = useRecoilHook(currentUser)
    const groups = useRecoilHook(groupsByUserId(user?.id))
    const updateGroups = useSetRecoilState(groupsByUserId(user?.id))

    useEffect(() => {
        updateGroups(0)
    }, [updateGroups]);

    return (
        <div>
            <h3>Your groups</h3>
            <Divider/>
            {groups && groups.length === 0 && <>
                <p>
                    You aren't in any groups.
                    Visit the groups page to create a group or join a group if you've been invited to one.
                </p>
                <p>
                    You must have be a part of a group in order to create items or subusers.
                </p>
            </>}
            <List>
                {groups && groups.map(group => {
                    return <ListItem key={group.id} divider>
                        <ListItemAvatar>
                            <Avatar
                                sx={{bgcolor: stringToColor(user?.username), width: '24px', height: '24px', fontSize: '12px'}}
                                alt={group.groupName}
                            >
                                {getFirstLetters(group.groupName)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={group.groupName}
                        />
                    </ListItem>
                })}
            </List>
            <Link to={"/account/groups"}>
                Groups Page
            </Link>
        </div>

    );
}

