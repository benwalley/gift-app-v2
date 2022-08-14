import React, {useState} from 'react';
import styled from "@emotion/styled";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

const ContainerEl = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  
`


export default function AddWishlistForm(props) {
    const {source, setSource, afterSubmit} = props

    async function handleSubmit(e) {
        e.preventDefault();
        afterSubmit()

    }

    return (
        <ContainerEl onSubmit={handleSubmit}>
            <TextField multiline rows={10} value={source} onChange={(e) => setSource(e.target.value)} id="source" label="Amazon wishlist page source" variant="outlined"/>
            <Button type={"submit"} variant={"contained"}>Get Wishlist Items</Button>
        </ContainerEl>
    );
}

