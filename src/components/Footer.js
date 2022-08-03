import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import isLoggedIn from "../helpers/isLoggedIn";
import {Auth} from "aws-amplify";

const FooterEl = styled.div`
  padding: 5px var(--desktop-page-margin);
  height: 60px;
  box-sizing: border-box;
  background-color: var(--dark-color);
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  align-items: center;
`

export default function Footer() {
    return (
        <FooterEl>

        </FooterEl>
    );
}

