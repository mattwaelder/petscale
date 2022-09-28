const model = require("./model.js");

module.exports.get = (req, res) => {
  console.log("c get all");
  model
    .getAll(req.body)
    .exec()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

module.exports.post = (req, res) => {
  console.log("c create");
  model
    .create(req.body)
    .then((res) =>
      /*sendStatus(201)*/
      console.log(res)
    )
    .catch((err) => console.log(err));
};

// schema
// owner: String,
// name: String,
// weight: Number,
// created_at: Date,
