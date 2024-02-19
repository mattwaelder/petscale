import React, { useState } from "react";
import axios from "axios";
import utils from "../utilities.js";
import { please } from "../please.js";
import "./DataList.css";
import ListItem from "./ListItem";
import UnitToggle from "../UnitToggle";

const DataList = ({
  data,
  isLbs,
  user,
  fetchData,
  refresh,
  pets,
  handleFilter,
  changeUnit,
}) => {
  const handleDel = () => {
    // let id = e.target.closest(".trash").id;

    let isLastEntry =
      data.filter((d) => d.name === delEntry.name).length === 1 ? true : false;

    please.deleteById(user, delEntry, refresh, isLastEntry);
  };

  //obj of selected list item for deletion (used in modal)
  const [delEntry, setDelEntry] = useState({
    id: undefined,
    name: undefined,
    created_ad: undefined,
  });

  return (
    <div className="data_list_container">
      <div className="list_filter_container">
        <UnitToggle isLbs={isLbs} changeUnit={changeUnit} />

        <div className="list_filter_label_container">
          <label htmlFor="pet_select" className="filter_label">
            Filter By Pet
          </label>
          <select
            name="pet_select"
            onChange={(e) => handleFilter(e)}
            id="list_filter"
            className="filter_select"
          >
            <option value="0">--none--</option>
            {pets[0] && <option value="1">{pets[0]}</option>}
            {pets[1] && <option value="2">{pets[1]}</option>}
            {pets[2] && <option value="3">{pets[2]}</option>}
            {pets[3] && <option value="4">{pets[3]}</option>}
            {pets[4] && <option value="5">{pets[4]}</option>}
          </select>
        </div>
      </div>

      <h2>Past Weigh-Ins</h2>
      {data.length > 0 && data.length
        ? data.map((entry, i) => {
            return (
              <ListItem
                key={i}
                data={entry}
                isLbs={isLbs}
                user={user}
                fetchData={fetchData}
                refresh={refresh}
                setDelEntry={setDelEntry}
                colorIndex={pets.indexOf(entry.name)}
              />
            );
          })
        : null}

      {/* modal window to delete entry */}

      <div
        className="modal fade"
        id="deleteEntryModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5 " id="exampleModalLabel">
                Delete this entry for {`${delEntry.name}`}?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center fs-5 fw-light">
              {`
            ${utils.getFormattedDate(delEntry.created_at)}`}
              <br></br>
              {`${delEntry.weight} ${(delEntry.unit = "g" ? "grams" : "lbs")}`}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
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

/*

      <div className="list_filter_container">
        <label for="pet_select">Filter By Pet</label>

        <select
          name="pet_select"
          onChange={(e) => handleFilter(e)}
          id="list_filter"
          className="filter_select"
        >
          <option value="">--select--</option>
          {pets[0] && <option value="1">{pets[0]}</option>}
          {pets[1] && <option value="2">{pets[1]}</option>}
          {pets[2] && <option value="3">{pets[2]}</option>}
          {pets[3] && <option value="4">{pets[3]}</option>}
          {pets[4] && <option value="5">{pets[4]}</option>}
        </select>
      </div>

*/
