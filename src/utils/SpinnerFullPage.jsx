import React from "react";
import { Box, CircularProgress } from "@mui/material";
function SpinnerFullPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vw",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}

export default SpinnerFullPage;
