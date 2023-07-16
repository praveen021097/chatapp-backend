const express = require("express");

const connect = require("./config.js/db")
const userController = require("./controllers/user.controller");
const postController =require("./controllers/post.controller");
const commentController = require("./controllers/comment.controller")
const app = express();
app.use(express.json());

app.use("/users",userController);
app.use("/posts",postController);
app.use("/comments",commentController);



//step 1 create schemas
//step 2 create models







// user crud operations


//post crud



 
//comments crud



app.listen(5000, async () => {
  try {
   await connect();
  } catch (err) {
    console.log(err);
  }
  console.log("server is listening port 5000");
});
