export const CommentService = {
   createComment,
   getComments,
   likeComment
};
const token = localStorage.getItem('ba_token');
const header = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "x-blog":`${token}`
}

async function createComment(data){
    const requestOptions = {
        method: "POST",
        headers: header,
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
        headers: header,
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
        headers: header,
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