import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <AppBar
          position="fixed"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#2D62ED",
            top: "auto",
            bottom: 0,
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
              <Tab label="Room201221" {...a11yProps(0)} />
              <Tab label="Room2056" {...a11yProps(1)} />
            </Tabs>
          </Grid>
        </AppBar>
    </div>
  );
}
