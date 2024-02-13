const model = require("./model.js");

module.exports.uploadCsv = (req, res) => {
  console.log("c csv upload ");

  console.log(req.body);

  model
    .uploadCsv(req)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });

  //catch any issues w/ incoming data before trying to insert to db
  // if (
  //   !Array.isArray(req.body.data) ||
  //   !req.body.data ||
  //   req.body.data.length < 1
  // ) {
  //   res.sendStatus(204);
  //   return;
  // }

  //body = { owner, name, color, data };
  //color is index, data is object like {date, weight}

  let pkg = {};
  pkg.owner = req.body.owner;
  pkg.name = req.body.name;
  pkg.color = req.body.color;

  ///////////////////WORKING////////////////
  // req.body?.data?.forEach(({ date, weight }, i) => {
  //   let pkg = {};

  //   pkg.owner = req.body.owner;
  //   pkg.name = req.body.name;
  //   pkg.color = req.body.color;
  //   pkg.weight = weight;
  //   pkg.unit = "g";
  //   pkg.created_at = date;

  //   if (!pkg.weight || !pkg.created_at) {
  //     return;
  //   }

  // });
};

module.exports.getByUser = (req, res) => {
  console.log("c get all", req);
  model
    .getAllByUser(req)
    // .exec()
    .then((data) => {
      res.send(data);
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
  console.log("create new data");
  model
    .create(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => console.log(err));
};

module.exports.deleteById = (req, res) => {
  console.log("c del");
  model
    .deleteById(req.query.entry)
    .then(() => res.sendStatus(200))
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
};

module.exports.deleteByPet = (req, res) => {
  console.log("c del by pet");
  console.log(req.body);

  //if wiping all pet data for the user
  if (req.body.isFullWipe) {
    model
      .deleteByUser(req)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        res.sendStatus(500);
        console.log(err);
      });
  } else {
    //if wiping only the data for a single pet
    model
      .deleteByPet(req)
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
