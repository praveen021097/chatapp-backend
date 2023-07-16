const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
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
  
  module.exports = mongoose.model("post", postSchema);