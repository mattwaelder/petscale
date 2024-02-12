const model = require("./model.js");

module.exports.uploadCsv = (req, res) => {
  console.log("c csv upload ");

  if (
    !Array.isArray(req.body.data) ||
    !req.body.data ||
    req.body.data.length < 1
  ) {
    res.sendStatus(204);
    return;
  }

  //body = { owner, name, color, data };
  //color is index, data is object like {date, weight}

  // return PetData.create({
  //   owner: req.owner,
  //   name: req.name,
  //   weight: req.weight,
  //   unit: req.unit,
  //   color: req.color,
  //   created_at: req.created_at,
  // });

  // console.log("/////", Array.isArray(req.body.data));

  req.body?.data?.forEach(({ date, weight }, i) => {
    let pkg = {};

    pkg.owner = req.body.owner;
    pkg.name = req.body.name;
    pkg.color = req.body.color;
    pkg.weight = weight;
    pkg.unit = "g";
    pkg.created_at = date;

    if (!pkg.weight || !pkg.created_at) {
      return;
    }

    model
      .create(pkg)
      .then(() => res.sendStatus(201))
      .catch((err) => console.log(err));
  });

  // fs.readFile(req.files.file.path, function (err, data) {
  //   console.log(data);
  // });

  // fs.createReadStream(req.files)
  //   .pipe(parse({ delimiter: ",", from_line: 2 }))
  //   .on("data", (row) => {
  //     console.log(row);
  //     data.push(row);
  //   })
  //   .on("end", () => {
  //     console.log(data);
  //   })
  //   .on("error", function (error) {
  //     console.log(error.message);
  //   });

  // model
  //   .uploadCsv()
  //   .then(() => {
  //     res.sendStatus(201);
  //   })
  //   .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
};

// module.exports.createCsv = (req, res) => {
//   console.log("c csv", req.body.petName, req.body.data);
//   fs.writeFile(req.body.petName, req.body.data, function (err) {
//     if (err) throw err;
//     console.log("csv made");
//   });
// };
