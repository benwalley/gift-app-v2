import {useRecoilValue} from "recoil";
import {useEffect, useState} from 'react';
import currencyCode from '../state/atoms/currencyCode'

export default function useCurrency(price) {
    const currency = useRecoilValue(currencyCode)
    const [formattedPrice, setFormattedPrice] = useState('')

    useEffect(() => {
        if(!price) setFormattedPrice('')
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
        });

       setFormattedPrice(formatter.format(price))
    }, [currency, price]);

    return formattedPrice
}
