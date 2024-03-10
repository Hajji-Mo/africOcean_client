import { Box, Stack } from "@mui/material";
import React from "react";
import ChatHeader from "./ChatHeader";
import Converstation from "./Converstation";
import ChatFooter from "./ChatFooter";

const ChatComponenets = () => {
  const isMobile = false;
  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      width={isMobile ? "100vw" : "auto"}
    >
      {/*  */}
      <ChatHeader />
      <Box
        className="hideChatScrollbar"
        // ref={messageListRef}
        width={"100%"}
        sx={{
          position: "relative",
          flexGrow: 1,
          overflowY: "scroll",
        }}
      >
        <Converstation menu={true} />
      </Box>

      {/*  */}
      <ChatFooter />
    </Stack>
  );
};

export default ChatComponenets;
