const model = require("./model.js");

module.exports.getByUser = (req, res) => {
  console.log("c get all", req);
  model
    .getAllByUser(req)
    // .exec()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
};

module.exports.postByUser = (req, res) => {
  console.log("c create");
  console.log(req.body);
  model
    .create(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => console.log(err));
};

module.exports.postPetByUser = (req, res) => {
  console.log("create new data");
  console.log(req.body);
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
