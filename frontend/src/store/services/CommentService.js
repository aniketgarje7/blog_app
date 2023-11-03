import { AuthHeader } from "../headers/authHeader";

export const CommentService = {
   createComment,
   getComments,
   likeComment
};

async function createComment(data){
    const requestOptions = {
        method: "POST",
        headers: AuthHeader(),
        body: JSON.stringify(data),
    };
    return fetch(`${process.env.REACT_APP_API}blog/comment`, requestOptions)
        .then((res)=>res.json())
        .then((response) => {
            return response;
        })
        .catch(e=>{
            console.log(e,'error in create comment');
        });
};

async function getComments(data){
    const requestOptions = {
        method: "GET",
        headers: AuthHeader(),
    };
    return fetch(`${process.env.REACT_APP_API}blog/comments/${data.blogId}?page=${data.page}`, requestOptions)
        .then((res)=>res.json())
        .then((response) => {
            return response;
        })
        .catch(e=>{
            console.log(e,'error in get comments');
        });
};

async function likeComment(data){
    const requestOptions = {
        method: "PUT",
        headers: AuthHeader(),
        body: JSON.stringify(data),
    };
    return fetch(`${process.env.REACT_APP_API}blog/comment/like`, requestOptions)
        .then((res)=>res.json())
        .then((response) => {
            return response;
        })
        .catch(e=>{
            console.log(e,'error in likeComment service');
        });
};