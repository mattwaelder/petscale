import "./App.css";
import React, { useState, useEffect } from "react";
import DataInput from "./DataInput";
import DataList from "./DataList";
import axios from "axios";
import utils from "./utilities.js";
import LineChart from "./LineChart";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Reset from "./authentication/Reset";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // const [user, setUser] = useState("mattwaelder");
  // const [weightData, setWeightData] = useState([]);

  useEffect(() => {
    //would fetch data from my db here, i think, or actually in dashboard huh?
    console.log("application GO");
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
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

///////////////// post HR

//usernames unique? or find a way to make it so we can search by user id

//should add confirm email to make sure its your email
//cant login with email after login with google?

// FIREBASE MAY NEED RULES UPDATED BEFORE HOSTING FOR SECURITY

//graph colors are inverted when you add a new pet
//should move color obj to utilities for ref within graph & list
//some sort of issue with dates, dates are showing up properly but placing improperly on the graph... need more testing on this

//i think that the issue with the date is one of 2 things...
//x axis isnt actually based on dates (lack of logic / setup incorrectly)
//or
//something to do with it being a dataset vs data (issue with how its reading the dataset)

//i need to play with the chart.js options so that it not only realizes its time, but that it also realizes its time over more than a few ms
