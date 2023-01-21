import React from "react";
import { useState } from "react";
import "./ListItem.css";
import utils from "../../utilities.js";
import { please } from "../../please.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ListItem = ({ data, user, fetchData, refresh, setDelId }) => {
  const handleDel = (e) => {
    // let id = e.target.closest(".trash").id;
    //   let id = e.target.closest(".trash").id;
    //   axios
    //     .delete(`${utils.API}/entries/?entry=${id}`)
    //     .then(() => please.fetchDataByUser(user))
    //     .then(() => refresh((val) => !val))
    //     .catch((err) => console.log(err));
  };

  return (
    <div className="list_card">
      <div id="card_name">
        <p>{data.name}</p>
      </div>
      <div id="card_weight">
        <span id="weight_val">{data.weight}</span>{" "}
        <span id="card_unit">{(data.unit = "g" ? "grams" : "lbs")}</span>
      </div>
      <div id="card_date">
        <span>{utils.getFormattedDate(data.created_at)}</span>
      </div>
      <div
        className="trash"
        vlaue={data}
        id={data._id}
        onClick={(e) => {
          setDelId((delId) => data._id);
          console.log("trash click ", data._id);
        }}
        // onClick={(e) => console.log(data)}
        data-bs-toggle="modal"
        data-bs-target="#deleteEntryModal"
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>

      {/* delete entry modal window */}
      {/*
      <div
        class="modal fade"
        id="deleteEntryModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Delete this entry?
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">xxx</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={(e) => handleDel(e)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ListItem;

//add state for modal, move handleDel to button inside of that modal
