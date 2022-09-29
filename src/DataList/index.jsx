import React, { useState } from "react";
import "./DataList.css";
import ListItem from "./ListItem";

const DataList = ({ data, user, fetchData }) => {
  return (
    <div className="data_list_container">
      <h2>Past Weigh-Ins</h2>
      {data.length > 0 && data.length
        ? data.map((entry, i) => (
            <ListItem key={i} data={entry} user={user} fetchData={fetchData} />
          ))
        : null}
    </div>
  );
};

export default DataList;
