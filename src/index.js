const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const connect = () => {
  return mongoose.connect(
    "mongodb+srv://chatapp:praveen123@cluster0.9p9cjvm.mongodb.net/"
  );
};

//step 1 create schemas
//step 2 create models

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//model of user work as collection
const User = mongoose.model("user", userSchema);

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

const Post = mongoose.model("post", postSchema);

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

const Comment = mongoose.model("comment", commentSchema);

// user crud operations

app.get("/user", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.status(200).send({ users: users });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "something went wrong.. try again later" });
  }
});

//single user access
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//set user post operation

app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send({ user: user });
  } catch (err) {
    return req.status(500).send({ message: err.message });
  }
});

app.patch("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//post crud

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
    return res.status(200).send({ posts: posts });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(201).send({ post: post });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
    return res.status(200).send({ post: post });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
app.patch("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    return res.status(200).send({ post: post });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

 app.get("/comments",async(req,res)=>{
    try{
        const comments = await Comment.find().populate({path:"postId",select:["title"],populate:{path:"userId",select:{firstName:1,email:1}}}).populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
        return res.status(200).send({"comments":comments})

    }catch(err){
        return res.status(500).send({message:err.message})
    }
 })

 app.get("/comments/:id",async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.is).populate({path:"postId",select:["title"],populate:{path:"userId",select:{firstName:1,email:1}}}).populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
        return res.status(200).send({"comment":comment})

    }catch(err){
        return res.status(500).send({message:err.message})
    }
 })


 app.post("/comments",async(req,res)=>{
    try{
        const comment = await Comment.create(req.body);
        return res.status(201).send({"comment":comment})

    }catch(err){
        return res.status(500).send({message:err.message})
    }
 })
 app.delete("/comments/:id",async(req,res)=>{
    try{
        const comment = await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).send({"comment":comment})

    }catch(err){
        return res.status(500).send({message:err.message})
    }
 })


 app.patch("/comments/:id",async(req,res)=>{
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        }).populate({path:"postId",select:["title"],populate:{path:"userId",select:{firstName:1,email:1}}}).populate({path:"userId",select:{firstName:1,email:1}}).lean().exec();
        return res.status(201).send({"comment":comment})

    }catch(err){
        return res.status(500).send({message:err.message})
    }
 })
//comments crud
app.listen(5000, async () => {
  try {
    connect();
  } catch (err) {
    console.log(err);
  }
  console.log("server is listening port 5000");
});
