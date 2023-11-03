const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

const addComment = async (text, blogId, userId) => {
  try {
    const comment = Comment({
      text: text,
      blogId: blogId,
      userId: userId,
      created_at: new Date(),
      likes: [],
    });
    const data = await comment.save();
    return { data: data, error: null };
  } catch (e) {
    console.log(e.message, "error in addComment");
    return { data: null, error: e };
  }
};

const updateCommentArray = async (_id, blogData) => {
  const { data } = blogData;
  data.comments.push(_id);
  try {
    await data.save();
  } catch (e) {
    console.log("updateCommentArray Error", e.message);
    return e;
  }
};

const getCommentsOfBlog = async (blogId, page, LIMIT) => {
  try {
    const data = await Comment.find({ blogId: blogId })
      .populate({ path: "userId", select: ["username", "name"] })
      .skip(page * LIMIT)
      .limit(LIMIT);
    return { data: data, error: null };
  } catch (e) {
    console.log(e.message, "error in getCommentsofBlog");
    return { data: null, error: e };
  }
};

const fetchCommentById = async (commentId) => {
  try {
    const data = await Comment.findOne({ _id: commentId });
    return { data: data, error: null };
  } catch (e) {
    console.log(e, "error in fetchCommentById");
    return { data: null, error: e };
  }
};

const updateLikes = async (likes, commentData) => {
  const { data } = commentData;
  try {
    const res = await data.save();
    const commentData = await Comment.findById(res._id).populate({ path: "userId", select: ["name", "username"] });
    return { data: commentData, error: null };
  } catch (e) {
    console.log(e.message, "updateLikes error");
    return { error: e, data: null };
  }
};
module.exports = { addComment, updateCommentArray, getCommentsOfBlog, fetchCommentById, updateLikes };
