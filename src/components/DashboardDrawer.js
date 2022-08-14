import * as React from 'react';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';

import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GroupsIcon from '@mui/icons-material/Groups';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import addItemModalOpenState from "../state/atoms/addItemModalOpen";
import CustomModal from "./CustomModal";
import AddItemForm from "./AddItemForm";
import useRecoilHook from "../hooks/useRecoilHook";
import {currentUser} from "../state/selectors/currentUser";
import moneyModalOpenState from "../state/atoms/moneyModalOpen";
import Money from "./Money/Money";
import {useState} from "react";
import AreYouSureDialog from "./AreYouSureDialog";
import {groupsByUserId} from "../state/selectors/groupsByUserId";



const DrawerEl = styled.div`
  border-right: 1px solid var(--border-color-light);
`


function DashboardDrawer(props) {
    const [addItemModalOpen, setAddItemModalOpen] = useRecoilState(addItemModalOpenState);
    const [moneyModalOpen, setMoneyModalOpen] = useRecoilState(moneyModalOpenState);
    const [areYouSureOpen, setAreYouSureOpen] = useState(false)
    let navigate = useNavigate();
    const user = useRecoilHook(currentUser)
    const groups = useRecoilHook(groupsByUserId(user.id))


    const handleOpenAddItemModal = () => {
        if( groups && groups.length > 0) {
            setAddItemModalOpen(true)
        } else {
            setAreYouSureOpen(true)
        }

    }

    const links = [
        {title: 'Dashboard', icon: <HomeIcon/>, url: '/'},
        {title: 'Add Item', icon: <AddIcon/>, action: handleOpenAddItemModal},
        {title: 'Your List', url: `/wishlist/${user?.id}`, icon: <FormatListBulletedIcon/>},
        {title: 'Lists', url: '/lists', icon: <FormatListNumberedIcon/>},
        {title: 'Money', icon: <AttachMoneyIcon/>, url: '/money'},
        {title: 'Add Amazon Wishlist', icon: <PlaylistAddIcon/>, url: '/add-amazon-wishlist'},

    ]

    const accountLinks = [
        {title: 'Account', url: '/account', icon: <AccountCircleIcon/>},
        {title: 'Your Groups', url: '/account/groups', icon: <GroupsIcon/>},
        {title: 'Subusers', url: '/account/subusers', icon: <SupervisorAccountIcon/>},
    ]


    function renderList(links) {
        return <List>
            {links.map((link) => (
                <ListItem key={link.title} disablePadding>
                    <ListItemButton onClick={() => {
                        if (link.action) {
                            link['action']()
                        };
                        if (link.url) {
                            navigate(link.url)
                        }
                    }}>
                        <ListItemIcon>
                            {link.icon}
                        </ListItemIcon>
                        <ListItemText primary={link.title}/>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    }

    return (
            <DrawerEl>
                {renderList(links)}
                <Divider/>
                {renderList(accountLinks)}
                <CustomModal open={addItemModalOpen} setOpen={setAddItemModalOpen} size="large">
                    <AddItemForm afterSubmit={() => setAddItemModalOpen(false)}/>
                </CustomModal>
                <CustomModal padding={"0"} open={moneyModalOpen} setOpen={setMoneyModalOpen} size="large">
                    <Money afterSubmit={() => setAddItemModalOpen(false)}/>
                </CustomModal>
                <AreYouSureDialog
                    text={`You must create or join a group in order to add items to your wishlist.`}
                    open={areYouSureOpen}
                    setOpen={setAreYouSureOpen}
                    confirmHandler={() => navigate('/account/groups')}
                    confirmText={"Go To Groups Page"}
                />
            </DrawerEl>
    );
}

export default DashboardDrawer;


