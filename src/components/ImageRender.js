import React, {useEffect, useState} from 'react';
import { Storage } from "@aws-amplify/storage"
import styled from '@emotion/styled'

export default React.memo(function ImageRender(props) {
    const {alt, src, styles} = props
    const [imageUrl, setImageUrl] = useState()

    const StyledImage = styled.img`
        width: 100%;
        ${styles}
    `

    useEffect(() => {
        const updateImage = async () => {
            try {
                let data = JSON.parse(src);
                if(data.imageSrc) {
                    // this means the whole object was passed to you.
                    if(data.imageSrc.slice(0, 4) === 'http') {
                        setImageUrl(data.imageSrc)
                    } else {
                        data = JSON.parse(data.imageSrc);
                    }
                }
                if (data.customKey) {
                    const url = await Storage.get(data.customKey, {
                        level: 'public',
                        download: false,
                    });
                    setImageUrl(url)
                }
            } catch(e) {
                setImageUrl(src)
            }
        }
        if (src) {
            updateImage()
        }

    }, [src]);


    return (
        <StyledImage draggable="false" src={imageUrl} alt={alt}/>
    );
})


