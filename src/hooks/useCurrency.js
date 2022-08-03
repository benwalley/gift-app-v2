import {useRecoilValue} from "recoil";
import {useEffect, useState} from 'react';
import currencyCode from '../state/atoms/currencyCode'

export default function useCurrency(price) {
    const currency = useRecoilValue(currencyCode)
    const [formattedPrice, setFormattedPrice] = useState('')

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
        });

       setFormattedPrice(formatter.format(price))
    }, [currencyCode, price]);

    return formattedPrice
}
