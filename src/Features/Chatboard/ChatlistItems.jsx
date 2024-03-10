import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Stack,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { SelectConversation, selectChatId } from "../../State/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { colors, theme } from "../../../MaterialTheme";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatlistItems = ({ list }) => {
  const chatId = useSelector(selectChatId);
  const dispatch = useDispatch();
  const selectedChatId = chatId?.toString();

  let isSelected = selectedChatId === list.id;

  if (!selectedChatId) {
    isSelected = false;
  }

  const truncateText = (string, n) => {
    return string?.length > n ? `${string?.slice(0, n)}...` : string;
  };
  function handleClick(list) {
    dispatch(SelectConversation({ chatId: list.id }));
  }
  return (
    <Stack
      onClick={handleClick(list)}
      direction={"row"}
      sx={{
        cursor: "pointer",
        width: "95%",
        px: 1,
        py: ".3rem",
        boxSizing: "border-box",
        borderRadius: 1,

        backgroundColor: isSelected ? "#ffdfb8" : colors.white,
      }}
      spacing={2}
      mt={2}
      mx={"auto"}
      justifyContent={"space-between"}
    >
      <Stack direction="row" spacing={2}>
        {" "}
        {list.online ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt={name} src={`/img/${list.img}`} />
          </StyledBadge>
        ) : (
          <Avatar alt={name} src={`/img/${list.img}`} />
        )}
        <Box ml={2} alignItems={"center"}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 13,
              lineHeight: 1,
            }}
          >
            {list.name}
          </Typography>
          <Typography variant="caption">
            {truncateText(list.msg, 18)}
          </Typography>
        </Box>
      </Stack>
      <Stack sx={{ ml: 4, alignItems: "end" }}>
        <Typography variant="body2" fontWeight={"600"}>
          {list.time}
        </Typography>
        <Badge
          className="unread-count"
          color="primary"
          badgeContent={list.unread}
        />
      </Stack>
    </Stack>
  );
};

export default ChatlistItems;
