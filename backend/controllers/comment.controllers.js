const Joi = require("joi");
const { addComment, updateCommentArray, getCommentsOfBlog, updateLikes, fetchCommentById } = require("../repository/comment.repository");
const { fetchBlogById } = require("../repository/blog.repository");

const createComment = async (req, res) => {
  const schema = Joi.object({
    text: Joi.string().required(),
    blogId: Joi.required(),
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
  const { userId } = req.locals;
  const { text, blogId } = req.body;
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
  const Commentdata = await addComment(text, blogId, userId);
  if (Commentdata.error) {
    return res.status(400).send({
      status: 400,
      message: "Database error",
      error: { message: "Database error" },
      data: false,
    });
  }
  const { _id } = Commentdata.data;
  await updateCommentArray(_id, blogData);
  return res.status(200).send({
    status: 200,
    message: "Comment added successfully.",
    error: false,
    data: Commentdata.data,
  });
};

const getComments = async (req, res) => {
  const schema = Joi.object({
    blogId: Joi.required(),
  });
  const isValid = schema.validate(req.params);
  if (isValid.error) {
    return res.status(400).send({
      status: 400,
      message: isValid.error.details[0].message,
      error: isValid.error.details[0],
      data: false,
    });
  }
  const { blogId } = req.params;
  const { page } = req.query;
  const LIMIT = 5;
  const comments = await getCommentsOfBlog(blogId, page, LIMIT);
  if (comments.error) {
    return res.status(400).send({
      status: 400,
      message: "cannot get comments",
      error: comments.error,
      data: false,
    });
  }

  return res.status(200).send({
    status: 200,
    message: "comments are fetched.",
    data: comments.data,
    error: false,
  });
};

const likeComment = async (req, res) => {
  const { commentId } = await req.body;
  const commentData = await fetchCommentById(commentId);
  if (commentData.error) {
    return res.status(400).send({
      status: 400,
      message: "DB error",
      error: commentData.error,
      data: false,
    });
  } else if (!commentData.data) {
    res.status(400).send({
      status: 400,
      message: "Comment does not exist.",
      error: { message: "Comment does not exist" },
      data: false,
    });
  }
  const { userId } = req.locals;
  const { likes } = commentData.data;
  if (likes.includes(userId)) {
    // unlike
    const index = likes.indexOf(userId);
    likes.splice(index, 1);
  } else {
    // like
    likes.push(userId);
  }
  const updateData = await updateLikes(likes, commentData);
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
      message: "Comment is updated.",
      data: updateData.data,
      error: false,
    });
  }
};
module.exports = { createComment, getComments, likeComment };
