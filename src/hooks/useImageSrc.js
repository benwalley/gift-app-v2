import {useEffect, useState} from 'react';
import {Storage} from "@aws-amplify/storage";

export default function useImageSrc(src) {
    const [url, setUrl] = useState('')

    useEffect(() => {
        const updateImage = async () => {
            try {
                const data = JSON.parse(src);
                if (data.customKey) {
                    const url = await Storage.get(data.customKey, {
                        level: 'public',
                        download: false,
                    });
                    setUrl(url)
                }
            } catch (e) {
                setUrl(src)
            }
        }
        if(src) {
            updateImage()
        }

    }, [src]);

    return url
}




