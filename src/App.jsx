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
import EditDataModal from "./components/edit-data-modal";

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
  const [animatedChartData, setAnimatedChartData] = useState([]);
  const [animatedChartData2, setAnimatedChartData2] = useState([]);
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);

  useEffect(() => {
    const loadData1 = localStorage.getItem("data1");
    const loadData2 = localStorage.getItem("data2");

    if (loadData1) {
      setChartData(JSON.parse(loadData1));
    } else {
      setChartData(data);
    }

    if (loadData2) {
      setChartData2(JSON.parse(loadData2));
    } else {
      setChartData2(data2);
    }
  }, []);

  useEffect(() => {
    const fillData = () => {
      if (index >= chartData.length) {
        return;
      }

      setAnimatedChartData((prev) => [
        ...prev,
        {
          x: chartData[index].x,
          y: chartData[index].y,
        },
      ]);
      setIndex((prev) => prev + 1);
    };

    const timeout = setTimeout(fillData, 200);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedChartData, chartData]);

  useEffect(() => {
    const fillData = () => {
      if (index2 >= chartData2.length) {
        return;
      }

      setAnimatedChartData2((prev) => [
        ...prev,
        {
          x: chartData2[index2].x,
          y: chartData2[index2].y,
        },
      ]);
      setIndex2((prev) => prev + 1);
    };

    const timeout = setTimeout(fillData, 200);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedChartData2, chartData2]);

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
                  data: animatedChartData,
                  backgroundColor: "rgba(255, 99, 132, 0.25)",
                  pointRadius: 8,
                },
                {
                  label: "User B",
                  data: animatedChartData2,
                  backgroundColor: "rgba(54, 162, 235, 0.25)",
                  pointRadius: 8,
                },
              ],
            }}
          />
          <div className="flex justify-center items-center gap-4">
            <EditDataModal
              triggerText="Edit Data A"
              data={data}
              onSave={(val) => {
                setIndex(0);
                setAnimatedChartData([]);
                setChartData(val);
                localStorage.setItem("data1", JSON.stringify(val));
              }}
            />
            <EditDataModal
              triggerText="Edit Data B"
              data={data}
              onSave={(val) => {
                setIndex2(0);
                setAnimatedChartData2([]);
                setChartData2(val);
                localStorage.setItem("data2", JSON.stringify(val));
              }}
            />
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
