import React from "react";
import { useSelector } from "react-redux";
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
import DialogTitle from "@material-ui/core/DialogTitle";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import DialogContentText from "@material-ui/core/DialogContentText";

import {
  getReservationRoom,
  // postReservationRoom,
  // getReservationRoomByID,
  updateReservationRoom,
  deleteReservationRoom,
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
    const data = await getReservationRoom(sessionStorage.getItem("auth"));
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
    const deletedate = await deleteReservationRoom(
      sessionStorage.getItem("auth"),
      roomno
    );
    console.log("deletedate", deletedate);

    const data = await getReservationRoom(sessionStorage.getItem("auth"));
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
    const updatedata = await updateReservationRoom(
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
    const data = await getReservationRoom(sessionStorage.getItem("auth"));
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
    const updatedata = await updateReservationRoom(
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
    const data = await getReservationRoom(sessionStorage.getItem("auth"));
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

  const printDropData = (data) => {
    console.log("printDropData", data);
  };
  const printSelectData = (data) => {
    console.log("printSelectData", data);
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
          select={printSelectData}
          drop={printDropData}
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
        className={classes.root}
        style={{
          backgroundColor: themeState.paper,
          color: mainColor,
        }}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{
            backgroundColor: themeState.paper,
            color: mainColor,
          }}
        >
          EDIT RESERVATION INFORMATION
        </DialogTitle>

        <DialogContent style={headerTableStyle}>
          <Container maxWidth="xl" disableGutters>
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
                    InputProps={{
                      style: headerTableStyle,
                    }}
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
                    InputProps={{
                      style: headerTableStyle,
                    }}
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
                  InputProps={{
                    style: headerTableStyle,
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions
          style={{
            backgroundColor: themeState.paper,
            color: themeState.color,
            padding: 20,
          }}
        >
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
        className={classes.root}
        fullWidth="true"
        maxWidth="sm"
        open={dialogReservationChange}
        onClose={handleDialogReservationChangeClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{
            backgroundColor: themeState.paper,
            color: mainColor,
          }}
        >
          CONFIRM CHANGE RESERVATION INFORMATION
        </DialogTitle>

        <DialogContent style={headerTableStyle}>
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
                  InputProps={{
                    style: headerTableStyle,
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  disabled
                  label="End date"
                  variant="outlined"
                  value={oldDate.end}
                  fullWidth
                  InputProps={{
                    style: headerTableStyle,
                  }}
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
                  InputProps={{
                    style: headerTableStyle,
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  disabled
                  label="End date"
                  variant="outlined"
                  value={newDate.end}
                  fullWidth
                  InputProps={{
                    style: headerTableStyle,
                  }}
                />
              </Grid>
            </Grid>
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
