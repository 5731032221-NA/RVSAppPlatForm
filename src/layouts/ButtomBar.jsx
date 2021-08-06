import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { ReactReduxContext } from 'react-redux'
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

export default function ButtomBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [wordColor, setWordColor] = React.useState('#2D62ED');
  const { store } = useContext(ReactReduxContext)

  setInterval(() => {
    let settingColor = store.getState().reducer.color;
    if (wordColor != settingColor && wordColor != null) {
      setWordColor(settingColor)
      }
  }, 1000);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <TabPanel value={value} index={0}>
        Room2001
      </TabPanel>
      <TabPanel value={value} index={1}>
        Room2056
      </TabPanel>
      <Grid container spacing={1}>
        <AppBar
          // position="fixed"
          style={{
            backgroundColor: "#FFFFFF",
            color: wordColor,
            top: "auto",
            bottom: 0,
            // zIndex: 1500,
            width: store.getState().reducer.compwidth
            // width: document.getElementById("barwidth").style.width
            // width: '95%'
          }}
        >
          <Grid container>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              indicatorColor="primary"
              centered
            >
              <Tab label="Room2011" {...a11yProps(0)} />
              <Tab label="Room2056" {...a11yProps(1)} />
            </Tabs>
          </Grid>
        </AppBar>
      </Grid>
    </div>
  );
}
