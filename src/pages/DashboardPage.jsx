import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { ReactReduxContext } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import { purple, green, orange, red, yellow } from "@material-ui/core/colors";

import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Badge,
  Container,
  Grid,
  InputLabel,
  InputBase,
  Divider,
  IconButton,
  Menu,
  SwipeableDrawer,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchIcon from "@material-ui/icons/Search";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExplicitIcon from "@material-ui/icons/Explicit";
import MoreIcon from "@material-ui/icons/MoreVert";
import BusinessIcon from "@material-ui/icons/Business";
import SettingsIcon from "@material-ui/icons/PlayForWork";

import FrontDesk from "../components/Dashboard/FrontDesk";
import Configuration from "../components/Dashboard/Configuration";
import RoleManagement from "../components/RoleManagement";
import UserManagement from "../components/UserManagement";

import ButtomBar from "../layouts/ButtomBar";
import HeaderTabs from "../layouts/HeaderTabs";
import RightBar from "../layouts/RightBar";

import {
  EDIT_COMPWIDTH,
  EDIT_LANG,
  EDIT_COLOR,
  EDIT_PROPERTY,
} from "../middleware/action";
import MainListItems_en from "../middleware/listitems/dropDownItems";
import secondaryListItems_en from "../middleware/listitems/dropDownItems";
import mainListItems_th from "../middleware/listitems/dropDownItems";
import secondaryListItems_th from "../middleware/listitems/dropDownItems";
// import { mainListItems_en, secondaryListItems_en } from '../middleware/listitems/dropDownItems';
// import { mainListItems_th, secondaryListItems_th } from '../middleware/listitems/dropDownItems';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  themeDefault: {
    backgroundColor: "#2D62ED",
  },
  themeGreen: {
    backgroundColor: green[600],
  },
  themePurple: {
    backgroundColor: purple[600],
  },
  themeOrange: {
    backgroundColor: orange[600],
  },
  themeRed: {
    backgroundColor: red[600],
  },
  themeYellow: {
    backgroundColor: "#ff5253",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonExpand: {
    paddingRight: 20,
    paddingLeft: 40,
  },
  logoExpand: {
    marginLeft: -10,
  },
  menuButtonHidden: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // backgroundColor: "#2D62ED",
    color: "white",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8.5),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    paddingTop: 25,
    paddingBottom: 14,
  },
  title: {
    display: "none",
    fontWeight: "normal",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      // backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  rightBarStyle: {
    width: 280,
    zIndex: 2001,
  },
  seletprop: {
    fontSize: 15,
    color: "#164BD8",
    paddingBottom: 20,
  },
  propertyForm: {
    width: 40,
  },
  whiteColor: {
    color: "white",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [themeState, setThemeState] = React.useState(classes.themeDefault);
  const [wordColor, setWordColor] = React.useState("#2D62ED");
  const [themeFontState, setThemeFontState] = React.useState(
    classes.themeFontDefault
  );
  // const [componentState, setComponentState] = React.useState("FrontDesk");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { store } = useContext(ReactReduxContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(0);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [compWidthState, setCompWidth] = useState(null);
  const [compState, setComp] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(
    store.getState().reducer.property
  );
  setInterval(() => {
    // console.log(parseInt(store.getState().reducer.compwidth) !== parseInt(document.getElementById("compwidth").offsetWidth+19.8),parseInt(document.getElementById("compwidth").offsetWidth+19.8),parseInt(store.getState().reducer.compwidth))

    if (
      compWidthState !=
      document.getElementById("compwidth").offsetWidth + 19.8
    ) {
      store.dispatch({
        type: EDIT_COMPWIDTH,
        payload: document.getElementById("compwidth").offsetWidth + 19.8,
      });
      setCompWidth(document.getElementById("compwidth").offsetWidth);
    }

    if (compState != store.getState().reducer.componentState) {
      setComp(store.getState().reducer.componentState);
    }
  }, 500);

  setInterval(() => {
    let settingColor = store.getState().reducer.color;
    if (wordColor != settingColor && wordColor != null) {
      if (settingColor == purple[600]) {
        setThemeState(classes.themePurple);
        setWordColor(purple[600]);
        setThemeFontState(classes.themeFontPurple);
      } else if (settingColor == green[600]) {
        setThemeState(classes.themeGreen);
        setWordColor(green[600]);
        setThemeFontState(classes.themeFontGreen);
      } else if (settingColor == red[600]) {
        setThemeState(classes.themeRed);
        setWordColor(red[600]);
        setThemeFontState(classes.themeFontRed);
      } else if (settingColor == orange[600]) {
        setThemeState(classes.themeOrange);
        setWordColor(orange[600]);
        setThemeFontState(classes.themeFontOrange);
      } else if (settingColor == "#ff5253") {
        setThemeState(classes.themeYellow);
        setWordColor("#ff5253");
        setThemeFontState(classes.themeFontYellow);
      } else {
        setThemeState(classes.themeDefault);
        setWordColor("#2D62ED");
        setThemeFontState("#2D62ED");
      }
    }
  }, 1000);

  const handleChangeProperty = (event) => {
    store.dispatch({
      type: EDIT_PROPERTY,
      payload: event.target.value,
    });
    setSelectedProperty(event.target.value);
    // setSelectedProperty(event.target.value);
    // setSelectedProperty(event.target.value);
  };

  // const [lang, setLang] = useState('en')

  // setInterval(() => {
  //     let settinglang = store.getState().reducer.lang;
  //     // console.log("settinglang",settinglang,lang)
  //     // console.log("is",lang != settinglang && lang != null)
  //     if (lang != settinglang && lang != null) {
  //         setLang(settinglang)
  //         if(settinglang == 'th') setTranslate(translate_th)
  //         else if(settinglang == 'en') setTranslate(translate_en)
  //     }
  // }, 500);

  const handlelanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLanguage = (lang) => {
    console.log("handle lang", lang);
    // setAnchorEl(null);
    // handleMobileMenuClose();
    if (lang == "th") {
      setThemeState(classes.themePurple);
      setThemeFontState(classes.themeFonrPurple);
      store.dispatch({
        type: EDIT_COLOR,
        payload: purple[600],
      });
    } else {
      setThemeState(classes.themeGreen);
      setThemeFontState(classes.themeFontGreen);
      store.dispatch({
        type: EDIT_COLOR,
        payload: green[600],
      });
    }
    console.log("store", store);
    console.log("store", store.store);
    store.dispatch({
      type: EDIT_LANG,
      payload: lang,
    });

    console.log("store", store.getState().reducer.lang);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleLanguage("en")}>English</MenuItem>
      <MenuItem onClick={() => handleLanguage("th")}>ไทย</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="white">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="white">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={() => handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handlelanguageMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExplicitIcon />
        </IconButton>
        <p>Language</p>
      </MenuItem>
    </Menu>
  );

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [rightBar, setRightBar] = React.useState(false);
  const toggleRightBar = (open) => (event) => {
    setRightBar(open);
  };
  const rightBarMenu = () => (
    <div className={classes.rightBarStyle}>
      <RightBar />
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(
          themeState,
          classes.appBar,
          open && classes.appBarShift
        )}
      >
        <Toolbar className={classes.toolbar}>
          <img
            src="logomin_white.png"
            className={clsx(
              classes.logoExpand,
              open && classes.menuButtonHidden
            )}
            alt="..."
            height={35}
          />

          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButtonExpand,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            RVS App Platform
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder=""
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <Fab
              size="small"
              aria-label="add"
              style={{ backgroundColor: "#64CFFF", color: "white" }}
            >
              <AddIcon />
            </Fab>
            <Divider
              orientation="vertical"
              flexItem
              style={{ backgroundColor: "#FFFFFF" }}
              variant="middle"
            /> */}
            {/* <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handlelanguageMenuOpen}
                            size="medium"
                            style={{ color: "white" }}
                        >
                            <ExplicitIcon />
                        </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handlelanguageMenuOpen}
              style={{ color: "white" }}
            >
              <AccountCircle style={{ fontSize: 38 }} />
            </IconButton>
            <Grid item spacing={1} style={{ paddingLeft: 20 }}>
              <Grid item spacing={0}>
                <Typography
                  variant="subtitle1"
                  style={{ fontSize: 15, paddingTop: 10 }}
                >
                  {sessionStorage.getItem("name")}
                  
                </Typography>
              </Grid>
              <Grid item spacing={1}>
                <Typography variant="body2" style={{ fontSize: 10 }}>
                {sessionStorage.getItem("role")}
                </Typography>
              </Grid>
            </Grid>
            <Grid item spacing={1} style={{ paddingLeft: 20, paddingTop: 5 }}>
              <Grid item>
                <IconButton
                  onClick={toggleRightBar(true)}
                  style={{ color: "#FFFFFF" }}
                >
                  <ArrowDropDownIcon />
                </IconButton>
                {/* ==============Rightbar=================== */}
                <SwipeableDrawer
                  anchor={"right"}
                  open={rightBar}
                  onClose={toggleRightBar(false)}
                >
                  <div style={{ zIndex: 4000 }}>{rightBarMenu()}</div>
                </SwipeableDrawer>
              </Grid>
            </Grid>
          </div>

          <div className={classes.sectionMobile}>
            {/* <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton> */}
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handlelanguageMenuOpen}
              style={{ color: "white", paddingLeft: 20 }}
            >
              <AccountCircle style={{ fontSize: 25 }} />
            </IconButton>
            <Grid item spacing={1} style={{ paddingLeft: 10 }}>
              <Grid item spacing={0}>
                <Typography
                  variant="subtitle1"
                  style={{ fontSize: 11, paddingTop: 10, width: 48 }}
                >
                  {sessionStorage.getItem("name")}
                  console.log();
                </Typography>
              </Grid>
              <Grid item spacing={1}>
                <Typography variant="body2" style={{ fontSize: 10, fontWeight:'bold'}}>
                {sessionStorage.getItem("role")}
                </Typography>
              </Grid>
            </Grid>
            <Grid item spacing={1} style={{ paddingLeft: 20 }}>
              <Grid item>
                <IconButton
                  onClick={toggleRightBar(true)}
                  style={{ color: "#FFFFFF", marginLeft: -5 }}
                >
                  <ArrowDropDownIcon />
                </IconButton>
                {/* ==============Rightbar=================== */}
                <SwipeableDrawer
                  anchor={"right"}
                  open={rightBar}
                  onClose={toggleRightBar(false)}
                >
                  <div style={{ zIndex: 4000 }}>{rightBarMenu()}</div>
                </SwipeableDrawer>
              </Grid>
            </Grid>
          </div>
          {/* <IconButton color="inherit">

                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton> */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            themeState,
            classes.drawerPaper,
            !open && classes.drawerPaperClose
          ),
        }}
        open={open}
      >
        <Grid container>
          <Grid item container direction="row">
            <div style={{ paddingLeft: 12, paddingRight: 10, paddingTop: 18 }}>
              <img
                src="logo_white.png"
                class="rounded mx-auto d-block"
                alt="..."
                height={35}
              />
            </div>
            {open ? (
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerClose}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
          </Grid>
        </Grid>
        <Divider />
        <Grid item container direction="row">
          {/* <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            // onClick={handlelanguageMenuOpen}
            size="large"
            style={{ color: "white", marginLeft: 5, marginTop: 5 }}
          >
            <AccountCircle style={{ fontSize: 28 }} />
          </IconButton> */}
          {open ? (
            <Grid
              item
              spacing={1}
              style={{ paddingLeft: 15, marginTop: 5, paddingBottom: 10 }}
            >
              <Grid item spacing={1}>
                <Typography
                  variant="subtitle1"
                  style={{ fontSize: 12, paddingLeft: 50, marginTop: -10 }}
                >
                  {/*sessionStorage.getItem("name")*/}
                  <SettingsIcon style={{ fontSize: 16, marginTop: 10 }} />
                  {" Change Property"}
                </Typography>
              </Grid>
              {/* <Grid item container direction="row"> */}
              {/* <Grid>
                  <SettingsIcon />
                </Grid> */}
              {/* <Grid item spacing={1}>
                  <Typography variant="body2" style={{ fontSize: 10, marginTop: 5, marginLeft: 5 }}>
                    {store.getState().reducer.property}
                  </Typography>
                </Grid> */}

              <Grid class={classes.propertyForm}>
                <BusinessIcon
                  style={{ paddingRight: 20, color: "#FFFFFF", fontSize: 45 }}
                />
                <FormControl
                  variant="filled"
                  style={{ backgroundColor: "#FFFFFF", borderRadius: 5 }}
                >
                  <Select
                    name="selectprop"
                    id="selectprop"
                    value={selectedProperty}
                    onChange={handleChangeProperty}
                    defaultValue={store.getState().reducer.property}
                  >
                    {store.getState().reducer.propertys.map((item) => (
                      <MenuItem
                        key={item.propertyid}
                        value={item.propertyid}
                        label={item.propertyid}
                      >
                        <div style={{ marginTop: -7 }}> {item.propertyid} </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ) : (
            <BusinessIcon
              style={{
                paddingRight: 20,
                paddingTop: 10,
                marginLeft: 15,
                color: "#FFFFFF",
                fontSize: 45,
              }}
            />
          )}
        </Grid>
        <Divider />
        {/* <List disablePadding dense>
                    {items.map(({ label, name, ...rest }) => (
                        <ListItem key={name} button {...rest}>
                            <ListItemText>{label}</ListItemText>
                        </ListItem>
                    ))}
                </List> */}

        <List>
          {store.getState().reducer.lang == "en" ? (
            <MainListItems_en />
          ) : (
            <MainListItems_en />
          )}
        </List>

        <Divider />

        {/* <List>{store.getState().reducer.lang == "en"? <MainListItems_en/>:<MainListItems_en/>}</List> */}
      </Drawer>

      <main id="compwidth" className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="100" className={classes.container}>
          {/* <FrontDesk /> */}
          <HeaderTabs />
          {store.getState().reducer.componentState == "FrontDesk" ? (
            <FrontDesk />
          ) : store.getState().reducer.componentState == "Configuration" ? (
            <div>
              <Configuration />
            </div>
          ) : null}
          <div style={{ paddingTop: 50 }}>
            <ButtomBar />
          </div>
        </Container>
      </main>
    </div>
  );
}
