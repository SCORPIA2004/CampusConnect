/**
 * Defines the interfaces and types related to posts in the application.
 * 
 * @remarks
 * This file contains the interfaces and types that define the structure of different types of posts in the application.
 * It includes the base post interface, as well as interfaces for specific types of posts such as borrow, sale, lost, and forum posts.
 * Additionally, it defines the post query type used for querying posts.
 * The purpose of this file is to provide a consistent and structured way to define and work with posts in the application.
 */
import Joi from "joi";
import {bilkentEmailValidation} from "@/schemas/globalSchemas";

export interface BasePost {
    _id: string;
    title: string;
    description: string;
    creatorEmail: string;
    dateCreated: Date;
    type: "FORUM" | "LOST" | "SALE" | "DONATE" | "BORROW";
}


export interface BorrowPost extends BasePost{
    duration: number;
    isResolved: boolean;
    type: "BORROW";
}

export interface SalePost extends BasePost{
    price: number;
    images: String[]; // images in base64 format
    isResolved: boolean;
    type: "SALE" | "DONATE";

}

export interface LostPost extends BasePost{
    images: String[]; // images in base64 format
    isResolved: boolean;
    type: "LOST";
}

export interface ForumPost extends BasePost{
    isAnonymous: boolean;
    images: String[]; // images in base64 format
    parentPostID: string;
    likes: string[]; //array of emails
    type: "FORUM";
}

export interface PostQuery {
    type: "FORUM" | "LOST" | "SALE" | "DONATE" | "BORROW";
    creatorEmail: string;
    viewResolved: boolean;
    postID: string;
    isComment: boolean;
    keywords: string | null;
    sortByNewest: boolean;
    sortByPrice: boolean;
    sortByLikes: boolean;
    sortByBorrowDuration: boolean;
}

export type Post = ForumPost | LostPost | SalePost | BorrowPost

console.log("hi")