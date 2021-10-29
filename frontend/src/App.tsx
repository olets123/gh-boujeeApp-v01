import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard";
import UserContext from "./common/context/userContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Home } from "./Home";
import { ThemeProvider, Typography } from "@mui/material";
import { boujeeTheme } from "./common/theme";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import { SnackbarProvider } from "notistack";
import Footer from "./common/Footer";

const App = (props: any) => {
  const [userData, setUserData] = useState({
    token: "",
    user: undefined,
  });
  const apiURL: string = "https://gentle-garden-79693.herokuapp.com";

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("token");
      if (token === null) {
        localStorage.setItem("token", "");
        token = "";
      }
      const tokenResponse = await axios.post(`${apiURL}/api/validToken`, null, {
        headers: { "x-auth-token": token },
      });
      if (tokenResponse.data) {
        const userRes = await axios.get(`${apiURL}/api/users`, {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <BrowserRouter>
        <ThemeProvider theme={boujeeTheme}>
          <AppBar
            position="sticky"
            color="primary"
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: 80,
            }}
          >
            <Typography
              variant="h4"
              color="secondary"
              sx={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              Boujee SB
            </Typography>
          </AppBar>
          <Paper
            elevation={0}
            sx={{
              height: "100vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route path="/" exact component={Home} />
            <UserContext.Provider value={{ userData, setUserData }}>
              <Route path="/login" exact component={Login} />
              <Route path="/dashboard" exact component={Dashboard} />
            </UserContext.Provider>
          </Paper>
          <Paper
            elevation={0}
            sx={{
              height: "250px",
              marginBottom: "20px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Footer />
          </Paper>
        </ThemeProvider>
      </BrowserRouter>
    </SnackbarProvider>
  );
};

export default App;
