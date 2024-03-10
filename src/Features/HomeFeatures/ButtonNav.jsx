import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ButtomNavList } from "../../utils/lists";
import { colors } from "../../../MaterialTheme";
import { useNavigate } from "react-router-dom";
function Boxes({ text, Icon, navigate, link, index }) {
  const [active, setActive] = useState(0);
  function handleItem(index) {
    navigate(link);
  }
  return (
    <Stack
      sx={{
        cursor: "pointer",
        alignItems: "center",
        minWidth: "3rem",
        color: active === index ? colors.main : colors.black,
      }}
      onClick={() => handleItem(index)}
    >
      <Box component={"div"} sx={{ fontSize: "1.3rem" }}>
        <Box>{Icon}</Box>
      </Box>
      <Typography sx={{ pl: ".3rem", fontSize: "1rem" }}>{text}</Typography>
    </Stack>
  );
}

const ButtonNav = () => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
        height: "4rem",
        display: "block",
        "@media screen and (min-width: 768px)": {
          display: "none",
        },
      }}
    >
      <Container>
        <List sx={{ display: "flex", justifyContent: "space-between" }}>
          {ButtomNavList &&
            ButtomNavList.map((list, index) => (
              <Boxes
                key={index}
                text={list.en}
                link={list.link}
                Icon={list.icon}
                navigate={navigate}
                index={index}
              />
            ))}
        </List>
      </Container>
    </Paper>
  );
};

export default ButtonNav;
