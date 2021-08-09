import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  browserName,
  fullBrowserVersion,
  osName,
  osVersion,
} from "react-device-detect";

const theme = createTheme({
  palette: {
    primary: {
      main: "#283593",
    },
    secondary: {
      main: "#e0f7fa",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: "flex",
    // flexWrap: "wrap",
    marginTop: theme.spacing(8),
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(55),
      height: theme.spacing(60),
    },
    flexDirection: "column",
    alignItems: "center",
  },
  dataForm: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function ForgotPass() {
  const classes = useStyles();
  const [ip, setIP] = useState("");

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    setIP(res.data.IPv4);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  console.log(`${browserName} ${fullBrowserVersion} ${osName} ${osVersion}`);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.root}>
          <Paper elevation={3}>
            <Container maxWidth="xs" className={classes.dataForm}>
              <Avatar className={classes.avatar}>
                <VpnKeyIcon />
              </Avatar>
              <Typography component="h1" variant="h6" style={{ padding: 10 }}>
                Input information for reset password
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="oldPassword"
                  label="Old Password"
                  type="password"
                  id="oldPassword"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Reset Password
                </Button>
                {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
              </form>

              <Typography
                component="h4"
                variant="subtitle1"
                style={{ padding: 0 }}
              >
                {" "}
                IP Adress: {ip}
              </Typography>
              <Typography
                component="h4"
                variant="subtitle1"
                style={{ padding: 0 }}
              >
                {" "}
                Browser : {browserName} Version : {fullBrowserVersion}
              </Typography>
              <Typography
                component="h4"
                variant="subtitle1"
                style={{ padding: 0 }}
              >
                {" "}
                Browser : {osName} Version : {osVersion}
              </Typography>
            </Container>
          </Paper>
        </div>
      </Container>
    </ThemeProvider>
  );
}
