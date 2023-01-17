import BoujeeChart from "./common/Chart"
import React, { useContext, useEffect, useState } from "react"
import Axios, { AxiosResponse } from "axios"
import { ILists } from "./common/lib/types/List"
import { useHistory } from "react-router"
import UserContext from "./common/context/userContext"
import { Button, Container, Grid, IconButton, InputLabel, MenuItem, Paper, Tooltip, useMediaQuery } from "@mui/material"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { Box, useTheme } from "@mui/system"
import { CssTextField } from "./login"
import { useSnackbar } from "notistack"
import Delete from "@mui/icons-material/DeleteForever"
import Refresh from "@mui/icons-material/Refresh"

type RoiYears = "2021" | "2022"

export const Dashboard: React.FC<{}> = (props) => {
  const [showNew, setShowNew] = useState<boolean>(false)
  const [editMonth, setEditMonth] = useState<boolean>(false)
  const [months, setMonths] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<RoiYears>("2021")
  const [percent, setPercent] = useState<number>(0)
  const [numberList, setNumberlList] = useState<ILists>([])
  // const [newName, setNewName] = useState<string>("");
  const [newNumber, setNewNumber] = useState<number>(0)
  const history = useHistory()
  const appContext = useContext(UserContext)
  const theme = useTheme()
  const snackbar = useSnackbar()
  const checkIfMobile = useMediaQuery("(min-width: 600px)")
  const apiURL: string = "https://gentle-garden-79693.herokuapp.com"

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      localStorage.removeItem("token")
      history.replace("/login")
    } else {
      ;(async () => {
        await Axios.get<ILists>(`${apiURL}/read`, {
          headers: { "x-access-token": localStorage.getItem("token") },
        }).then((response: AxiosResponse) => {
          setNumberlList(response.data)
        })
      })()
    }
  }, [history, appContext])

  const onAdd = async () => {
    try {
      await Axios.post(`${apiURL}/insert`, {
        month: name,
        percent: percent,
      })
      snackbar.enqueueSnackbar("New stats added!", { variant: "success" })
      setShowNew(false)
    } catch (error) {
      snackbar.enqueueSnackbar("Something went wrong", { variant: "error" })
    }
  }

  const updateData = async (id: string) => {
    const numberId = numberList.find((f) => f._id === id)
    try {
      numberId &&
        (await Axios.put(`${apiURL}/numbers/${numberId._id}`, {
          id: numberId,
          percent: newNumber,
        }))
      snackbar.enqueueSnackbar(`${numberId && numberId.month} updated!`, {
        variant: "success",
      })
    } catch (error) {
      console.error()
      snackbar.enqueueSnackbar("Error trying to delete, ask O.T!", {
        variant: "error",
      })
    }
  }

  const onDelete = async (id: string) => {
    try {
      const numberId = numberList.find((f) => f._id === id)
      await Axios.delete(`${apiURL}/delete/${numberId && numberId._id}`)
      snackbar.enqueueSnackbar(`${numberId && numberId.month} deleted!`, {
        variant: "success",
      })
    } catch (error) {
      console.error()
      snackbar.enqueueSnackbar("Error trying to delete, ask O.T!", {
        variant: "error",
      })
    }
  }

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPercent(Number(e.target.value))
  }

  const onChangeNewNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewNumber(Number(e.target.value))
  }

  const handleChange = (event: SelectChangeEvent) => {
    setMonths(event.target.value)
    setEditMonth(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    history.push("/login")
  }

  return appContext ? (
    <Container>
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <Button
          onClick={logout}
          variant="outlined"
          color="secondary"
          sx={{
            marginTop: "16px",
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          Logout
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" width="100%">
        <BoujeeChart year={selectedYear} />
      </Box>

      {showNew && (
        <Paper
          variant="elevation"
          elevation={3}
          sx={{
            padding: theme.spacing(2),
            margin: theme.spacing(2),
            maxWidth: theme.breakpoints.values.md,
            background: theme.palette.primary.main,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <CssTextField
                autoFocus
                id="filled-basic"
                label="Month"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                autoFocus
                id="filled-basic"
                label="Percent"
                type="number"
                onChange={onChangeNumber}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={onAdd} variant="outlined" color="secondary">
                Send new stats
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
      <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" width="100%">
        <Paper
          variant="elevation"
          elevation={3}
          sx={{
            padding: theme.spacing(2),
            margin: theme.spacing(2),
            background: theme.palette.primary.main,
          }}
        >
          <InputLabel id="select-year">Select Year to Edit ROI %</InputLabel>
          <Select
            variant="outlined"
            color="info"
            id="select-year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value as RoiYears)}
            sx={{
              width: checkIfMobile ? theme.breakpoints.values.sm : 345,
              background: "#0784b5",
            }}
          >
            {["2021", "2022", "2023"].map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Paper>
        <Paper
          variant="elevation"
          elevation={3}
          sx={{
            padding: theme.spacing(2),
            margin: theme.spacing(2),
            background: theme.palette.primary.main,
          }}
        >
          <InputLabel id="select-month">Edit Month ROI %</InputLabel>
          <Select
            variant="outlined"
            color="info"
            id="select-month"
            value={months}
            onChange={handleChange}
            sx={{
              width: checkIfMobile ? theme.breakpoints.values.sm : 345,
              background: "#0784b5",
            }}
          >
            {numberList
              .filter((f) => f.year === selectedYear)
              .map((option, index) => (
                <MenuItem key={index} value={option._id}>
                  {option.month}, {option.percent} %
                </MenuItem>
              ))}
          </Select>
        </Paper>
      </Box>
      {editMonth && (
        <>
          <Box display="flex" justifyContent="center" width={"100%"} mt={2}>
            <CssTextField
              name="newNumber"
              autoFocus
              id="filled-basic"
              label="Return of Investment %"
              type="number"
              defaultValue={months}
              onChange={(e) => onChangeNewNumber(e)}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              multiline={false}
            />
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => updateData(months)}
              sx={{ marginLeft: "8px", marginRight: '"8px' }}
            >
              Update
            </Button>
            <Tooltip title="Delete" placement="top">
              <IconButton onClick={() => onDelete(months)} size="large" sx={{ height: 56, width: 56 }}>
                <Delete color="secondary" sx={{ height: 56, width: 56 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      )}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Button
            size="large"
            startIcon={<Refresh />}
            color="secondary"
            variant="outlined"
            onClick={() => window.location.reload()}
            sx={{
              marginTop: "32px",
              marginLeft: "8px",
              marginRight: '"8px',
            }}
          >
            REFETCH When updated
          </Button>
        </Box>
      </Box>
    </Container>
  ) : (
    <>
      <h2>You are not logged in</h2>
    </>
  )
}
export default Dashboard
