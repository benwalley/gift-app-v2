import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {Button, FormControl, IconButton, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const BadgesEl = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 10px;
`

export default function MultipleImageUrls(props) {
    const {images, setImages, styles} = props;

    function setUrl(index, value) {
        const imagesCopy = [...images];
        imagesCopy[index] = value;
        setImages(imagesCopy);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const imagesCopy = [...images];
        imagesCopy.push('')
        setImages(imagesCopy);
    }

    const handleRemoveInput = (e, index) => {
        e.preventDefault();
        const imagesCopy = [...images];
        imagesCopy.splice(index, 1)
        setImages(imagesCopy);
    }

    const renderImageInputs = () => {
        return images.map((url, index) => {
            return <TextField
                key={index}
                value={url}
                onChange={(e) => setUrl(index, e.target.value)}
                sx={styles}
                label="Image Url"
                variant="outlined"
                endAdornment={<InputAdornment position="end">
                    <IconButton
                        aria-label="Remove image input"
                        onClick={(e) => handleRemoveInput(e, index)}
                        edge="end"
                    >
                        <HighlightOffIcon/>
                    </IconButton>
                </InputAdornment>}
            />
        })
    }


    return (
        <div>
            {renderImageInputs()}
            <Button type="button" sx={{marginTop: '30px', marginLeft: 'auto', display: 'block'}} onClick={handleAdd}
                    variant="contained"
                    size="large">Add another image</Button>
        </div>
    );
}

