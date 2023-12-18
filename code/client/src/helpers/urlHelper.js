// A list of all the routes used in the application

const API_URL =
  "https://1fe3-139-179-211-243.ngrok-free.app";

const AUTH_ROUTE = API_URL + "/auth"

const POST_ROUTE = API_URL + "/posts"

const USER_ROUTE = API_URL + "/users"
export const GET_CHATS_REQ_URL = API_URL + "/chats"

export const LOGIN_REQ_URL = AUTH_ROUTE + "/login"

export const FORGOT_PASSWORD_REQ_URL = AUTH_ROUTE + "/forgot"

export const CREATE_USER_REQ_URL = USER_ROUTE

export const GET_USER_REQ_URL = USER_ROUTE

export const GET_POSTS_REQ_URL = POST_ROUTE

export const LIKE_POST_REQ_URL = POST_ROUTE + "/like"

export const CREATE_POST_REQ_URL = POST_ROUTE

export const UPDATE_POST_REQ_URL = POST_ROUTE

export const DELETE_POST_REQ_URL = POST_ROUTE

export const DELETE_USER_REQ_URL = USER_ROUTE

export const CHANGE_USER_REQ_URL = USER_ROUTE