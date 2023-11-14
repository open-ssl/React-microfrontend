const express = require("express");
const mongoose = require("mongoose");
const { db, port, host } = require("./configuration");
const { connectDb } = require("./helpers/db");

const app = express();

const postSchema = new mongoose.Schema({
  name: String
});
const Post = mongoose.model("Post", postSchema);

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`Our host ${host}`);
    console.log(`Our database ${db}`);
    
    const post1 = new Post({ name: "First post again!" });
    Post.find(function(err, posts) {
      if (err) return console.error(err);
      console.log("posts", posts);
    })
  });
};

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
