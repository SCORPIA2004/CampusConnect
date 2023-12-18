/**
 * Represents a message in a chat.
 */
export interface Message {
    /**
     * The email address of the sender.
     */
    senderEmail: string;

    /**
     * The text content of the message.
     */
    text: string;

    /**
     * The image attached to the message, if any.
     */
    image: ImageData | undefined;

    /**
     * The date and time when the message was sent.
     */
    dateSent: Date;
}

export default interface Chat {
    _id: string;
    participant0Email: string;
    participant1Email: string;
    messages: Message[];
}

console.log("hi")