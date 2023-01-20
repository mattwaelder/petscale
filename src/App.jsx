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
  useEffect(() => {
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

//color tied to weight in some way?
//either that or have red for big drops in weight (or an outline drop shadow etc?)

//add modal to make sure you want to delete an entry to avoid accidents

//filter by pet option for list? maybe tie to graph, too

//add api information about basic weight info for given animals?

//add some kind of indication visually in the card list for each pet (image?, color?)

//should add confirm email to make sure its your email
//cant login with email after login with google?

// FIREBASE MAY NEED RULES UPDATED BEFORE HOSTING FOR SECURITY

//graph colors are inverted when you add a new pet
//should move color obj to utilities for ref within graph & list

//handle logged in as X, logout option more gracefully
