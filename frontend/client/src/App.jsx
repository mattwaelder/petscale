import "./App.scss";
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

//add support for some kind of automation? IFTTT? google/alexa? smart scale?

//add api information about basic weight info for given animals?

//should add confirm email to make sure its your email
//cant login with email after login with google?

// FIREBASE MAY NEED RULES UPDATED BEFORE HOSTING FOR SECURITY

//replace "logged in as x" with icon + name, when icon is clicked a logout button appears

//ability to change colors of animals from the default color or to select color when creating a new pet

//database might need a rethink... maybe

// in the db, mongoURI may need to be moved to .env from database index file

//~~~~~~~~~

//utilities and db (mongouri) are using paths/hard coded ports not referencing env

// NEW //
//make csv upload more robust
//limit names allowed to not be same as existing names etz
//if the package doesnt parse right return an error
//ensure its handling headers ok
//disallow use of word "all" as a pet name
//disable upload button or throw err if nothing to send
//fix modals up for csv and delete (including white background on delete modal)
//include example csv or show formatting?

//new background
//ai assistant for questions regarding health? is that even ethical?
