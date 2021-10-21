import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { connect, ReactReduxContext, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { blue, green, yellow } from "@material-ui/core/colors";
import TestDnD from "../components/TestDnD";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateRangePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  selectPage: {
    minWidth: 90,
    textAlign: "center",
    flexGrow: 1,
  },
  searchLayout: {
    flexGrow: 1,

    marginLeft: 20,
    marginRight: 20,
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
}));

export const ProfileCompany = (props) => {
  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });
  const themeBackground = useSelector((state) => state.reducer.themeBackground);

  React.useEffect(() => {
    if (themeBackground === "#FFFFFF") {
      setThemeState({
        background: "#FFFFFF",
        color: "#000000",
        paper: "#FFFFFF",
        colorlevel: "A400",
        // matStyle: this.classes.normalmode
      });
    } else {
      setThemeState({
        background: "#212121",
        color: "#FAFAFA",
        paper: "#424242",
        colorlevel: "600",
        // matStyle: this.classes.darkmode
      });
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

  const classes = useStyles(themeState);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };
  return (
    <Container
      maxWidth="xl"
      style={{
        paddingTop: 30,
        color: themeState.color,
        backgroundColor: themeState.background,
      }}
    >
      <Paper
        elevation={3}
        style={{ color: themeState.color, backgroundColor: themeState.paper }}
      >
        <Container maxWidth="xl" style={{ paddingTop: 15 }}>
          <Grid container alignItems="center">
            <Grid item style={{ flexGrow: 1 }}>
              <Typography variant="h6" style={{ color: mainColor }}>
                Profile / Company
              </Typography>
            </Grid>
            <Grid item style={{ paddingRight: 20 }}>
              <FormControlLabel
                value="start"
                control={<Radio color="primary" />}
                label="Central Protected"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                label="Property"
                variant="outlined"
                fullWidth
                className={classes.root}
                select
              />
            </Grid>
          </Grid>
          <Divider
            style={{ marginTop: 10, backgroundColor: themeState.color }}
          />
        </Container>
        {/* ====================================== */}
        <Container
          maxWidth="xl"
          style={{
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10 }}
          >
            Account
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={6} md={6} xs={12}>
              <TextField
                label="Master Account"
                variant="outlined"
                fullWidth
                className={classes.root}
                select
              />
            </Grid>

            <Grid item xl={6} md={6} xs={12}>
              <TextField
                label="Parent Account "
                variant="outlined"
                fullWidth
                className={classes.root}
                select
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                label="Name 1"
                variant="outlined"
                fullWidth
                className={classes.root}
                select
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Name 2"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Name 3"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Address 1"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Address 2"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Address 3"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Address 4"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Choose a country"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="City"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="State"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Postal"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            Communication
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Commu1_type"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Commu2_type"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Commu3_type"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
          </Grid>

          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            Rerationship (Internal)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Owner"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Temitory"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Trace Code"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Keyword"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Type"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
          </Grid>

          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            A/R Number
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="IATA"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Ref. Currency"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Credit Rating"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Active Reason"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            More Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Tax ID"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Routing Instruction"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
          </Grid>

          <Typography variant="h6" style={{ paddingTop: 20, color: mainColor }}>
            Sales Information
          </Typography>
          <Divider
            style={{ marginTop: 10, backgroundColor: themeState.color }}
          />
          <Grid container spacing={2} style={{ marginTop: 15 }}>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Priority"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Room Potential"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Scope"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Scope City"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Action Code"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Business Segment"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Account Type"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Source"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Industry Code"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Compentition Code"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCompany);
