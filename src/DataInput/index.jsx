import React, { useState } from "react";
import axios from "axios";
import utils from "../utilities.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import "./DataInput.css";

const DataInput = ({ user, pets, fetchData }) => {
  let [name, setName] = useState("");
  let [weight, setWeight] = useState("");
  let [unit, setUnit] = useState("");

  // let [addPet, setAddPet] = useState(false);
  // let [addData, setAddData] = useState(false);

  let [showForm, setShowForm] = useState(false);
  let [content, setContent] = useState("main");

  console.log(pets);

  const handleChange = (e) => {
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
      default:
        alert("please fill all selections");
    }
  };

  const handleSelect = (e) => {
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

    let weightTrans;
    unit === "lbs"
      ? (weightTrans = Math.floor(Number(weight) * 453.6))
      : (weightTrans = Math.floor(Number(weight)));

    // console.log(weightTrans, Date());
    //453.592 grams in a lb
    if (name.length && Number(weight) > 0 && unit) {
      console.warn("VALID");
      axios
        .post(`${utils.API}/users/?user=${user}`, {
          owner: `${user}`,
          name: name,
          weight: weightTrans,
          created_at: Date(),
        })
        .then((res) => fetchData(user))
        .then(() => {
          //reset form and states
          setName("");
          setWeight("");
          setUnit("");
          let form = document.querySelector("#weight_submit_form");
          form.reset();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="input_form_container">
      {!showForm && content === "main" && (
        <button
          className="form_submit"
          value="pet"
          onClick={(e) => handleSelect(e)}
        >
          Add New Pet
        </button>
      )}

      {!showForm && content === "main" && (
        <button
          className="form_submit"
          value="data"
          onClick={(e) => handleSelect(e)}
        >
          Add Weight
        </button>
      )}

      {showForm && content === "pet" && (
        <form>
          <button
            className="form_submit"
            value="return"
            onClick={(e) => handleSelect(e)}
          >
            return pet
          </button>
        </form>
      )}

      {showForm && content === "data" && (
        <form>
          <button
            className="form_submit"
            value="return"
            onClick={(e) => handleSelect(e)}
          >
            return data
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

//intend to have a state set for whether we are adding a pet or adding data, if either button is clicked the state goes to true and i should be able to use addPet && xml. either that or i can have modals... which could be easier.

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
