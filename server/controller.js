const model = require("./model.js");
const fs = require("fs");
const { parse } = require("csv-parse");
const multer = require("multer");

module.exports.uploadCsv = (req, res) => {
  console.log("c csv upload");
  console.log(req.files);
  const data = [];

  // fs.readFile(req.files.file.path, function (err, data) {
  //   console.log(data);
  // });

  fs.createReadStream(req.files)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => {
      console.log(row);
      data.push(row);
    })
    .on("end", () => {
      console.log(data);
    })
    .on("error", function (error) {
      console.log(error.message);
    });

  // model
  //   .uploadCsv()
  //   .then(() => {
  //     res.sendStatus(201);
  //   })
  //   .catch((err) => console.log(err));
};

module.exports.getByUser = (req, res) => {
  console.log("c get all", req);
  model
    .getAllByUser(req)
    // .exec()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
};

module.exports.postByUser = (req, res) => {
  console.log("c create");
  model
    .create(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => console.log(err));
};

module.exports.postPetByUser = (req, res) => {
  console.log("create new data");
  model
    .create(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => console.log(err));
};

module.exports.deleteById = (req, res) => {
  console.log("c del");
  model
    .deleteById(req.query.entry)
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err));
};

// module.exports.createCsv = (req, res) => {
//   console.log("c csv", req.body.petName, req.body.data);
//   fs.writeFile(req.body.petName, req.body.data, function (err) {
//     if (err) throw err;
//     console.log("csv made");
//   });
// };
