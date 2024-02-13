// const PetData = require("../database/PetData.js");
const { PetData } = require("../database");

module.exports.getAllByUser = (req) => {
  console.log("m get all", req);
  return PetData.find({ owner: req }).sort({ created_at: -1 });
};

module.exports.create = (req) => {
  console.log("m create");
  return PetData.create({
    owner: req.owner,
    name: req.name,
    weight: req.weight,
    unit: req.unit,
    color: req.color,
    created_at: req.created_at,
  });
};

module.exports.uploadCsv = (req) => {
  console.log("m upload from csv");
  return PetData.insertMany(req.body);
};

module.exports.deleteById = (req) => {
  console.log("m del");
  return PetData.deleteOne({ _id: req });
};

module.exports.deleteByPet = (req) => {
  console.log("m del by pet");
  return PetData.deleteMany({ owner: req.body.owner, name: req.body.name });
};

module.exports.deleteByUser = (req) => {
  console.log("m del all for user");
  return PetData.deleteMany({ owner: req.body.owner });
};
