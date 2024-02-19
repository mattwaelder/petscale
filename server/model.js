// const PetData = require("../database/PetData.js");
const { PetData, PetOwner } = require("../database");

module.exports.getAllByUser = (req) => {
  console.log("m get all", req);

  //if this is a new user, populate as owner w/ no pets
  if (req.length > 0) {
    PetOwner.findOneAndUpdate({ owner: req }, { owner: req }, { upsert: true });
  }

  // let getOwnerData = () => {
  //   return PetOwner.find({ owner: req });
  // };
  // let getPetData = () => {
  //   return PetData.find({ owner: req }).sort({ created_at: -1 });
  // };

  // let DATA_owner = getOwnerData();
  // let DATA_pet = getPetData();

  // let promiseArr = [DATA_owner, DATA_pet];

  // Promise.all(promiseArr).then((val) => console.log(val, ";;;;;;;;;;;"));

  //add pets list to the output object and return it

  // Promise.all([dataPets, dataOwner]);
  return PetData.find({ owner: req }).sort({ created_at: -1 });
};

module.exports.getOwnerInfo = (req) => {
  console.log("m get owner info", req);
  return PetOwner.find({ owner: req });
};

module.exports.create = (req) => {
  console.log("m create weight");
  return PetData.create({
    owner: req.owner,
    name: req.name,
    weight: req.weight,
    unit: req.unit,
    // color: req.color,
    created_at: req.created_at,
  });
};

module.exports.createPet = (req) => {
  console.log("m create pet", req);
  //add pet to owner collection
  // PetOwner.findOneAndUpdate(
  //   {
  //     owner: req.owner,
  //   },
  //   { owner: req.owner },
  //   { $push: { pets: req.name } },
  //   { upsert: true }
  // );

  //add data to data collection
  return PetData.create({
    owner: req.owner,
    name: req.name,
    weight: req.weight,
    unit: req.unit,
    created_at: req.created_at,
  });
};

module.exports.updateUser = (req) => {
  console.log("//////// CREATE OWNER THINGY", req.currUser, req.currPet);

  //user is new collection like:
  //{owner: '', pets: []}
  return PetOwner.findOneAndUpdate(
    { owner: req.currUser },
    { $push: { pets: req.currPet } },
    { upsert: true }
  );
};

module.exports.uploadCsv = (req) => {
  console.log("m upload from csv");
  return PetData.insertMany(req.body);
};

module.exports.deleteById = (req) => {
  console.log("m del");
  return PetData.deleteOne({ _id: req });
};

module.exports.removePetFromOwner = (req) => {
  console.log("removing final pet from owner", req.query.owner, req.query.name);
  return PetOwner.updateOne(
    { owner: req.query.owner },
    { $pull: { pets: req.query.name } }
  );
};

module.exports.deleteByPet = (req) => {
  console.log("m del by pet");
  return PetData.deleteMany({ owner: req.body.owner, name: req.body.name });
};

module.exports.deleteByUser = (req) => {
  console.log("m del all for user");
  return PetData.deleteMany({ owner: req.body.owner });
};
