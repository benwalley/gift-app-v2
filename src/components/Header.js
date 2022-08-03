import * as React from 'react';
import styled from '@emotion/styled'
import {useRecoilState} from "recoil";
import Amplify, {Auth, DataStore} from 'aws-amplify';
import isLoggedIn from '../helpers/isLoggedIn'
import Button from "@mui/material/Button";
import SignOut from "./SignOut";
import {Link} from "react-router-dom";


const HeaderEl = styled.div`
  padding: 5px var(--desktop-page-margin);
  height: 60px;
  box-sizing: border-box;
  background-color: var(--dark-color);
  display: grid;
  grid-template-columns: 50px 1fr 1fr 100px;
  grid-gap: 10px;
  align-items: center;
  color: white;
`

const Logo = styled.img`
    height: 40px;
`




const Header = () => {

    return (
       <HeaderEl>
           {isLoggedIn() ? <Link to="/">
               <Logo src="/logo.svg" alt="Wishlist logo"/>
           </Link> :  <Logo src="/logo.svg" alt="Wishlist logo"/> }


           <div></div>
           <div></div>
            <SignOut/>
       </HeaderEl>
    );
};
export default Header;
