const express = require("express");
const { db, port, host } = require("./configuration");
const { connectDb } = require("./helpers/db");

const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started auth service on port ${port}`);
    console.log(`Our host ${host}`);
    console.log(`Our database ${db}`);
  });
};

app.get("/test", (req, res) => {
  res.send("Our auth server is working correctly");
});

app.get("/api/currentUser", (req, res) => {
  res.json({
    "id": "789",
    "email": "foo@buzz.com",
  })
});

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
