import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";



export default function AddItemFromShare() {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('')
    let data = useParams();

    useEffect(() => {
        setIsLoading(true)
        const url = new URL(document.location);
        setContent(url)
    }, []);


    return (
        <div>
            {JSON.stringify(data)};
            {content};
        </div>
    );
}

