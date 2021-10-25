import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
<<<<<<< HEAD
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
=======
import { connect, ReactReduxContext, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { blue, green, yellow } from "@material-ui/core/colors";
import TestDnD from "../components/TestDnD";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

>>>>>>> 41364f8edd439dc7c5d1aca3c9848f7327d2efa4
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

export const ProfileIndividual = (props) => {
<<<<<<< HEAD
  const [smallwidth, setSmallwidth] = React.useState(window.innerWidth < 1000);
  React.useEffect(() => {
    setSmallwidth(window.innerWidth < 1000)
  }, []);

  return (
    <Container maxWidth="xl">
      {smallwidth ?
        <Paper elevation={3}>
          <Container maxWidth="xl" style={{ paddingTop: 15 }}>
            <Grid container>
              <Typography variant="h6" color="primary" style={{ flexGrow: 1 }}>
                Profile Detail
              </Typography>
              <Button
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Grid>
            <Divider style={{ marginTop: 10 }} />
          </Container>
          <Container maxWidth="xl" style={{ paddingTop: 15, paddingBottom: 15 }}>

            {/* <Typography
                variant="subtitle1"
                color="initial"
                style={{ paddingBottom: 10 }}
              >
                Personal
              </Typography> */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Personal</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField label="First Name" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField label="Last Name" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField label="Gender" variant="outlined" fullWidth select />
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField
                      label="Choose a Document Type*"
                      variant="outlined"
                      fullWidth
                      select
                    />
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField
                      label="ID Number*"
                      variant="outlined"
                      fullWidth
                      select
                    />
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField
                      label="Nationality*"
                      variant="outlined"
                      fullWidth
                      select
                    />
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xl={4} md={6} xs={12}>
                      <KeyboardDatePicker
                        label="Issue Date"
                        inputVariant="outlined"
                        // format="dd/MM/yyyy"
                        // value={selectedDateStartEdit}
                        // onChange={handleDateStartEdit}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xl={4} md={6} xs={12}>
                      <KeyboardDatePicker
                        label="Expiry Date"
                        inputVariant="outlined"
                        // format="dd/MM/yyyy"
                        // value={selectedDateStartEdit}
                        // onChange={handleDateStartEdit}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xl={4} md={6} xs={12}>
                      <KeyboardDatePicker
                        label="Date of Birth"
                        inputVariant="outlined"
                        // format="dd/MM/yyyy"
                        // value={selectedDateStartEdit}
                        // onChange={handleDateStartEdit}
                        fullWidth
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* <Typography
              variant="subtitle1"
              color="initial"
              style={{ paddingBottom: 10, paddingTop: 10 }}
            >
              Communication
            </Typography> */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Communication</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField label="Email" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField label="Phone Number" variant="outlined" fullWidth />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Address</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <Typography
              variant="subtitle1"
              color="initial"
              style={{ paddingBottom: 10, paddingTop: 10 }}
            >
              Address
            </Typography> */}
                <Grid container spacing={2}>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField label="OrganiZation" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField label="Address Line 1" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField label="Address Line 2" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xl={3} md={6} xs={12}>
                    <TextField
                      label="Choose a country"
                      variant="outlined"
                      fullWidth
                      select
                    />
                  </Grid>
                  <Grid item xl={3} md={6} xs={12}>
                    <TextField label="City" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xl={3} md={6} xs={12}>
                    <TextField label="State" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xl={3} md={6} xs={12}>
                    <TextField label="Postal" variant="outlined" fullWidth />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Relationship</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <Typography
              variant="subtitle1"
              color="initial"
              style={{ paddingBottom: 10, paddingTop: 10 }}
            >
              Rerationship (Internal)
            </Typography> */}
                <Grid container spacing={2}>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField
                      label={
                        <Grid container alignItems="center">
                          <PublicRoundedIcon style={{ marginRight: 10 }} />
                          Web site
                        </Grid>
                      }
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xl={2} md={6} xs={12}>
                    <TextField
                      label={
                        <Grid container alignItems="center">
                          <AlternateEmailIcon style={{ marginRight: 10 }} />
                          Line
                        </Grid>
                      }
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xl={2} md={6} xs={12}>
                    <TextField
                      label={
                        <Grid container alignItems="center">
                          <FacebookIcon style={{ marginRight: 10 }} />
                          Facebook
                        </Grid>
                      }
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xl={2} md={6} xs={12}>
                    <TextField
                      label={
                        <Grid container alignItems="center">
                          <InstagramIcon style={{ marginRight: 10 }} />
                          Instagram
                        </Grid>
                      }
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xl={2} md={6} xs={12}>
                    <TextField
                      label={
                        <Grid container alignItems="center">
                          <TwitterIcon style={{ marginRight: 10 }} />
                          Twitter
                        </Grid>
                      }
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography> Booking History</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <Typography variant="h6" color="primary" style={{ paddingTop: 20 }}>
              Booking History
            </Typography> */}
                <Divider style={{ marginTop: 10 }} />
                <Typography
                  variant="subtitle1"
                  color="initial"
                  style={{ paddingBottom: 10, paddingTop: 10 }}
                >
                  booking data list here !!!
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Container>
        </Paper>
        :
        <Paper elevation={3}>
          <Container maxWidth="xl" style={{ paddingTop: 15 }}>
            <Grid container>
              <Typography variant="h6" color="primary" style={{ flexGrow: 1 }}>
                Profile Detail
              </Typography>
              <Button
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
=======
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
        color: themeState.color,
        backgroundColor: themeState.background,
      }}
    >
      <Paper
        elevation={3}
        style={{ color: themeState.color, backgroundColor: themeState.paper }}
      >
        <Container maxWidth="xl" style={{ paddingTop: 15 }}>
          <Grid container>
            <Typography variant="h6" style={{ flexGrow: 1, color: mainColor }}>
              Profile / Individual
            </Typography>
            <Button
              variant="contained"
              style={{ backgroundColor: "red", color: "white" }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
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
            Personal
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                className={classes.root}
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Last Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Gender"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Choose a Document Type*"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="ID Number*"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Nationality*"
                variant="outlined"
                fullWidth
                select
              />
>>>>>>> 41364f8edd439dc7c5d1aca3c9848f7327d2efa4
            </Grid>
            <Divider style={{ marginTop: 10 }} />
          </Container>
          <Container maxWidth="xl" style={{ paddingTop: 15, paddingBottom: 15 }}>
            <Typography
              variant="subtitle1"
              color="initial"
              style={{ paddingBottom: 10 }}
            >
              Personal
            </Typography>
            <Grid container spacing={2}>
              <Grid item xl={4} md={6} xs={12}>
                <TextField label="First Name" variant="outlined" fullWidth />
              </Grid>
              <Grid item xl={4} md={6} xs={12}>
<<<<<<< HEAD
                <TextField label="Last Name" variant="outlined" fullWidth />
              </Grid>
              <Grid item xl={4} md={6} xs={12}>
                <TextField label="Gender" variant="outlined" fullWidth select />
              </Grid>
              <Grid item xl={4} md={6} xs={12}>
                <TextField
                  label="Choose a Document Type*"
                  variant="outlined"
=======
                <KeyboardDatePicker
                  className={classes.root}
                  label="Issue Date"
                  inputVariant="outlined"
                  InputProps={{
                    style: headerTableStyle,
                  }}
                  // format="dd/MM/yyyy"
                  // value={selectedDateStartEdit}
                  // onChange={handleDateStartEdit}
>>>>>>> 41364f8edd439dc7c5d1aca3c9848f7327d2efa4
                  fullWidth
                  select
                />
              </Grid>
              <Grid item xl={4} md={6} xs={12}>
<<<<<<< HEAD
                <TextField
                  label="ID Number*"
                  variant="outlined"
=======
                <KeyboardDatePicker
                  className={classes.root}
                  label="Expiry Date"
                  inputVariant="outlined"
                  InputProps={{
                    style: headerTableStyle,
                  }}
                  // format="dd/MM/yyyy"
                  // value={selectedDateStartEdit}
                  // onChange={handleDateStartEdit}
>>>>>>> 41364f8edd439dc7c5d1aca3c9848f7327d2efa4
                  fullWidth
                  select
                />
              </Grid>
              <Grid item xl={4} md={6} xs={12}>
<<<<<<< HEAD
                <TextField
                  label="Nationality*"
                  variant="outlined"
=======
                <KeyboardDatePicker
                  className={classes.root}
                  label="Date of Birth"
                  inputVariant="outlined"
                  InputProps={{
                    style: headerTableStyle,
                  }}
                  // format="dd/MM/yyyy"
                  // value={selectedDateStartEdit}
                  // onChange={handleDateStartEdit}
>>>>>>> 41364f8edd439dc7c5d1aca3c9848f7327d2efa4
                  fullWidth
                  select
                />
              </Grid>
<<<<<<< HEAD
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xl={4} md={6} xs={12}>
                  <KeyboardDatePicker
                    label="Issue Date"
                    inputVariant="outlined"
                    // format="dd/MM/yyyy"
                    // value={selectedDateStartEdit}
                    // onChange={handleDateStartEdit}
                    fullWidth
                  />
                </Grid>
                <Grid item xl={4} md={6} xs={12}>
                  <KeyboardDatePicker
                    label="Expiry Date"
                    inputVariant="outlined"
                    // format="dd/MM/yyyy"
                    // value={selectedDateStartEdit}
                    // onChange={handleDateStartEdit}
                    fullWidth
                  />
                </Grid>
                <Grid item xl={4} md={6} xs={12}>
                  <KeyboardDatePicker
                    label="Date of Birth"
                    inputVariant="outlined"
                    // format="dd/MM/yyyy"
                    // value={selectedDateStartEdit}
                    // onChange={handleDateStartEdit}
                    fullWidth
                  />
                </Grid>
              </MuiPickersUtilsProvider>
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
                <TextField label="Email" variant="outlined" fullWidth />
              </Grid>
              <Grid item xl={4} md={6} xs={12}>
                <TextField label="Phone Number" variant="outlined" fullWidth />
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
              <Grid item xl={4} md={6} xs={12}>
                <TextField label="OrganiZation" variant="outlined" fullWidth />
              </Grid>
              <Grid item xl={4} md={6} xs={12}>
                <TextField label="Address Line 1" variant="outlined" fullWidth />
              </Grid>
              <Grid item xl={4} md={6} xs={12}>
                <TextField label="Address Line 2" variant="outlined" fullWidth />
              </Grid>
              <Grid item xl={3} md={6} xs={12}>
                <TextField
                  label="Choose a country"
                  variant="outlined"
                  fullWidth
                  select
                />
              </Grid>
              <Grid item xl={3} md={6} xs={12}>
                <TextField label="City" variant="outlined" fullWidth />
              </Grid>
              <Grid item xl={3} md={6} xs={12}>
                <TextField label="State" variant="outlined" fullWidth />
              </Grid>
              <Grid item xl={3} md={6} xs={12}>
                <TextField label="Postal" variant="outlined" fullWidth />
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
              <Grid item xl={4} md={6} xs={12}>
                <TextField
                  label={
                    <Grid container alignItems="center">
                      <PublicRoundedIcon style={{ marginRight: 10 }} />
                      Web site
                    </Grid>
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xl={2} md={6} xs={12}>
                <TextField
                  label={
                    <Grid container alignItems="center">
                      <AlternateEmailIcon style={{ marginRight: 10 }} />
                      Line
                    </Grid>
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xl={2} md={6} xs={12}>
                <TextField
                  label={
                    <Grid container alignItems="center">
                      <FacebookIcon style={{ marginRight: 10 }} />
                      Facebook
                    </Grid>
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xl={2} md={6} xs={12}>
                <TextField
                  label={
                    <Grid container alignItems="center">
                      <InstagramIcon style={{ marginRight: 10 }} />
                      Instagram
                    </Grid>
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xl={2} md={6} xs={12}>
                <TextField
                  label={
                    <Grid container alignItems="center">
                      <TwitterIcon style={{ marginRight: 10 }} />
                      Twitter
                    </Grid>
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Typography variant="h6" color="primary" style={{ paddingTop: 20 }}>
              Booking History
            </Typography>
            <Divider style={{ marginTop: 10 }} />
            <Typography
              variant="subtitle1"
              color="initial"
              style={{ paddingBottom: 10, paddingTop: 10 }}
            >
              booking data list here !!!
            </Typography>
          </Container>
        </Paper>
      }
=======
            </MuiPickersUtilsProvider>
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
                label="Email"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Phone Number"
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
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="OrganiZation"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Address Line 1"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label="Address Line 2"
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
            Rerationship (Internal)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                className={classes.root}
                label={
                  <Grid container alignItems="center">
                    <PublicRoundedIcon style={{ marginRight: 10 }} />
                    Web site
                  </Grid>
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                className={classes.root}
                label={
                  <Grid container alignItems="center">
                    <AlternateEmailIcon style={{ marginRight: 10 }} />
                    Line
                  </Grid>
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                className={classes.root}
                label={
                  <Grid container alignItems="center">
                    <FacebookIcon style={{ marginRight: 10 }} />
                    Facebook
                  </Grid>
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                className={classes.root}
                label={
                  <Grid container alignItems="center">
                    <InstagramIcon style={{ marginRight: 10 }} />
                    Instagram
                  </Grid>
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                className={classes.root}
                label={
                  <Grid container alignItems="center">
                    <TwitterIcon style={{ marginRight: 10 }} />
                    Twitter
                  </Grid>
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Typography variant="h6" style={{ paddingTop: 20, color: mainColor }}>
            Booking History
          </Typography>
          <Divider
            style={{ marginTop: 10, backgroundColor: themeState.color }}
          />
          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            booking data list here !!!
          </Typography>
        </Container>
      </Paper>
      <TestDnD />
>>>>>>> 41364f8edd439dc7c5d1aca3c9848f7327d2efa4
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndividual);
