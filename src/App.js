import "./App.css";
import React, { useState, useEffect } from "react";
import DataInput from "./DataInput";
import DataList from "./DataList";
import Graph from "./Graph";
import axios from "axios";
import utils from "./utilities.js";
import LineChart from "./LineChart";

function App() {
  const [user, setUser] = useState("mattwaelder");
  const [weightData, setWeightData] = useState([]);

  console.log(user);

  useEffect(() => {
    console.log("effect");
    fetchData(user);
  }, [user]);

  let fetchData = (user) => {
    console.log("fetchdata", user);
    axios
      .get(`${utils.API}/users/?user=${user}`)
      .then((data) => {
        // console.log(data.data);
        setWeightData(data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <DataList data={weightData} />
      <div className="graph_input_container">
        {weightData.length && weightData.length > 0 ? (
          <LineChart
            cowpig={weightData
              .map((d) =>
                d.name === "cowpig"
                  ? {
                      x: utils.getFormattedDateGraph(d.created_at),
                      y: d.weight,
                    }
                  : null
              )
              .filter((x) => x)
              .reverse()}
            bagel={weightData
              .map((d) =>
                d.name === "bagel"
                  ? {
                      x: utils.getFormattedDateGraph(d.created_at),
                      y: d.weight,
                    }
                  : null
              )
              .filter((x) => x)
              .reverse()}
          />
        ) : null}
        <DataInput user={user} fetchData={fetchData} />
      </div>
    </div>
  );
}

export default App;

//////////////// THOUGHTS TODO ///////////////
//probably have input as just a button that brings up a form rather than a form on the page to keep things clean -- time permitting...

//want to have glass transparancy for the cards, and for each weight item in th elist have a hue of red or green to show if it was an increase or a decrease from revious weight
//either that or have red for big drops in weight (or an outline drop shadow etc?) and where would i use green, then?

/*
let obj = {
  userName: "mattwaelder",
  userID: 1,
  petData: {
    //nix photos bc time constraint
    cowpig: [
      { id: 123, weight: 1250, created_at: Date },
      { id: 124, weight: 1250, created_at: Date },
    ],
    bagel: [
      { id: 125, weight: 1250, created_at: Date },
      { id: 126, weight: 1250, created_at: Date },
    ],
  },
};
*/

//git push -u origin master
