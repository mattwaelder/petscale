import React from "react";
import "./ListItem.css";
import utils from "../../utilities.js";
import { please } from "../../please.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ListItem = ({ data, user, fetchData, refresh }) => {
  const handleDel = (e) => {
    let id = e.target.closest(".trash").id;
    axios
      .delete(`${utils.API}/entries/?entry=${id}`)
      .then(() => please.fetchDataByUser(user))
      .then(() => refresh((val) => !val))
      .catch((err) => console.log(err));
  };

  return (
    <div className="list_card">
      <div id="card_name">
        <p>{data.name}</p>
      </div>
      <div id="card_weight">
        <span id="weight_val">{data.weight}</span>{" "}
        <span id="card_unit">grams</span>
      </div>
      <div id="card_date">
        <span>{utils.getFormattedDate(data.created_at)}</span>
      </div>
      <div
        className="trash"
        vlaue={data}
        id={data._id}
        onClick={(e) => handleDel(e)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
};

export default ListItem;
