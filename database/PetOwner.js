const mongoose = require("mongoose");

const petOwnerSchema = new mongoose.Schema({
  userName: String,
  petData: {},
});

const PetOwner = mongoose.model("PetOwner", petOwnerSchema);

module.exports = PetOwner;
