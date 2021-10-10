import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import BoujeeChart from "./common/Chart";
import PayPal from "./common/PayPal";
import { Paper, useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import Typography from "@mui/material/Typography";

export const Home: React.FC<{}> = (props) => {
  const theme = useTheme();
  const checkIfMobile = useMediaQuery("(min-width: 600px)");
  return (
    <Container>
      <Box display="flex" justifyContent="center" width="100%">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BoujeeChart />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" m={0} width="100%">
              <Paper
                variant="elevation"
                elevation={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: theme.spacing(2),
                  margin: theme.spacing(2),
                  width: "100%",
                  maxWidth: checkIfMobile ? theme.breakpoints.values.sm : 375,
                  background: theme.palette.primary.main,
                }}
              >
                <Typography variant="subtitle1">Test Text</Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" m={0} width="100%">
              <Paper
                variant="elevation"
                elevation={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: theme.spacing(2),
                  margin: theme.spacing(2),

                  width: "100%",
                  maxWidth: checkIfMobile ? theme.breakpoints.values.sm : 375,
                  background: theme.palette.primary.main,
                }}
              >
                <PayPal />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
