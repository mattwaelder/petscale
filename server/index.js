require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const controller = require("./controller");

const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Require the upload middleware
// const upload = require("./upload");

//////////////////////////////////////////////

app.get("/users", (req, res) => {
  console.log("fetch", req.query.user);
  controller.getByUser(req.query.user, res);
});

// app.post("/csv", (req, res) => {
//   // console.log("csv", req);
//   controller.createCsv(req, res);
// });

app.post("/upload", (req, res) => {
  console.log("post from csv");
  // console.log(req.body);

  // let body = req.body;
  // body.data = JSON.parse(req.body.data);
  // console.log(body);

  controller.uploadCsv(req, res);
});

app.post("/users", (req, res) => {
  console.log("post");
  controller.postByUser(req, res);
});

app.post("/users/pet", (req, res) => {
  console.log("post new pet");
  controller.postPetByUser(req, res);
});

app.delete("/entries", (req, res) => {
  console.log("del");
  controller.deleteById(req, res);
});

app.delete("/delete/pets/", (req, res) => {
  console.log("del pet data");
  controller.deleteByPet(req, res);
});

//////////////////////////////////////////////

// let PORT = process.env.PORT || 3456;
let PORT = process.env.SERVER_PORT || 3030;

app.listen(PORT);
console.log(
  `Listening at port: ${PORT}, server port: ${process.env.SERVER_PORT}, port: ${process.env.PORT}, NODE_ENV: ${process.env.NODE_ENV}`
);
