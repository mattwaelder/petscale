const fs = require("fs");
const { parse } = require("csv-parse");
const PetData = require("./PetData.js");

var exData = [];

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
    // console.log(entryC);
    PetData.insertMany([entryC, entryB]);
  });

console.log(exData);
