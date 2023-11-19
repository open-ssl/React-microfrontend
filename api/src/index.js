const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const { db, port, host, authApiUrl } = require("./configuration");
const { connectDb } = require("./helpers/db");
const { response } = require("express");

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

app.get("/test_user", (req, res) => {
  axios.get(authApiUrl + "/currentUser").then(response => {
    res.json({
      dataForTestUser:  true,
      data:  response.data,
    });  
  })
});

app.get("/api/test_data", (req, res) => {
  res.json({
    testDataStatus: true,
    testDataValue: 17,
  })  
});

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
