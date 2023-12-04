import { AuthHeader } from "../headers/authHeader";

export const blogService = {
    createBlog,
    getBlogs,
    editBlog,
    deleteBlog,
    likeBlog,
    rewriteTextByAI,
};

async function createBlog(data){
    const requestOptions = {
        method: "POST",
        headers: AuthHeader(),
        body: JSON.stringify(data),
    };
    return fetch(`${process.env.REACT_APP_API}blog/create`, requestOptions)
        .then((res)=>res.json())
        .then((response) => {
            return response;
        })
        .catch(e=>{
            console.log(e,'error in create blog');
        });
};

async function getBlogs(data){
    const requestOptions = {
        method: "GET",
        headers: AuthHeader(),
    };
    return fetch(`${process.env.REACT_APP_API}blog/get-blogs?page=${data.page}`, requestOptions)
        .then((res)=>res.json())
        .then((response) => {
            return response;
        })
        .catch(e=>{
            console.log(e,'error in get blog');
        });
};

async function editBlog(data){
    const requestOptions = {
        method: "PUT",
        headers: AuthHeader(),
        body: JSON.stringify(data),
    };
    return fetch(`${process.env.REACT_APP_API}blog/update-blog`, requestOptions)
        .then((res)=>res.json())
        .then((response) => {
            return response;
        })
        .catch(e=>{
            console.log(e,'error in edit blog');
        });
};

async function deleteBlog(data){
    const requestOptions = {
        method: "DELETE",
        headers: AuthHeader(),
        body: JSON.stringify(data),
    };
    return fetch(`${process.env.REACT_APP_API}blog/delete-blog`, requestOptions)
        .then((res)=>res.json())
        .then((response) => {
            return response;
        })
        .catch(e=>{
            console.log(e,'error in delete blog');
        });
};

async function likeBlog(data){
    const requestOptions = {
        method: "PUT",
        headers: AuthHeader(),
        body: JSON.stringify(data),
    };
    return fetch(`${process.env.REACT_APP_API}blog/like`, requestOptions)
        .then((res)=>res.json())
        .then((response) => {
            return response;
        })
        .catch(e=>{
            console.log(e,'error in like service');
        });
};

async function rewriteTextByAI(data){
    const requestOptions = {
        method: "POST",
        headers: AuthHeader(),
        body: JSON.stringify(data),
    };
    return fetch(`${process.env.REACT_APP_API}blog/refactor`, requestOptions)
        .then((res)=>res.json())
        .then((response) => {
            return response;
        })
        .catch(e=>{
            console.log(e,'error in refactorAicontent service');
        });
};