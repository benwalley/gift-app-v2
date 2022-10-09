import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'

const ContainerEl = styled.div`
    border: 2px dashed var(--primary-color);
    padding: 10px 30px;
    display: grid;
    align-items: center;
    font-size: 18px;
    color: #6b6b6b;
    border-radius: 5px;
    height: 80px;
    cursor: pointer;
   
    
    :hover {
        background: #80808024;
    }
`
export default function ImageUploadButton(props) {

    return (

        <ContainerEl>
            <span>
                Upload or drag image here.
            </span>
        </ContainerEl>
    );
}

