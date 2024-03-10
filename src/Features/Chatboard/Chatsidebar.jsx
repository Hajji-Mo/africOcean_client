import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Box, Divider, Stack, Typography } from "@mui/material";
import { FaSearch } from "react-icons/fa";

import ChatlistItems from "./ChatlistItems";
import {
  FetchDirectConversations,
  selectDirectChat,
} from "../../State/ChatSlice";
import { connectSocket, socket } from "../../State/socetApi";
import { selectCurrentUser } from "../../State/AuthSlice";

function Chatsidebar({ setShow }) {
  const { _id } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const { conversations } = useSelector(selectDirectChat);
  useEffect(() => {
    if (!socket) {
      connectSocket(_id);
    }
    socket.emit("get_direct_conversations", { _id }, (data) => {
      dispatch(FetchDirectConversations({ conversations: data }));
    });
  }, [_id, dispatch]);
  return (
    <>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="h5">Chats</Typography>
      </Box>
      <Stack sx={{ width: "80%", mt: 3, mx: "auto" }}>
        <form className="chat-search-from">
          <div className="chat-search-icon">
            <FaSearch />
          </div>
          <input placeholder="Search…" />
        </form>
      </Stack>
      <Divider sx={{ my: 3 }} />

      <Stack height={"85vh"} overflow={"scroll"}>
        {conversations?.map((list) => (
          <ChatlistItems key={list.id} list={list} />
        ))}
      </Stack>
    </>
  );
}

export default Chatsidebar;
