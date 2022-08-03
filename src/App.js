import {Amplify, Auth, DataStore} from 'aws-amplify';
import {RecoilRoot, useRecoilState} from 'recoil';
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
} from "react-router-dom";
import styled from '@emotion/styled'


import Header from './components/Header'
import Footer from "./components/Footer";
import formFields from "./components/Authenticator/formFields";
import components from './components/Authenticator/components'
import DashboardDashboard from './components/Dashboard'
import {ThemeProvider} from "@mui/material";
import theme from './theme'
import DashboardBody from "./components/Home/DashboardBody";
import Wishlist from "./components/Wishlist/Wishlist";
import {Users} from "./models";

Amplify.configure(awsExports);

const MainBody = styled.div`
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  position: relative;
`


export default function App() {

    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            //Check if user exists, and if not, create it
            createUserIfNeeded()
        });
    }, []);

    const createUserIfNeeded = async () => {
        let users = await DataStore.query(Users, c => c.authUsername("eq", Auth.user.username));
        if(users.length === 0) {
            const userData = {
                "username": Auth.user.attributes.name,
                "authUsername": Auth.user.username,
                "emailAddress": Auth.user.attributes.email
            }
            await DataStore.save(
                new Users(userData)
            );
        }
    }

    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <Authenticator formFields={formFields} components={components}>
                    <Router>
                        <Header/>
                        <MainBody>
                            <Routes>
                                <Route path='/' element={<DashboardDashboard/>}>
                                    <Route index element={<DashboardBody />} />
                                    <Route path="account" element={<DashboardBody/>}/>
                                    <Route path="wishlist" element={<Wishlist/>}/>
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
