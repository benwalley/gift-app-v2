import {Amplify, Auth, DataStore, Hub} from 'aws-amplify';
import {RecoilRoot, useSetRecoilState} from 'recoil';
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import React, {useEffect} from 'react';
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
import {ThemeProvider} from "@mui/material";
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

Amplify.configure(awsExports);

const MainBody = styled.div`
  min-height: calc(100vh - var(--header-height));
  position: relative;
  display: grid;
`
// TODO: allow other users to have access to edit your list
// TODO: Have toggle that hides who's getting things.
// TODO: Make sub-accounts more fully featured (adding profile picture, saying you're getting things)
// TODO: Add commenting
// TODO: add ability to add address to account visible to certain groups.
// TODO: multiple links and multiple images.
export default function App() {

    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <Router>
                    <Container>
                        <Authenticator formFields={formFields} components={components}>
                            <Header/>
                            <MainBody>
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
                                        <Route path="lists" element={<ListList/>}/>
                                        <Route path="money" element={<Money/>}/>
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
