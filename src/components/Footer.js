import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import styled from "@emotion/styled";


const FooterContents = styled.div`
    color: white;
`

export default function Footer() {
    const containerStyles = {
        marginTop: '50px',
        background: 'var(--dark-color)',
        height: 'var(--footer-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
    return (
        <Box sx={containerStyles} color={'white'}>
            <FooterContents>Bug Report</FooterContents>
        </Box>
    );
}

