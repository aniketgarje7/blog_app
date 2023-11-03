const express = require('express');
require('dotenv').config();
const db = require('./config/db.js');
const userRoutes = require('./routes/user.js');
const blogRoutes = require('./routes/blog.js');

const app = express();
const PORT = process.env.PORT;
const CORS = process.env.CORS_URL
// cors
const cors = require('cors');
app.use(cors({
    origin: CORS
}));

// mongodb connection
const makeConnection = db.connectDB();

// middlewares
app.use(express.json());

// routes
app.use('/user',userRoutes);
app.use('/blog',blogRoutes);

app.listen(PORT,()=>{
 console.log('Server is running on port'+PORT);
})