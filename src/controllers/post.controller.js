const express = require("express");

const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const app = express();


app.get("", async (req, res) => {
    try {
      const posts = await Post.find().populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
      return res.status(200).send({ posts: posts });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.post("", async (req, res) => {
    try {
      const post = await Post.create(req.body);
      return res.status(201).send({ post: post });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  app.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
      return res.status(200).send({ post: post });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  app.patch("/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
      return res.status(200).send(post);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      return res.status(200).send({ post: post });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  app.get("/:postId/comments",async(req,res)=>{
    try{
        const comments = await Comment.find({postId:req.params.postId}).lean().exec();
        return res.status(200).send(comments)
    }catch(err){
        return res.status(500).send({message:err.message})
    }
  })

  module.exports = app;