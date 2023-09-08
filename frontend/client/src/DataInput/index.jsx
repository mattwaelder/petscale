import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import utils from "../utilities.js";
import { please } from "../please.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import "./DataInput.scss";
import InputFormData from "./inputFormData";
import InputFormPet from "./inputFormPet";

const DataInput = ({ user, pets, fetchData, refresh }) => {
  let [name, setName] = useState("");
  let [weight, setWeight] = useState("");
  let [unit, setUnit] = useState("");
  let [showForm, setShowForm] = useState(false);
  let [content, setContent] = useState("main");
  let [weighDate, setWeighDate] = useState(Date());

  //handle show-state of mobile data input modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  //displays correct form based on event value
  const handleFormSelect = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
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

      console.log(name, weight, unit, weighDate);

      // update the db w/ new pet
      please
        .createPetByUser(user, name, weight, unit, pets.length, weighDate)
        .then((res) => {
          //reset form and states
          setName("");
          setWeight("");
          setUnit("");
          let form = document.querySelector("#weight_submit_form");
          form.reset();
          setShowForm(false);
          //remove the form
          setContent("main");
        })
        .then(() => refresh((val) => !val))
        .catch((err) => console.log(err));
      console.warn(user, name, weight, unit, Date());
    }

    //update the db with new data for existing pet
    if (e.target.value === "data") {
      console.log(name, weight, unit, weighDate);
      if (name.length && Number(weight) > 0 && unit) {
        please
          .createDataByUser(
            user,
            name,
            weight,
            unit,
            pets.indexOf(`${name}`),
            weighDate
          )
          .then(() => {
            //reset form and states
            setName("");
            setWeight("");
            setUnit("");
            let form = document.querySelector("#weight_submit_form");
            form.reset();
            setShowForm(false);
            setContent("main");
          })
          .then(() => refresh((val) => !val))
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div>
      <div className="input_form_container">
        {!showForm && content === "main" && (
          <div className="main_btns_container">
            <button
              className="form_btn form_btn_main"
              value="data"
              onClick={(e) => handleFormSelect(e)}
            >
              Add Weight
            </button>
            {pets.length < 5 && (
              <button
                className="form_btn form_btn_main"
                value="pet"
                onClick={(e) => handleFormSelect(e)}
              >
                Add New Pet
              </button>
            )}
          </div>
        )}

        {showForm && content === "data" && (
          <InputFormData
            pets={pets}
            handleFormSelect={handleFormSelect}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}

        {showForm && content === "pet" && pets.length < 5 && (
          <InputFormPet
            pets={pets}
            handleFormSelect={handleFormSelect}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}

        <div id="weight_icon_container">
          <FontAwesomeIcon icon={faWeightHanging} />
        </div>
      </div>
      <div className="input_form_container--mobile">
        <>
          <FaPlusCircle id="input_add_btn--mobile" onClick={handleShow} />

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add New Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal_form_select_container">
                <button className="modal_form_select_button">
                  New<br></br> Pet
                </button>
                <button className="modal_form_select_button">
                  New<br></br> Weight
                </button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </div>
  );
};

export default DataInput;
