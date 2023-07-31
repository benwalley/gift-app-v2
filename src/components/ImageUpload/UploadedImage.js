import React, {useEffect, useState} from 'react';
import {IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import styled from "@emotion/styled";
import useImageSrc from "../../hooks/useImageSrc";
import ImageRender from "../ImageRender";

const imageStyles = {
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 'auto'
}

const deleteButtonStyles = {
    background: 'var(--delete-red)',
    borderRadius: '50px',
    fontSize: '16px',
    padding: '3px',
    position: 'absolute',
    top: '1px',
    right: '1px'
}

export default function UploadedImage(props) {
    const {src, handleEdit, handleDelete, isSelected} = props
    const imageUrl = useImageSrc(src)

    const ContainerEl = styled.div`
        position: relative;
        width: 100px;
        height: 100px;
        display: flex;
        background: #f0f0f0;
        cursor: pointer;
        outline-offset: -1px;
        outline: ${isSelected ? '2px solid var(--primary-color)' : 'none'}
    `

    return (<>
            <ContainerEl
                         onClick={handleEdit}
            >
               <Tooltip title={'delete'}>
                    <IconButton aria-label="delete"
                                sx={deleteButtonStyles}
                                size={'medium'}
                                disableRipple={true}
                                onClick={handleDelete}
                    >
                        <DeleteIcon color={'white'}
                                    fontSize='inherit'/>
                    </IconButton>
                </Tooltip>

                <ImageRender styles={imageStyles} src={imageUrl} alt={'Image'}/>
            </ContainerEl>
        </>
    );
}

