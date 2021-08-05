import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FrontDesk from "../components/Dashboard/FrontDesk";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExplicitIcon from "@material-ui/icons/Explicit";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import { purple, green, orange ,red , yellow } from "@material-ui/core/colors";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// import { useDispatch } from 'react-redux/lib/hooks/useDispatch';

import { EDIT_LANG } from "../middleware/action";
import { EDIT_COLOR } from "../middleware/action";
import { ReactReduxContext } from "react-redux";
import ButtomBar from "../layouts/ButtomBar";
import HeaderTabs from "../layouts/HeaderTabs";

import MainListItems_en from "../middleware/listitems/dropDownItems";
import secondaryListItems_en from "../middleware/listitems/dropDownItems";
import mainListItems_th from "../middleware/listitems/dropDownItems";
import secondaryListItems_th from "../middleware/listitems/dropDownItems";
// import { mainListItems_en, secondaryListItems_en } from '../middleware/listitems/dropDownItems';
// import { mainListItems_th, secondaryListItems_th } from '../middleware/listitems/dropDownItems';

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import RightBar from "../layouts/RightBar";

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
}));

export default function Dashboard() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [themeState, setThemeState] = React.useState(classes.themeDefault);
  const [wordColor, setWordColor] = React.useState("#2D62ED");
  const [themeFontState, setThemeFontState] = React.useState(
    classes.themeFontDefault
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { store } = useContext(ReactReduxContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  setInterval(() => {
    let settingColor = store.getState().reducer.color;
    if (wordColor != settingColor && wordColor != null) {
      if (settingColor == purple[600]) {
        setThemeState(classes.themePurple);
        setWordColor(purple[600]);
        setThemeFontState(classes.themeFonrPurple);
      } else if (settingColor == green[600]) {
        setThemeState(classes.themeGreen);
        setWordColor(green[600]);
        setThemeFontState(classes.themeFontGreen);
      } else {
        setThemeState(classes.themeDefault);
        setWordColor("#2D62ED");
        setThemeFontState("#2D62ED");
      }
    }
  }, 500);

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
            src="logomin.png"
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
            <Fab
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
            />
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
              size="large"
              style={{ color: "white" }}
            >
              <AccountCircle style={{ size: 50 }} />
            </IconButton>
            <Grid item spacing={1} style={{ paddingLeft: 20 }}>
              <Grid item spacing={1}>
                <Typography variant="subtitle1" style={{ fontSize: 15 }}>
                  {sessionStorage.getItem("name")}
                </Typography>
              </Grid>
              <Grid item spacing={1}>
                <Typography variant="body2" style={{ fontSize: 10 }}>
                  Admin
                </Typography>
              </Grid>
            </Grid>
            <Grid item spacing={1} style={{ paddingLeft: 20 }}>
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
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
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
                src="logo.png"
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
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="100" className={classes.container}>
          {/* <FrontDesk /> */}
          <HeaderTabs />
          <div style={{ paddingTop: 50 }}></div>
          <ButtomBar />
        </Container>
      </main>
    </div>
  );
}
