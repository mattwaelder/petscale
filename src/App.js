import "./App.css";
import React, { useState } from "react";
import DataInput from "./DataInput";
import DataList from "./DataList";
import axios from "axios";

function App() {
  const [state, setState] = useState("apple");

  return (
    <div className="App">
      <DataInput />
      <DataList />
      <Graph />
    </div>
  );
}

export default App;

let obj = {
  userName: "mattwaelder",
  userID: 1,
  petData: {
    //nix photos bc time constraint
    cowpig: [
      { id: 123, weight: 1250, created_at: Date },
      { id: 124, weight: 1250, created_at: Date },
    ],
    bagel: [
      { id: 125, weight: 1250, created_at: Date },
      { id: 126, weight: 1250, created_at: Date },
    ],
  },
};
