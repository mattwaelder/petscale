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
              />
            );
          })
        : null}
    </div>
  );
};

export default DataList;
