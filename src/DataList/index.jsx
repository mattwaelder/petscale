import React, { useState } from "react";
import axios from "axios";
import utils from "../utilities.js";
import { please } from "../please.js";
import "./DataList.css";
import ListItem from "./ListItem";

const DataList = ({ data, user, fetchData, refresh }) => {
  // const handleDel = (e) => {
  //   console.log(e.target);
  //   // let id = e.target.closest(".trash").id;
  //   // console.log(`deleting ${id}`);
  //   // axios
  //   //   .delete(`${utils.API}/entries/?entry=${id}`)
  //   //   .then(() => please.fetchDataByUser(user))
  //   //   .then(() => refresh((val) => !val))
  //   //   .catch((err) => console.log(err));
  // };
  let [delId, setDelId] = useState();

  return (
    <div className="data_list_container">
      <h2>Past Weigh-Ins</h2>
      {data.length > 0 && data.length
        ? data.map((entry, i) => {
            return (
              <ListItem
                key={i}
                data={entry}
                user={user}
                fetchData={fetchData}
                refresh={refresh}
                setDelId={setDelId}
              />
            );
          })
        : null}

      {/* modal window to delete entry */}

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
                Delete this entry for {`${data.name}`}?
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">{`${data.weight} ${(data.unit = "g"
              ? "grams"
              : "lbs")} on date`}</div>
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
                onClick={() => console.log(delId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataList;
