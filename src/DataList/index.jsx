import React, { useState } from "react";
import "./DataList.css";
import ListItem from "./ListItem";

const DataList = ({ data }) => {
  return (
    <div className="data_list_container">
      <h2>Past Weigh-Ins</h2>
      {data.length > 0 && data.length
        ? data.map((entry) => <ListItem data={entry} />)
        : null}
    </div>
  );
};

export default DataList;
