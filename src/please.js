import axios from "axios";
import utils from "./utilities.js";

export const please = {
  fetchDataByUser: (user) => {
    return axios.get(`${utils.API}/users/?user=${user}`);
  },
};
