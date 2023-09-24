import React from "react";
import { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import utils from "../utilities.js";
import "chartjs-adapter-date-fns";
import "./LineChart.scss";

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ pets, data, trimmedData, limit, setLimit }) => {
  console.warn("incomming data", limit, data, trimmedData);
  //data is an array of objects one for each pet, each index has a data array with all the xy values

  //chart options
  const options = {
    responsive: true,
    pointRadius: window.innerWidth < 600 ? 2 : undefined,
    borderWidth: window.innerWidth < 600 ? 1 : undefined,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            let hoverDate = `${context[0].label.split(",")[0]}, ${
              context[0].label.split(",")[1]
            }`;
            return hoverDate;
          },
        },
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    scales: { x: { type: "time" } },
  };

  return (
    <div className="chart_container">
      <div className="list_trim_label_container">
        <label htmlFor="data_trim" className="">
          Limit Results:
        </label>
        <select
          name="data_trim"
          onChange={(e) => setLimit(e.target.value)}
          id="data_trim"
          className=""
        >
          <option value="none">--Show All--</option>
          <option value="10">Last 10</option>
          <option value="20">Last 20</option>
          <option value="30">Last 30</option>
          <option value="40">Last 40</option>
          <option value="50">Last 50</option>
        </select>
      </div>
      <Line
        options={options}
        data={limit >= 0 ? { datasets: trimmedData } : { datasets: data }}
      />
    </div>
  );
};

export default LineChart;

//not sure if i want to raise all of this up a level or figure out a use effect hook method to re render the page. i should
//do some work to find out of the data array and its data.data arrays are being actually changed by my trimData method
//that could explain why i can move down in count successfully but not back up
//may need a second trimmed state for what is passed down to this component OR a trimmed state held w/ing this component
