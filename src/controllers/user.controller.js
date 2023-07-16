const express = require("express");

const User = require("../models/user.model");
const app = express()

app.get("", async (req, res) => {
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
  app.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      return res.status(200).send({ user: user });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  //set user post operation
  
  app.post("", async (req, res) => {
    try {
      const user = await User.create(req.body);
      return res.status(201).send({ user: user });
    } catch (err) {
      return req.status(500).send({ message: err.message });
    }
  });
  
  app.patch("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  
  app.delete("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  

  module.exports =app;