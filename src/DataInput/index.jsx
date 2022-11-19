import React, { useState } from "react";
import axios from "axios";
import utils from "../utilities.js";
import { please } from "../please.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import "./DataInput.css";

const DataInput = ({ user, pets, fetchData }) => {
  let [name, setName] = useState("");
  let [weight, setWeight] = useState("");
  let [unit, setUnit] = useState("");
  let [showForm, setShowForm] = useState(false);
  let [content, setContent] = useState("main");
  let [weighDate, setWeighDate] = useState(Date());

  const handleChange = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "weight":
        setWeight(e.target.value);
        break;
      case "unit":
        setUnit(e.target.value);
        break;
      case "pet_select":
        setName(pets[e.target.value - 1]);
        break;
      case "weigh_date":
        setWeighDate(e.target.value);
        break;
      default:
        alert("please fill all selections");
    }
  };

  const handleFormSelect = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    //buttons should be replaced with form
    switch (e.target.value) {
      case "pet":
        setShowForm(true);
        setContent("pet");
        break;
      case "data":
        setShowForm(true);
        setContent("data");
        break;
      case "return":
        setShowForm(false);
        setContent("main");
        break;
      default:
        alert("Sorry, an error occurred :(");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //get weight into grams from lbs, if needed

    // let weightTrans;
    // unit === "lbs"
    //   ? (weightTrans = Math.floor(Number(weight) * 453.6))
    //   : (weightTrans = Math.floor(Number(weight)));

    //453.592 grams in a lb
    if (e.target.value === "pet") {
      //form validation
      if (pets.includes(name)) {
        alert("that pet already exists");
        return;
      }
      if (name.length <= 3) {
        alert("names must be longer than 3 characters");
        return;
      }
      if (pets.length >= 5) {
        alert("Sorry, we can't handle more than 5 pets right now :(");
        return;
      }
      if (weight === "" || weight === 0) {
        alert("Please enter a weight");
        return;
      }
      if (unit === "") {
        alert("Please select a unit");
        return;
      }
      please
        .createPetByUser(user, name, weight, unit)
        .then((res) => {
          console.log(res);

          //reset form and states
          setName("");
          setWeight("");
          setUnit("");
          let form = document.querySelector("#weight_submit_form");
          form.reset();
          setShowForm(false);
        })
        .catch((err) => console.log(err));
      console.warn(user, name, weight, unit, Date());
    }

    if (e.target.value === "data") {
      console.log(name, weight, unit, weighDate);
      if (name.length && Number(weight) > 0 && unit) {
        console.warn("VALID");

        please
          .createDataByUser(user, name, weight, unit, weighDate)
          .then(() => {
            //reset form and states
            setName("");
            setWeight("");
            setUnit("");
            let form = document.querySelector("#weight_submit_form");
            form.reset();
            setShowForm(false);
          })
          .then(() => please.fetchDataByUser(user))
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className="input_form_container">
      {!showForm && content === "main" && (
        <>
          {pets.length < 5 && (
            <button
              className="form_btn"
              value="pet"
              onClick={(e) => handleFormSelect(e)}
            >
              Add New Pet
            </button>
          )}

          <button
            className="form_btn"
            value="data"
            onClick={(e) => handleFormSelect(e)}
          >
            Add Weight
          </button>
        </>
      )}

      {showForm && content === "pet" && pets.length < 5 && (
        <form id="weight_submit_form">
          <button
            className="form_btn form_return"
            value="return"
            onClick={(e) => handleFormSelect(e)}
          >
            X
          </button>
          <input
            type="text"
            id="name"
            className="formtext"
            placeholder="pet name"
            minLength="3"
            onChange={(e) => handleChange(e)}
            autocomplete="off"
            required
          ></input>
          <div id="weight_container">
            <input
              type="text"
              id="weight"
              className="formtext"
              placeholder="weight"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
              required
            />
            <select
              name="unit"
              onChange={(e) => handleChange(e)}
              id="unit"
              className="form_select"
              required
            >
              <option value="">--select--</option>
              <option value="g">g</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
          <button
            className="form_btn"
            type="submit"
            value="pet"
            onClick={(e) => handleSubmit(e)}
          >
            ADD
          </button>
        </form>
      )}

      {showForm && content === "data" && (
        <form id="weight_submit_form">
          <button
            className="form_btn form_return"
            value="return"
            onClick={(e) => handleFormSelect(e)}
          >
            X
          </button>
          <select
            name="pet_select"
            onChange={(e) => handleChange(e)}
            id="pet_select"
            className="form_select"
            required
          >
            <option value="">--select--</option>
            {pets[0] && <option value="1">{pets[0]}</option>}
            {pets[1] && <option value="2">{pets[1]}</option>}
            {pets[2] && <option value="3">{pets[2]}</option>}
            {pets[3] && <option value="4">{pets[3]}</option>}
            {pets[4] && <option value="5">{pets[4]}</option>}
          </select>

          <input
            type="date"
            id="weigh_date"
            onChange={(e) => handleChange(e)}
          ></input>

          <input
            type="text"
            id="weight"
            className="formtext"
            placeholder="weight"
            onChange={(e) => handleChange(e)}
            autocomplete="off"
            required
          />

          <select
            name="unit"
            onChange={(e) => handleChange(e)}
            id="unit"
            className="form_select"
            required
          >
            <option value="">--select--</option>
            <option value="g">g</option>
            <option value="lbs">lbs</option>
          </select>

          <button
            className="form_btn"
            type="submit"
            value="data"
            onClick={(e) => handleSubmit(e)}
          >
            ADD
          </button>
        </form>
      )}

      <div id="weight_icon_container">
        <FontAwesomeIcon icon={faWeightHanging} />
      </div>
    </div>
  );
};

export default DataInput;

/*

      <span id="form_title">Input New Weight</span>
      <form id="weight_submit_form">
        <input
          type="text"
          id="name"
          className="formtext"
          placeholder="pet name"
          minLength="3"
          onChange={(e) => handleChange(e)}
          autocomplete="off"
          required
        />
        <div id="weight_container">
          <input
            type="text"
            id="weight"
            className="formtext"
            placeholder="weight"
            onChange={(e) => handleChange(e)}
            autocomplete="off"
            required
          />
          <select
            name="unit"
            onChange={(e) => handleChange(e)}
            id="unit"
            className="form_select"
            required
          >
            <option value="">--select--</option>
            <option value="g">g</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
        <button
          className="form_submit"
          type="submit"
          value="Submit"
          onClick={(e) => handleSubmit(e)}
        >
          ADD
        </button>
      </form>
      <div id="weight_icon_container">
        <FontAwesomeIcon icon={faWeightHanging} />
      </div>

*/
