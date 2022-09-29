import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import "./LineChart.css";

const LineChart = ({ cowpig, bagel }) => {
  console.log(bagel);

  return (
    <div className="chart_container">
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
    </div>
  );
};

export default LineChart;

/*

          labels: [
            "jan",
            "feb",
            "mar",
            "apr",
            "may",
            "jun",
            "jul",
            "aug",
            "sep",
            "oct",
            "nov",
            "dec",
          ],

          */
