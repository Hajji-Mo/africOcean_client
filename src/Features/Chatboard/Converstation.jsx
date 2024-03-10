import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
  selectChatId,
  selectDirectChat,
} from "../../State/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../State/socetApi";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./chatTypes";
function Converstation({ menu }) {
  const chatId = useSelector(selectChatId);
  const { conversations, currentMessages } = useSelector(selectDirectChat);
  const dispatch = useDispatch();

  useEffect(() => {
    const current = conversations.find((el) => el?.id === chatId);

    socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
      // data => list of messages

      dispatch(FetchCurrentMessages({ messages: data }));
    });

    dispatch(SetCurrentConversation(current));
  }, [chatId, currentMessages, conversations, dispatch]);
  return (
    <Box>
      <Stack>
        {currentMessages &&
          currentMessages.map((el) => {
            switch (el.type) {
              case "divider":
                return <Timeline el={el} />;
              case "msg":
                switch (el.subtype) {
                  case "img":
                    return (
                      // Media Message
                      <MediaMsg el={el} menu={menu} />
                    );
                  case "doc":
                    return (
                      // Doc Message
                      <DocMsg el={el} menu={menu} />
                    );
                  case "Link":
                    return (
                      //  Link Message
                      <LinkMsg el={el} menu={menu} />
                    );

                  case "reply":
                    return (
                      //  ReplyMessage
                      <ReplyMsg el={el} menu={menu} />
                    );
                  default:
                    return (
                      // Text Message
                      <TextMsg el={el} menu={menu} />
                    );
                }
              default:
                return <></>;
            }
          })}
      </Stack>
    </Box>
  );
}

export default Converstation;
