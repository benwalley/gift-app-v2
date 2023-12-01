import { useState, useEffect } from 'react';

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const mobileWidth = 768; // You can adjust this threshold based on your needs
            setIsMobile(window.innerWidth < mobileWidth);
        };

        // Initial check
        checkIsMobile();

        // Event listener for window resize
        window.addEventListener('resize', checkIsMobile);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return isMobile;
};

