const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
      body: { type: String, required: true },
      postId: {
        type: mongoose.Schema.ObjectId,
        ref: "post",
        required: true,
      },
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("comment", commentSchema);