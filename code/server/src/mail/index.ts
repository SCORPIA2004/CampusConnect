/**
 * Initializes and provides functionality for sending emails using Nodemailer.
 * 
 * @remarks
 * This module exports a mailTransporter object that is used to send emails using Nodemailer.
 * The startMailService function initializes the mailTransporter by creating a transport object with the specified service and authentication details.
 * The sendMail function takes an email address, subject, and body as parameters and sends an email using the mailTransporter.
 * If an error occurs during the sending process, an error message is logged to the console.
 */

import nodemailer from "nodemailer";
import {SentMessageInfo} from "nodemailer/lib/smtp-transport";

export let mailTransporter: nodemailer.Transporter<SentMessageInfo>;

/**
 * Initializes the mailTransporter object.
 */
export const startMailService = () => {
    mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bilkent.campus.connect2@hotmail.com',
            pass: 'BilkentCampusConnect$$'
        }
    });
}

/**
 * Sends an email using the mailTransporter object.
 * 
 * @param email - The recipient's email address.
 * @param subject - The subject of the email.
 * @param body - The body of the email.
 */
export const sendMail = async (email: string, subject: string, body: string) => {

    const mailOptions = {
        from: 'CampusConnect🏫 <bilkent.campus.connect@hotmail.com>',
        to: email,
        subject,
        html: body,
    };

    try {
        await mailTransporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}