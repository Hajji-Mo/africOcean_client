import React from "react";
import { Box, Paper, Typography } from "@mui/material";
function Banner({ banner }) {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundImage: `url(/img/${banner.img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        borderRadiusT: 4,
        height: "15vh",

        "@media screen and (min-width: 768px)": {
          height: "27vh",
          backgroundSize: "contain",
        },
        "@media screen and (min-width: 992px )": {
          height: "65vh",
          backgroundSize: "cover",
        },
      }}
    ></Paper>
  );
}

export default Banner;
