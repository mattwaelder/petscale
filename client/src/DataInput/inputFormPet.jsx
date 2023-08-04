import React from "react";

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
        className="form_btn form_btn_add"
        type="submit"
        value="pet"
        onClick={(e) => handleSubmit(e)}
      >
        ADD
      </button>
    </form>
  );
};
export default InputFormPet;
