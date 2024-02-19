// module.exports = {
//   API: `http://localhost:${process.env.PORT}`,
// };

// require("dotenv").config();
// console.log("/////////////////////////////////////", process.env.PORT);

const utils = {
  // API: `http://localhost:${5050}`,
  // API: `http://localhost:${process.env.SERVER_PORT}`,
  // API: `http://localhost:${3001}`,

  //CANNOT REQUIRE('DOTENV') WEBPACK CONFIG ISSUE BIG YIKES
  //everythign should go to /api/xx/yy for nginx config routing
  API:
    process.env.NODE_ENV === "production"
      ? `http://petscale.xyz/api`
      : "http://localhost:3001",

  getFormattedDate: (messyDate) => {
    let dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };

    //catch if there is an issue with the incoming date values
    if (!messyDate || messyDate.length === 0) {
      return "DATE ERROR";
    }

    //date constructor to apply dateOptions
    let date = new Date(messyDate).toLocaleDateString("en-US", dateOptions);
    //removing weekday from date
    let formattedDate = date.split(", ").slice(1).join(", ");

    return formattedDate;
  },

  getFormattedDateGraph: (messyDate) => {
    // let dateOptions = {
    //   year: "numeric",
    //   month: "numeric",
    //   day: "numeric",
    //   weekday: "long",
    // };
    // //date constructor to apply dateOptions
    // let date = new Date(messyDate).toLocaleDateString("en-US", dateOptions);
    // //removing weekday from date
    // let formattedDate = date.split(", ").slice(1).join(", ");
    // return formattedDate;

    //if date cant be split for some reason, default to y2k
    // return messyDate.split("T")[0] || "2000-01-01";
    if (messyDate !== null) {
      return messyDate.split("T")[0];
    } else {
      return "2000-01-01";
    }
  },

  //date for putting into db ('2020-12-25') -> ('12/25/2020')
  getFormattedDateDB: (messyDate) => {
    let dateArr = messyDate.replace(/-/g, "/").split("/");
    //splitting date to array [yyyy, mm, dd] fixes utc issue

    //catch issues w/ date formatting
    if (dateArr.length !== 3 || dateArr.join("").length !== 8) {
      return "error";
    }

    //for safari "mm/dd/yyyy"
    dateArr.push(dateArr.shift());

    let newDate = dateArr.join("/");
    return newDate;
  },

  getLineGraphValues: (petList, data, isLbs, petNum) => {
    let dataGrams = data
      .map((d) =>
        d.name === petList[petNum]
          ? {
              x: utils.getFormattedDateGraph(d.created_at),
              y: d.weight,
            }
          : null
      )
      .filter((x) => x)
      .reverse();

    let dataLbs = data
      .map((d) =>
        d.name === petList[petNum]
          ? {
              x: utils.getFormattedDateGraph(d.created_at),
              y: (d.weight * 0.00220462).toFixed(2),
            }
          : null
      )
      .filter((x) => x)
      .reverse();

    console.log(dataGrams);

    return isLbs ? dataLbs : dataGrams;
  },
  //color value obj for graph (0 matches with 5, 1 with 6)
  //final colors be aqua, blue, pink, darker pink, yellow?

  // colorSet: {
  //   0: "rgba(200,50,50,0.8)",
  //   1: "rgba(50,50,200,0.8)",
  //   2: "rgba(50,200,50,0.8)",
  //   3: "rgba(200,0,200,0.8)",
  //   4: "rgba(20,20,20,0.8)",
  //   5: "rgba(200,50,50,0.5)",
  //   6: "rgba(50,50,200,0.5)",
  //   7: "rgba(50,200,50,0.5)",
  //   8: "rgba(200,0,200,0.5)",
  //   9: "rgba(20,20,20,0.5)",
  // },

  //trim graph data to most recent based on user selected limit
  trimData: (petData, limit) => {
    //if no limit
    if (limit === "none") {
      return;
    }

    //if limit
    if (limit !== "none") {
      //deep copy of petData
      let petDataCopy = JSON.parse(JSON.stringify(petData));

      for (let index in petDataCopy) {
        //the obj for current pet
        let petObj = petDataCopy[index];
        //full length of data for data array
        let fullDataLength = petData[index].data.length;
        //trim full data array to trimmed array
        let newArr = petObj.data.filter((el, i) => i >= fullDataLength - limit);
        //replace full array with trimmed array
        petDataCopy[index].data = newArr;
      }

      return petDataCopy;
    }
  },

  colorSet: {
    0: "rgba(200,0,200,1)",
    1: "rgba(0,120,200,1)",
    2: "rgba(50,180,100,1)",
    3: "rgba(180,0,50,1)",
    4: "rgba(230,130,0,1)",
    5: "rgba(200,0,200,0.5)",
    6: "rgba(0,120,200,0.5)",
    7: "rgba(50,180,100,0.5)",
    8: "rgba(200,0,50,0.5)",
    9: "rgba(230,130,0,0.5)",
  },

  createCsvByPet: (fileName, data) => {
    if (!fileName) {
      return;
    }

    //filter petData for specified pet
    let dataForPet = data.filter((el) => el.label === fileName);
    //make headers
    let csvRows = ["date,weight (g)"];

    //iterate/parse data and add to array
    for (let entry of dataForPet[0].data) {
      csvRows.push(`${entry.x},${entry.y}`);
    }

    let csvRaw = csvRows.join("\n");

    //create fake anchor tag to allow for download of csv
    const element = document.createElement("a");

    element.setAttribute("href", `data:text/csv;charset=utf-8,${csvRaw}`);
    element.setAttribute("download", fileName);
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  },
};

export default utils;
