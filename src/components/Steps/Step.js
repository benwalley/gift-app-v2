import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';

export default function Step(props) {
    const {children,
        currentStep,
        stepNumber,
        nextStep,
        previousStep,
        nextStepName,
        previousStepName,
        renderStraightContent,
    } = props
    return (
        <>
            {renderStraightContent && <div>{children}</div>}
            {!renderStraightContent && currentStep === stepNumber && <div>
                {previousStep && <Button startIcon={<KeyboardBackspaceIcon />} onClick={previousStep} sx={{marginTop: '20px'}}>{previousStepName || "Previous"}</Button>}
                {children}
                {nextStep && <Button endIcon={<EastIcon />} onClick={nextStep} sx={{marginTop: '20px'}}>{nextStepName || "Next"}</Button>}
            </div>}
        </>

    );
}

