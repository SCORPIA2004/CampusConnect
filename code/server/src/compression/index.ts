/**
 * Compresses an image using the sharp library.
 * 
 * @param image - The base64 encoded image to be compressed.
 * @returns The base64 encoded compressed image.
 * @throws If an error occurs during the compression process.
 * 
 * @remarks
 * This function takes a base64 encoded image and compresses it using the sharp library.
 * The compressed image is resized to a maximum width and height of 800 pixels, with a quality of 80%.
 * The function returns the base64 encoded compressed image.
 * If an error occurs during the compression process, an error message is logged and null is returned.
 */
import sharp from 'sharp';

export const compressImage = async (image: string) => {
    const [imageHeader, uri] = image.split(';base64,');
    const imageBuffer = Buffer.from(uri, 'base64');

    try {
        const compressedImageBuffer = await sharp(imageBuffer).resize(800, 800, {fit: 'inside',}).jpeg({quality: 80}).toBuffer();
        return `${imageHeader};base64,${compressedImageBuffer.toString('base64')}`;
    } catch (err) {
        console.error('Error:', err);
        return null;
    }
};

