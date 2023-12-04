const Joi = require("joi");
const { saveToDB, fetchBlogs, fetchBlogById, updateBlogById, deleteBlogById, likeBlogById } = require("../repository/blog.repository");
const { getAIResponse } = require("../utils/chatgptApi");
const {rewrite}  = require('../utils/chatgptPrompts');

const createBlog = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required().max(50),
    text: Joi.string().required().min(20).max(1000),
  });
  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: isValid.error.details[0].message,
      error: isValid.error.details[0],
      data: false,
    });
  }
  const { title, text } = req.body;
  const { userId } = req.locals;
  const blog = await saveToDB(title, text, userId);
  if (blog.error) {
    res.status(400).send({
      status: 400,
      message: "could not create blog,try after some time.",
      error: blog.error,
      data: false,
    });
  }
  return res.status(200).send({
    status: 200,
    message: "Blog created succesfully.",
    data: await blog.data,
    error: false,
  });
};

const updateBlog = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required().max(50),
    text: Joi.string().required().min(30).max(1000),
    blogId: Joi.string().required(),
  });
  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: isValid.error.details[0].message,
      error: isValid.error.details[0],
      data: false,
    });
  }
  const { blogId, text, title } = req.body;
  const blogData = await fetchBlogById(blogId);
  if (blogData.error) {
    return res.status(400).send({
      status: 400,
      message: "DB error",
      error: blogData.error,
      data: false,
    });
  } else if (!blogData.data) {
    return res.status(400).send({
      status: 400,
      message: "Blog does not exist.",
      error: { message: "Blog does not exist" },
      data: false,
    });
  }
  const { userId } = req.locals;
  const blogUserId = blogData.data.userId._id.toString();
  if (userId !== blogUserId) {
    return res.status(400).send({
      status: 400,
      message: "You can not upadate this blog.",
      data: false,
      error: { message: "You can not update this blog." },
    });
  }
  const updateData = await updateBlogById(title, text, blogId);
  if (updateData.error) {
    return res.status(400).send({
      status: 400,
      message: "DB error",
      error: blogData.error,
      data: false,
    });
  } else {
    return res.status(200).send({
      status: 200,
      message: "Blog is updated.",
      data: updateData.data,
      error: false,
    });
  }
};

const getAllBlogs = async (req, res) => {
  const page = Number(req.query.page) || 0;
  const LIMIT = 10;
  const blogData = await fetchBlogs(page, LIMIT);
  if (blogData.error) {
    return res.status(400).send({
      status: 400,
      message: "error fetching blogs from database",
      error: (await blogData).error,
      data: false,
    });
  } else {
    return res.status(200).send({
      status: 200,
      message: "Fetched all blogs",
      data: blogData.data.reverse(),
      error: false,
    });
  }
};

const deleteBlog = async (req, res) => {
  const schema = Joi.object({
    blogId: Joi.string().required(),
  });
  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: isValid.error.details[0].message,
      error: isValid.error.details[0],
      data: false,
    });
  }
  const { blogId } = req.body;
  const blogData = await fetchBlogById(blogId);
  if (blogData.error) {
    return res.status(400).send({
      status: 400,
      message: "DB error",
      error: blogData.error,
      data: false,
    });
  } else if (!blogData.data) {
    res.status(400).send({
      status: 400,
      message: "Blog does not exist.",
      data: false,
      error: { message: "Blog does not exist." },
    });
  }
  const { userId } = req.locals;
  const blogUserId = blogData.data.userId._id.toString();
  if (userId !== blogUserId) {
    return res.status(400).send({
      status: 400,
      message: "You can not delete this blog.",
      error: { message: "You can not delete this blog." },
      data: false,
    });
  }
  const deleteData = await deleteBlogById(blogId);
  if (deleteBlog.error) {
    return res.status(400).send({
      status: 400,
      message: "DB error",
      error: deleteData.error,
      data: false,
    });
  }
  return res.status(200).send({
    status: 200,
    message: "blog deleted permanently.",
    data: deleteData.data,
    error: false,
  });
};

const likeBlog = async (req, res) => {
  const { blogId } = await req.body;
  const blogData = await fetchBlogById(blogId);
  if (blogData.error) {
    return res.status(400).send({
      status: 400,
      message: "DB error",
      error: blogData.error,
      data: false,
    });
  } else if (!blogData.data) {
    res.status(400).send({
      status: 400,
      message: "Blog does not exist.",
      error: { message: "Blog does not exist" },
      data: false,
    });
  }
  const { userId } = req.locals;
  const { likes } = blogData.data;
  if (likes.includes(userId)) {
    // unlike
    const index = likes.indexOf(userId);
    likes.splice(index, 1);
  } else {
    // like
    likes.push(userId);
  }
  const updateData = await likeBlogById(likes, blogId);
  if (updateData.error) {
    return res.status(400).send({
      status: 400,
      message: "DB error",
      error: blogData.error,
      data: false,
    });
  } else {
    return res.status(200).send({
      status: 200,
      message: "Blog is updated.",
      data: updateData.data,
      error: false,
    });
  }
};

const refactorContent = async (req, res) => {
  const { content } = req.body;
  const schema = Joi.object({
    content: Joi.string().required().min(20).max(1000),
  });
  const isValid = schema.validate(req.body);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: isValid.error.details[0].message,
      error: isValid.error.details[0],
      data: false,
    });
  }
  const refactorContent =`${rewrite}:${content}`;
  const response = await getAIResponse(refactorContent);
  if (response.error) {
    return res.status(400).send({
      status: 400,
      message: "could not get AI response.",
      error: response.error,
      data: false,
    });
  }
  return res.status(200).send({
      status: 200,
      message: "Successfully got AI response.",
      data: response.data,
      error: false,
    });
  
};
module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog, likeBlog,refactorContent };
