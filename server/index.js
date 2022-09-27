require("dotenv").config();
const express = require("express");
const path = require("path");
const controller = require("./controller");

const database = require("./db.js");

const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use(morgan("dev"));

//////////////////////////////////////////////

app.get("/user", (req, res) => {
  controller.get(req, res);
});

app.post("/user", (req, res) => {
  controller.post(req, res);
});

//////////////////////////////////////////////

let PORT = process.env.port || 3456;

app.listen(PORT);
console.log(`Listening at port: ${PORT}`);
