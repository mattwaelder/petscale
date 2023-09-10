import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowReturnLeft } from "react-icons/bs";

const InputFormData = ({
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

      <div className="form_sub_container form_sub_container-pet">
        <label for="pet_select">Select Pet:</label>
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
      </div>

      <div className="form_sub_container form_sub_container-date">
        <label for="weigh_date">Date:</label>
        <input
          type="date"
          id="weigh_date"
          onChange={(e) => handleChange(e)}
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
        value="data"
        onClick={(e) => handleSubmit(e)}
      >
        <AiOutlinePlus />
      </button>
    </form>
  );
};

export default InputFormData;
