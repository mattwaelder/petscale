import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import utils from "../utilities.js";
import { please } from "../please.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import { FaWeightScale } from "react-icons/fa6";
import { PiPawPrintFill } from "react-icons/pi";
import "./DataInput.scss";
import InputFormData from "./inputFormData";
import InputFormPet from "./inputFormPet";

const DataInput = ({ user, pets, petCount, fetchData, refresh }) => {
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
    let val = e.target.closest("button").value;
    switch (val) {
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
    let val = e.target.closest("button").value;

    //453.592 grams in a lb
    if (val === "pet") {
      //form validation
      if (pets.includes(name)) {
        alert("that pet already exists");
        return;
      }
      if (name.length <= 3) {
        alert("names must be longer than 3 characters");
        return;
      }
      if (petCount >= 5) {
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
        .createPetByUser(user, name, weight, unit, pets, petCount, weighDate)
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
          //close modal
          setShow(false);
        })
        .then(() => refresh((val) => !val))
        .catch((err) => console.log(err));
      console.log(user, name, weight, unit, Date());
    }

    //update the db with new data for existing pet
    if (val === "data") {
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
            //close modal
            setShow(false);
          })
          .then(() => refresh((val) => !val))
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div>
      <div className="input_form_container">
        <>
          <div className="add-data_and_header_container">
            <p className="add-data_header">Add New Data</p>
            <FaPlusCircle id="input_add_btn" onClick={handleShow} />
          </div>

          <Modal
            className="input_modal"
            show={show}
            onHide={handleClose}
            size="md"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {content === "main" && "Add New Data"}
                {content === "data" && "Add New Weight"}
                {content === "pet" && "Add New Pet"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal_form_select_container">
                {!showForm && content === "main" && (
                  <>
                    {petCount < 5 && (
                      <div className="modal_form_btn_label_wrapper">
                        <label htmlFor="pet-btn">Add Pet</label>
                        <button
                          className="modal_form_select_button"
                          value="pet"
                          id="pet-btn"
                          onClick={(e) => handleFormSelect(e)}
                        >
                          <PiPawPrintFill />
                        </button>
                      </div>
                    )}
                    <div className="modal_form_btn_label_wrapper">
                      <label htmlFor="weight-btn">Add Weight</label>
                      <button
                        className="modal_form_select_button"
                        value="data"
                        id="weight-btn"
                        onClick={(e) => handleFormSelect(e)}
                      >
                        <FaWeightScale />
                      </button>
                    </div>
                  </>
                )}

                {showForm && content === "data" && (
                  <InputFormData
                    pets={pets}
                    handleFormSelect={handleFormSelect}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                  />
                )}

                {showForm && content === "pet" && petCount < 5 && (
                  <InputFormPet
                    pets={pets}
                    handleFormSelect={handleFormSelect}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                  />
                )}
              </div>
            </Modal.Body>
          </Modal>
        </>
      </div>
    </div>
  );
};

export default DataInput;
