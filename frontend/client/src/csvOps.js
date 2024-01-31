var fs = require("fs");

//put all of this into a fn and pass into it the name of the pet and all the data for that pet, then create the csv and download it.
//params: filename, data, maybe not needed callback function)
fs.writeFile("mynewfile3.txt", "This is my text", function (err) {
  if (err) throw err;
  console.log("Replaced!");
});
