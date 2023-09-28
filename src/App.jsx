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
import { Button, Card } from "@radix-ui/themes";
import SettingsModal from "./components/settings-modal";

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
      max: 12,
      ticks: {
        // Include a dollar sign in the ticks
        // eslint-disable-next-line no-unused-vars
        callback: function (value, index, ticks) {
          if (value > 10) {
            return null;
          }

          return value;
        },
      },
    },
  },
  layout: {
    padding: 50,
  },
  animation: false,
};

function App() {
  const [chartOptions, setChartOptions] = useState(options);
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
        x: data[index].x,
        y: data[index].y,
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
        x: data2[index].x,
        y: data2[index].y,
      },
    ]);
    setIndex2((prev) => prev + 1);
  };

  return (
    <div className="mx-auto max-w-screen-lg">
      <h1 className="font-bold text-2xl my-10 text-center">
        Virtual Music Tour Chart
      </h1>
      <div className="flex items-center justify-center">
        <Card className="w-[1024px] p-10">
          <Scatter
            options={chartOptions}
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
          <div className="flex justify-center items-center gap-4">
            <SettingsModal
              settings={chartOptions}
              onSave={(val) => {
                setChartOptions((prev) => ({
                  ...prev,
                  scales: {
                    ...prev.scales,
                    x: {
                      ...prev.scales.x,
                      title: {
                        ...prev.scales.x.title,
                        text: val.x,
                      },
                    },
                    y: {
                      ...prev.scales.y,
                      title: {
                        ...prev.scales.y.title,
                        text: val.y,
                      },
                    },
                  },
                }));
              }}
            />
            <Button
              onClick={() => {
                setChartData([]);
                setIndex(0);
                setChartData2([]);
                setIndex2(0);
              }}
            >
              Reset Animation
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
