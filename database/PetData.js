const mongoose = require("mongoose");

// const petSchema = new mongoose.Schema({
//   petName: {
//     dataID: mongoose.ObjectId,
//     weight: Number,
//     created_at: Date,
//   },
// });

// const petOwnerSchema = new mongoose.Schema({
//   userName: String,
//   petData: [petSchema],
//   children: [petSchema],
// });

const petSchema = new mongoose.Schema({
  owner: String,
  name: String,
  weight: Number,
  created_at: Date,
});

// const PetOwner = mongoose.model("PetOwner", petOwnerSchema);

const PetData = mongoose.model("PetData", petSchema);

// module.exports = PetOwner;

module.exports = PetData;
