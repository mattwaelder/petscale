const model = require("./model.js");

module.exports.getByUser = (req, res) => {
  console.log("c get all");
  model
    .getAllByUser(req)
    .exec()
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
};

module.exports.postByUser = (req, res) => {
  console.log("c create");
  model
    .create(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => console.log(err));
};
