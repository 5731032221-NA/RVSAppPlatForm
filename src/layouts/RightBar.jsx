import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Container, Grid, Typography } from "@material-ui/core";
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
import { purple, green } from "@material-ui/core/colors";
import { ReactReduxContext } from "react-redux";
import { EDIT_LANG } from "../middleware/action";
import { EDIT_COLOR } from "../middleware/action";
const useStyles = makeStyles({
  list: {
    width: 250,
    zIndex: 2000,
  },
  Container: {
    zIndex: 2000,
    padding: 10,
    marginTop: 30,
  },
  colorsize: {
    width: 20,
    height: 20,
  },
  purple: {
    backgroundColor: "#9c28b1",
    width: 20,
    height: 20,
  },
  blue: {
    backgroundColor: "#1c75d1",
    width: 20,
    height: 20,
  },
  green: {
    backgroundColor: "#4cb050",
    width: 20,
    height: 20,
  },
  orange: {
    backgroundColor: "#ff9800",
    width: 20,
    height: 20,
  },
  red: {
    backgroundColor: "#ea1e63",
    width: 20,
    height: 20,
  },
  coral: {
    backgroundColor: "#ff5253",
    width: 20,
    height: 20,
  },
});

export default function RighBar() {
  const classes = useStyles();
  const { store } = useContext(ReactReduxContext);

  function handlelanguageEN() {
    // setOpenSystemsTools(!openSystemTools)
    store.dispatch({
      type: EDIT_LANG,
      payload: "en",
    });
  }
  function handlelanguageTH() {
    store.dispatch({
      type: EDIT_LANG,
      payload: "th",
    });
  }

  function handleThemePurple() {
    store.dispatch({
      type: EDIT_COLOR,
      payload: purple[600],
    });
  }
  function handleThemeGreen() {
    store.dispatch({
      type: EDIT_COLOR,
      payload: green[600],
    });
  }

  function handleLogOut() {
    console.log("log out");
    // sessionStorage.setItem('token', false);
    // window.location.reload(false);
  }

  return (
    <Container className={classes.Container}>
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
                primary="New user registered"
                secondary="Jan 9, 2014"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#00abf9" }}>
                  <ShoppingCartOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="New order recived" secondary="2 min ago" />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#f44238" }}>
                  <DraftsOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="New message from Mail"
                secondary="1 hour ago"
              />
            </ListItem>
          </Grid>
        </List>
      </Grid>

      <Grid container style={{ marginTop: 30 }}>
        <Grid container spacing={2}>
          <Grid container justifyContent="start" style={{ marginLeft: 90 }}>
            <Typography variant="h1" style={{ fontSize: 18, marginBottom: 10 }}>
              Language
            </Typography>
          </Grid>
        </Grid>

        <List>
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
        </List>
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
            <Avatar className={classes.blue}> </Avatar>
            <Avatar onClick={handleThemeGreen} className={classes.green}>
              {" "}
            </Avatar>
            <Avatar className={classes.orange}> </Avatar>
            <Avatar className={classes.red}> </Avatar>
            <Avatar className={classes.coral}> </Avatar>
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
            <Switch />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item style={{ flexGrow: 1 }}>
            <Typography variant="h1" style={{ fontSize: 16 }}>
              Mini Variant
            </Typography>
          </Grid>
          <Grid item>
            <Switch />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item style={{ flexGrow: 1 }}>
            <Typography variant="h1" style={{ fontSize: 16 }}>
              Clipped
            </Typography>
          </Grid>
          <Grid item>
            <Switch />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item style={{ flexGrow: 1 }}>
            <Typography variant="h1" style={{ fontSize: 16 }}>
              RTL Mode
            </Typography>
          </Grid>
          <Grid item>
            <Switch />
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
            <Button color="primary"> &nbsp;&nbsp; TEXT &nbsp;&nbsp; </Button>
          </Grid>
          <Grid item>
            <Switch />
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
              style={{ borderRadius: 25 }}
            >
              ROUNDED
            </Button>
          </Grid>
          <Grid item>
            <Switch />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: 20 }}
        >
          <Grid item style={{ flexGrow: 1 }}>
            <Button variant="outlined" color="primary">
              OUTLINE
            </Button>
          </Grid>
          <Grid item>
            <Switch />
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
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#1e99e9" }}>
                  <AccountCircleOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Profile" />
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
    </Container>
  );
}
