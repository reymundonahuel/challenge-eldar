import { API_BASE, AUTH_BASE } from "./env.constants";

//Endpoints separados por "categoria"
export const EP_POSTS = {
    getPosts: API_BASE+'/posts',
    postPosts:API_BASE+'/posts',
    putPosts: API_BASE+'/posts/:id',
    deletePosts:API_BASE+'/posts/:id'
}

export const EP_AUTH ={
    login: AUTH_BASE+'/login'
}