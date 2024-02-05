const model = require("./model.js");
// const fs = require("fs");

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
