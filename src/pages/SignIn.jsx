import React, { useState, useContext } from "react";
import "../assets/login.css";
import "../assets/variable.css";
import background from "../assets/img/imgbackground.png";
import backgroundLogo from "../assets/img/imgbackground-logo.png";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { InputAdornment, TextField, Container, Button, Paper, Grid, Divider } from "@material-ui/core";


import {getasset} from "../services/assest.service";
import PropTypes from "prop-types";
import auth from "../services/auth.service";
import propertys from "../services/propertys.service";
import { makeStyles } from "@material-ui/core/styles";
import { ReactReduxContext } from 'react-redux';
import { EDIT_AUTHORIZATION } from "../middleware/action";
import { EDIT_PROPERTYS } from "../middleware/action";
import Box from '@material-ui/core/Box';
// import config  from '../Config'
// import { PublicClientApplication } from '@azure/msal-browser'

// async function loginUser(credentials) {
//   return fetch('http://'+(process.env.REACT_APP_host || "localhost")+':8083/login', {
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
    width: theme.spacing(38),
    height: theme.spacing(60),
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
    color: "#ff0033", fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 12, paddingTop: 10,
  }
}));

export default function Login({ setToken }) {
  const classes = useStyles();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  


  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const { store } = useContext(ReactReduxContext);
  //console.log("log store",store);
  // const [login, setlogin] = useState(false);
  const [file,  setFile] = useState("");


  // const signinAdmin = async () => {
  //    try {
  //      console.log("ok:",config.scopes);
  //     const a =  await this.PublicClientApplication.loginPopup({
  //         scopes: config.scopes,
  //         prompt: "select_accout"
  //       })
  //       console.log("ok:",a);
       
  //    } catch (error) {
  //      console.log(error);
  //    }
  // }

  const getLogo  = async() => {
    const resp = await getasset();
   
    if(resp.status == "2000"){
      
      setFile(resp.content[0].asset);
    }
   
    
  }


  React.useEffect( async () => {
    await getLogo();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === null || username === '') {
      setErrorUsername(true);
    } else {
      setErrorUsername(false);
    }
    if (password === null || password === '') {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }

 
    // console.log(
    //   (username === null || username === ''), (password === null || password === ''),
    //   !(username === null || username === '') && !(password === null || password === ''))
    if (!(username === null || username === '') && !(password === null || password === '')) {
      const token = await auth({
        user: {
          username,
          password,
        },
      });
   

      // try{
      // store.dispatch({
      //   type: EDIT_AUTHORIZATION,
      //   payload: token.contents[token.contents.length-2].refreshToken
      //   })
      // }catch(err){
      //   console.log("de2",err.stack)
      // }
      if (token.status == 2000) {
        // const apitest = await propertys(token.contents[token.contents.length - 2].refreshToken);
        // store.dispatch({
        //   type: EDIT_PROPERTYS,
        //   payload: apitest.content
        // })
        // console.log("store authen", store.getState().reducer)
     

        setToken(token);
      }
      setErrorLogin(true);
    }
  };
  // no-repeat fix; background-size: 100%;

  return (
    <Grid className="Login-component" style={{ backgroundImage: `url(${background})` ,backgroundSize: 'cover', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat' }} >
        <Box
        p={2}
        position="absolute"
        top="88%"
        left="89%"
        zIndex="tooltip"
        style={{backgroundRepeat: 'no-repeat'}}
        sx={{ display: { xs: "none", md: "none" ,lg: "flex" } }}
      >
        {/* <img className={classes.imglogo} src={file} alt="logo" width="150" /> */}
        { file ? <img src={file} className={classes.imglogo} alt="logo" width="150"  /> : <img src="loginlogo.png" className={classes.imglogo} alt="logo" width="150" />  }
      </Box>
       
      <Container
        component="main"
        maxWidth="xs"
        alignitems="center"
        justifycontent="center"
      >
        <Paper className={classes.paper}>
          <img className={classes.imglogo} src="loginlogo.png" alt="logo" /> 
           {/* { file ? <img src={file} className={classes.imglogo} alt="logo"  /> : <img src="loginlogo.png" className={classes.imglogo} alt="logo"  />  } */}
          <h5 className={classes.sysname} >Hotel Property Management System</h5>
          <Divider variant="middle" />

          {errorUsername ? <div className={classes.errorMessage}>Username is required</div> : (errorPassword ? <div className={classes.errorMessage}>Password is required</div> : (errorLogin ? <div className={classes.errorMessage}>Invalid Username or Password</div> : null))}
 
          <Grid item className={classes.formlogin}>
          {/* Validate */}
            <form  autoComplete="on" onSubmit={handleSubmit}>
              <Grid item >
                <TextField
                  id="username"
                  label=" Username "
                  htmlFor="Username"
                // href
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
                </TextField>
              </Grid>

              <Grid item  style={{ marginTop: 0 }}>
                <TextField
                  id="password"
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
                </TextField>
              </Grid>
              <Grid item style={{ paddingTop: 25, paddingBottom: 20 }} >
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#2D62ED", color: "white" }}
                >
                  LOGIN <ArrowForwardIcon style={{ paddingLeft: 10 }} />
                </Button>

                <Grid container  style={{ paddingTop: 25, paddingBottom: 10 }}>
                  <Grid item xs={5} >
                   <hr />
                  </Grid>
                  <Grid item xs={2}>
                    <span>or</span>
                  </Grid>
                  <Grid item  xs={5} >
                  <hr />
                  </Grid>
                </Grid>

                <Button
                  fullWidth
           
                  variant="outlined"
                  style={{ backgroundColor: "#fff", color: "blue", borderColor: "blue" }}
                >
                  SIGN IN BY ADMINISTRATOR <ArrowForwardIcon style={{ paddingLeft: 10 }} />
                </Button>
              </Grid>

             
            </form>
          </Grid>

        </Paper>
      </Container>
    </Grid>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  // store: PropTypes.func.isRequired
  // ,
  // setAuthorization:  PropTypes.func.isRequired
};
