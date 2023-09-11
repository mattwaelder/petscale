import React from "react";
import "./UnitToggle.scss";

const UnitToggle = ({ isLbs, changeUnit }) => {
  return (
    <div className="form-check form-switch unit-toggle-container">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        onChange={(e) => changeUnit(e)}
      ></input>
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        lbs
      </label>
    </div>
  );
};

export default UnitToggle;
