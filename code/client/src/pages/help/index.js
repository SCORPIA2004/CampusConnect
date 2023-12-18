/**
 * Renders the HelpPage component.
 * 
 * @component
 * @returns {JSX.Element} The rendered HelpPage component.
 * 
 * @example
 * return (
 *   <HelpPage />
 * );
 * 
 * @remarks
 * The HelpPage component displays information about different sections of the application,
 * such as the forum, second hand sales, donation, lost and found, and borrowing.
 * It provides a brief description of each section and its functionality.
 * The component also adjusts its layout based on the device's screen size.
 */
import React from 'react';
import './styles.css';
import useCheckMobile from "../../hooks/useCheckMobile";
import { MdOutlineHelp } from "react-icons/md";
import { FaComments, FaShoppingBag, FaGift, FaMapMarkerAlt, FaExchangeAlt } from "react-icons/fa";
import { Divider } from "@mui/material";

const HelpPage = () => {
    const isMobile = useCheckMobile();
    const mobileClass = isMobile ? 'mobile' : '';

    return (
        <div className={`help-page-outer-container ${mobileClass}`}>
            <div className={`help-page-container ${mobileClass}`}>
                <div className="help-header">
                    <MdOutlineHelp size={24} style={{ marginRight: '10px' }} />
                    Help
                </div>
                <Divider style={{ width: '100%', marginBlock: '15px' }} />

                <div className="help-section">
                    <h2 className="section-heading">
                        <FaComments size={18} style={{ marginRight: '8px' }} />
                        Forum
                    </h2>
                    <p>
                        Forum posts are general discussions. You can create a new post, comment on existing ones,
                        and engage in conversations with other users.
                    </p>
                    <p>
                        If you have specific questions or need assistance, you can post in the forum and other
                        community members may help you.
                    </p>
                </div>

                <div className="help-section">
                    <h2 className="section-heading">
                        <FaShoppingBag size={18} style={{ marginRight: '8px' }} />
                        Second Hand Sales
                    </h2>
                    <p>
                        In the Second Hand Sales section, users can list items for sale. Interested buyers can
                        message the seller using the message button on each post.
                    </p>
                    <p>
                        If the seller decides to sell the item to a user, they can meet in person to complete the
                        transaction. Once sold, the seller should mark the post as "Sold" to inform other users.
                    </p>
                </div>

                <div className="help-section">
                    <h2 className="section-heading">
                        <FaGift size={18} style={{ marginRight: '8px' }} />
                        Donation
                    </h2>
                    <p>
                        Similar to Second Hand Sales, the Donation section allows users to offer items for free.
                        Interested users can message the donor to express their interest.
                    </p>
                    <p>
                        If the donor agrees to give the item to a specific user, they can arrange a meeting to
                        complete the donation. Donors should mark the post as "Claimed" once the item is taken.
                    </p>
                </div>

                <div className="help-section">
                    <h2 className="section-heading">
                        <FaMapMarkerAlt size={18} style={{ marginRight: '8px' }} />
                        Lost and Found
                    </h2>
                    <p>
                        Use the Lost and Found section to post information about items found on campus. Include
                        images and details about the found item.
                    </p>
                    <p>
                        If you've lost an item, you can message the person who found it to reclaim it. Once the
                        item is returned, the post can be marked as "Resolved."
                    </p>
                </div>

                <div className="help-section">
                    <h2 className="section-heading">
                        <FaExchangeAlt size={18} style={{ marginRight: '8px' }} />
                        Borrow
                    </h2>
                    <p>
                        Borrow posts allow users to request to borrow specific items. If someone has the item you
                        need, they can message you to coordinate the borrowing.
                    </p>
                    <p>
                        Once the borrowing is complete, the person who requested the item should mark the post as
                        "Resolved" to indicate the successful transaction.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
