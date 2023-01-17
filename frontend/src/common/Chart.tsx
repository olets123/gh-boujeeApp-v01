import Axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { ILists } from "./lib/types/List"
import { Box } from "@mui/system"
import { Skeleton, useMediaQuery, useTheme } from "@mui/material"
import "../index.css"

interface IBoujeeChart {
  year: "2021" | "2022" | "2023"
}

export const BoujeeChart: React.FC<IBoujeeChart> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<ILists>([])
  const checkIfMobile = useMediaQuery("(min-width: 600px)")
  const theme = useTheme()
  const apiURL: string = "https://gentle-garden-79693.herokuapp.com"

  useEffect(() => {
    ;(async () => {
      try {
        await Axios.get<ILists>(`${apiURL}/read`).then((response: AxiosResponse) => {
          setData(response.data)
          setIsLoading(true)
        })
      } catch (error) {
        console.error()
        setIsLoading(false)
      }
    })()
  }, [])

  const dataFor2021 = data.filter((y) => y.year === "2021")
  const dataFor2022 = data.filter((year) => year.year === "2022")
  const dataFor2023 = data.filter((year) => year.year === "2023")
  const months2021 = dataFor2021.map((d) => d.month)
  const percent2021 = dataFor2021.map((d) => d.percent)
  const months2022 = dataFor2022.map((d) => d.month)
  const percent2022 = dataFor2022.map((d) => d.percent)
  const months2023 = dataFor2023.map((d) => d.month)
  const percent2023 = dataFor2023.map((d) => d.percent)

  const options = {
    title: {
      text: `Return of Investment ${props.year === "2021" ? "2021" : props.year === "2022" ? "2022" : "2023"}%`,
    },
    chart: {
      id: "boujeeChart",
      foreColor: "#e6f2f7",
      toolbar: {
        show: false,
        tools: {
          download: false,
        },
      },
    },
    colors: ["#0784b5"],
    markers: {
      colors: ["#0784b5"],
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val + "%"
        },
      },
    },
    dataLabels: {
      style: {
        colors: ["#fff"],
      },
    },
    xaxis: {
      categories: props.year === "2021" ? months2021 : props.year === "2022" ? months2022 : months2023,
    },
  }

  const series = [
    {
      name: "ROI",
      data: props.year === "2021" ? percent2021 : props.year === "2022" ? percent2022 : percent2023,
    },
  ]

  return isLoading ? (
    <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" margin={2}>
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
      <Skeleton
        variant="rectangular"
        animation="pulse"
        width={checkIfMobile ? theme.breakpoints.values.sm : 345}
        height={300}
      />
    </Box>
  )
}
export default BoujeeChart
