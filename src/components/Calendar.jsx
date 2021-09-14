import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateRangePicker,
} from "@material-ui/pickers";
// const dataEvent = [
//   { id: 1, title: "ROOM8050", start: "2021-09-15T21:11:54", end: "2021-09-17T21:11:54" },
//   { id: 2, title: "ROOM8050", start: "2021-09-20", end: "2021-09-25" },
// ];

const Calendar = (props) => {
  // React.useEffect(() => {
  //   console.log("Calendar",props.dataEventmain);
  // });
  const [dialogReservationEdit, setDialogReservationEdit] =
    React.useState(false);
  const [selectedDateStartEdit, setSelectedDateStartEdit] = React.useState(
    new Date("2021-09-13T21:11:54")
  );
  const [selectedDateEndEdit, setSelectedDateEndEdit] = React.useState(
    new Date("2021-09-13T21:11:54")
  );
  const [roomNum, setRoomNum] = React.useState("0000");
  const [dataDate, setDataDate] = React.useState([]);

  const handleDateStartEdit = (date) => {
    // let dateNoTiome = date.toISOString();
    // let T = dateNoTiome.split("T");
    // setSelectedDateStartEdit(T[0]);
    // console.log("dateNoTiome", T);
  };
  const handleDateEndEdit = (date) => {
    // let dateNoTiome = date.toISOString();
    // let T = dateNoTiome.split("T");
    // setSelectedDateEndEdit(T[0]);
    // console.log("dateNoTiome", T);
  };
  const handleRoomNum = (event) => {
    setRoomNum(event.target.value);
    console.log(event.target.value);
  };

  const handleDialogReservationClose = () => {
    setDialogReservationEdit(false);
  };

  const handleDialogReservationOpen = () => {
    setDialogReservationEdit(true);
  };

  const handleDialogReservationSave = () => {
    // setDataDate((prevState) => [
    //   ...prevState,
    //   {
    //     id: roomNum,
    //     title: "ROOM" + roomNum,
    //     start: selectedDateStartEdit,
    //     end: selectedDateEndEdit,
    //   },
    // ]);
    // console.log("dateData", dataDate);
    setDialogReservationEdit(false);
  };
  const handleprop = (data) => {
    console.log(props.dataEventmain);
  };

  const handleClick = (data) => {
    //endStr  startStr  ROOM0000  0000
    console.log("handleClick", data.event);
    setSelectedDateStartEdit(data.event.startStr);
    setSelectedDateEndEdit(data.event.endStr);
    setRoomNum(data.event.id);
    setDialogReservationEdit(true);
  };
  const printdatachange = (data) => {
    console.log("printdatachange", data);
  };
  const printdatadrop = (data) => {
    console.log("printdatadrop", data);
  };
  const printdataselect = (data) => {
    console.log("printdataselect", data);
  };
  const [datadate, setDatadate] = React.useState([
    { title: "ROOM8067", start: "2021-09-15", end: "2021-09-17" },
  ]);

  return (
    <Container maxWidth="xl" disableGutters>
      <Paper elevation={3} style={{ padding: 40 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          weekends={true}
          events={props.dataEventmain}
          droppable={true}
          draggable={true}
          startEditable={true}
          // ------------------
          select={printdataselect}
          drop={printdatadrop}
          eventChange={printdatachange}
          eventClick={handleClick}
        />
        <Button onClick={handleprop} variant="contained" color="default">
          Try
        </Button>
      </Paper>
      {/* ----------------------EDTI RESERVATION------------------ */}
      <Dialog
        fullWidth="true"
        maxWidth="sm"
        open={dialogReservationEdit}
        onClose={handleDialogReservationClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
          EDIT RESERVATION INFORMATION
        </DialogTitle>

        <DialogContent>
          <Container maxWidth="xl" disableGutters>
            {/* <Grid
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
            </Grid> */}

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
                    value={selectedDateStartEdit}
                    onChange={handleDateStartEdit}
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
                    // value={selectedDateEndEdit}
                    onChange={handleDateEndEdit}
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
                  value={roomNum}
                  defaultValue={""}
                  onChange={(e) => handleRoomNum(e)}
                  fullWidth
                />
              </Grid>
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

export default Calendar;
