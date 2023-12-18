
/**
 * Renders a popup component that can be used to display content in a modal or drawer format.
 * @param {boolean} isSmall - Determines if the popup should be rendered as a small size.
 * @param {boolean} isPopupOpen - Determines if the popup is open or closed.
 * @param {function} setPopupOpen - Callback function to set the open/close state of the popup.
 * @param {ReactNode} children - The content to be rendered inside the popup.
 * @returns {ReactNode} - The rendered popup component.
 */
import React from 'react';
import './styles.css'
import {ModalClose, Sheet} from "@mui/joy";
import Drawer from "@mui/joy/Drawer";
import useCheckMobile from "../../hooks/useCheckMobile";

const Popup = ({ isSmall = false, isPopupOpen, setPopupOpen, children }) => {
    const isMobile = useCheckMobile();

    return (
        <>
            {isMobile ? (
                (isPopupOpen &&
                    <div className={'mobile-popup-container'}>
                        <div className={'mobile-popup-content-container'}>
                            <div className={'mobile-popup-close-button-container'}>
                                <ModalClose onClick={() => setPopupOpen(false)}
                                            style={{position: 'relative', transform: 'translateY(-15px) translateX(15px)'}} />
                            </div>
                            {children}
                        </div>
                    </div>
                )
            ) : (
                <Drawer
                    size="lg"
                    variant="plain"
                    open={isPopupOpen}
                    onClose={() => setPopupOpen(false)}
                    slotProps={{
                        content: {
                            sx: {
                                bgcolor: 'transparent',
                                p: { md: `${isSmall ? '13%' : '4%'}`, sm: `${isSmall ? '10%' : '5%'}`},
                                boxShadow: 'none',
                                mx: '20%',
                            },
                        },
                    }}
                >
                    <Sheet
                        sx={{
                            borderRadius: 'md',
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            height: '100%',
                            overflow: 'auto',
                            bgcolor: '#f1f1f1',
                        }}
                    >
                        {children}
                    </Sheet>
                </Drawer>
            )}
        </>
    );
};

export default Popup;
