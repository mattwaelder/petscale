import axios from "axios";
import utils from "./utilities.js";

export const please = {
  //get all pets and data for those pets for this user
  fetchDataByUser: (user) => {
    console.log("please get by user:", user);
    return axios.get(`${utils.API}/users/?user=${user}`);
  },

  //create new pet and datapoint for this user
  createPetByUser: (user, name, weight, unit, pets, petCount, date) => {
    //splitting date to array [yyyy, mm, dd] fixes utc issue
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    let today = new Date(yourDate.getTime() - offset * 60 * 1000);
    let formattedDate = today.toISOString().split("T")[0];

    let newDate = utils.getFormattedDateDB(formattedDate);

    //store all weight in grams
    let weightInGrams =
      unit === "lbs" ? (Number(weight) * 453.592).toFixed(2) : Number(weight);

    let pkg = {
      owner: `${user}`,
      name: name,
      weight: weightInGrams,
      unit: unit,
      created_at: newDate,
    };
    console.log("please post new pet:", name);
    return axios.post(`${utils.API}/users/pet/?pet=${name}`, pkg);
  },

  //create datapoints for an existing pet for this user
  createDataByUser: (user, name, weight, unit, colorIndex, date) => {
    let weightInGrams =
      unit === "lbs" ? (Number(weight) * 453.592).toFixed(2) : Number(weight);

    let pkg = {
      owner: `${user}`,
      name: name,
      weight: weightInGrams,
      unit: unit,
      created_at: utils.getFormattedDateDB(date),
    };
    console.log("please create data for pet:", name);
    return axios.post(`${utils.API}/users/?user=${user}`, pkg);
  },

  uploadCsv: (user, petName, data, isNewPet) => {
    console.log("please upload file for ", petName);
    let pkg = [];

    data.forEach(({ date, weight }) => {
      if (date.length === 0 || !weight) return;

      let dataPoint = {
        owner: user,
        name: petName,
        weight: weight,
        unit: "g",
        created_at: date,
      };

      pkg.push(dataPoint);
    });

    //add boolean to end of the pkg
    pkg.push(isNewPet);

    return axios.post(`${utils.API}/upload`, pkg);
  },

  //from list
  deleteById: (user, delEntry, refresh, isLastEntry) => {
    axios
      .delete(`${utils.API}/entries/?entry=${delEntry._id}`, {
        params: { ...delEntry, isLastEntry },
      })
      .then(() => please.fetchDataByUser(user))
      .then(() => refresh((val) => !val))
      .catch((err) => console.log(err));
  },

  //from offcanvas, delete by pet (or all)
  deleteData: (userName, petName, isFullWipe) => {
    console.log("delete data for ", petName);
    let pkg = { owner: userName, name: petName, isFullWipe: isFullWipe };

    return axios.delete(`${utils.API}/delete/pets/?pet=${petName}`, {
      data: pkg,
    });
  },
};
