import React from "react";
import "./ListItem.css";
import utils from "../../utilities.js";

const ListItem = ({ data }) => {
  return (
    <div className="list_card">
      <div id="card_name">
        <p>{data.name}</p>
      </div>
      <div id="card_weight">
        <span id="weight_val">{data.weight}</span> grams
      </div>
      <div id="card_date">
        <span>{utils.getFormattedDate(data.created_at)}</span>
      </div>
    </div>
  );
};

export default ListItem;
