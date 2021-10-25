import Axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ILists } from "./lib/types/List";
import { Box } from "@mui/system";
import { useMediaQuery, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import "../index.css";

export const BoujeeChart: React.FC<{}> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ILists>([]);
  const checkIfMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      try {
        await Axios.get<ILists>("http://localhost:5000/read").then(
          (response: AxiosResponse) => {
            setData(response.data);
            setIsLoading(true);
          }
        );
      } catch (error) {
        console.error();
        setIsLoading(false);
      }
    })();
  }, []);

  const months = data.map((m) => m.month);
  const number = data.map((n) => n.percent);

  const options = {
    title: {
      text: "Return of Investment %",
    },
    chart: {
      id: "boujeeChart",
      foreColor: "#e6f2f7",
    },
    colors: ["#0784b5"],
    markers: {
      colors: ["#0784b5"],
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val + "%";
        },
      },
    },
    dataLabels: {
      style: {
        colors: ["#fff"],
      },
    },
    xaxis: {
      categories: months,
    },
  };
  const series = [
    {
      name: "ROI",
      data: number,
    },
  ];
  return isLoading ? (
    <Box display="flex" justifyContent="center" alignItems="center" margin={2}>
      <Chart
        options={options}
        series={series}
        type="bar"
        width={checkIfMobile ? theme.breakpoints.values.sm : 345}
        height={300}
      />
    </Box>
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center" m={2}>
      <CircularProgress color="secondary" />
    </Box>
  );
};
export default BoujeeChart;
