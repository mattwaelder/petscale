import axios from "axios";
import utils from "./utilities.js";

export const please = {
  fetchDataByUser: (user) => {
    return axios.get(`${utils.API}/users/?user=${user}`);
  },

  createPetByUser: (user, name, weight, unit) => {
    let pkg = {
      owner: user.slice(" "),
      name: name,
      weight: Number(weight),
      unit: unit,
      created_at: Date(),
    };
    return axios.post(`${utils.API}/users/pet/?pet=${name}`, pkg);
  },

  createDataByUser: (user, name, weight, unit, date) => {
    let pkg = {
      owner: `${user}`,
      name: name,
      weight: weight,
      unit: unit,
      created_at: date,
    };
    return axios.post(`${utils.API}/users/?user=${user}`, pkg);
  },
};
