import { AuthHeader } from "../headers/authHeader";

export const blogService = {
    createBlog,
    getBlogs,
    editBlog,
    deleteBlog,
    likeBlog,
};
const token = localStorage.getItem('ba_token');
const header = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "x-blog":`${token}`
}

async function createBlog(data){
    const requestOptions = {
        method: "POST",
        headers: header,
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
        headers: header,
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
        headers: header,
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
        headers: header,
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