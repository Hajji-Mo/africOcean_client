import { Box, Button, Typography } from "@mui/material";
import React from "react";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <Box>
        {" "}
        <Box>
          <Typography as="h1">Something went wrong 🧐</Typography>
          <p>{error.message}</p>
          <Typography size="large" onClick={resetErrorBoundary}>
            Try again
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default ErrorFallback;
