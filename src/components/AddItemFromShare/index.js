import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";



export default function AddItemFromShare() {
    const [isLoading, setIsLoading] = useState(false);
    let data = useParams();

    useEffect(() => {
        setIsLoading(true)

    }, []);


    return (
        <div>
            {JSON.stringify(data)};
        </div>
    );
}

