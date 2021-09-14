import React, { Fragment } from "react";
import { connect } from "react-redux";
import Calendar from "../components/Calendar";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import { TextField } from "@material-ui/core";
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

const dataEvent = [
  { id: 1, title: "ROOM8050", start: "2021-09-15", end: "2021-09-17" },
  { id: 2, title: "ROOM8050", start: "2021-09-20", end: "2021-09-25" },
];

export const ReservationPage = (props) => {
  // var dateData = [];
  const [dialogReservation, setDialogReservation] = React.useState(false);
  const [selectedDateStart, setSelectedDateStart] = React.useState(
    new Date("2021-09-13T21:11:54")
  );
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(
    new Date("2021-09-13T21:11:54")
  );
  const [roomNum, setRoomNum] = React.useState("0000");
  const [dataDate, setDataDate] = React.useState([]);

  const handleDateStart = (date) => {
    let dateNoTiome = date.toISOString();
    let T = dateNoTiome.split("T");
    setSelectedDateStart(T[0]);
    console.log("dateNoTiome", T);
  };
  const handleDateEnd = (date) => {
    let dateNoTiome = date.toISOString();
    let T = dateNoTiome.split("T");
    setSelectedDateEnd(T[0]);
    console.log("dateNoTiome", T);
  };
  const handleRoomNum = (event) => {
    setRoomNum(event.target.value);
    console.log(event.target.value);
  };

  const handleDialogReservationClose = () => {
    setDialogReservation(false);
  };

  const handleDialogReservationOpen = () => {
    setDialogReservation(true);
  };

  const handleDialogReservationSave = () => {
    // var dateData = [];
    // dateData.push({
    //   id: roomNum,
    //   title: "ROOM" + roomNum,
    //   start: selectedDateStart,
    //   end: selectedDateEnd,
    // });
    // console.log("dateData", dateData);
    setDataDate((prevState) => [
      ...prevState,
      {
        id: roomNum,
        title: "ROOM" + roomNum,
        start: selectedDateStart,
        end: selectedDateEnd,
      },
    ]);
    // console.log("dateData", dataDate);
    setDialogReservation(false);
  };
  const handleprop = () => {
    console.log("dateData", dataDate);
  };

  return (
    <Container maxWidth="xl" style={{ marginTop: 100 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box borderBottom={5} borderColor="#2D62ED" borderRadius={10}>
            <Paper
              style={{
                minHeight: 50,
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
                <Button
                  onClick={handleprop}
                  variant="contained"
                  color="default"
                >
                  Try
                </Button>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Paper elevation={3} style={{ width: "100%", minHeight: "100%" }}>
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
                  <Paper
                    variant="outlined"
                    style={{
                      borderColor: "#2D62ED",
                      padding: 10,
                    }}
                  >
                    <Typography variant="subtitle" color="initial">
                      Task Room N
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
          {/* ----------------------Calendar------------------ */}
          <Calendar dataEventmain={dataDate} />
          {/* ----------------------Calendar------------------ */}
        </Grid>
      </Grid>

      {/* ----------------------NEW RESERVATION------------------ */}
      <Dialog
        fullWidth="true"
        maxWidth="sm"
        open={dialogReservation}
        onClose={handleDialogReservationClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
          NEW RESERVATION
        </DialogTitle>

        <DialogContent>
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
                  fullWidth
                  onChange={""}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  // autoFocus
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  onChange={""}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  // autoFocus
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  onChange={""}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  // autoFocus
                  label="Email"
                  variant="outlined"
                  fullWidth
                  onChange={""}
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
                    value={selectedDateStart}
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
                    value={selectedDateEnd}
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
                  defaultValue={""}
                  onChange={(e) => handleRoomNum(e)}
                  fullWidth
                />
              </Grid>
              {/* <DateRangePicker
                renderInput={(startProps, endProps) => (
                  <Grid container>
                    <TextField {...startProps} /> to <TextField {...endProps} />
                  </Grid>
                )}
              /> */}
              {/* DateRangePicker available in v4 alpha, not v3 */}
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <Button
            onClick={handleDialogReservationClose}
            variant="text"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDialogReservationSave()}
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
