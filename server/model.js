const PetData = require("../database/PetData.js");

module.exports.getAll = (req) => {
  console.log("m get all");
  return PetData.find({});
};

module.exports.create = (req) => {
  console.log("m create");
  return PetData.create({
    name: "abc",
    petData: { a: 2, b: 3 },
  });
};
