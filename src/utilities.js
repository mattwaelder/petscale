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
};

export default utils;
