import * as React from 'react';
import styled from '@emotion/styled'
import isLoggedIn from '../helpers/isLoggedIn'
import SignOut from "./SignOut";
import {Link} from "react-router-dom";
import useRecoilHook from "../hooks/useRecoilHook";
import {currentUser} from "../state/selectors/currentUser";
import {IconButton} from "@mui/material";
import {useRecoilState, useSetRecoilState} from "recoil";
import leftNavOpen from "../state/atoms/leftNavOpen";
import MenuIcon from '@mui/icons-material/Menu';

const HeaderEl = styled.div`
  padding: 5px var(--mobile-page-margin);
  @media only screen and (min-width: 1000px) {
    padding: 5px var(--desktop-page-margin);
  }
  height: 60px;
  box-sizing: border-box;
  background-color: var(--dark-color);
  display: grid;
  grid-template-columns: auto 50px calc(100% - 220px) auto auto;
  @media only screen and (min-width: 1000px) {
    grid-template-columns: 50px 1fr auto auto;
  }
  grid-gap: 10px;
  align-items: center;
  color: white;
`

const Logo = styled.img`
    height: 30px;
    @media only screen and (min-width: 1000px) {
       height: 40px;
    }
`

const H2El = styled.h2`
    margin: 0 auto;
    text-align: center;
    color: white;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const StyledLink = styled(Link)`
    text-decoration: none;
`

const Header = () => {
    const user = useRecoilHook(currentUser)
    const [mobileMenuOpen, setMobileMenuOpen] = useRecoilState(leftNavOpen)

    const handleToggleMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    // const trimmedUsername = () => {
    //     const name = user?.username;
    //     const maxLength = 4
    // }

    return (
       <HeaderEl>
           {isLoggedIn() ? <IconButton
               size="medium"
               aria-label="close"
               color="inherit"
               bgcolor="primary"
               onClick={handleToggleMenu}
               sx={{
                   display: { xs: 'flex', md: 'none' },
                   padding: 0
               }}
           >
               <MenuIcon fontSize="large" />
           </IconButton> : <div></div> }
           {isLoggedIn() ? <Link to="/">
               <Logo src="/logo.svg" alt="WishlistById logo"/>
           </Link> :  <Logo src="/logo.svg" alt="WishlistById logo"/> }
           {isLoggedIn() ? <StyledLink to={`/wishlist/${user?.id}`}>
               <H2El>{user?.username}</H2El>
           </StyledLink> :  <div></div> }
           {isLoggedIn() ? <div>{user?.subuserModeOn ? "Subuser Mode" : ''}</div> :  <div></div> }
           <SignOut/>
       </HeaderEl>
    );
};
export default Header;
