import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FrontDesk from '../components/Dashboard/FrontDesk'
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExplicitIcon from '@material-ui/icons/Explicit';
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MailIcon from "@material-ui/icons/Mail";
import { purple, green } from "@material-ui/core/colors";

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

// import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
import {
    EDIT_LANG
} from "../middleware/action";
import { ReactReduxContext } from 'react-redux'
import ButtomBar from "../layouts/ButtomBar";
import HeaderTabs from "../layouts/HeaderTabs";

import MainListItems_en from '../middleware/listitems/dropDownItems';
import secondaryListItems_en from '../middleware/listitems/dropDownItems';
import mainListItems_th from '../middleware/listitems/dropDownItems';
import secondaryListItems_th from '../middleware/listitems/dropDownItems';
// import { mainListItems_en, secondaryListItems_en } from '../middleware/listitems/dropDownItems';
// import { mainListItems_th, secondaryListItems_th } from '../middleware/listitems/dropDownItems';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // backgroundColor:'#2D62ED'
    },
    themeDefault: {
        backgroundColor: '#2D62ED'
    },
    themeGreen: {
        backgroundColor: green[600]
    },
    themePurple: {
        backgroundColor: purple[600]
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
    // menuButton: {
    //     marginRight: 36,
    // },
    menuButtonHidden: {
        display: 'none',
    },
    // title: {
    //     flexGrow: 1,
    // },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#2D62ED',
        color: 'white'
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },


    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
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
}));





export default function Dashboard() {
    const classes = useStyles();
    const items = [
        { name: 'Dashboard', label: 'Dashboard' },
        { name: 'Reservation', label: 'Reservation' },
        {
            name: 'FrontDesk', label: 'Front Desk',
            items: [{ name: 'Walk-in', label: 'Walk-in' },
            { name: 'Check-in', label: 'Walk-in' },
            { name: 'Chen-in', label: 'Walk-in' },
            { name: 'Walk-in', label: 'Walk-in' },
            ]
        },
        { name: 'Cashier', label: 'Cashier' },
        { name: 'Profiles', label: 'Profiles' },
        { name: 'NightAuditor', label: 'Night Auditor' },
        { name: 'House Keeping', label: 'HouseKeeping' },
        { name: 'Engineering', label: 'Engineering' },
        { name: 'Reports', label: 'Reports' },
        { name: 'Configuration', label: 'Configuration' },
        { name: 'System Tools', label: 'System Tools' }

    ]

    const [open, setOpen] = React.useState(false);
    const [themeState, setThemeState] = React.useState(classes.themeDefault);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const { store } = useContext(ReactReduxContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
        console.log("handle lang", lang)
        // setAnchorEl(null);
        // handleMobileMenuClose();
        if (lang == 'th') {
            setThemeState(classes.themePurple)
        } else {
            setThemeState(classes.themeGreen)
        }
        console.log("store", store)
        console.log("store", store.store)
        store.dispatch({
            type: EDIT_LANG,
            payload: lang
        })

        console.log("store", store.getState().reducer.lang)
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
            <MenuItem onClick={() => handleLanguage('en')}>English</MenuItem>
            <MenuItem onClick={() => handleLanguage('th')}>ไทย</MenuItem>
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
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
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

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(themeState, classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
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
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handlelanguageMenuOpen}
                            size="medium"
                            style={{ color: "#1B47C1" }}
                        >
                            <AccountCircle />
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handlelanguageMenuOpen}
                            size="medium"
                            style={{ color: "#1B47C1" }}
                        >
                            <ExplicitIcon />
                        </IconButton>
                        <Grid item spacing={1} style={{ paddingLeft: 20 }}>
                            <Grid item spacing={1}>
                                <Typography variant="subtitle1">Username</Typography>
                            </Grid>
                            <Grid item spacing={1}>
                                <Typography variant="body2">Admin</Typography>
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
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <Grid container >
                    <Grid item container direction="row">
                        <img
                            src="logo.png"
                            class="rounded mx-auto d-block"
                            alt="..."
                            height={40}
                        />
                        {/* <div style={{ paddingLeft: 40 }}> */}
                        {open ?
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerClose}
                            >
                                <MenuIcon />
                            </IconButton> : <div style={{ marginTop: '20px' }}></div>}
                        {/* </div> */}

                        {/* <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div> */}
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
                <List>{store.getState().reducer.lang == "en"? <MainListItems_en/>:<MainListItems_en/>}</List>
                <Divider />
                {/* <List>{store.getState().reducer.lang == "en"? <MainListItems_en/>:<MainListItems_en/>}</List> */}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {/* <FrontDesk /> */}
                    <HeaderTabs />
                    <ButtomBar />
                </Container>
            </main>
        </div>
    );
}