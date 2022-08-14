import * as React from 'react';
import styled from '@emotion/styled'
import {useRecoilState} from "recoil";
import Amplify, {Auth, DataStore} from 'aws-amplify';
import isLoggedIn from '../helpers/isLoggedIn'
import Button from "@mui/material/Button";
import SignOut from "./SignOut";
import {Link, useNavigate} from "react-router-dom";
import useRecoilHook from "../hooks/useRecoilHook";
import {currentUser} from "../state/selectors/currentUser";


const HeaderEl = styled.div`
  padding: 5px var(--desktop-page-margin);
  height: 60px;
  box-sizing: border-box;
  background-color: var(--dark-color);
  display: grid;
  grid-template-columns: 50px 1fr 100px;
  grid-gap: 10px;
  align-items: center;
  color: white;
`

const Logo = styled.img`
    height: 40px;
`

const H2El = styled.h2`
    margin: 0 auto;
    text-align: center;
    color: white;
    text-decoration: none;
    cursor: pointer;
`

const Header = () => {
    const user = useRecoilHook(currentUser)

    return (
       <HeaderEl>
           {isLoggedIn() ? <Link to="/">
               <Logo src="/logo.svg" alt="WishlistById logo"/>
           </Link> :  <Logo src="/logo.svg" alt="WishlistById logo"/> }
           {isLoggedIn() ? <Link to={`/wishlist/${user.id}`}>
               <H2El>{user.username}</H2El>
           </Link> :  <div></div> }
           <SignOut/>
       </HeaderEl>
    );
};
export default Header;
