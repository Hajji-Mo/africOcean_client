import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../State/AuthSlice";
import { connectSocket, socket } from "../State/socetApi";
import {
  AddDirectConversation,
  AddDirectMessage,
  SelectConversation,
  UpdateDirectConversation,
  selectDirectChat,
} from "../State/ChatSlice";

function RequireAuth() {
  const user = useSelector(selectCurrentUser);
  const { conversations, currentConversation } = useSelector(selectDirectChat);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (user) {
      if (!socket) {
        connectSocket(user._id);
      }

      socket.on("start_chat", (data) => {
        const exsistingConversation = conversations.find(
          (el) => el?.id === data._id
        );

        if (exsistingConversation) {
          dispatch(UpdateDirectConversation({ conversation: data }));
        } else {
          // add direct conversation
          dispatch(AddDirectConversation({ conversation: data }));
        }

        dispatch(SelectConversation({ chatId: data._id }));
      });
      socket.on("new_message", (data) => {
        const message = data.message;

        // check if msg we got is from currently selected conversation
        if (currentConversation?.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user._id,
              outgoing: message.from === user._id,
            })
          );
        }
      });
      return () => {
        socket?.off("start_chat");
        socket?.off("new_message");
      };
    }
  }, [conversations, currentConversation, dispatch, user]);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/SignIn" state={{ from: location }} replace />
  );
}

export default RequireAuth;
