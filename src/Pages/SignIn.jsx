import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSignInMutation } from "../State/AuthApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../State/AuthSlice";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: "",
  });
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await signIn({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      setAlert({
        ...alert,
        visible: true,
        color: "success",
        message: "you successfully signed In",
      });
      setTimeout(() => {
        setAlert({ ...alert, visible: false });
        navigate("/");
      }, 3000);
    } catch (err) {
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            value={email}
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={password}
            type="password"
            id="password"
            inputProps={{ minLength: 8 }}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
