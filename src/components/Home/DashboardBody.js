import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import Tile from "./Tile";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser} from "../../state/selectors/currentUser";
import UserInfo from "./UserInfo";
import SubuserToggle from "./SubuserToggle";
import SubuserOverview from "./SubuserOverview";
import GroupsOverview from "./GroupsOverview";
import Notes from "./Notes";
import {DataStore} from "aws-amplify";
import {Users, WishlistItem} from "../../models";
import {Link} from "react-router-dom";
import {Button, CircularProgress, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox} from "@mui/material";
import GetAppIcon from '@mui/icons-material/GetApp';
import {exportWishlistToCSV} from "../../helpers/csvExport";

const DashboardBodyEl = styled.div`
    background: var(--background-color);
    display: grid;
    gap: 20px;
    padding: var(--mobile-page-margin);
    grid-template-rows: auto auto auto 1fr;
    max-width: var(--max-content-width);
    margin: 0 auto;
    
    @media only screen and (min-width: 1000px) {
        grid-template-columns: 1fr 1fr;
        padding: var(--desktop-page-margin);
    }
`

const H1El = styled.h1`
    grid-column: 1/-1;
`

export default function DashboardBody() {
    const user = useRecoilHook(currentUser)
    const [isExporting, setIsExporting] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [allWishlistItems, setAllWishlistItems] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (users && users.length > 0) {
            setSelectedUsers(users.map(u => u.id))
        }
    }, [users])

    useEffect(() => {
        const fetchAllUsersAndLists = async () => {
            if (!user?.id) return []
            
            // Get both users (isUser: true) and lists (isUser: false) 
            const subusers = await DataStore.query(Users, c => c.parentId("eq", user.id).isUser('eq', true))
            const lists = await DataStore.query(Users, c => c.parentId("eq", user.id).isUser('eq', false))
            const allUsersAndLists = [user, ...subusers, ...lists]
            setUsers(allUsersAndLists)
            
            // Get wishlist items for all users and lists
            const userIds = allUsersAndLists.filter(u => u?.id).map(u => u.id)
            const items = []
            for (const userId of userIds) {
                const userItems = await DataStore.query(WishlistItem, c => c.ownerId("eq", userId))
                items.push(...userItems)
            }
            
            const itemsWithUser = items.map(item => ({
                ...item,
                user: allUsersAndLists.find(u => u.id === item.ownerId)
            }))
            
            setAllWishlistItems(itemsWithUser)
        }
        
        fetchAllUsersAndLists()
    }, [user])

    const handleUserSelectionChange = (userId, checked) => {
        setSelectedUsers(prev => 
            checked 
                ? [...prev, userId]
                : prev.filter(id => id !== userId)
        )
    }

    const handleSelectAllUsers = (checked) => {
        setSelectedUsers(checked ? users.map(u => u.id) : [])
    }

    const getFilteredWishlistItems = () => {
        return allWishlistItems.filter(item => selectedUsers.includes(item.ownerId))
    }

    const getItemCountForUser = (userId) => {
        return allWishlistItems.filter(item => item.ownerId === userId).length
    }

    const handleExportCSV = async () => {
        const itemsToExport = getFilteredWishlistItems()
        
        if (!itemsToExport || itemsToExport.length === 0) {
            alert('No wishlist items to export for selected users')
            return
        }

        setIsExporting(true)
        try {
            const result = await exportWishlistToCSV(itemsToExport)
            if (result.success) {
                console.log('CSV export completed successfully')
            } else {
                alert(`Export failed: ${result.error}`)
            }
        } catch (error) {
            alert(`Export failed: ${error.message}`)
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <DashboardBodyEl>
            <H1El>Dashboard</H1El>
            <Tile type="primary">
                <UserInfo/>
            </Tile>
            <Tile type="primary">
                <SubuserToggle/>
            </Tile>
            {user && !user?.subuserModeOn && <Tile type="primary">
                <h3>Gifts You're Giving</h3>
                <Link to='/giving'>See the gifts you're giving, and plan who you still want to get gifts for.</Link>
            </Tile>}
            <Tile type="primary">
                <h3>Export Your Wishlist</h3>
                <p>Download all your wishlist items as a CSV file in order to import them to the new wishlist website.</p>
                <p><strong>Note:</strong> To ensure images import properly, import the wishlist into the new wishlist within a few minutes of exporting. Otherwise the images might not transfer properly.</p>
                
                {users && users.length > 1 && (
                    <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
                        <FormLabel component="legend">Select users to export:</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedUsers.length === users.length}
                                        indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                                        onChange={(e) => handleSelectAllUsers(e.target.checked)}
                                    />
                                }
                                label="Select All"
                            />
                            {users.map((userItem) => (
                                <FormControlLabel
                                    key={userItem.id}
                                    control={
                                        <Checkbox
                                            checked={selectedUsers.includes(userItem.id)}
                                            onChange={(e) => handleUserSelectionChange(userItem.id, e.target.checked)}
                                        />
                                    }
                                    label={`${userItem.name || userItem.username} (${getItemCountForUser(userItem.id)} items)`}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                )}
                
                <Button
                    variant="contained"
                    startIcon={isExporting ? <CircularProgress size={20} color="inherit" /> : <GetAppIcon />}
                    onClick={handleExportCSV}
                    disabled={isExporting || selectedUsers.length === 0}
                    sx={{ mt: 2 }}
                >
                    {isExporting ? 'Exporting...' : 'Export CSV'}
                </Button>
            </Tile>
            <Tile type="primary">
                <SubuserOverview/>
            </Tile>
            <Tile type="primary">
                <GroupsOverview/>
            </Tile>
            <Tile>
                <Notes/>
            </Tile>
        </DashboardBodyEl>
    );
}

