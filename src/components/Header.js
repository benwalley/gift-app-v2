import * as React from 'react';
import styled from '@emotion/styled'
import isLoggedIn from '../helpers/isLoggedIn'
import SignOut from "./SignOut";
import {Link} from "react-router-dom";
import useRecoilHook from "../hooks/useRecoilHook";
import {currentUser} from "../state/selectors/currentUser";
import {IconButton, Tooltip} from "@mui/material";
import {useRecoilState} from "recoil";
import leftNavOpen from "../state/atoms/leftNavOpen";
import MenuIcon from '@mui/icons-material/Menu';
import {useEffect, useState} from "react";
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';

const HeaderEl = styled.div`
  padding: 5px var(--mobile-page-margin);
  @media only screen and (min-width: 1000px) {
    padding: 5px var(--desktop-page-margin);
  }
  height: 60px;
  box-sizing: border-box;
  background-color: var(--dark-color);
  display: grid;
  grid-template-columns: auto 50px calc(100% - 264px) auto auto auto;
  @media only screen and (min-width: 1000px) {
    grid-template-columns: 50px 1fr auto auto auto;
  }
  grid-gap: 10px;
  align-items: center;
  color: white;
  position: fixed;
  width: 100%;
  z-index: 200;
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
    const [isOnline, setIsOnline] = useState(navigator.onLine)

    useEffect(() => {
        window.addEventListener('online',  handleOnlineChanged);
        window.addEventListener('offline', handleOnlineChanged);
    }, []);

    const handleOnlineChanged = () => {
        setIsOnline(navigator.onLine);
    }

    const handleToggleMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

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
           <Tooltip enterTouchDelay={0} title={isOnline ? "you're online" : "You're offline. The app will have limited functionality until you connect to the internet, but changes you make will get synced once you connect to the internet"}>
               <span>
                   {!isOnline && <WifiOffIcon color={"deleteRed"}/>}
                   {isOnline && <WifiIcon color={"darkGreen"}/>}
               </span>
           </Tooltip>
           {isLoggedIn() ? <div>{user?.subuserModeOn ? "Subuser Mode" : ''}</div> :  <div></div> }
           <SignOut/>
       </HeaderEl>
    );
};
export default Header;
