/**
 * Renders a sales image carousel component.
 * @param {Array} images - An array of base64 encoded images to be displayed in the carousel.
 * @returns {JSX.Element} - The sales image carousel component.
 * @remarks
 * This component displays a carousel of sales images.
 * It takes an array of base64 encoded images as input and renders the carousel with the provided images.
 * The carousel supports responsive design and can display different number of images based on the device type.
 * The component also provides custom dot navigation for the carousel.
 */
import "./styles.css"
import Base64Image from "../Base64Image";
import React, {useEffect} from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const CustomDot = ({ onClick, images, ...rest }) => {
    const {
        onMove,
        index,
        active,
        carouselState: { currentSlide, deviceType }
    } = rest;
    const carouselItems = images.map((item, i) => (
        <img
            key={i}
            src={item}
            alt={`Carousel Item ${i}`}
            className={`sales-image ${active ? 'active' : ''}`}
        />
    ))

    return (
        <button
            className={`sales-image-button ${active ? 'active' : ''}`}
            onClick={() => onClick()}
            onMouseEnter={() => onClick()}
        >
            {React.Children.toArray(carouselItems)[index]}
        </button>
    );
};

const SalesImageCarousel = ({images}) => {

    return (
        <div className={"sales-images-carousel-container"} onClick={(e) => e.stopPropagation()}>
            <Carousel
                showDots={images.length > 1}
                responsive={responsive}
                infinite={true}
                autoPlay={false}
                transitionDuration={200}
                arrows={false}
                customDot={<CustomDot images={images} className={'sales-custom-dot'}/>}
                renderDotsOutside
            >
                {
                    images.map((image) => {
                        return (
                            <div className={"sales-image-container"}>
                                <Base64Image base64String={image} className={"sales-post-image"}/>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}
export default SalesImageCarousel