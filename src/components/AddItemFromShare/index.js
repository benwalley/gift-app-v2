import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";



export default function AddItemFromShare() {
    const [isLoading, setIsLoading] = useState(false);
    let {url} = useParams();

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch_demo();
    //
    // }, []);
    //
    // async function fetch_demo()
    // {
    //     const resp = await fetch(lambdaUrl + webScrapeUrl + '?url=https://www.amazon.com/Tree-Hut-Hydrating-Exfoliating-Nourishing/dp/B07PHQ9KS2');
    //     const body = await resp.json();
    //     setIsLoading(false)
    //     const {title, image, price} = getDataByUrl(body)
    //     console.log('test')
    // }

    return (
        <div>
        </div>
    );
}

