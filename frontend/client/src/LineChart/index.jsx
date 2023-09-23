import React from "react";

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

const LineChart = ({ pets, data }) => {
  // console.log({ ...data }[0].data[0]);
  //chart options
  console.log(data);
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
      <Line
        options={options}
        data={{
          datasets: data,
        }}
      />
    </div>
  );
};

export default LineChart;
