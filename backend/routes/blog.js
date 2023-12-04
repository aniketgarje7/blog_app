const express = require('express')
const app = express();
const {Auth} = require('../middlewares/Auth.middlewares');
const { createBlog, getAllBlogs, updateBlog, deleteBlog, likeBlog, refactorContent } = require('../controllers/blog.controllers');
const { createComment, getComments, likeComment } = require('../controllers/comment.controllers');

app.post('/create',Auth,createBlog);
app.get('/get-blogs',Auth,getAllBlogs);
app.put('/update-blog',Auth,updateBlog);
app.delete('/delete-blog',Auth,deleteBlog);
app.put('/like',Auth,likeBlog);
app.post('/comment',Auth,createComment);
app.get('/comments/:blogId',Auth,getComments);
app.put('/comment/like',Auth,likeComment);
app.post('/refactor',Auth,refactorContent);

module.exports = app;