import React, { useState } from "react";
import { BsLock, BsWhatsapp } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";

import { IoPersonOutline } from "react-icons/io5";
import {
  Box,
  Paper,
  Container,
  Typography,
  Stack,
  Avatar,
  Input,
  Button,
  IconButton,
  TextField,
  ListItemButton,
  List,
  Badge,
  Hidden,
} from "@mui/material";
// import { BsGlobe2 } from "react-icons/bs";
import { colors, theme } from "../../../MaterialTheme";
import { FaSearch } from "react-icons/fa";
import { NavbarList } from "../../utils/lists";
import { useNavigate } from "react-router-dom";
import Chatboard from "../../Pages/Chatpage";
import queryString from "query-string";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../State/AuthSlice";
import Selectlanguage from "./languege";
import { selectCartItems } from "../../State/cartSlice";

function Boxes({ text, Icon, count, navigate, link }) {
  return (
    <ListItemButton
      sx={{
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
        minWidth: "3rem",
      }}
      onClick={() => navigate(link)}
    >
      <Box component={"div"} sx={{ fontSize: "1.3rem" }}>
        <Box>{Icon}</Box>
      </Box>
      <Typography sx={{ pl: ".3rem", fontSize: "1rem" }}>{text}</Typography>
    </ListItemButton>
  );
}
function Navbar() {
  const user = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);

  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const languege = "en";

  const handleSearch = (e) => {
    const lang = JSON.parse(localStorage.getItem("lang"));

    e.preventDefault();
    const query = queryString.stringify({ search: value });
  };

  return (
    <>
      <Stack
        sx={{
          bgcolor: colors.main,
          width: "100%",
          height: 35,
          display: "block",
          color: colors.white,
          "@media screen and (max-width:768px)": {
            display: "none",
          },
        }}
      >
        <Container>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
              alignItems: "center",
              height: 35,
            }}
          >
            <Typography>we are open 247</Typography>
            <List sx={{ display: "flex", pl: "1.5rem", textAlign: "center" }}>
              <Selectlanguage />
              <Boxes
                text={NavbarList.signIn[languege]}
                Icon={NavbarList.signIn.icon}
                link={NavbarList.signIn.link}
                navigate={navigate}
              />

              <Boxes
                text={NavbarList.SignUp[languege]}
                link={NavbarList.SignUp.link}
                navigate={navigate}
              />
            </List>
          </Stack>
        </Container>
      </Stack>
      <Paper
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
          position: "relative",
        }}
        elevation={1}
      >
        <Container>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
              width: "100%",
              height: 50,
              alignItems: "center",
            }}
          >
            <Box className="logo" onClick={() => navigate("/Home")}>
              <Box
                sx={{
                  display: "flex",
                  fontSize: {
                    xs: ".7rem",
                  },
                }}
              >
                <Box
                  variant="h4"
                  component={"h1"}
                  fontStyle={"italic"}
                  color={colors.main}
                >
                  Afro
                </Box>
                <Box variant="h4" component={"h1"}>
                  Trade
                </Box>
              </Box>
            </Box>
            <Box
              component={"form"}
              sx={{
                width: "40%",
                height: "2rem",
                display: " flex",
                justifyContent: "space-between",
                padding: "0.2rem",
                border: "solid 2px rgba(0 ,0 ,0 , 0.8)",
                borderRadius: "1.5rem",
                textAlign: "center",
                alignItems: "center",
                pl: 3,
                ml: "4rem",
                "@media screen and (max-width: 768px)": {
                  display: "none",
                },
              }}
              onSubmit={handleSearch}
            >
              <Input
                type="text"
                placeholder="search for anything"
                sx={{ width: "85%" }}
                value={value}
                disableUnderline={true}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{ borderRadius: 12, textTransform: "capitalize" }}
              >
                <FaSearch />
                <Typography variant="subtitle2" pl={"2px"}>
                  search
                </Typography>
              </Button>
            </Box>
            <Box
              component={"form"}
              sx={{
                display: "none",
                "@media screen and (max-width: 768px)": {
                  display: "flex",
                  justifyContent: "space-between",
                  minWidth: "10rem",
                  width: "50%",
                  background: colors.Grey100,
                  height: "2rem",
                  padding: "0.2rem",
                  borderRadius: "1.5rem",
                  textAlign: "center",
                  alignItems: "center",
                  pl: 2,
                },
              }}
              onSubmit={handleSearch}
            >
              <Box color={colors.main} mt={"3px"}>
                <FaSearch />
              </Box>
              <Input
                type="text"
                placeholder="search for anything"
                disableUnderline={true}
                sx={{ minWidth: "100%", ml: 1, fontSize: ".9rem" }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Box>
            <List
              sx={{
                "@media screen and (max-width: 768px)": {
                  display: "none",
                },
                display: "flex",
                pl: "1.5rem",
                textAlign: "center",
              }}
            >
              <Stack>
                <Box>
                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <Typography
                      variant="caption"
                      lineHeight={1}
                      sx={{
                        fontSize: "10px",
                        bgcolor: colors.main,
                        p: "3px",
                        color: colors.white,
                        borderRadius: "50%",
                        position: "absolute",
                        top: "-5px",
                        left: "1.3rem",
                      }}
                    >
                      12
                    </Typography>
                  </Box>

                  <Boxes
                    text={NavbarList.cart[languege]}
                    Icon={NavbarList.cart.icon}
                  />
                </Box>
              </Stack>

              <Boxes
                text={NavbarList.Contact[languege]}
                Icon={NavbarList.Contact.icon}
                link={NavbarList.Contact.link}
                navigate={navigate}
              />

              <Boxes text={"+260773416630"}></Boxes>
            </List>
          </Stack>
        </Container>
      </Paper>
    </>
  );
}

export default Navbar;
