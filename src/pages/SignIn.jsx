import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { blue } from "@material-ui/core/colors";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import { ReactReduxContext } from "react-redux";
import Box from "@material-ui/core/Box";
import uuid from "react-native-uuid";
import Dialog from "@material-ui/core/Dialog";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  InputAdornment,
  TextField,
  Container,
  Button,
  Paper,
  Grid,
  Divider,
} from "@material-ui/core";

import "../assets/login.css";
import "../assets/variable.css";
import auth from "../services/auth.service";
import background from "../assets/img/imgbackground.png";
import ADSignin from "./ADSignin";
import { getAsset } from "../services/assest.service";
import { insertHardware } from "../services/device.service";
import { callMsGraph } from "../graph";
import { loginRequest } from "../authConfig";
//Azure AD
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

// import propertys from "../services/propertys.service";
// import { EDIT_AUTHORIZATION } from "../middleware/action";
// import { EDIT_PROPERTYS } from "../middleware/action";
// import backgroundLogo from "../assets/img/imgbackground-logo.png";

function handleLogout(instance) {
  instance.logoutRedirect().catch((e) => {
    console.error(e);
  });
}

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
    maxHeight: 220,
    maxWidth: 220,
  },
  formlogin: {
    marginBottom: 20,
    padding: 10,
  },
  sysname: {
    color: "#393737",
    fontFamily: "Roboto",
    fontWeight: "normal",
    fontSize: 15,
  },
  errorMessage: {
    color: "#ff0033",
    fontFamily: "Roboto",
    fontWeight: "normal",
    fontSize: 12,
    paddingTop: 10,
  },
  root: (themeState) => ({
    "& label.MuiInputLabel-root": {
      color: themeState.color,
    },
    "& label.Mui-focused": {
      color: blue[themeState.colorlevel],
    },
    "& .MuiInput-underline:after": {
      borderColor: themeState.color,
      color: themeState.color,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: themeState.color,
        color: themeState.color,
      },
      "&:hover fieldset": {
        borderColor: blue[themeState.colorlevel],
        color: themeState.color,
      },
      "&.Mui-focused fieldset": {
        borderColor: blue[themeState.colorlevel],
        color: themeState.color,
      },
    },
    "&.MuiPaper-root": {
      backgroundColor: themeState.paper,
    },
    "&.MuiMenu-paper": {
      backgroundColor: themeState.paper,
    },
  }),
}));

