import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import Tile from "./Tile";
import useRecoilHook from "../../hooks/useRecoilHook";
import {currentUser, currentUserVersion} from "../../state/selectors/currentUser";
import {currentUserWishlist} from "../../state/selectors/currentUserWishlist";
import UserInfo from "./UserInfo";
import SubuserToggle from "./SubuserToggle";
import SubuserOverview from "./SubuserOverview";
import GroupsOverview from "./GroupsOverview";
import Notes from "./Notes";
import {Auth, DataStore, SortDirection} from "aws-amplify";
import {Users} from "../../models";
import {Link} from "react-router-dom";
import {Button, CircularProgress} from "@mui/material";
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
    const wishlistItems = useRecoilHook(currentUserWishlist)
    const [isExporting, setIsExporting] = useState(false)

    const handleExportCSV = async () => {
        if (!wishlistItems || wishlistItems.length === 0) {
            alert('No wishlist items to export')
            return
        }

        setIsExporting(true)
        try {
            const result = await exportWishlistToCSV(wishlistItems)
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
                <Button
                    variant="contained"
                    startIcon={isExporting ? <CircularProgress size={20} color="inherit" /> : <GetAppIcon />}
                    onClick={handleExportCSV}
                    disabled={isExporting || !wishlistItems || wishlistItems.length === 0}
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

