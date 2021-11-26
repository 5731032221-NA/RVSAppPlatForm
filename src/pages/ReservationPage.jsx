import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Calendar from "../components/Calendar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { blue } from "@material-ui/core/colors";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  getReservationRoom,
  postReservationRoom,
  // getReservationRoomByID,
  // updateReservationRoom,
  // deleteReservationRoom,
} from "../services/reservationRoom.service";

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

export const ReservationPage = (props) => {
  const [dialogReservation, setDialogReservation] = React.useState(false);
  const [dataEvent, setDataEvent] = React.useState([]);
  const [selectedDateStart, setSelectedDateStart] = React.useState(
    new Date("2021-09-13")
  );
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(
    new Date("2021-09-13")
  );
  const [roomNumber, setRoomNumber] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [dataDate, setDataDate] = React.useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);

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
        colorlevel: "900",
        // matStyle: this.classes.normalmode
      });
    } else {
      setThemeState({
        background: "#212121",
        color: "#FAFAFA",
        paper: "#424242",
        colorlevel: "A200",
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

  const reservationRoom = async () => {
    const data = await getReservationRoom(sessionStorage.getItem("auth"));
    setDataEvent(data.content[0]);
  };

  React.useEffect(() => {
    async function getReservationRoomData() {
      reservationRoom();
    }
    getReservationRoomData();
  }, []);

  const handleDateStart = (date) => {
    let dateNoTiome = date.toISOString();
    let T = dateNoTiome.split("T");
    setSelectedDateStart(T[0]);
    // console.log("dateNoTiome", T);
  };
  const handleDateEnd = (date) => {
    let dateNoTiome = date.toISOString();
    let T = dateNoTiome.split("T");
    setSelectedDateEnd(T[0]);
    // console.log("dateNoTiome", T);
  };
  const handleRoomNum = (event) => {
    const re = /^[0-9\b]+$/; //rules
    if (event.target.value === "" || re.test(event.target.value)) {
      setRoomNumber(event.target.value);
    }
  };

  const handleDialogReservationClose = () => {
    setRoomNumber("");
    setDialogReservation(false);
  };

  const handleDialogReservationOpen = () => {
    setRoomNumber("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setErrorMessage(false);
    setDialogReservation(true);
  };

  // const drag = () => {
  //   let dragable = document.getElementById("eventItem");
  //   // console.log(dragable);
  //   new Draggable(dragable, {});
  // };

  const handleDialogReservationSave = async (roomno, startdate, enddate) => {
    try {
      setErrorMessage(false);
      if (firstName == null || firstName == "") {
        setErrorMessage(true);
        setErrorParameter("First Name is required");
      } else if (lastName == null || lastName == "") {
        setErrorMessage(true);
        setErrorParameter("Last Name is required");
      } else if (phone == null || phone == "") {
        setErrorMessage(true);
        setErrorParameter("Phone Number is required");
      } else if (email == null || email == "") {
        setErrorMessage(true);
        setErrorParameter("email is required");
      } else if (roomno == null || roomno == "") {
        setErrorMessage(true);
        setErrorParameter("Room Number is required");
      } else {
        const postdate = await postReservationRoom(
          sessionStorage.getItem("auth"),
          {
            roomno: roomno,
            startdate: startdate,
            enddate: enddate,
            description: "ROOM" + roomno,
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            email: email,
          }
        );

        if (postdate.status == "1000") {
          setErrorMessage(true);
          setErrorParameter(postdate.msg);
        } else if (postdate.status == "2000") {
          setRoomNumber("");
          setFirstName("");
          setLastName("");
          setPhone("");
          setEmail("");
          reservationRoom();
          setDialogReservation(false);
        }
      }

      const data = await getReservationRoom(sessionStorage.getItem("auth"));
      // console.log("data", data);
      let datedata = [];
      data.content[data.content.length - 1].forEach((element) =>
        datedata.push({
          id: element.roomno,
          title: element.description,
          start: element.startdate,
          end: element.enddate,
        })
      );
      setDataDate(datedata);

      // console.log("postdate", postdate);
      setDialogReservation(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        marginTop: 10,
        backgroundColor: themeState.background,
        color: themeState.color,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
        style={{
          backgroundColor: themeState.background,
          color: themeState.color,
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box borderBottom={5} borderColor="#2D62ED" borderRadius={10}>
            <Paper
              style={{
                minHeight: 50,
                backgroundColor: themeState.paper,
                color: themeState.color,
              }}
              elevation={3}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ padding: 10 }}
              >
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Room Reservation
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDialogReservationOpen}
                >
                  New Reservation
                </Button>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Paper
            elevation={3}
            style={{
              width: "100%",
              minHeight: "100%",
              backgroundColor: themeState.paper,
              color: themeState.color,
            }}
          >
            <Container
              style={{
                backgroundColor: "#2D62ED",
                color: "#FFFFFF",
                borderRadius: "8px 8px 0 0",
              }}
            >
              <Typography variant="h6" color="initial" style={{ padding: 10 }}>
                Room Information
              </Typography>
            </Container>
            <Container>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ paddingTop: 20 }}
              >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  {dataEvent.map((option) => (
                    <Paper
                      id="eventItem"
                      variant="outlined"
                      style={{
                        borderColor: "#2D62ED",
                        padding: 10,
                        marginTop: 10,
                      }}
                    >
                      <Typography variant="subtitle" color="initial">
                        <li>ROOM{option.roomno}</li>
                      </Typography>
                    </Paper>
                  ))}
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          {/* ----------------------Calendar------------------ */}
          <Calendar dataDate={dataDate} />
          {/* ----------------------Calendar------------------ */}
        </Grid>
      </Grid>

      {/* ----------------------NEW RESERVATION------------------ */}
      <Dialog
        className={classes.root}
        fullWidth="true"
        maxWidth="sm"
        open={dialogReservation}
        onClose={handleDialogReservationClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{
            backgroundColor: themeState.paper,
            color: mainColor,
          }}
        >
          NEW RESERVATION
        </DialogTitle>

        <DialogContent style={headerTableStyle}>
          <Container maxWidth="xl" disableGutters>
            <Grid
              container
              spacing={2}
              style={{
                paddingTop: 10,
                // backgroundColor: "#DEDFE0",
                borderRadius: 6,
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" color="initial">
                  Customer Information
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  // autoFocus
                  label="First Name"
                  variant="outlined"
                  InputProps={{
                    style: headerTableStyle,
                  }}
                  fullWidth
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  // autoFocus
                  label="Last Name"
                  variant="outlined"
                  InputProps={{
                    style: headerTableStyle,
                  }}
                  fullWidth
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  // autoFocus
                  label="Phone Number"
                  variant="outlined"
                  InputProps={{
                    style: headerTableStyle,
                  }}
                  fullWidth
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  // autoFocus
                  label="Email"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: headerTableStyle,
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} style={{ paddingTop: 20 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" color="initial">
                  Date Information
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    // autoOk={true}
                    // disablePast={true}
                    label="Arrival - Date/Time"
                    inputVariant="outlined"
                    // format="dd/MM/yyyy"
                    InputProps={{
                      style: headerTableStyle,
                    }}
                    defaultValue={selectedDateStart}
                    onChange={handleDateStart}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    // autoOk={true}
                    // disablePast={true}
                    label="Departure - Date/Time"
                    inputVariant="outlined"
                    // format="dd/MM/yyyy"
                    InputProps={{
                      style: headerTableStyle,
                    }}
                    defaultValue={selectedDateEnd}
                    onChange={handleDateEnd}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ paddingTop: 20 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h6" color="initial">
                  Room Information
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  // autoFocus

                  id="outlined-basic"
                  label="Room Number"
                  variant="outlined"
                  // value={roomNumber}
                  type="number"
                  defaultValue={""}
                  InputProps={{
                    style: headerTableStyle,
                  }}
                  onChange={(e) => handleRoomNum(e)}
                  fullWidth
                />
              </Grid>
            </Grid>
            {errorMessage ? (
              <div
                style={{
                  background: "#ff0033",
                  textAlign: "center",
                  color: "white",
                  height: "30px",
                  marginTop: 5,
                  paddingTop: 5,
                }}
              >
                {errorParameter}
              </div>
            ) : null}
          </Container>
        </DialogContent>
        <DialogActions
          style={{
            backgroundColor: themeState.paper,
            color: themeState.color,
            padding: 20,
          }}
        >
          <Button
            onClick={handleDialogReservationClose}
            variant="text"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleDialogReservationSave(
                roomNumber,
                selectedDateStart,
                selectedDateEnd
              )
            }
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* -------------------------------------- */}
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationPage);
