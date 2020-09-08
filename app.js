const express = require("express");
const app = express();
const port = 3000;
const { Client } = require("pg");
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize("database", "mbrother", "12233445", {
//   host: "localhost",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000,
//   },
// });

// sequelize.define("user", {
//   firstname: { type: Sequelize.STRING },
// });

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(port, () => {
  console.log("connected");
});
