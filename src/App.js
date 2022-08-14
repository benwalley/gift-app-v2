import {Amplify, Auth, DataStore} from 'aws-amplify';
import {RecoilRoot, useRecoilState, useSetRecoilState} from 'recoil';
import Button from '@mui/material/Button';
import {Authenticator, useAuthenticator} from '@aws-amplify/ui-react';
import {onAuthUIStateChange} from '@aws-amplify/ui-components';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import React, {useEffect, useState} from 'react';

import {
    Routes,
    Route,
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";
import styled from '@emotion/styled'


import Header from './components/Header'
import Footer from "./components/Footer";
import formFields from "./components/Authenticator/formFields";
import components from './components/Authenticator/components'
import Dashboard from './components/Dashboard'
import {ThemeProvider} from "@mui/material";
import theme from './theme'
import DashboardBody from "./components/Home/DashboardBody";
import WishlistById from "./components/Wishlist/WishlistById";
import ListList from "./components/ListList";
import SubUsersPage from "./components/Account/Subusers/SubUsersPage";
import {updateCurrentUser} from "./state/selectors/currentUser";
import GroupsPage from "./components/Account/Groups/GroupsPage";
import Money from "./components/Money/Money";
import AddAmazonWishlist from "./components/AddAmazonWishlist/AddAmazonWishlist";
import ItemPage from "./components/Wishlist/ItemPage/ItemPage";


Amplify.configure(awsExports);

const MainBody = styled.div`
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  position: relative;
  display: grid;
`


export default function App() {

    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <Authenticator formFields={formFields} components={components}>
                    <Router>
                        <Header/>
                        <MainBody>
                            <Routes>
                                <Route path='/' element={<Dashboard/>}>
                                    <Route index element={<DashboardBody />} />
                                    <Route path="account" element={<DashboardBody/>}/>
                                    <Route path="wishlist/:wishlistId" element={<WishlistById/>}/>
                                    <Route path="wishlist/item/:itemId" element={<ItemPage/>}/>
                                    <Route path="account/subusers" element={<SubUsersPage/>}/>
                                    <Route path="account/groups" element={<GroupsPage/>}/>
                                    <Route path="add-amazon-wishlist" element={<AddAmazonWishlist/>}/>
                                    <Route path="lists" element={<ListList/>}/>
                                    <Route path="money" element={<Money/>}/>
                                    <Route path=" " element={<AddAmazonWishlist/>}/>
                                    <Route path="*" element={<DashboardBody />} />
                                </Route>
                            </Routes>
                        </MainBody>
                        <Footer/>
                    </Router>
                </Authenticator>
            </ThemeProvider>
        </RecoilRoot>
    );
}
