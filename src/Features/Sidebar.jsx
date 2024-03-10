import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { colors, theme } from "../../MaterialTheme";
import { IoIosArrowForward } from "react-icons/io";
import { CgChevronRight, CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Selectlanguage from "./HomeFeatures/languege";
const navItems = [
  {
    text: "Dashboard",
    icon: <AiOutlineHome />,
  },
  {
    text: "Profile",
    icon: <CgProfile />,
  },
  {
    text: " Upload Product",
    icon: <MdProductionQuantityLimits />,
  },
  {
    text: "Customers",
    icon: <IoPeopleOutline />,
  },

  {
    text: "Management",
    icon: <MdOutlineAdminPanelSettings />,
  },
];

const Sidebar = ({ setIsSidebarOpen }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <Box
          p="2rem 0 2rem 3rem"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
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

          <IconButton onClick={() => setIsSidebarOpen(false)}>
            <IoIosArrowForward />
          </IconButton>
        </Box>
        <Box width={"80%"}>
          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{}}>
                    {text}
                  </Typography>
                );
              }
              const lcText = text.toLowerCase();

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {}}
                    sx={{
                      backgroundColor:
                        active === lcText
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        fontSize: "1.5rem",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {active === lcText && (
                      <CgChevronRight sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
            <ListItem sx={{ marginLeft: "2rem" }}>
              <Typography>Select language:</Typography>
              <Box sx={{ marginLeft: ".5rem" }}>
                <Selectlanguage mobile />
              </Box>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
