require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const controller = require("./controller");

const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//////////////////////////////////////////////

app.get("/users", (req, res) => {
  // console.log("fetch", req.query.user);
  controller.getByUser(req.query.user, res);
});

app.post("/users", (req, res) => {
  console.log("post");
  controller.postByUser(req, res);
});

app.delete("/entries", (req, res) => {
  console.log("del");
  controller.deleteById(req, res);
});

//////////////////////////////////////////////

let PORT = process.env.PORT || 3456;

app.listen(PORT);
console.log(`Listening at port: ${PORT}`);
