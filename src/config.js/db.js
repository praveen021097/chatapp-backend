const mongoose = require("mongoose");

const connect = () =>{
    return mongoose.connect(
        "mongodb+srv://chatapp:praveen123@cluster0.9p9cjvm.mongodb.net/"
      );
}

module.exports=connect;