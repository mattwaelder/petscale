import React from "react";
import "./UnitToggle.scss";

const UnitToggle = ({ isLbs, changeUnit }) => {
  return (
    <div class="form-check form-switch unit-toggle-container">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        onChange={(e) => changeUnit(e)}
      ></input>
      <label class="form-check-label" for="flexSwitchCheckDefault">
        lbs
      </label>
    </div>
  );
};

export default UnitToggle;
