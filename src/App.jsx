import "./App.css";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { data, data2 } from "./data";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      title: {
        display: true,
        text: "Harmony",
      },
      ticks: {
        // Include a dollar sign in the ticks
        // eslint-disable-next-line no-unused-vars
        callback: function (value, index, ticks) {
          if (value == 1) {
            return "Dark";
          }

          if (value == 2) {
            return "Relax";
          }

          if (value == 3) {
            return "Excited";
          }
        },
      },
      max: 4,
      beginAtZero: true,
    },
    x: {
      title: {
        display: true,
        text: "Tempo",
      },
      beginAtZero: true,
      max: 15,
    },
  },
  animation: false,
};

function App() {
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(fillData, 200);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  useEffect(() => {
    const timeout = setTimeout(fillData2, 200);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData2]);

  const fillData = () => {
    if (index >= data.length) {
      return;
    }

    setChartData((prev) => [
      ...prev,
      {
        x: data[index].melody,
        y: data[index].harmony,
      },
    ]);
    setIndex((prev) => prev + 1);
  };

  const fillData2 = () => {
    if (index2 >= data2.length) {
      return;
    }

    setChartData2((prev) => [
      ...prev,
      {
        x: data2[index].melody,
        y: data2[index].harmony,
      },
    ]);
    setIndex2((prev) => prev + 1);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
      }}
    >
      <Scatter
        options={options}
        data={{
          datasets: [
            {
              label: "User A",
              data: chartData,
              backgroundColor: "rgba(255, 99, 132, 0.25)",
              pointRadius: 8,
            },
            {
              label: "User B",
              data: chartData2,
              backgroundColor: "rgba(54, 162, 235, 0.25)",
              pointRadius: 8,
              hidden: true,
            },
          ],
        }}
      />
      <div>
        <button
          onClick={() => {
            setChartData([]);
            setIndex(0);
            setChartData2([]);
            setIndex2(0);
          }}
          style={{
            marginTop: "40px",
          }}
        >
          Reset Animation
        </button>
      </div>
    </div>
  );
}

export default App;
