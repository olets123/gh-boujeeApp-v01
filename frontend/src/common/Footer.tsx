import { Typography } from "@mui/material";

export const Footer = () => {
  return (
    <>
      <Typography
        variant="subtitle1"
        color="secondary"
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        © BoujeeSB - 2021
      </Typography>
      <Typography
        variant="caption"
        color="primary"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        handsome magic by @skogli20
      </Typography>
    </>
  );
};

export default Footer;
