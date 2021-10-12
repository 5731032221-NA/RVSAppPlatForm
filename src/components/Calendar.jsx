import React, { useState, useContext } from "react";
import { ReactReduxContext, useSelector } from "react-redux";
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

import {
  getreservationroom,
  postreservationroom,
  getreservationroombyid,
  updatereservationroom,
  deletereservationroom,
} from "../services/reservationRoom.service";

const Calendar = (props) => {
  const [dialogReservationEdit, setDialogReservationEdit] =
    React.useState(false);
  const [dialogReservationChange, setDialogReservationChange] =
    React.useState(false);
  const [selectedDateStartEdit, setSelectedDateStartEdit] = React.useState(
    new Date("2021-09-13T21:11:54")
  );
  const [selectedDateEndEdit, setSelectedDateEndEdit] = React.useState(
    new Date("2021-09-13T21:11:54")
  );
  const [roomNum, setRoomNum] = React.useState("0000");
  const [dataDate, setDataDate] = React.useState(props.dataDate);
  const [oldDate, setOldDate] = React.useState({
    id: "0000",
    title: "oldDescription",
    start: "start",
    end: "end",
  });
  const [newDate, setNewDate] = React.useState({
    id: "0000",
    title: "newDescription",
    start: "start",
    end: "end",
  });

  React.useEffect(() => {
    setDataDate(props.dataDate);
  }, [props.dataDate]);

  const handleDateStartEdit = (date) => {
    let dateNoTiome = date.toISOString();
    let T = dateNoTiome.split("T");
    setSelectedDateStartEdit(T[0]);
    console.log("dateNoTiome", T);
  };
  const handleDateEndEdit = (date) => {
    let dateNoTiome = date.toISOString();
    let T = dateNoTiome.split("T");
    setSelectedDateEndEdit(T[0]);
    console.log("dateNoTiome", T);
  };
  const handleRoomNum = (event) => {
    setRoomNum(event.target.value);
    console.log(event.target.value);
  };

  const handleDialogReservationClose = () => {
    setDialogReservationEdit(false);
  };

  const handleDialogReservationChangeClose = async () => {
    const data = await getreservationroom(sessionStorage.getItem("auth"));
    console.log("data", data);
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
    setDialogReservationChange(false);
  };

  const handleDialogReservationDelete = async (roomno) => {
    const deletedate = await deletereservationroom(
      sessionStorage.getItem("auth"),
      roomno
    );
    console.log("deletedate", deletedate);

    const data = await getreservationroom(sessionStorage.getItem("auth"));
    console.log("data", data);
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

    setDialogReservationEdit(false);
  };

  const handleDialogReservationSave = async () => {
    const roomno = roomNum;
    const updatedata = await updatereservationroom(
      sessionStorage.getItem("auth"),
      roomno,
      {
        id: roomno,
        title: "ROOM" + roomno,
        start: selectedDateStartEdit,
        end: selectedDateEndEdit,
      }
    );
    console.log("updatedata", updatedata);
    const data = await getreservationroom(sessionStorage.getItem("auth"));
    console.log("data", data);
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

    setDialogReservationEdit(false);
  };

  const handleClick = (data) => {
    //endStr  startStr  ROOM0000  0000
    console.log("handleClick", data.event);
    setSelectedDateStartEdit(data.event.startStr);
    setSelectedDateEndEdit(data.event.endStr);
    setRoomNum(data.event.id);
    setDialogReservationEdit(true);
  };
  const handleChangeDnD = (data) => {
    console.log("printdatachange", data);
    setOldDate({
      id: data.oldEvent.id,
      title: data.oldEvent.title,
      start: data.oldEvent.startStr,
      end: data.oldEvent.endStr,
    });
    setNewDate({
      id: data.event.id,
      title: data.event.title,
      start: data.event.startStr,
      end: data.event.endStr,
    });
    setDialogReservationChange(true);
  };

  const handleChangeDnDSave = async (newDate) => {
    // console.log("newDate", newDate);
    const roomno = newDate.id;
    const updatedata = await updatereservationroom(
      sessionStorage.getItem("auth"),
      roomno,
      {
        id: newDate.id,
        title: newDate.title,
        start: newDate.start,
        end: newDate.end,
      }
    );
    console.log("updatedata", updatedata);
    const data = await getreservationroom(sessionStorage.getItem("auth"));
    console.log("data", data);
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

    setDialogReservationChange(false);
  };

  const printdatadrop = (data) => {
    console.log("printdatadrop", data);
  };
  const printdataselect = (data) => {
    console.log("printdataselect", data);
  };

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

  return (
    <Container maxWidth="xl" disableGutters>
      <Paper
        elevation={3}
        style={{
          padding: 40,
          backgroundColor: themeState.paper,
          color: themeState.color,
        }}
      >
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
          events={dataDate}
          droppable={true}
          draggable={true}
          startEditable={true}
          // ------------------
          select={printdataselect}
          drop={printdatadrop}
          eventChange={handleChangeDnD}
          eventClick={handleClick}
          rerenderDelay
        />
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
                    value={selectedDateEndEdit}
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
                  disabled
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
          <Grid container style={{ flexGrow: 1 }}>
            <Button
              onClick={() => handleDialogReservationDelete(roomNum)}
              variant="text"
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </Button>
          </Grid>
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

      {/* ----------------------Handle drang and drop change------------------ */}
      <Dialog
        fullWidth="true"
        maxWidth="sm"
        open={dialogReservationChange}
        onClose={handleDialogReservationChangeClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
          CONFIRM CHANGE RESERVATION INFORMATION
        </DialogTitle>

        <DialogContent>
          <Container maxWidth="xl" disableGutters>
            <Grid container spacing={2} style={{ paddingTop: 20 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h5" color="initial">
                  Current information
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  disabled
                  label="Start date"
                  variant="outlined"
                  value={oldDate.start}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  disabled
                  label="End date"
                  variant="outlined"
                  value={oldDate.end}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ paddingTop: 20 }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="h5" color="primary">
                  New information
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  disabled
                  label="Start date"
                  variant="outlined"
                  value={newDate.start}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  disabled
                  label="End date"
                  variant="outlined"
                  value={newDate.end}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <Button
            onClick={handleDialogReservationChangeClose}
            variant="text"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleChangeDnDSave(newDate)}
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
