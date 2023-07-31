import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import ImageRender from "../ImageRender";


export default function ImageTile(props) {
    const {image, index, setCurrentImageIndex, selected} = props

    function getURLForImage(image) {
        try {
            const imageData = JSON.parse(image);
            return imageData?.imageSrc;
        } catch(e) {
            return image;
        }
    }

    const containerStyles = () => {
        const styles = {
            width: '75px',
            height: '75px',
            cursor: 'pointer',
            outlineOffset: '-1px'
        }
        styles.outline = selected ? '3px solid var(--primary-color)' : 'none';
        styles.filter = selected ? 'opacity(0.5)' : 'none';
        return styles;
    }

    const imageStyles = {
        maxWidth: '100%',
        maxHeight: '100%'
    }

    return (
        <Box key={image}
             onClick={() => setCurrentImageIndex(index)}
             sx={containerStyles()}
        >

            <ImageRender styles={imageStyles}
                         src={getURLForImage(image)}
                         alt={`Thumbnail ${index}`}
            />
        </Box>
    );
}

