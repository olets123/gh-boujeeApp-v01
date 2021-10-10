import { useContext, useState } from "react";
import UserContext from "./common/context/userContext";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Button, Paper, Typography } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router";

export const CssTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#0784b5",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.mode === "dark" ? " #0784b5" : "#0784b5",
    },
  },
}));

export const Login = (props: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const appContext = useContext(UserContext);
  const theme = useTheme();
  const snackbar = useSnackbar();
  const history = useHistory();

  const loginUser = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.user && appContext) {
        appContext.setUserData({
          token: data.token,
          user: data.user,
        });
        localStorage.setItem("token", data.user);
        snackbar.enqueueSnackbar("Login success", { variant: "success" });
        history.push(`/dashboard`);
      } else {
        snackbar.enqueueSnackbar("Please check your username and password", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error();
    }
  };

  return (
    <div>
      <Typography
        variant="h5"
        color="secondary"
        display="flex"
        justifyContent="center"
        mt={2}
      >
        Admin Login
      </Typography>
      <form onSubmit={loginUser}>
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
          <CssTextField
            autoFocus
            id="filled-basic"
            label="Username"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Paper>
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
          <CssTextField
            autoFocus
            id="filled-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            InputLabelProps={{ shrink: true }}
          />
        </Paper>
        <Box display="flex" width="100%" justifyContent="flex-end">
          <Button
            type="submit"
            value="login"
            size="large"
            variant="outlined"
            color="secondary"
            sx={{ marginRight: "16px" }}
          >
            {"Login"}
          </Button>
        </Box>
      </form>
    </div>
  );
};
export default Login;

/* 

 <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
*/
