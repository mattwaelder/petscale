import React, { useState } from "react";
import axios from "axios";
import utils from "../utilities.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import "./DataInput.css";

const DataInput = ({ user, fetchData }) => {
  let [name, setName] = useState("");
  let [weight, setWeight] = useState("");
  let [unit, setUnit] = useState("");

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
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="input_form_container">
      <span id="form_title">Input New Weight</span>
      <form>
        <input
          type="text"
          id="name"
          className="formtext"
          placeholder="pet name"
          onChange={(e) => handleChange(e)}
          required
        ></input>
        <div id="weight_container">
          <input
            type="text"
            id="weight"
            className="formtext"
            placeholder="weight"
            onChange={(e) => handleChange(e)}
            required
          ></input>
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
        <input
          className="form_submit"
          type="submit"
          value="submit"
          onClick={(e) => handleSubmit(e)}
        ></input>
      </form>
      <div id="weight_icon_container">
        <FontAwesomeIcon icon={faWeightHanging} />
      </div>
    </div>
  );
};

export default DataInput;