export default function Login({ setToken }) {
  const { store } = useContext(ReactReduxContext);
  const { instance } = useMsal();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [cookies, setCookie] = useCookies(["name"]);
  const [mainColor, setMainColor] = React.useState("#2D62ED");
  const [file, setFile] = useState("");
  const [updateData, setUpdateData] = useState({});
  // const pageProperty = "";
  // const [login, setlogin] = useState(false);
  // const [properties, setProperty] = React.useState([]);

  //Dialog cookie
  const [dialogAdd, setDialogAdd] = React.useState(false);
  const handleDialogAddClose = async () => {
    setErrorMessageDu(false);
    setErrorParameterDu(false);
    setDialogAdd(false);
  };

  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });

  const classes = useStyles(themeState);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };
  const [deviceTypes, setDeviceType] = useState([
    {
      key: "1",
      label: "COMP",
    },
    {
      key: "2",
      label: "PRINT",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);

  const [errorMessageDu, setErrorMessageDu] = useState(false);
  const [errorParameterDu, setErrorParameterDu] = useState(null);

  const handleLogin = () => {
    if (cookies["UUID"] == null) setErrorCookie(true);
    else setAdSignin(true);
  };

  const handleInsert = async () => {
    console.log(updateData);
    let gen_uuid = uuid.v4();
    setErrorMessageDu(false);
    updateData.macaddress = gen_uuid;
    if (updateData.code == null || updateData.code == "") {
      setErrorMessage(true);
      setErrorParameter("Device Code");
    } else if (updateData.name == null || updateData.name == "") {
      setErrorMessage(true);
      setErrorParameter("Device Name");
    } else {
      setErrorMessage(false);
      let _insertHardware = await insertHardware(
        resTooken.contents[resTooken.contents.length - 2].refreshToken,
        updateData
      );
      if (_insertHardware.status == "2000") {
        var d1 = new Date(),
          d2 = new Date(d1);
        d2.setFullYear(d2.getFullYear() + 100);
        setCookie("UUID", gen_uuid, { path: "/", expires: d2 });
        setDialogAdd(false);
        window.location.reload(false);
      } else if (_insertHardware.status == "1000") {
        setErrorMessageDu(true);
        const dupic = _insertHardware.msg + " Device Code: " + updateData.code;
        setErrorParameterDu(dupic);
      }
    }
  };

  const getLogo = async () => {
    const resp = await getAsset();

    if (resp.status == "2000") {
      setFile(resp.content[0].asset);
    }
  };

  React.useEffect(async () => {
    await getLogo();
  }, []);

  const [resTooken, setResToken] = useState(null);
  const [errorCookie, setErrorCookie] = useState(false);
  const [adSignin, setAdSignin] = useState(false);

  const handleSubmit = async (e) => {
    console.log("click signin");
    setErrorCookie(false);
    e.preventDefault();
    if (username === null || username === "") {
      setErrorUsername(true);
    } else {
      setErrorUsername(false);
    }
    if (password === null || password === "") {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    if (
      !(username === null || username === "") &&
      !(password === null || password === "")
    ) {
      const token = await auth({
        user: {
          username,
          password,
        },
      });

      if (token.status == 2000) {
        setResToken(token);
        // setToken(token);
        var d1 = new Date(),
          d2 = new Date(d1);
        d2.setFullYear(d2.getFullYear() + 100);
        // setCookie("UUID" ,  uuid.v4(), { path: '/', expires: d2 });
        setErrorUsername(false);
        setErrorPassword(false);
        if (cookies["UUID"] == null) {
          if (username == "ADMIN" || username == "root") {
            setDialogAdd(true);
            setUpdateData({ type: deviceTypes[0].label });
          } else setErrorCookie(true);
        } else setToken(token);
      } else {
        setErrorLogin(true);
      }
    }
  };
  // no-repeat fix; background-size: 100%;

  return (
    <div>
      {adSignin ? (
        <ADSignin setToken={setToken} store={store} />
      ) : (
        <Grid
          className="Login-component"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box
            p={2}
            position="absolute"
            top="88%"
            left="89%"
            zIndex="tooltip"
            style={{ backgroundRepeat: "no-repeat" }}
            sx={{ display: { xs: "none", md: "none", lg: "flex" } }}
          >
            {file ? (
              <img
                src={file}
                className={classes.imglogo}
                alt="logo"
                width="150"
              />
            ) : (
              <img
                src="loginlogo.png"
                className={classes.imglogo}
                alt="logo"
                width="150"
              />
            )}
          </Box>

          <Container
            component="main"
            maxWidth="xs"
            alignitems="center"
            justifycontent="center"
          >
            <Paper className={classes.paper} name="paperlogin">
              <img className={classes.imglogo} src="loginlogo.png" alt="logo" />
              {/* { file ? <img src={file} className={classes.imglogo} alt="logo"  /> : <img src="loginlogo.png" className={classes.imglogo} alt="logo"  />  } */}
              <h5 className={classes.sysname}>
                Hotel Property Management System
              </h5>
              <Divider variant="middle" />

              {errorUsername ? (
                <div className={classes.errorMessage}>Username is required</div>
              ) : errorPassword ? (
                <div className={classes.errorMessage}>Password is required</div>
              ) : errorLogin ? (
                <div className={classes.errorMessage}>
                  Invalid Username or Password
                </div>
              ) : null}
              {errorCookie ? (
                <div className={classes.errorMessage}>
                  Device not register. Please contact administrator.
                </div>
              ) : null}

              <Grid item className={classes.formlogin}>
                {/* Validate */}
                <form autoComplete="on" onSubmit={handleSubmit}>
                  <Grid item>
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
                    ></TextField>
                  </Grid>

                  <Grid item style={{ marginTop: 0 }}>
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
                    ></TextField>
                  </Grid>
                  <Grid item style={{ paddingTop: 25, paddingBottom: 20 }}>
                    <Button
                      fullWidth
                      type="submit"
                      name="login"
                      variant="contained"
                      style={{ backgroundColor: "#2D62ED", color: "white" }}
                    >
                      LOGIN <ArrowForwardIcon style={{ paddingLeft: 10 }} />
                    </Button>

                    <Grid
                      container
                      style={{ paddingTop: 25, paddingBottom: 10 }}
                    >
                      <Grid item xs={5}>
                        <hr />
                      </Grid>
                      <Grid item xs={2}>
                        <span>or</span>
                      </Grid>
                      <Grid item xs={5}>
                        <hr />
                      </Grid>
                    </Grid>

                    <AuthenticatedTemplate>
                      <ProfileContent />
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                      <Button
                        fullWidth
                        onClick={() => handleLogin()}
                        variant="outlined"
                        style={{
                          backgroundColor: "#fff",
                          color: "blue",
                          borderColor: "blue",
                        }}
                      >
                        SIGN IN WITH A DOMAIN{" "}
                        <ArrowForwardIcon style={{ paddingLeft: 10 }} />
                      </Button>
                    </UnauthenticatedTemplate>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Container>
          {/* ==================== Dialog New Device========================= */}
          <Dialog
            // fullWidth="true"
            // maxWidth="md"
            open={dialogAdd}
            onClose={handleDialogAddClose}
            aria-labelledby="form-dialog-title"
            className={classes.root}
          >
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DialogTitle
                  id="form-dialog-title"
                  style={{
                    backgroundColor: themeState.paper,
                    color: mainColor,
                  }}
                >
                  Register New Device
                </DialogTitle>

                <DialogContent style={headerTableStyle}>
                  <Container maxWidth="xl" disableGutters>
                    <Grid container spacing={2} style={{ paddingTop: 10 }}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <TextField
                          // autoFocus
                          id="devicecode"
                          label="Device Code"
                          variant="outlined"
                          fullWidth
                          onChange={(e) =>
                            setUpdateData({
                              ...updateData,
                              code: e.target.value,
                            })
                          }
                        />
                      </Grid>

                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <TextField
                          // autoFocus
                          id="devicename"
                          label="Device Name"
                          variant="outlined"
                          fullWidth
                          onChange={(e) =>
                            setUpdateData({
                              ...updateData,
                              name: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  </Container>
                  {errorMessage ? (
                    <div style={{ marginTop: 15 }}>
                      <div
                        style={{
                          background: "#ff0033",
                          textAlign: "center",
                          color: "white",
                          height: "30px",
                          paddingTop: 5,
                        }}
                      >
                        {errorParameter} is required
                      </div>
                    </div>
                  ) : null}
                  {errorMessageDu ? (
                    <div style={{ marginTop: 15 }}>
                      <div
                        style={{
                          background: "#ff0033",
                          textAlign: "center",
                          color: "white",
                          height: "30px",
                          paddingTop: 5,
                        }}
                      >
                        {errorParameterDu}
                      </div>
                    </div>
                  ) : null}
                </DialogContent>
              </Grid>
            </Grid>
            <DialogActions
              style={{
                padding: 20,
                backgroundColor: themeState.paper,
                color: themeState.color,
              }}
            >
              <Button
                name="cancel"
                onClick={handleDialogAddClose}
                variant="text"
                color="primary"
                style={{ color: mainColor }}
              >
                Cancel
              </Button>
              <Button
                name="save"
                variant="contained"
                color="primary"
                style={{
                  color: themeState.color,
                  backgroundColor: mainColor,
                }}
                onClick={() => handleInsert()}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  // store: PropTypes.func.isRequired,
  // setAuthorization:  PropTypes.func.isRequired
};

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const name = accounts[0] && accounts[0].name;

  function RequestProfileData() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    console.log("request:", request);

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraph(response.accessToken).then((response) =>
            setGraphData(response)
          );
        });
      });
  }

  return (
    <>
      <Button
        variant="outlined"
        style={{ backgroundColor: "#fff", color: "blue", borderColor: "blue" }}
        onClick={() => handleLogout(instance)}
      >
        Sign out using Redirect
      </Button>
      {/* <h5 className="card-title">Welcome {name}</h5> */}
      {graphData ? (
        <Button
          vvariant="outlined"
          style={{
            backgroundColor: "#fff",
            color: "blue",
            borderColor: "blue",
          }}
        >
          Show Is Console{" "}
        </Button>
      ) : (
        <Button
          vvariant="outlined"
          style={{
            backgroundColor: "#fff",
            color: "blue",
            borderColor: "blue",
          }}
          onClick={RequestProfileData}
        >
          Request Profile Information
        </Button>
      )}
    </>
  );
}
