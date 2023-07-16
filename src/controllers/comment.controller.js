const express = require("express");
const Comment = require("../models/comment.model");
const app = express();

app.get("",async(req,res)=>{
    try{
        const comments = await Comment.find().populate({path:"postId",select:["title","id"],populate:{path:"userId",select:{firstName:1,email:1}}}).populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
        return res.status(200).send({"comments":comments})

    }catch(err){
        return res.status(500).send({message:err.message})
    }
 })

 app.get("/:id",async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.is).populate({path:"postId",select:["title"],populate:{path:"userId",select:{firstName:1,email:1}}}).populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
        return res.status(200).send({"comment":comment})

    }catch(err){
        return res.status(500).send({message:err.message})
    }
 })


 app.post("",async(req,res)=>{
    try{
        const comment = await Comment.create(req.body);
        return res.status(201).send({"comment":comment})

    }catch(err){
        return res.status(500).send({message:err.message})
    }
 })
 app.delete("/:id",async(req,res)=>{
    try{
        const comment = await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).send({"comment":comment})

    }catch(err){
        return res.status(500).send({message:err.message})
    }
 })


 app.patch("/:id",async(req,res)=>{
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        }).populate({path:"postId",select:["title"],populate:{path:"userId",select:{firstName:1,email:1}}}).populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
        return res.status(201).send({"comment":comment})

    }catch(err){
        return res.status(500).send({message:err.message})
    }
 })

 module.exports=app;