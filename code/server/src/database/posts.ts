/**
 * Provides database operations for posts.
 * 
 * @remarks
 * This module contains functions for adding, retrieving, updating, and deleting posts in the database.
 * It also includes a query builder function for constructing complex queries.
 */

import {postCollection, userCollection} from "@/database/index";
import {BasePost, Post, PostQuery} from "@/interfaces/postModel";

/**
 * Adds a post to the database.
 * 
 * @param post - The post to be added.
 * @returns A promise that resolves when the post is successfully added.
 */
export const db_addPost = async (post: Post) => {
    await postCollection.insertOne(post)
}

/**
 * Retrieves a post from the database.
 * 
 * @param postID - The ID of the post to retrieve.
 * @returns A promise that resolves with the retrieved post.
 */
export const db_getPost = async (postID: string) => {
    return await postCollection.findOne({_id: postID});
}

/**
 * Deletes a post from the database.
 * 
 * @param postID - The ID of the post to delete.
 * @returns A promise that resolves when the post is successfully deleted.
 */
export const db_deletePost = async (postID: string) => {
    await postCollection.deleteOne({_id: postID})
}

/**
 * Retrieves the children posts of a given post.
 * 
 * @param postID - The ID of the parent post.
 * @returns A promise that resolves with an array of children posts.
 */
export const db_getChildrenForumPosts = async (postID: string) => {
    return await postCollection.find({parentPostID: postID}).toArray();
}

/**
 * Updates a post in the database.
 * 
 * @param postID - The ID of the post to update.
 * @param changes - The changes to apply to the post.
 * @returns A promise that resolves when the post is successfully updated.
 */
export const db_updatePost = async (postID: string, changes: any) => {
    const res = await postCollection.updateOne({_id: postID}, {
        $set: changes
    });
}

/**
 * Retrieves posts from the database based on a query.
 * 
 * @param query - The query object specifying the search criteria.
 * @returns A promise that resolves with an array of matching posts.
 */
export const db_getPostByQuery = async (query: any) => {
    return await postCollection.find(query).toArray()
}

/**
 * Builds a query object for retrieving posts based on specific criteria.
 * 
 * @param query - The query object specifying the search criteria.
 * @returns The constructed query object.
 */
export const db_postQueryBuilder = (query: PostQuery) => {
    const filter: any = {
        $and: [],
        $or: []
    };

    if (query.type) {
        filter.$and.push({type: query.type});
    }

    if (query.creatorEmail) {
        filter.$and.push({creatorEmail: query.creatorEmail});
    }

    if (query.viewResolved) {
        filter.$and.push({isResolved: query.viewResolved});
    }

    if (query.keywords) {
        filter.$or.push({title: {$regex: query.keywords, $options: 'i'}});
        filter.$or.push({description: {$regex: query.keywords, $options: 'i'}});
    }

    if (query.postID) {
        filter.$and.push({_id: query.postID});
    }

    if (query.isComment) {
        filter.$and.push({parentPostID: {$ne: null}});
    } else {
        filter.$and.push({parentPostID: null});
    }

    if (filter.$or.length === 0) {
        delete filter.$or;
    }

    if (filter.$and.length === 0) {
        delete filter.$and;
    }

    return filter;
}

