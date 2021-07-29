import React, { useState } from "react";
import PropTypes from "prop-types";
import "../assets/variable.css";
import auth from "../services/auth.service";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

// import { Redirect } from 'react-router'
// async function loginUser(credentials) {
//   return fetch('http://localhost:8083/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    flex: "display",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    // margin: theme.spacing(1),
    width: theme.spacing(40),
    height: theme.spacing(45),
    marginTop: 100,
  },
  imglogo: {
    maxHeight: 60,
    maxWidth: 60,
    border: "1.5px solid white",
    borderRadius: 8,
    marginBottom: 4,
  },
  formlogin: {
    marginBottom: 40,
  },
}));

export default function Login({ setToken }) {
  const classes = useStyles();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  // const [login, setlogin] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await auth({
      user: {
        username,
        password,
      },
    });
    console.log("token", token);
    // loginUser({
    //   user: {
    //     username,
    //     password
    //   }
    // });
    setToken(token);
    // setlogin(true);
  };

  // if(login) return <Redirect to='/'/>;
  // else
  return (
    <Container
      component="main"
      maxWidth="xs"
      alignItems="center"
      justifyContent="center"
    >
      <Paper className={classes.paper}>
        <img className={classes.imglogo} src="logo.jpg" alt="logo" />
        <h1 style={{ color: "#2D62ED" }}>App Platform</h1>
        <Grid item className={classes.formlogin}>
          <form Validate autoComplete="on" onSubmit={handleSubmit}>
            <Grid item spacing={5}>
              <TextField id="standard-basic" label="Username" fullWidth>
                <Input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountBoxIcon />
                    </InputAdornment>
                  }
                />
              </TextField>
            </Grid>
            <Grid item spacing={5}>
              <TextField
                id="standard-basic"
                label="Password"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <AccountBoxIcon />
                  </InputAdornment>
                }
              >
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </TextField>
            </Grid>
          </form>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#2D62ED", color: "white" }}
          >
            LOGIN
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
