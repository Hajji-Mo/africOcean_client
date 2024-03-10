import { Avatar, Paper, Stack, Typography } from "@mui/material";
import React from "react";

function ChatHeader() {
  return (
    <Paper>
      <Stack direction={"row"} alignItems={"center"} height={"8vh"}>
        <Avatar />
        <Typography sx={{ ml: 2 }}>online</Typography>
      </Stack>
    </Paper>
  );
}

export default ChatHeader;
