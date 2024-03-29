import React from "react";
import { useState } from "react";
import "./ListItem.css";
import utils from "../../utilities.js";
import { please } from "../../please.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBookmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ListItem = ({
  data,
  isLbs,
  user,
  fetchData,
  refresh,
  setDelEntry,
  colorIndex,
}) => {
  return (
    <div className="list_card">
      <div
        className="card_color_tag"
        style={{
          backgroundColor: `${utils.colorSet[colorIndex]}`,
        }}
      >
        {/* <FontAwesomeIcon icon={faBookmark} /> */}
      </div>
      <div id="card_name">
        <p>{data.name}</p>
      </div>
      <div id="card_weight">
        <span id="weight_val">
          {isLbs ? (data.weight * 0.00220462).toFixed(2) : data.weight}
        </span>{" "}
        <span id="card_unit">{isLbs ? "lbs" : "grams"}</span>
      </div>
      <div id="card_date">
        <span>{utils.getFormattedDate(data.created_at)}</span>
      </div>
      <div
        className="trash"
        vlaue={data}
        id={data._id}
        onClick={(e) => setDelEntry((delEntry) => data)}
        data-bs-toggle="modal"
        data-bs-target="#deleteEntryModal"
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
};

export default ListItem;
