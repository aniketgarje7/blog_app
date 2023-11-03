const mongoose = require("mongoose");
const schema = mongoose.Schema;

const CommentShcema = new schema({
  text: {
    type: String,
    require: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  created_at: {
    type: Date,
    require: true,
    immutable: true,
  },
  updated_at: {
    type: Date,
    require: true,
  },
});

const Comment = mongoose.model.Comment || mongoose.model("Comment", CommentShcema);

module.exports = Comment;
