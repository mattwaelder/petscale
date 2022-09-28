// const PetData = require("../database/PetData.js");
const PetData = require("../database");

module.exports.getAllByUser = (req) => {
  console.log("m get all");
  return PetData.find({ userName: req }).sort({ created_at: 1 });
};

module.exports.create = (req) => {
  console.log("m create");
  return PetData.create({
    name: "abc",
    petData: { a: 2, b: 3 },
  });
};
