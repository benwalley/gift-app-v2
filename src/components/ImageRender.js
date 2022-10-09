import React, {useEffect, useState} from 'react';
import { Storage } from "@aws-amplify/storage"
import styled from '@emotion/styled'

export default function ImageRender(props) {
    const {alt, src, styles} = props
    const[imageUrl, setImageUrl] = useState()

    const StyledImage = styled.img`
        width: 100%;
        ${styles}
    `

    useEffect(() => {
        const updateImage = async () => {
            try {
                const data = JSON.parse(src);
                if (data.customKey) {
                    const url = await Storage.get(data.customKey, {
                        level: 'public',
                        download: false,
                    });
                    setImageUrl(url)
                }
            } catch(e) {
                console.log(e)
                setImageUrl(src)
            }
        }
        if (src) {
            updateImage()
        }

    }, [src]);

    return (
        <StyledImage src={imageUrl} alt={alt}/>
    );
}


