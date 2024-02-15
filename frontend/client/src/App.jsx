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

//i have some kind of bug where colorIndex gets bugged when i delete a pets data when pets with higher indexes exist....
//maybe just make it so you can upload new pets only? :((((
//best thing to do would be to swap to sql and put a petlist in user schema and link to pet data
//in order to keep things on par w/ what they are now, id have to delete the data for that pet, and adjust all the color indeces for each pet w/ a higher index than the deleted pet. that would require a loop over all pets, deleting old pet data from the db, and adding all of it back. very costly....
//swapping to sql wouldnt be too bad, if the site wasnt already deployed i'd have to update the live environment to work in a sql world instead and that sounds like hell :)
//i should just disallow csv upload of existing pet names :(

//ai assistant for questions regarding health? is that even ethical?
