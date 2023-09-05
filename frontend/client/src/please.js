import axios from "axios";
import utils from "./utilities.js";

export const please = {
  fetchDataByUser: (user) => {
    console.log("please get by user", user);
    return axios.get(`${utils.API}/users/?user=${user}`);
  },

  createPetByUser: (user, name, weight, unit, petsLen, date) => {
    //default state for date is set for now, so this works
    //splitting date to array [yyyy, mm, dd] fixes utc issue
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    let today = new Date(yourDate.getTime() - offset * 60 * 1000);
    let formattedDate = today.toISOString().split("T")[0];
    let dateArr = formattedDate.split("-");
    let newDate = new Date(dateArr);
    //store all weight in grams
    let weightInGrams =
      unit === "lbs" ? (Number(weight) * 453.592).toFixed(2) : Number(weight);
    //if there are no pets, set this to be color 1
    let colorIndex = petsLen ? petsLen + 1 : 1;

    let pkg = {
      // owner: user.slice(" "),
      owner: `${user}`,
      name: name,
      weight: weightInGrams,
      unit: unit,
      color: colorIndex,
      created_at: newDate,
    };
	console.log("please post new pet", name);
    return axios.post(`${utils.API}/users/pet/?pet=${name}`, pkg);
  },

  createDataByUser: (user, name, weight, unit, colorIndex, date) => {
    let dateArr = date.split("-");
    //splitting date to array [yyyy, mm, dd] fixes utc issue
    let newDate = new Date(dateArr);
    let weightInGrams =
      unit === "lbs" ? (Number(weight) * 453.592).toFixed(2) : Number(weight);

    let pkg = {
      owner: `${user}`,
      name: name,
      weight: weightInGrams,
      unit: unit,
      color: colorIndex + 1,
      created_at: newDate,
    };
	console.log("please create data for pet", name);
    return axios.post(`${utils.API}/users/?user=${user}`, pkg);
  },
};
