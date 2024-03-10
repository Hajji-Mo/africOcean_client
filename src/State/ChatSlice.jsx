import { createSlice } from "@reduxjs/toolkit";

const user = window.localStorage.getItem("user");
const _id = user?.id;
const initialState = {
  directChat: {
    conversations: [],
    currentConversation: null,
    currentMessages: [],
  },
  chatType: null,
  chatId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectConversation(state, action) {
      state.chatType = "individual";
      state.chatId = action.payload.chatId;
    },
    fetchDirectConversations(state, action) {
      const list = action.payload.conversations.map((el) => {
        const user = el.participants.find((elm) => elm._id.toString() !== _id);

        return {
          id: el._id,
          userId: user?._id,
          name: user?.name,
          online: user?.status === "Online",
          img: user.photo,
          msg: el?.messages?.slice(-1)[0]?.text,
          time: "9:36",
          unread: 0,
        };
      });

      state.directChat.conversations = list;
    },
    updateDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;

      state.directChat.conversations = state.directChat.conversations.map(
        (el) => {
          if (el?.id !== this_conversation._id) {
            return el;
          } else {
            const user = this_conversation.participants.find(
              (elm) => elm._id.toString() !== _id
            );
            return {
              id: this_conversation._id,
              userId: user?._id,
              name: user?.name,
              online: user?.status === "Online",
              img: user.photo,
              msg: "my last message",
              time: "9:36",
              unread: 0,
            };
          }
        }
      );
    },
    addDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      const user = this_conversation.participants.find(
        (elm) => elm._id.toString() !== _id
      );

      state.directChat.conversations = state.directChat.conversations.filter(
        (el) => el?.id !== this_conversation._id
      );

      state.directChat.conversations.push({
        id: this_conversation._id,
        userId: user?._id,
        name: user?.name,
        online: user?.status === "Online",
        img: user.photo,
        msg: "my last message",
        time: "9:36",
        unread: 0,
      });
    },
    setCurrentConversation(state, action) {
      state.directChat.currentConversation = action.payload;
    },

    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formattedMessages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        incoming: el.to === _id,
        outgoing: el.from === _id,
      }));
      state.directChat.currentMessages = formattedMessages;
    },
    addDirectMessage(state, action) {
      state.directChat.currentMessages.push(action.payload.message);
    },
  },
});

export default chatSlice.reducer;
export const selectDirectChat = (state) => state.chat.directChat;
export const selectChattype = (state) => state.chat.chatType;
export const selectChatId = (state) => state.chat.chatId;

// ------------- middlewares------------------------

export const SelectConversation = ({ chatId }) => {
  return async (dispatch, getState) => {
    dispatch(chatSlice.actions.selectConversation({ chatId }));
  };
};
export const FetchDirectConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(chatSlice.actions.fetchDirectConversations({ conversations }));
  };
};
export const AddDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(chatSlice.actions.addDirectConversation({ conversation }));
  };
};
export const UpdateDirectConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(chatSlice.actions.updateDirectConversation({ conversation }));
  };
};
export const SetCurrentConversation = (current_conversation) => {
  return async (dispatch, getState) => {
    dispatch(chatSlice.actions.setCurrentConversation(current_conversation));
  };
};
export const FetchCurrentMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(chatSlice.actions.fetchCurrentMessages({ messages }));
  };
};

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(chatSlice.actions.addDirectMessage({ message }));
  };
};
