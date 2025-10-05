import {Amplify} from 'aws-amplify';
import {RecoilRoot} from 'recoil';
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import React from 'react';
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
import styled from '@emotion/styled'
import Header from './components/Header'
import formFields from "./components/Authenticator/formFields";
import components from './components/Authenticator/components'
import Dashboard from './components/Dashboard'
import {Alert, ThemeProvider} from "@mui/material";
import theme from './theme'
import DashboardBody from "./components/Home/DashboardBody";
import WishlistById from "./components/Wishlist/WishlistById";
import ListList from "./components/ListList";
import SubUsersPage from "./components/Account/Subusers/SubUsersPage";
import GroupsPage from "./components/Account/Groups/GroupsPage";
import Money from "./components/Money/Money";
import AddAmazonWishlist from "./components/AddAmazonWishlist/AddAmazonWishlist";
import ItemPage from "./components/Wishlist/ItemPage/ItemPage";
import Container from './components/Container'
import AddItemFromShare from "./components/AddItemFromShare";
import GiftsYoureGiving from "./components/GiftsYoureGiving/GiftsYoureGiving";
import MigrationBanner from "./components/MigrationBanner";

Amplify.configure(awsExports);

const MainBody = styled.div`
  min-height: calc(100vh - var(--header-height));
  position: relative;
  display: grid;
`
// TODO: allow other users to have access to edit your list
// TODO: Have toggle that hides who's getting things.
// TODO: Add commenting
// TODO: add ability to add address to account visible to certain groups.
// TODO: Add price range
// TODO: Add notification if item you're getting is deleted
export default function App() {

    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <Router>
                    <Container>
                        <Authenticator formFields={formFields} components={components}>
                            <Header/>
                            <MainBody className="main-body">
                                <MigrationBanner/>
                                <Routes>
                                    <Route path='/' element={<Dashboard/>}>
                                        <Route index element={<ListList/>}/>
                                        <Route path="account" element={<DashboardBody/>}/>
                                        <Route path="wishlist/:wishlistId" element={<WishlistById/>}/>
                                        <Route path="public/wishlist/:wishlistId" element={<WishlistById/>}/>
                                        <Route path="wishlist/item/:itemId" element={<ItemPage/>}/>
                                        <Route path="public/wishlist/item/:itemId" element={<ItemPage/>}/>
                                        <Route path="account/subusers" element={<SubUsersPage/>}/>
                                        <Route path="account/groups" element={<GroupsPage/>}/>
                                        <Route path="add-amazon-wishlist" element={<AddAmazonWishlist/>}/>
                                        <Route path="giving" element={<GiftsYoureGiving/>}/>
                                        <Route path="lists" element={<ListList/>}/>
                                        <Route path="money" element={<Money/>}/>
                                        <Route path="create-wishlist-item" element={<AddItemFromShare/>}/>
                                        <Route path="*" element={<DashboardBody/>}/>
                                    </Route>
                                </Routes>
                            </MainBody>
                        </Authenticator>
                    </Container>
                </Router>
            </ThemeProvider>
        </RecoilRoot>
    );
}
