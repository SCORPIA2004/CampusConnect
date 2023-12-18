/**
 * Renders an image from a base64 encoded string.
 * 
 * @component
 * @param {string} base64String - The base64 encoded image string.
 * @param {object} rest - Additional props to be passed to the <img> element.
 * @returns {JSX.Element} - The rendered <img> element.
 */
const Base64Image = ({ base64String, ...rest }) => {
    return (
        <img src={`${base64String}`} alt="image" {...rest} />
    );
};

export default Base64Image;