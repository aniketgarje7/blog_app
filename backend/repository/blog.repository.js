const Blog = require("../models/Blog");

const saveToDB = async (title, text, userId) => {
  try {
    const blog = Blog({
      title: title,
      text: text,
      created_at: Date.now(),
      userId: userId,
      likes: [],
      comments: [],
    });
    const data = await blog.save();
    const savedBlog = await fetchBlogById(data._id);
    return { data: savedBlog.data, error: null };
  } catch (error) {
    console.log("DB: saveToDB blog error");
    return { data: null, error: error };
  }
};

const fetchBlogs = async (page, LIMIT) => {
  try {
    const data = await Blog.find({})
      .sort({created_at:1})
      .populate({ path: "userId", select: ["name", "username"] })
      .skip(page * LIMIT)
      .limit(LIMIT);
      
    return { data: data, error: null };
  } catch (error) {
    console.log("fetchBlogs error", error);
    return { data: null, error: error };
  }
};

const fetchBlogById = async (blogId) => {
  try {
    const data = await Blog.findOne({ _id: blogId }).populate({ path: "userId", select: ["name", "username"] });
    return { data: data, error: null };
  } catch (error) {
    console.log("fethcBlogByID error", error);
    return { data: null, error: error };
  }
};

const updateBlogById = async (title, text, blogId) => {
  try {
    const blog = await Blog.findById({ _id: blogId });
    blog.title = title;
    blog.text = text;
    blog.updated_at = new Date();
    const data = await blog.save();
    const updatedBlog = await fetchBlogById(data._id);
    return { data: updatedBlog.data, error: null };
  } catch (error) {
    console.log("updateBlog error", error);
    return { data: null, error: error };
  }
};

const deleteBlogById = async (blogId) => {
  try {
    const data = await Blog.findByIdAndRemove({ _id: blogId });
    return { data: data, error: null };
  } catch (error) {
    console.log("deleteBlogById error", error);
    return { data: null, error: error };
  }
};

const likeBlogById = async (likes, blogId) => {
  try {
    const data = await Blog.findByIdAndUpdate({ _id: blogId }, { likes });
    const updatedData = await Blog.findById(blogId).populate({ path: "userId", select: ["name", "username"] });
    return { data: updatedData, error: null };
  } catch (error) {
    console.log("likeBlog error", error);
    return { data: null, error: error };
  }
};
module.exports = { saveToDB, fetchBlogs, fetchBlogById, updateBlogById, deleteBlogById, likeBlogById };
