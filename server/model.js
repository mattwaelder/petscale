const PetOwner = require("../database/PetOwner.js");

module.exports.getAll = (req) => {
  console.log("m get all");
  return PetOwner.find({});
};

module.exports.create = (req) => {
  console.log("m create");
  return PetOwner.create({
    name: "abc",
    petData: { a: 2, b: 3 },
  });
};
