import React, { useState } from "react";
import "./DataList.css";
import ListItem from "./ListItem";

const DataList = ({ data, user, fetchData, refresh }) => {
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
                // type={wanted to add prop for if weight was good or bad, but this requires some ref to pet as well, not just index. i think to get this going properly in the future im goin to want a full list of weights by pet in state {pet: "cowpig", weights: [{}, {}]}}
              />
            );
          })
        : null}
    </div>
  );
};

export default DataList;
