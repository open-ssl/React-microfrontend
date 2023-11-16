const express = require("express");
const mongoose = require("mongoose");
const { db, port, host } = require("./configuration");
const { connectDb } = require("./helpers/db");

const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`Our host ${host}`);
    console.log(`Our database ${db}`);
  });
};

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
