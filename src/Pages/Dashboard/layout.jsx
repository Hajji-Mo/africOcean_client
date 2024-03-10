import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../Features/DashboardNavbar";
import Sidebar from "../../Features/Sidebar";
import { colors } from "../../../MaterialTheme";

const DashLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: colors.darkGrey,
          color: colors.black,
          borderWidth: "2px",
          width: "100vw",
          display: isSidebarOpen ? "block" : "none",
          height: "100vh",
          "@media screen and (min-width: 600px)": {
            height: "139vh",
            width: "250px",
          },
        }}
      >
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </Box>

      <Box
        sx={{
          display: isSidebarOpen ? "none" : "block",
          height: "100%",
          width: "100vw",
          overflow: "hidden",
          "@media screen and (min-width: 600px)": {
            display: "block",
          },
        }}
      >
        <DashboardNavbar
          user={{}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Stack>
  );
};

export default DashLayout;
