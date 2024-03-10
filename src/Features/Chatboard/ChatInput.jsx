import {
  Box,
  Button,
  Fab,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { LiaUser } from "react-icons/lia";
import { FaFile, FaUser } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { CiFaceSmile } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { CiFileOn } from "react-icons/ci";
import { PiSticker } from "react-icons/pi";
import { colors, theme } from "../../../MaterialTheme";
import { socket } from "../../State/socetApi";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { selectChatId, selectDirectChat } from "../../State/ChatSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../State/AuthSlice";

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

// import { PiLinkSimple, PiSmiley, PiSticker } from "react-icons/pi";

const Actions = [
  {
    color: "#d87e10",
    icon: <CiImageOn size={24} />,
    y: 55,
    title: "Photo/Video",
  },
  {
    color: "#c3700c",
    icon: <PiSticker size={24} />,
    y: 100,
    title: "Stickers",
  },
  {
    color: "#9a5d13",
    icon: <CiCamera size={24} />,
    y: 150,
    title: "Image",
  },
  {
    color: "#784b14",
    icon: <CiFileOn size={24} />,
    y: 200,
    title: "Document",
  },
  {
    color: colors.Brown,
    icon: <LiaUser size={24} />,
    y: 250,
    title: "Contact",
  },
];

const ChatInput = ({
  openPicker,
  setOpenPicker,
  setValue,
  value,
  inputRef,
}) => {
  const { currentConversation } = useSelector(selectDirectChat);
  const chatId = useSelector(selectChatId);
  const { _id } = useSelector(selectCurrentUser);
  const [openActions, setOpenActions] = useState(false);
  const handleSabmit = (e) => {
    e.preventDefault();
    if (value == "") return;
    socket.emit("text_message", {
      message: linkify(value),
      conversation_id: chatId,
      from: _id,
      to: currentConversation.userId,
      type: containsUrl(value) ? "Link" : "Text",
    });
    setValue("");
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSabmit}
      sx={{
        display: "flex",
        flexDirection: "row",
        py: 1,
        px: 2,
        bgcolor: colors.Grey100,
        m: 1,
        borderRadius: 6,
      }}
    >
      <TextField
        id="input-with-icon-textfield"
        placeholder="write something"
        variant="standard"
        fullWidth
        inputRef={inputRef}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <Stack sx={{ width: "max-content" }}>
                <Stack
                  sx={{
                    position: "relative",
                    display: openActions ? "inline-block" : "none",
                  }}
                >
                  {Actions.map((el, idx) => (
                    <Tooltip placement="right" title={el.title} key={idx}>
                      <Fab
                        onClick={() => {
                          setOpenActions(!openActions);
                        }}
                        sx={{
                          position: "absolute",
                          top: -el.y,
                          backgroundColor: el.color,
                          width: "40px",
                          height: "40px",
                          color: "#fff",
                        }}
                        aria-label="add"
                      >
                        {el.icon}
                      </Fab>
                    </Tooltip>
                  ))}
                </Stack>
                <IconButton
                  sx={{ fontSize: 18 }}
                  onClick={() => setOpenActions((openActions) => !openActions)}
                >
                  <FiLink />
                </IconButton>
              </Stack>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                sx={{ fontSize: 18 }}
                onClick={() => setOpenPicker((openPicker) => !openPicker)}
              >
                <CiFaceSmile />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        bgcolor="secondry"
        sx={{ minWidth: "50px", fontSize: "20", borderRadius: 6 }}
        disableElevation
      >
        <PiPaperPlaneTilt color="#fff" />
      </Button>
    </Box>
  );
};

export default ChatInput;
