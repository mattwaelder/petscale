import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import utils from "../utilities.js";
import "chartjs-adapter-date-fns";
import "./LineChart.css";

//MUST create array of objects to pass in for datasets, then merely assign

const LineChart = ({ pets, data }) => {
  // console.log("data given to chart: ", data);
  // let data1 = data.datasets ? data.datasets[0] : null;
  // let data2 = data.datasets ? data.datasets[1] : null;
  // let data3 = data.datasets ? data.datasets[2] : null;
  // let data4 = data.datasets ? data.datasets[3] : null;
  // let data5 = data.datasets ? data.datasets[4] : null;

  return (
    <div className="chart_container">
      <Line
        data={{
          datasets: data,
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
