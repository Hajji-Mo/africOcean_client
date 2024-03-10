import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useState } from "react";
import { Alert, Link, Stack } from "@mui/material";
import { Navigate, Link as RouterLink, useNavigate } from "react-router-dom";
import { colors } from "../../MaterialTheme";

import { useDispatch } from "react-redux";
import { setCredentials } from "../State/AuthSlice";
import { useRegisterMutation } from "../State/AuthApi";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: "",
  });
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = `${firstName} ${lastName}`;
    if (password !== passwordConfirm) {
      setAlert({
        ...alert,
        visible: true,
        color: "error",
        message: "password & confirmpassword should be same!!!",
      });
      setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 3000);
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
          passwordConfirm,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        setAlert({
          ...alert,
          visible: true,
          color: "success",
          message: "successfully created your Account",
        });
        setTimeout(() => {
          setAlert({ ...alert, visible: false });
          navigate("/");
        }, 3000);
      } catch (err) {
        console.log(err);
        setAlert({
          ...alert,
          visible: true,
          color: "error",
          message: err.data.message,
        });
        setTimeout(() => {
          return setAlert({ ...alert, visible: false });
        }, 5000);
        throw Error(err);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {alert.visible && (
        <Alert variant="filled" severity={alert.color} sx={{ mt: 3 }}>
          {alert.message}
        </Alert>
      )}
      <Box
        sx={{
          marginTop: alert.visible ? 0 : 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                value={firstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={lastName}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setLasttName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={email}
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={password}
                name="password"
                label="Password"
                type="password"
                id="password"
                inputProps={{ minLength: 8 }}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={passwordConfirm}
                name="passwordConfirm"
                label="passwordConfirm"
                type="Password"
                id="passwordConfirm"
                inputProps={{ minLength: 8 }}
                onChange={(e) => setpasswordConfirm(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Stack variant="body2" direction={"row"} color={colors.main}>
                <Typography>Already have an account?</Typography>
                <Link component={RouterLink} sx={{ textDecoration: "none" }}>
                  Sign in
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
