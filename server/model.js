// const PetData = require("../database/PetData.js");
const PetData = require("../database");

module.exports.getAllByUser = (req) => {
  console.log("m get all");
  return PetData.find({ userName: req }).sort({ created_at: -1 });
};

module.exports.create = (req) => {
  console.log("m create");
  return PetData.create({
    owner: req.owner,
    name: req.name,
    weight: req.weight,
    created_at: req.created_at,
  });
};
