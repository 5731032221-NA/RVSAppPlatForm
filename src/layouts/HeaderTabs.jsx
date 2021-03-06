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
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";

// import FrontDesk from "../components/Dashboard/FrontDesk";
// import ReservationPage from "../pages/ReservationPage";
import { EDIT_COMPONENT } from "../middleware/action";
import { indexTab } from "../middleware/action";
import { useHistory } from "react-router-dom";

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
    id: `tab-${index}`,
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
    color: "green",
  },
}));

export default function HeaderTabs() {
  const classes = useStyles();
  const history = useHistory();
  const [wordColor, setWordColor] = React.useState("#2D62ED");
  const [colorMode, setColorMode] = React.useState("#FFFFFF");
  const { store } = useContext(ReactReduxContext);

  const indextTab = useSelector((state) => state.reducer.indextTab.indextTab);
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const compString = sessionStorage.getItem("comp");
  const comps = JSON.parse(compString);
  // const cashier = comps.some(item => item.slug === 'ReportRoomMaster')
  // const front = comps.some(item => item.slug === 'ConfigMaster')
  // const setting = comps.some(item => item.slug === 'RoleManagement')
  const cashier = true;
  const front = true;
  const setting = true;

  React.useEffect(() => {
    setValue(indextTab);
  }, [indextTab]);

  // React.useEffect(() => {
  //   handleChange(0,0)
  // },[])

  function handleComponentState(comp) {
    const comlower = comp.toLowerCase();
    history.replace(`/${comlower}`);
    store.dispatch({
      type: EDIT_COMPONENT,
      payload: comp,
    });
  }

  setInterval(() => {
    let settingColor = store.getState().reducer.color;
    if (wordColor !== settingColor && wordColor !== null) {
      setWordColor(settingColor);
    }

    let themeBackground = store.getState().reducer.themeBackground;
    if (themeBackground !== "#FFFFFF") {
      setColorMode("#212121");
    } else {
      setColorMode(" ");
    }
  }, 1000);

  const handleChange = (event, newValue) => {
    // console.log("newValue", newValue);

    setValue(newValue);
    dispatch(indexTab(newValue));
    if (newValue === 0) handleComponentState("FrontDesk");
    else if (newValue === 1) handleComponentState("Reservation");
    else if (newValue === 3) handleComponentState("Night Auditor");
    // console.log("st", store.getState().reducer.componentState);
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
            {front ? (
              <Tab
                icon={<ImageAspectRatioIcon />}
                style={{ color: wordColor }}
                label="Front Desk"
                {...a11yProps("frontdesk")}
              />
            ) : null}
            <Tab
              style={{ color: wordColor }}
              icon={<KingBedIcon />}
              label="Reservation"
              {...a11yProps("reservation")}
            />
            {cashier ? (
              <Tab
                icon={<MonetizationOnIcon />}
                style={{ color: wordColor }}
                label="Cashier"
                {...a11yProps("cashier")}
              />
            ) : null}
            {setting ? (
              <Tab
                icon={<NightsStayIcon />}
                style={{ color: wordColor }}
                label="Night Auditor"
                {...a11yProps("nightauditor")}
              />
            ) : null}
          </Tabs>
        </Grid>
      </AppBar>
      {front ? (
        <TabPanel
          style={{ backgroundColor: colorMode }}
          value={value}
          index={0 - (front ? 0 : 1)}
        >
          {/* <FrontDesk /> */}
        </TabPanel>
      ) : null}
      <TabPanel
        style={{ backgroundColor: colorMode }}
        value={value}
        index={1 - (front ? 0 : 1)}
      >
        {/* <Reservation /> */}
      </TabPanel>
      {cashier ? (
        <TabPanel
          style={{ backgroundColor: colorMode }}
          value={value}
          index={2 - (front ? 0 : 1) - (cashier ? 0 : 1)}
        >
          Cashier
        </TabPanel>
      ) : null}
      {setting ? (
        <TabPanel
          style={{ backgroundColor: colorMode }}
          value={value}
          index={3 - (front ? 0 : 1) - (cashier ? 0 : 1) - (setting ? 0 : 1)}
        >
          Night Auditor
        </TabPanel>
      ) : null}
    </div>
  );
}
