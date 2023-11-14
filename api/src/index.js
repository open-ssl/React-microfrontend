const express = require("express");
const { db, port, host } = require("./configuration");
const { connectDb } = require("./helpers/db");

const app = express();

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`Our host ${host}`);
    console.log(`Our database ${db}`);
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
