import React from "react";
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
import FrontDesk from "../components/Dashboard/FrontDesk";

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
}));

export default function HeaderTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#FFFFFF", color: "#2D62ED" }}
      >
        <Grid container>
          <Grid item spacing={1} className={classes.title}>
            {/* <Typography variant="h6" align="left"> */}

            <h3 style={{ color: "gray" }}>
              <IconButton
                size="medium"
                style={{ color: "red", marginLeft: 20 }}
              >
                <NotificationsIcon />
              </IconButton>
              Update has a problem
            </h3>

            {/* </Typography> */}
          </Grid>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
            centered
          >
            <Tab
              icon={<ImageAspectRatioIcon />}
              label="Front Desk"
              {...a11yProps(0)}
            />
            <Tab icon={<KingBedIcon />} label="Reservation" {...a11yProps(1)} />
            <Tab
              icon={<MonetizationOnIcon />}
              label="Cachier"
              {...a11yProps(2)}
            />
            <Tab
              icon={<NightsStayIcon />}
              label="Night Auditor"
              {...a11yProps(3)}
            />
          </Tabs>
        </Grid>
      </AppBar>
      <TabPanel value={value} index={0}>
        <FrontDesk />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Reservation
      </TabPanel>
      <TabPanel value={value} index={2}>
        Cachier
      </TabPanel>
      <TabPanel value={value} index={3}>
        Night Auditor
      </TabPanel>
    </div>
  );
}
