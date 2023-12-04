const express = require('express');
const { registerUser, logInUser, getUser, getUsersByQuery, followUser, unFollowUser } = require('../controllers/user.controllers');
const {Auth} = require('../middlewares/Auth.middlewares');

const app = express();

app.post('/register',registerUser);
app.post('/login',logInUser);
app.get('/get-data',Auth,getUser);
app.get('/search-user',Auth,getUsersByQuery);
app.put('/follow-user',Auth,followUser);
app.put('/unfollow-user',Auth,unFollowUser);

module.exports = app;