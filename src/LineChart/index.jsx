import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import utils from "../utilities.js";
import "chartjs-adapter-date-fns";
import "./LineChart.css";

//MUST create array of objects to pass in for datasets, then merely assign

const LineChart = ({ pets, data }) => {
  console.log("data given to chart: ", data);

  return (
    <div className="chart_container">
      <Line
        data={{
          datasets: [{ label: pets[0], data: data.datasets[0] }],
          options: {
            maintainAspectRatio: false,
            responseive: true,
            scales: { x: { type: "time" } },
          },
        }}
      />
      {/* <Line
        data={{
          datasets: [
            {
              label: `${pets[0]}`,
              data: null,
              borderColor: "rgba(200,0,200,0.8)",
              backgroundColor: "rgba(200,0,200,0.5)",
            },
            {
              label: `${pets[1]}`,
              data: null,
              borderColor: "rgba(20,180,230,0.8)",
              backgroundColor: "rgba(20,180,230,0.5)",
            },
          ],
          options: {
            maintainAspectRatio: false,
            responseive: true,
            scales: { x: { type: "time" } },
          },
        }}
      /> */}
    </div>
  );
};

export default LineChart;

// cowpig={weightData
//   .map((d) =>
//     d.name === "cowpig"
//       ? {
//           x: utils.getFormattedDateGraph(d.created_at),
//           y: d.weight,
//         }
//       : null
//   )
//   .filter((x) => x)
//   .reverse()}

/*

      <Line
        data={{
          datasets: [
            {
              label: "cowpig",
              data: cowpig,
              borderColor: "rgba(200,0,200,0.8)",
              backgroundColor: "rgba(200,0,200,0.5)",
            },
            {
              label: "bagel",
              data: bagel,
              borderColor: "rgba(20,180,230,0.8)",
              backgroundColor: "rgba(20,180,230,0.5)",
            },
          ],
          options: {
            maintainAspectRatio: false,
            responseive: true,
            scales: { x: { type: "time" } },
          },
        }}
      />

*/
