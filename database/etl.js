const fs = require("fs");
const { parse } = require("csv-parse");
const PetData = require("./index.js");

// fs.readFile(
//   "/Users/mattwaelder/hackreactor/mvp/petscale/csv/weighty bois - Sheet1.csv",
//   "utf8",
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data.split(","));
//     }
//   }
// );

var exData = [];

fs.createReadStream(
  "/Users/mattwaelder/hackreactor/mvp/petscale/csv/weighty bois.csv"
)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    // console.log(row);
    let entryC = {
      owner: "mattwaelder",
      name: "cowpig",
      weight: row[1],
      created_at: new Date(row[0]),
    };
    let entryB = {
      owner: "mattwaelder",
      name: "bagel",
      weight: row[2],
      created_at: new Date(row[0]),
    };
    exData.push(entryC, entryB);
    // exData.push(entryC);
    // console.log(entryC);
    // PetData.insertMany([
    //   {
    //     owner: "mattwaelder",
    //     name: "cowpig",
    //     weight: row[1],
    //     created_at: new Date(row[0]),
    //   },
    //   {
    //     owner: "mattwaelder",
    //     name: "bagel",
    //     weight: row[2],
    //     created_at: new Date(row[0]),
    //   },
    // ]);
    // PetData.insert(entryC);
    // PetData.insert(entryB);
  })
  .on("end", () => {
    for (let entry of exData) {
      PetData.create(entry)
        .then(() => console.log("added"))
        .catch((err) => console.log(err));
    }
  });
