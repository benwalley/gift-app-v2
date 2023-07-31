import {useEffect, useState} from 'react';
import {lambdaUrl, webScrapeUrl} from "../helpers/variables";

export default function useFetchUrlFromTargetUrl(url) {
    const [fullUrl, setFullUrl] = useState('')

    useEffect(() => {
        setFullUrl(`${lambdaUrl}${webScrapeUrl}?url=${url}`)
    }, [url]);

    return fullUrl
}
