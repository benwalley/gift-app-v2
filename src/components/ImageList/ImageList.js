import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ImageTile from "./ImageTile";
import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import LaunchIcon from '@mui/icons-material/Launch';
import ImageRender from "../ImageRender";

const imageStyles = {
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto'
}

const ImageContainerEl = styled.div`
    aspect-ratio: 1;
    background: #e2e2e2;
    margin-bottom: 10px;
    display: flex;
    position: relative;
`

const DetailsPanelEl = styled.div`
    position: absolute;
    background: #0000005e;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    color: white;
    display: grid;
    grid-template-columns: 1fr 50px;
`

//ToDO: show link and description per image
export default function ImageList(props) {
    const {images} = props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [currentImageLink, setCurrentImageLink] = useState();
    const [currentImageNote, setCurrentImageNote] = useState('')

    useEffect(() => {
        if(!images) return;
        const current = images[currentImageIndex];
        if(!current) return;
        try {
            const {imageSrc, link, note} = JSON.parse(current);
            setCurrentImageUrl(imageSrc);
            setCurrentImageLink(link);
            setCurrentImageNote(note);
        } catch(e) {
            setCurrentImageUrl(current);
            setCurrentImageLink(undefined);
            setCurrentImageNote('');
        }

    }, [images, currentImageIndex]);

    const imageListStyles = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
    }

    return (
        <div>
            <ImageContainerEl>
                <ImageRender styles={imageStyles} src={currentImageUrl} alt={currentImageNote || "wishlist item image"}/>
                {(currentImageLink || currentImageNote) && <DetailsPanelEl>
                    <div>{currentImageNote}</div>
                    {currentImageLink &&
                        <a href={currentImageLink}
                            target='_blank'
                            rel="noreferrer">
                        <LaunchIcon/>
                    </a>}
                </DetailsPanelEl>}
            </ImageContainerEl>
            {(images.length > 1) && <Box sx={imageListStyles}>
                {images.map((image, index) => {
                    return <ImageTile
                        image={image}
                        index={index}
                        key={JSON.stringify(image)}
                        setCurrentImageIndex={setCurrentImageIndex}
                        selected={index === currentImageIndex}
                    />
                })}
            </Box>}

        </div>
    );
}

