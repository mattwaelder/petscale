const model = require("./model.js");

//might want to put this in create by user???
module.exports.updateUser = (req, res) => {
  console.log("c update user");
  model
    .updateUser(req)
    .then((res) => res.sendStatus(200))
    .catch((err) => console.log(err));
};

module.exports.uploadCsv = (req, res) => {
  console.log("c csv upload ");
  let currUser = req.body[0].owner;
  let currPet = req.body[0].name;

  console.log(req.body);

  model
    .uploadCsv(req)
    .then(() => {
      return model.updateUser({ currUser, currPet });
    })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
};

module.exports.getByUser = (req, res) => {
  console.log("c get all", req);
  let currUser = req;
  const response = {};

  //get data for all the pets, then get data for owner (petlist)
  model
    .getAllByUser(currUser)
    // .exec()
    .then((data) => {
      // res.send(data);
      response.petData = data;
    })
    .then((currUser) => model.getOwnerInfo(req))
    .then((data) => {
      response.ownerData = data;
    })
    .then(() => {
      res.send(response);
    })
    .catch((err) => console.log(err));
};

module.exports.postByUser = (req, res) => {
  console.log("c create");

  model
    .create(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => console.log(err));
};

module.exports.postPetByUser = (req, res) => {
  console.log("create new data", req.body);
  let currUser = req.body.owner;
  let currPet = req.body.name;
  model
    .createPet(req.body)
    .then((req) => model.updateUser({ currUser, currPet }))
    .then(() => res.sendStatus(201))
    .catch((err) => console.log(err));
};

module.exports.deleteById = (req, res) => {
  console.log("c del", req.query);
  let isLastEntry = req.query.isLastEntry === "true";
  model
    .deleteById(req.query.entry)
    .then(() => {
      if (isLastEntry) {
        console.log("final entry, remove pet from owner");
        return model.removePetFromOwner({
          currOwner: req.query.owner,
          currPet: req.query.name,
        });
      }
    })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
};

module.exports.deleteByPet = (req, res) => {
  console.log("c del by pet");
  console.log(req.body);

  let currOwner = req.body.owner;
  let currPet = req.body.name;

  //if wiping all pet data for the user

  if (req.body.isFullWipe) {
    model
      .deleteByUser(req)
      .then(() => model.removeAllPetsFromOwner(currOwner))
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  } else {
    //if wiping only the data for a single pet
    model
      .deleteByPet(req)
      .then(() =>
        model.removePetFromOwner({ currOwner: currOwner, currPet: currPet })
      )
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  }
};
// module.exports.createCsv = (req, res) => {
//   console.log("c csv", req.body.petName, req.body.data);
//   fs.writeFile(req.body.petName, req.body.data, function (err) {
//     if (err) throw err;
//     console.log("csv made");
//   });
// };
