import "./App.css";
import React, { useState, useEffect } from "react";
import DataInput from "./DataInput";
import DataList from "./DataList";
import axios from "axios";
import utils from "./utilities.js";
import LineChart from "./LineChart";

function App() {
  const [user, setUser] = useState("mattwaelder");
  const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    fetchData(user);
  }, [user]);

  let fetchData = (user) => {
    axios
      .get(`${utils.API}/users/?user=${user}`)
      .then((data) => {
        setWeightData(data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <DataList data={weightData} user={user} fetchData={fetchData} />
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
//if the delta from one weight to another is greater than x set it red-ish

//assign a unique color for every pet (up to so many pets 5?) then use this color multiple times such as name and graph. this would just require more effort on the side of the controller returning a more complex object

//add modal to make sure you want to delete an entry to avoid accidents
//add option to select pet or enter new pet in form
//add api information about basic weight info for given animals?

//add some kind of indication visually in the card list for each pet (image?, color?)

//i dont know why, but the form required attributes are not working when submit


////////////////

//add endpoint to add new user
//add endpoint to add new pets (limit?)
//look at authentication
//handle login screen?
//usernames unique? or find a way to make it so we can search by user id