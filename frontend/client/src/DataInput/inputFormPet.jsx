import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";

const InputFormPet = ({
  pets,
  handleFormSelect,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form id="weight_submit_form">
      <button
        className="form_btn form_return"
        value="return"
        onClick={(e) => handleFormSelect(e)}
      >
        <BsArrowReturnLeft />
      </button>
      <div className="form_sub_container form_sub_container">
        <label for="name">Pet Name:</label>
        <input
          type="text"
          id="name"
          className="formtext"
          placeholder=""
          minLength="3"
          onChange={(e) => handleChange(e)}
          autocomplete="off"
          required
        ></input>
      </div>
      <div className="form_sub_container form_sub_container-weight">
        <label for="weight">Weight:</label>
        <input
          type="text"
          id="weight"
          className="formtext"
          inputMode="numeric"
          placeholder=""
          onChange={(e) => handleChange(e)}
          autocomplete="off"
          required
        />
      </div>
      <div className="form_sub_container form_sub_container-unit">
        <label for="unit">Unit:</label>
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
        className="form_btn form_btn_add"
        type="submit"
        value="pet"
        onClick={(e) => handleSubmit(e)}
      >
        <AiOutlinePlus />
      </button>
    </form>
  );
};
export default InputFormPet;
