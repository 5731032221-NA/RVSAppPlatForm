import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import KingBedIcon from "@material-ui/icons/KingBed";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IconButton } from "@material-ui/core";
// import FrontDesk from "../components/Dashboard/FrontDesk";
import Reservation from "../components/Dashboard/Reservation";

import { ReactReduxContext } from "react-redux";

import { EDIT_COMPONENT } from "../middleware/action";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // flex: "dislay",
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
    justifyItems: "center",
  },
  tabs: {
    color: 'green'
  }
}));

export default function HeaderTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [wordColor, setWordColor] = React.useState('#2D62ED');
  const { store } = useContext(ReactReduxContext);

  function handleComponentState(comp) {
    store.dispatch({
      type: EDIT_COMPONENT,
      payload: comp
    })
  }

  setInterval(() => {
    let settingColor = store.getState().reducer.color;
    if (wordColor !== settingColor && wordColor !== null) {
      setWordColor(settingColor);
    }
  }, 1000);

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue)
    setValue(newValue);
    if(newValue===0) handleComponentState("FrontDesk")
    console.log("st",store.getState().reducer.componentState)
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#FFFFFF", color: "#2D62ED" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <IconButton size="medium" style={{ color: "red", marginLeft: 20 }}>
            <NotificationsIcon />
          </IconButton>
          <Typography variant="body1" className={classes.title}>
            Update has a problem
          </Typography>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
            // centered
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { backgroundColor: wordColor } }}
          >
            <Tab
              icon={<ImageAspectRatioIcon />}
              style={{ color: wordColor }}
              label="Front Desk"
              {...a11yProps(0)}
            />
            <Tab
              style={{ color: wordColor }}
              icon={<KingBedIcon />}
              label="Reservation"
              {...a11yProps(1)}
            />
            <Tab
              icon={<MonetizationOnIcon />}
              style={{ color: wordColor }}
              label="Cashier"
              {...a11yProps(2)}
            />
            <Tab
              icon={<NightsStayIcon />}
              style={{ color: wordColor }}
              label="Night Auditor"
              {...a11yProps(3)}
            />
          </Tabs>
        </Grid>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* <FrontDesk /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Reservation />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Cashier
      </TabPanel>
      <TabPanel value={value} index={3}>
        Night Auditor
      </TabPanel>
    </div>
  );
}
