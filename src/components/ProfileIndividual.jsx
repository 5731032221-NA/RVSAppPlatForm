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
import { connect, ReactReduxContext, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { blue, green, yellow } from "@material-ui/core/colors";
import TestDnD from "../components/TestDnD";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { nextComponent } from "../middleware/action";
import { Breadcrumbs,Link,} from "@material-ui/core";

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

const optiondata = [
  {
    value: "1",
    label: "Option1",
  },
  {
    value: "2",
    label: "Option2",
  },
  {
    value: "3",
    label: "Option3",
  },
];

export const ProfileIndividual = (props) => {
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

  const [smallwidth, setSmallwidth] = React.useState(window.innerWidth < 1000);
  React.useEffect(() => {
    setSmallwidth(window.innerWidth < 1000);
  }, []);

  const classes = useStyles(themeState);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };



  
  const handleComponentState = async (comp) => {
    console.log("setcomp", comp);
    props.nextComponent(comp);
  };
  return (
    <Container
      maxWidth="xl"
      style={{
        paddingTop: 30,
        color: themeState.color,marginTop: 22,
        backgroundColor: themeState.background,
      }}
    >


<Grid  item style={{ flexGrow: 1 }} >

<Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 2, sm: 2, md: 2 }}>
   <Grid item xs={6} sm={10} md={10} >
           <Breadcrumbs
              separator={
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: 15,
                    fontSize: 20,
                    color: themeState.color,
                  }}
                >
                  /
                </Typography>
              }
            >
              <Link
                color="inherit"
                href="#"
                onClick={() => handleComponentState("ProfileIndivisual")}
              >
                <Typography
                  variant="h6"
                  style={{ marginBottom: 15, fontSize: 20, color: mainColor }}
                >
                  Profile 
                </Typography>
              </Link>
              <Link color="inherit" href="#" onClick={" "}>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: 15,
                    fontSize: 14,
                    color: themeState.color,
                  }}
                >
               individual
                </Typography>
              </Link>
          
            
            </Breadcrumbs>
          </Grid>

          <Grid item xs={6} sm={2} md={2} style={{ textAlign: "right"}} >
          <Button
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
          </Grid>
          </Grid>
           
      
          </Grid>
        <Paper
          elevation={3}
          style={{ color: themeState.color, backgroundColor: themeState.paper }}
        >
          <Container maxWidth="xl" style={{ paddingTop: 15 }}>
            <Grid container>
              {/* <Typography variant="h6" style={{ flexGrow: 1, color: mainColor }}>
                Profile / Individual
              </Typography> */}
              {/* <Button
                variant="contained"
                style={{ backgroundColor: "red", color: "white" }}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button> */}
            </Grid>
            <Divider
              style={{ marginTop: 10, backgroundColor: themeState.color }}
            />
          </Container>
          <Container
            maxWidth="xl"
            style={{
              paddingTop: 15,
              paddingBottom: 15,
            }}
          >
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                Personal
              </AccordionSummary>

              <AccordionDetails>
                {/* <Typography
                  variant="subtitle1"
                  color="initial"
                  style={{ paddingBottom: 10 }}
                >
                  Personal
                </Typography> */}
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
                      defaultValue={" "}
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    >
                      {optiondata.map((option) => (
                        <option
                          style={headerTableStyle}
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField
                      className={classes.root}
                      label="Choose a Document Type*"
                      variant="outlined"
                      fullWidth
                      select
                      defaultValue={" "}
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    >
                      {optiondata.map((option) => (
                        <option
                          style={headerTableStyle}
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField
                      className={classes.root}
                      label="ID Number*"
                      variant="outlined"
                      fullWidth
                      select
                      defaultValue={" "}
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    >
                      {optiondata.map((option) => (
                        <option
                          style={headerTableStyle}
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField
                      className={classes.root}
                      label="Nationality*"
                      variant="outlined"
                      fullWidth
                      select
                      defaultValue={" "}
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    >
                      {optiondata.map((option) => (
                        <option
                          style={headerTableStyle}
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xl={4} md={6} xs={12}>
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
                        fullWidth
                      />
                    </Grid>
                    <Grid item xl={4} md={6} xs={12}>
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
                        fullWidth
                      />
                    </Grid>
                    <Grid item xl={4} md={6} xs={12}>
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
                        fullWidth
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                Communication
              </AccordionSummary>
              <AccordionDetails>
                {/* <Typography
                  variant="subtitle1"
                  color="initial"
                  style={{ paddingBottom: 10, paddingTop: 10 }}
                >
                  Communication
                </Typography> */}
                <Grid container spacing={2}>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField
                      className={classes.root}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} md={6} xs={12}>
                    <TextField
                      className={classes.root}
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                Address
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
                    <TextField
                      className={classes.root}
                      label="OrganiZation"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        style: headerTableStyle,
                      }}
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
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    />
                  </Grid>
                  <Grid item xl={3} md={6} xs={12}>
                    <TextField
                      className={classes.root}
                      label="Choose a country"
                      variant="outlined"
                      fullWidth
                      select
                      defaultValue={" "}
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    >
                      {optiondata.map((option) => (
                        <option
                          style={headerTableStyle}
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xl={3} md={6} xs={12}>
                    <TextField
                      className={classes.root}
                      label="City"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    />
                  </Grid>
                  <Grid item xl={3} md={6} xs={12}>
                    <TextField
                      className={classes.root}
                      label="State"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        style: headerTableStyle,
                      }}
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
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                Rerationship (Internal)
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
                      className={classes.root}
                      label={
                        <Grid container alignItems="center">
                          <PublicRoundedIcon style={{ marginRight: 10 }} />
                          Web site
                        </Grid>
                      }
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        style: headerTableStyle,
                      }}
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
                      InputProps={{
                        style: headerTableStyle,
                      }}
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
                      InputProps={{
                        style: headerTableStyle,
                      }}
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
                      InputProps={{
                        style: headerTableStyle,
                      }}
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
                      InputProps={{
                        style: headerTableStyle,
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                Booking History
              </AccordionSummary>
              <AccordionDetails>
                {/* <Typography variant="h6" style={{ paddingTop: 20, color: mainColor }}>
                  Booking History
                </Typography> */}
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
              </AccordionDetails>
            </Accordion>
          </Container>
        </Paper>
      <TestDnD />
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    nextComponent: (comp) => dispatch(nextComponent(comp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndividual);
