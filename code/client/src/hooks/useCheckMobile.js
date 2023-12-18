import {useEffect, useState} from "react";

/**
 * Hook to check if the current device is a mobile device
 * @returns {boolean} Whether the current device is a mobile device
 */
const useCheckMobile = () => {
    // State to hold whether the current device is a mobile device
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Set isMobile to true if the window's inner width is less than or equal to 767
        setIsMobile(window.innerWidth <= 767);

        // Function to handle window resize events
        const handleResize = () => {
            // Set isMobile to true if the window's inner width is less than or equal to 767
            setIsMobile(window.innerWidth <= 767);
        };

        // Add the handleResize function as an event listener for the window's resize event
        window.addEventListener('resize', handleResize);

        // Return a cleanup function to remove the handleResize event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []) // Empty dependency array so the effect only runs once on mount

    // Return whether the current device is a mobile device
    return isMobile
}

export default useCheckMobile