import React, { useState } from "react";
import axios from "axios";
import utils from "../utilities.js";
import { please } from "../please.js";
import "./DataList.css";
import ListItem from "./ListItem";

const DataList = ({ data, user, fetchData, refresh }) => {
  const handleDel = () => {
    // let id = e.target.closest(".trash").id;
    console.log(delEntry._id);

    axios
      .delete(`${utils.API}/entries/?entry=${delEntry._id}`)
      .then(() => please.fetchDataByUser(user))
      .then(() => refresh((val) => !val))
      .catch((err) => console.log(err));
  };

  //obj of selected list item for deletion (used in modal)
  let [delEntry, setDelEntry] = useState({
    id: undefined,
    name: undefined,
    created_ad: undefined,
  });

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
                setDelEntry={setDelEntry}
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
          <div class="modal-content text-dark">
            <div class="modal-header">
              <h1 class="modal-title fs-5 " id="exampleModalLabel">
                Delete this entry for {`${delEntry.name}`}?
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-center fs-5 fw-light">
              {`
            ${utils.getFormattedDate(delEntry.created_at)}`}
              <br></br>
              {`${delEntry.weight} ${(delEntry.unit = "g" ? "grams" : "lbs")}`}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDel()}
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
