export interface PostsInterface{
    userId:number;
    id:number;
    title:string;
    body:string;
}

export interface CreatePostsInterface{
    title:string;
    body:string;
    userId:number;
}