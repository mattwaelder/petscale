// require("dotenv").config();

// module.exports = {
//   API: `http://localhost:${process.env.PORT}`,
// };

const utils = {
  API: `http://localhost:${5050}`,

  getFormattedDate: (messyDate) => {
    let dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
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
    return messyDate.split("T")[0];
  },

  getLineGraphValues: (petList, data, isLbs, petNum) => {
    // return data
    //   .map((d) =>
    //     d.name === petList[petNum]
    //       ? {
    //           x: utils.getFormattedDateGraph(d.created_at),
    //           // x: d.created_at,
    //           y: d.weight,
    //         }
    //       : null
    //   )
    //   .filter((x) => x)
    //   .reverse();

    let dataGrams = data
      .map((d) =>
        d.name === petList[petNum]
          ? {
              x: utils.getFormattedDateGraph(d.created_at),
              // x: d.created_at,
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
              // x: d.created_at,
              y: (d.weight * 0.00220462).toFixed(2),
            }
          : null
      )
      .filter((x) => x)
      .reverse();

    console.log("///", dataGrams[0], dataLbs[0]);
    return isLbs ? dataLbs : dataGrams;
  },
};

export default utils;

// getLineGraphValues: (petList, data, petNum) => {
//   return data
//     .map((d) =>
//       d.name === petList[petNum]
//         ? {
//             x: utils.getFormattedDateGraph(d.created_at),
//             y: d.weight,
//           }
//         : null
//     )
//     .filter((x) => x)
//     .reverse();
// },
