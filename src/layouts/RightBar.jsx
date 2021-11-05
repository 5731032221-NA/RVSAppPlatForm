import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Container, Grid, Typography, TextField } from "@material-ui/core";
// import ImageIcon from "@material-ui/icons/Image";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import DraftsOutlinedIcon from "@material-ui/icons/DraftsOutlined";
import FlagIcon from "@material-ui/icons/Flag";
import Switch from "@material-ui/core/Switch";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EditIcon from '@material-ui/icons/Edit';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {
  purple,
  green,
  orange,
  red,
  yellow,
  blue,
} from "@material-ui/core/colors";
import { ReactReduxContext, useSelector } from "react-redux";
import { EDIT_LANG } from "../middleware/action";
import { EDIT_COLOR } from "../middleware/action";
import { EDIT_DARKMODE } from "../middleware/action";
import { EDIT_COMPONENT } from "../middleware/action";



import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import {getasset,updateasset} from "../services/assest.service";
const useStyles = makeStyles({
  list: {
    width: 250,
    zIndex: 2000,
  },
  Container: (themeState) => ({
    zIndex: 2000,
    padding: 10,
    paddingTop: 35,
    backgroundColor: themeState.paper,
    color: themeState.color,
  }),
  colorsize: {
    width: 20,
    height: 20,
  },
  purple: {
    backgroundColor: purple[600],
    // backgroundColor: "#9c28b1",
    width: 20,
    height: 20,
  },
  blue: {
    // backgroundColor: "#2D62ED",
    backgroundColor: "#1c75d1",
    width: 20,
    height: 20,
  },
  green: {
    backgroundColor: green[600],
    // backgroundColor: "#4cb050",
    width: 20,
    height: 20,
  },
  orange: {
    backgroundColor: orange[600],
    // backgroundColor: "#ff9800",
    width: 20,
    height: 20,
  },
  red: {
    backgroundColor: red[600],
    width: 20,
    height: 20,
  },
  yellow: {
    backgroundColor: yellow[600],
    // backgroundColor: "#ea1e63",
    width: 20,
    height: 20,
  },
  coral: {
    backgroundColor: "#ff5253",
    // backgroundColor: coral[600],
    width: 20,
    height: 20,
  },
  logo: {
     width: "100%",
     height: "100%" 
  },
  input: {
    display: 'none',
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
  switchBase: (themeState) => ({
    "&.Mui-checked": {
      color: blue[themeState.colorlevel],
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: blue[themeState.colorlevel],
    },
  }),
});

export default function RighBar() {
  const history = useHistory();
  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });
  const classes = useStyles(themeState);
  const { store } = useContext(ReactReduxContext);
  const [darkMode, setDarkmode] = React.useState(false);
  const [languages, setLanguages] = useState([
    {
      key: "1",
      label: "en",
    },
    {
      key: "2",
      label: "th",
    },
    {
      key: "2",
      label: "cn",
    },
  ]);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [file,  setFile] = useState("");
  const [filename,  setFilename] = useState("")
     

  const handleChange = async(e) =>{
 
    if(e.target.files[0] !== undefined){
      setFilename(e.target.files[0].name)
      const base64 = await convertBase64(e.target.files[0])
      setFile(base64)
    }
  
  }

  const handlesaveLogo  = async() => {
    if(filename){
      let datacha ={
        asset:file,
        name: filename
      }
      const resp = await updateasset(sessionStorage.getItem("auth"),datacha)
       if(resp.status == "2000"){
         getLogo();
         setOpen(false);

       }

    }
   
  }
  const getLogo  = async() => {
    const resp = await getasset();
    setFile(resp.content[0].asset);
    
  }


  React.useEffect(() => {
    getLogo();
  },[])

 const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };








  function handlelanguage(language) {
    // setOpenSystemsTools(!openSystemTools)
    store.dispatch({
      type: EDIT_LANG,
      payload: language,
    });
  }

  //active lang
  const langa = useSelector((state) => state.reducer.lang);

  // function handlelanguageEN() {
  //   // setOpenSystemsTools(!openSystemTools)
  //   store.dispatch({
  //     type: EDIT_LANG,
  //     payload: "en",
  //   });
  // }
  // function handlelanguageTH() {
  //   store.dispatch({
  //     type: EDIT_LANG,
  //     payload: "th",
  //   });
  // }

  function handleThemePurple() {
    store.dispatch({
      type: EDIT_COLOR,
      payload: purple[600],
    });
    store.dispatch({
      type: EDIT_DARKMODE,
      payload: "#FFFFFF",
    });
  }
  function handleThemeGreen() {
    store.dispatch({
      type: EDIT_COLOR,
      payload: green[600],
    });
    store.dispatch({
      type: EDIT_DARKMODE,
      payload: "#FFFFFF",
    });
  }
  function handleThemeOrange() {
    store.dispatch({
      type: EDIT_COLOR,
      payload: orange[600],
    });
    store.dispatch({
      type: EDIT_DARKMODE,
      payload: "#FFFFFF",
    });
  }
  function handleThemeRed() {
    store.dispatch({
      type: EDIT_COLOR,
      payload: red[600],
    });
    store.dispatch({
      type: EDIT_DARKMODE,
      payload: "#FFFFFF",
    });
  }
  function handleThemeYellow() {
    store.dispatch({
      type: EDIT_COLOR,
      payload: "#ff5253",
    });
    store.dispatch({
      type: EDIT_DARKMODE,
      payload: "#FFFFFF",
    });
  }
  function handleThemeDefault() {
    store.dispatch({
      type: EDIT_COLOR,
      payload: "#2D62ED",
    });
    store.dispatch({
      type: EDIT_DARKMODE,
      payload: "#FFFFFF",
    });
  }

  function handleLogOut() {

    sessionStorage.removeItem("curent_component");
    sessionStorage.removeItem("property");
    sessionStorage.removeItem('token');
   
    history.replace(`/`);
    history.go(0);
    // window.location.reload("/");
  }

  function handleProfilePage() {
    // console.log("profilepage click");
    store.dispatch({
      type: EDIT_COMPONENT,
      payload: "ProfilePage",
    });
  }

  function handleDarkMode(e) {
    let _darkmode = !darkMode;
    setDarkmode(_darkmode);
    // console.log("_darkmode", _darkmode);
    // console.log("darkmode", darkMode);
    if (_darkmode) {
      store.dispatch({
        type: EDIT_COLOR,
        payload: "#1F1B24",
      });
      store.dispatch({
        type: EDIT_DARKMODE,
        payload: "#1F1B24",
      });
    } else {
      store.dispatch({
        type: EDIT_COLOR,
        payload: "#2D62ED",
      });
      store.dispatch({
        type: EDIT_DARKMODE,
        payload: "#FFFFFF",
      });
    }
  }

  const themeBackground = useSelector((state) => state.reducer.themeBackground);
  React.useEffect(() => {
    if (themeBackground === "#FFFFFF") {
      setThemeState({
        background: "#FFFFFF",
        color: "#000000",
        paper: "#FFFFFF",
        colorlevel: "900",
        // matStyle: this.classes.normalmode
      });
      setDarkmode(false);
    } else {
      setThemeState({
        background: "#212121",
        color: "#FAFAFA",
        paper: "#424242",
        colorlevel: "A200",
        // matStyle: this.classes.darkmode
      });
      setDarkmode(true);
    }
  }, [themeBackground]);

  const [mainColor, setMainColor] = React.useState("#2D62ED");
  const maincolor = useSelector((state) => state.reducer.color);

  React.useEffect(() => {
    if (themeBackground === "#FFFFFF") {
      setMainColor(maincolor);
    } else {
      setMainColor("#2D62ED");
    }
  }, [maincolor]);


  

  return (
    <Container className={classes.Container}>
      {/* <div> */}
      <Grid container>
        <Grid container spacing={2}>
          <Grid container justifyContent="start" style={{ marginLeft: 90 }}>
            <Typography variant="h1" style={{ fontSize: 18, marginBottom: 10 }}>
              Notification
            </Typography>
          </Grid>
        </Grid>
        <List>
          <Divider variant="inset" />
          <Grid container spacing={1}>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#89c446" }}>
                  <AccountCircleOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    type="body2"
                    style={{ color: themeBackground.color }}
                  >
                    New user registered
                  </Typography>
                }
                secondary={
                  <Typography
                    type="body2"
                    style={{ color: themeBackground.color }}
                  >
                    Jan 9, 2014
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#00abf9" }}>
                  <ShoppingCartOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    type="body2"
                    style={{ color: themeBackground.color }}
                  >
                    New order recived
                  </Typography>
                }
                secondary={
                  <Typography
                    type="body2"
                    style={{ color: themeBackground.color }}
                  >
                    2 min ago
                  </Typography>
                }
              />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#f44238" }}>
                  <DraftsOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    type="body2"
                    style={{ color: themeBackground.color }}
                  >
                    New message from Mail
                  </Typography>
                }
                secondary={
                  <Typography
                    type="body2"
                    style={{ color: themeBackground.color }}
                  >
                    1 hour ago
                  </Typography>
                }
              />
            </ListItem>
          </Grid>
        </List>
      </Grid>

      <Grid container style={{ marginTop: 30 }}>
        <Grid container spacing={2}>
          <Grid container justifyContent="start" style={{ marginLeft: 90 }}>
            <Typography variant="h1" style={{ fontSize: 18, marginBottom: 20 }}>
              Language
            </Typography>
          </Grid>
        </Grid>
        <TextField
          className={classes.root}
          select
          id="outlined-basic"
          label="Language"
          variant="outlined"
          fullWidth
          SelectProps={{
            native: true,
          }}
          InputProps={{
            style: {
              backgroundColor: themeState.paper,
              color: themeState.color,
            },
          }}
          defaultValue={langa}
          onChange={(e) => handlelanguage(e.target.value)}
        >
          {languages.map((option) => (
            <option
              key={option.key}
              value={option.label}
              style={{
                backgroundColor: themeState.paper,
                color: themeState.color,
              }}
            >
              {option.label}
            </option>
          ))}
        </TextField>
        {/* <List>
          <Divider variant="inset" />
          <Grid container spacing={1}>
            <ListItem button onClick={handlelanguageEN}>
              <ListItemAvatar>
                <FlagIcon style={{ color: "gray" }} />
              </ListItemAvatar>
              <ListItemText primary="English" />
            </ListItem>
            <ListItem button onClick={handlelanguageTH}>
              <ListItemAvatar>
                <FlagIcon style={{ color: "gray" }} />
              </ListItemAvatar>
              <ListItemText primary="ไทย" />
            </ListItem>
          </Grid>
        </List> */}
      </Grid>

      <Grid container style={{ marginTop: 30 }}>
        <Grid container spacing={2}>
          <Grid container justifyContent="start" style={{ marginLeft: 90 }}>
            <Typography variant="h1" style={{ fontSize: 18 }}>
              Theme Setting
            </Typography>
          </Grid>
          <Divider variant="inset" />

          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            style={{ padding: 20 }}
          >
            <Avatar onClick={handleThemePurple} className={classes.purple}>
              {" "}
            </Avatar>
            <Avatar onClick={handleThemeDefault} className={classes.blue}>
              {" "}
            </Avatar>
            <Avatar onClick={handleThemeGreen} className={classes.green}>
              {" "}
            </Avatar>
            <Avatar onClick={handleThemeOrange} className={classes.orange}>
              {" "}
            </Avatar>
            <Avatar onClick={handleThemeRed} className={classes.red}>
              {" "}
            </Avatar>
            <Avatar onClick={handleThemeYellow} className={classes.coral}>
              {" "}
            </Avatar>
          </Grid>
        </Grid>
      </Grid>
      <Divider />

      <Grid container style={{ marginTop: 10, padding: 10 }}>
        <Grid container alignItems="center">
          <Grid item style={{ flexGrow: 1 }}>
            <Typography variant="h1" style={{ fontSize: 16 }}>
              Dark Mode
            </Typography>
          </Grid>
          <Grid item>
            <Switch
              color="default"
              classes={{
                track: classes.switchTrack,
                switchBase: classes.switchBase,
              }}
              checked={darkMode}
              value={darkMode}
              onChange={handleDarkMode}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item style={{ flexGrow: 1 }}>
            <Typography variant="h1" style={{ fontSize: 16 }}>
              Mini Variant
            </Typography>
          </Grid>
          <Grid item>
            <Switch
              color="default"
              classes={{
                track: classes.switchTrack,
                switchBase: classes.switchBase,
              }}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item style={{ flexGrow: 1 }}>
            <Typography variant="h1" style={{ fontSize: 16 }}>
              Clipped
            </Typography>
          </Grid>
          <Grid item>
            <Switch
              color="default"
              classes={{
                track: classes.switchTrack,
                switchBase: classes.switchBase,
              }}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item style={{ flexGrow: 1 }}>
            <Typography variant="h1" style={{ fontSize: 16 }}>
              RTL Mode
            </Typography>
          </Grid>
          <Grid item>
            <Switch
              color="default"
              classes={{
                track: classes.switchTrack,
                switchBase: classes.switchBase,
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 10, padding: 10 }}>
        <Grid container alignItems="center">
          <Grid item style={{ flexGrow: 1 }}>
            <Typography variant="h1" style={{ fontSize: 18 }}>
              Button Style
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: 20 }}
        >
          <Grid item style={{ flexGrow: 1 }}>
            <Button color="primary" style={{ color: mainColor }}>
              {" "}
              &nbsp;&nbsp; TEXT &nbsp;&nbsp;{" "}
            </Button>
          </Grid>
          <Grid item>
            <Switch
              color="default"
              classes={{
                track: classes.switchTrack,
                switchBase: classes.switchBase,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: 20 }}
        >
          <Grid item style={{ flexGrow: 1 }}>
            <Button
              variant="contained"
              color="primary"
              style={{
                borderRadius: 25,
                backgroundColor: mainColor,
              }}
            >
              ROUNDED
            </Button>
          </Grid>
          <Grid item>
            <Switch
              color="default"
              classes={{
                track: classes.switchTrack,
                switchBase: classes.switchBase,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: 20 }}
        >
          <Grid item style={{ flexGrow: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ color: mainColor, borderColor: mainColor }}
            >
              OUTLINE
            </Button>
          </Grid>
          <Grid item>
            <Switch
              color="default"
              classes={{
                track: classes.switchTrack,
                switchBase: classes.switchBase,
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* =================================== */}
      <Grid container style={{ marginTop: 60 }}>
        <Grid container spacing={2}>
          <Grid container justifyContent="start" style={{ marginLeft: 90 }}>
            <Typography variant="h1" style={{ fontSize: 18, marginBottom: 10 }}>
              Profile
            </Typography>
          </Grid>
        </Grid>
        <List>
          <Divider variant="inset" />
          <Grid container spacing={1}>
            <ListItem onClick={handleProfilePage}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#1e99e9" }}>
                  <AccountCircleOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem onClick={handleClickOpen}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#f4c103" }}>
                  <EditIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Logo" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#f4c103" }}>
                  <SettingsIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Setting" />
            </ListItem>

            <ListItem onClick={handleLogOut} style={{ marginBottom: 50 }}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#e54839" }}>
                  <ExitToAppIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Logout" />
            </ListItem>
          </Grid>
        </List>
      </Grid>
      <Divider />



    {/* logo ======== logo */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
       
      >
        <DialogTitle id="responsive-dialog-title" style={{ backgroundColor: "#2D62ED", color: "white"}}>{"Setting Edit Logo"}</DialogTitle>
        <DialogContent >
          <DialogContentText >
            <Paper  border={2} elevation={2}  >  { file ? <img src={file} className={classes.logo} alt="logo"  /> : <img src="loginlogo.png" className={classes.logo} alt="logo"  />  } </Paper>
            <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
       <label htmlFor="contained-button-file" >
        <Button variant="contained"  color="primary" component="span" style={{ marginTop: 20}}>
         <PhotoCamera />Upload
        </Button>
      </label>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            close
          </Button>
          <Button  variant="contained" color="primary" onClick={handlesaveLogo}>
            save
          </Button>
        </DialogActions>
      </Dialog>
      {/* </div> */}
    </Container>
  );
}
