import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'

const TextEl = styled.div`
    margin-bottom: 30px;
`

export default function PublicLoginSuggestion() {
    return (
        <TextEl>
            Log in in order to see who's getting gifts and say that you're getting gifts, in addition to many other features.
        </TextEl>
    );
}

