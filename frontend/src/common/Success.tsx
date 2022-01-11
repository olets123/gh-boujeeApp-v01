import { Alert, Box, Link } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import TelegramIcon from "@mui/icons-material/Telegram";

interface Success {
  name: string;
  handleClose: () => void;
  open: boolean;
}

export const ModalCompleted: React.FC<Success> = ({
  name,
  handleClose,
  open,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Alert
            sx={{
              width: "300px",
            }}
            variant="filled"
            severity="success"
          >
            {"Payment Succeeded!"}
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "white" }}
          >
            <Box display={"flex"} flexDirection={"column"} mb={2}>
              <Box mb={2}>Payer: {name}</Box>
              <Box display={"flex"} flexDirection={"row"}>
                <TelegramIcon sx={{ width: 25, paddingRight: "8px" }} />
                <Typography variant="body1">Telegram:</Typography>
                <Link
                  sx={{ color: "lightblue", paddingLeft: "8px" }}
                  href="www.telegram.com"
                >
                  www.telegram.com/martin
                </Link>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            autoFocus
            sx={{ color: "white" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ModalCompleted;
