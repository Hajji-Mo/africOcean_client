import React from "react";

import { Box, Stack, Typography } from "@mui/material";

import { colors } from "../../MaterialTheme";
import Chatsidebar from "../Features/Chatboard/Chatsidebar";
import ChatComponenets from "../Features/Chatboard/ChatComponenets";
import Navbar from "../Features/HomeFeatures/Navbar";
import { selectChatId, selectChattype } from "../State/ChatSlice";
import { useSelector } from "react-redux";

function ChatPage() {
  const chatType = useSelector(selectChattype);
  const chatId = useSelector(selectChatId);

  return (
    <Box>
      <Navbar />
      <Box sx={{ position: "relative" }}>
        <Stack
          elevation={6}
          sx={{
            bgcolor: colors.Grey200,
            height: "90vh",
            position: "fixed",
            zIndex: 10000,
            width: "100vw",
          }}
        >
          <Stack
            sx={{
              bgcolor: colors.Grey100,
              height: "100%",
              width: "100vw",
              display: "block",
            }}
          >
            <Chatsidebar setShow={"heel"} />
          </Stack>

          <Stack
            sx={{
              display: "none",
            }}
          >
            {chatType === "individual" && chatId !== null ? (
              <ChatComponenets />
            ) : (
              <Stack
                spacing={2}
                sx={{ height: "100%", width: "100%" }}
                alignItems="center"
                justifyContent={"center"}
              >
                <Typography variant="subtitle2">
                  Select a conversation or start a new one
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default ChatPage;
