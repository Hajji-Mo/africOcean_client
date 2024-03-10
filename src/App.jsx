import React, { lazy, Suspense } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@mui/material/styles";

import "./App.css";
import { theme } from "../MaterialTheme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SpinnerFullPage from "./utils/SpinnerFullPage";

const HomePage = lazy(() => import("./Pages/HomePage"));
const ProductDetail = lazy(() => import("./Pages/ProductDetail"));
const Register = lazy(() => import("./Pages/RegisterPage"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const RequireAuth = lazy(() => import("./utils/RequireAuth"));
const ChatPage = lazy(() => import("./Pages/Chatpage"));
const Dashboard = lazy(() => import("./Pages/Dashboard/DashBoard"));
const DashLayout = lazy(() => import("./Pages/Dashboard/layout"));
// dist/assets/index-Rjg3HRTT.css                                25.13 kB │ gzip:  11.13 kB
// dist/assets/index-HDX3_aaY.js                              1,449.38 kB │ gzip: 419.66 kB

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Navigate replace to="Home" />} />
            <Route path="Home" element={<HomePage />} />
            <Route path="Register" element={<Register />} />
            <Route path="SignIn" element={<SignIn />} />
            <Route path="Product/:id" element={<ProductDetail />} />
            <Route element={<RequireAuth />}>
              <Route path="/Chat" element={<ChatPage />} />
              <Route element={<DashLayout />}>
                <Route path="Dashboard" element={<Dashboard />} />
              </Route>
            </Route>
          </Routes>{" "}
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
