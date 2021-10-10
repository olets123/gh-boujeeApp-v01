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
        <Grid container>
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
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: theme.spacing(2),
                  margin: theme.spacing(0),
                  width: "100%",
                  maxWidth: checkIfMobile ? theme.breakpoints.values.sm : 375,
                  background: theme.palette.primary.main,
                }}
              >
                <PayPal />
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
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: theme.spacing(2),
                  marginTop: theme.spacing(2),
                  marginBottom: theme.spacing(2),
                  width: "100%",
                  maxWidth: checkIfMobile ? theme.breakpoints.values.sm : 375,
                  background: theme.palette.primary.main,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ paddingBottom: theme.spacing(2) }}
                >
                  In this VIP group you will get inside info bets by{" "}
                  <strong>BoujeeSB</strong> and <strong>BigBrainSB</strong>.
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ paddingBottom: theme.spacing(2) }}
                >
                  You will get a notification 3 minutes before we post each bet,
                  so you have time to set up and be ready to place the bet.
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ paddingBottom: theme.spacing(2) }}
                >
                  Using a 1-5 unit-scale, to secure a solid and trustful
                  service. We’re not spamming high unit bets as other services
                  do…
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ paddingBottom: theme.spacing(2) }}
                >
                  Good bookies to have: Bet365, Pinnacle, Kambi. We post all our
                  bets in a Telegram group.
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ paddingBottom: theme.spacing(2) }}
                >
                  We post all our bets in a Telegram group.
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
