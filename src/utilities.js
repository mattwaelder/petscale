// require("dotenv").config();

// module.exports = {
//   API: `http://localhost:${process.env.PORT}`,
// };

const utils = {
  API: `http://localhost:${5050}`,

  getFormattedDate: (messyDate) => {
    console.log(messyDate);
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
    let dateOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "long",
    };
    //date constructor to apply dateOptions
    let date = new Date(messyDate).toLocaleDateString("en-US", dateOptions);
    //removing weekday from date
    let formattedDate = date.split(", ").slice(1).join(", ");
    return formattedDate;
  },

  getLineGraphValues: (petList, data, petNum) => {
    return data
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
