import React, { useState } from "react";
import "../assets/login.css";
import "../assets/variable.css";
import background from "../assets/img/imgbackground.jpg";

import PropTypes from "prop-types";
import auth from "../services/auth.service";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Divider from "@material-ui/core/Divider";

async function loginUser(credentials) {
  return fetch('http://localhost:8083/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

const useStyles = makeStyles((theme) => ({
  paper: {
    flex: "display",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // margin: theme.spacing(1),
    width: theme.spacing(38),
    height: theme.spacing(48),
    marginTop: 100,
  },
  imglogo: {
    maxHeight: 220, maxWidth: 220,
  },
  formlogin: {
    marginBottom: 20, padding: 10,
  },
  sysname: {
    color: "#393737", fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 15
  },
  errorMessage: {
    color: "#ff0033", fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 15
  }
}));

export default function Login({ setToken }) {
  const classes = useStyles();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  // const [login, setlogin] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username == null || username == '') {
      setErrorUsername(true);
    } else {
      setErrorUsername(false);
    }
    if (password == null || password == '') {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }

    console.log("up", username, password)
    console.log((username == null || username == ''),(password == null || password == ''),
    !(username == null || username == '') && !(password == null || password == ''))
    if (!(username == null || username == '') && !(password == null || password == '')) {
      const token = await auth({
        user: {
          username,
          password,
        },
      });
      console.log("token", token);
      loginUser({
        user: {
          username,
          password
        }
      });
      setToken(token);
      setErrorLogin(true);
    }
  };


  return (
    <div className="Login-component" style={{ backgroundImage: `url(${background})` }} >
      <Container
        component="main"
        maxWidth="xs"
        alignItems="center"
        justifyContent="center"
      >
        <Paper className={classes.paper}>
          <img className={classes.imglogo} src="loginlogo.png" alt="logo" />
          <h5 className={classes.sysname} >Hotel Property Management System </h5>
          <Divider variant="middle" />
          {errorLogin ? <h5 className={classes.errorMessage}>Invalid Username or Password</h5> : null}
          <Grid item className={classes.formlogin}>
            <form Validate autoComplete="on" onSubmit={handleSubmit}>
              <Grid item spacing={5}>
                <TextField
                  id="standard-basic"
                  label=" Username "
                  htmlFor="Username"
                  href
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <GroupOutlinedIcon style={{ color: "#2D62ED" }} />
                      </InputAdornment>
                    ),
                  }}
                >
                  
                  {/* <Input
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                  /> */}
                </TextField>
                {errorUsername ? <h5 className={classes.errorMessage}>This is required</h5> : null}
              </Grid>

              <Grid item spacing={5} style={{ marginTop: 10  }}>
                <TextField
                  id="standard-basic"
                  label="Password"
                  htmlFor="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockOutlinedIcon style={{ color: "#2D62ED" }} />
                      </InputAdornment>
                    ),
                  }}
                >
                  
                  {/* <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  /> */}
                </TextField>
                {errorPassword ? <h5 className={classes.errorMessage}>This is required</h5> : null}
              </Grid>
              <Grid item style={{ marginTop: 30 }} >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#2D62ED", color: "white" }}
                >
                  LOGIN
                </Button>
              </Grid>
            </form>
          </Grid>

        </Paper>
      </Container>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
