import axios from "axios";
import utils from "./utilities.js";

export const please = {
  fetchDataByUser: (user) => {
    console.log("please get by user", user);
    return axios.get(`${utils.API}/users/?user=${user}`);
  },

  createPetByUser: (user, name, weight, unit, date) => {
    //default state for date is set for now, so this works
    // let dateArr = date.split("-");
    //splitting date to array [yyyy, mm, dd] fixes utc issue
    // let newDate = new Date(dateArr);
    // let newDate = new Date();
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    let today = new Date(yourDate.getTime() - offset * 60 * 1000);
    let formattedDate = today.toISOString().split("T")[0];
    let dateArr = formattedDate.split("-");
    let newDate = new Date(dateArr);

    let pkg = {
      // owner: user.slice(" "),
      owner: `${user}`,
      name: name,
      weight: Number(weight),
      unit: unit,
      created_at: newDate,
    };
    return axios.post(`${utils.API}/users/pet/?pet=${name}`, pkg);
  },

  createDataByUser: (user, name, weight, unit, date) => {
    let dateArr = date.split("-");
    //splitting date to array [yyyy, mm, dd] fixes utc issue
    let newDate = new Date(dateArr);
    //
    let pkg = {
      owner: `${user}`,
      name: name,
      weight: weight,
      unit: unit,
      created_at: newDate,
    };
    return axios.post(`${utils.API}/users/?user=${user}`, pkg);
  },
};
