


/**
 * Renders a carousel of images.
 * 
 * @param {Array<string>} images - The array of base64 encoded images to be displayed in the carousel.
 * @returns {JSX.Element} The JSX element representing the images carousel.
 */
import "./styles.css";
import Base64Image from "../Base64Image";
import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const ImagesCarousel = ({images}) => {

    return (
        <div className={"images-carousel"} onClick={(e) => e.stopPropagation()}>
            <Carousel
                swipeable={images.length > 1}
                showDots={images.length > 1}
                arrows={images.length > 1}
                responsive={responsive}
                autoPlay={false}
                transitionDuration={200}
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >

                {
                    images.map((image) => {
                        return (
                            <div className={"image-container"}>
                                <Base64Image base64String={image} className={"post-image"}/>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}
export default ImagesCarousel