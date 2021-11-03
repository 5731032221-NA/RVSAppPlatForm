import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { connect, ReactReduxContext, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { blue, green, yellow } from "@material-ui/core/colors";
import TestDnD from "../components/TestDnD";
import ProfileTable from "../components/ProfileTable";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { nextComponent } from "../middleware/action";
import { Breadcrumbs, Link } from "@material-ui/core";

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
import MaterialTable from "material-table";
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
  defaultTheme: (themeState) => ({
    backgroundColor: themeState.paper,
    color: themeState.color,
  }),
}));

function createData(room, arrival, departure, night, rate, status) {
  return {
    room,
    arrival,
    departure,
    night,
    rate,
    status,
  };
}

const rows = [
  createData("B1014", "12/05/2021", "15/05/2021", "3", "1,500.00", "Check-Out"),
  createData("B1016", "12/08/2021", "15/08/2021", "3", "1,500.00", "Check-In"),
];

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
const optiondata2 = [
  {
    value: "10",
    label: "Option10",
  },
  {
    value: "20",
    label: "Option20",
  },
  {
    value: "30",
    label: "Option30",
  },
  {
    value: "40",
    label: "Option40",
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

  const [demoData, setDemoData] = React.useState([
    {
      id: "1",
      title: "Personal Information",
      content: [
        {
          id: 1,
          label: "Title",
          xl: 2,
          md: 2,
          xs: 12,
          select: {
            status: "option",
            data: optiondata2.map((option) => (
              <option
                style={headerTableStyle}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) => handleData(e),
        },
        {
          id: 2,
          label: "First Name",
          xl: 4,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 3,
          label: "Last Name",
          xl: 4,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 4,
          label: "Gender",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "option",
            data: optiondata2.map((option) => (
              <option
                style={headerTableStyle}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) => handleData(e),
        },
        {
          id: 5,
          label: "Choose a Document Type*",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "option",
            data: optiondata.map((option) => (
              <option
                style={headerTableStyle}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) => handleData(e),
        },
        {
          id: 6,
          label: "ID Number*",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 7,
          label: "Nationality*",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 8,
          label: "Issue Date",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "datetime",
            data: "",
          },
          handle: " ",
        },
        {
          id: 9,
          label: "Expiry Date",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "datetime",
            data: "",
          },
          handle: " ",
        },
        {
          id: 10,
          label: "Date of Birth",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "datetime",
            data: "",
          },
          handle: " ",
        },
      ],
    },
    {
      id: "2",
      title: "Comunication",
      content: [
        {
          id: 1,
          label: "Email",
          xl: 4,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 2,
          label: "Mobile Number",
          xl: 4,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 3,
          label: "Phone Number",
          xl: 4,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
      ],
    },
    {
      id: "3",
      title: "Address",
      content: [
        {
          id: 1,
          label: "Choose a Document Type*",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "option",
            data: optiondata.map((option) => (
              <option
                style={headerTableStyle}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) => handleData(e),
        },
        {
          id: 2,
          label: "Address",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },

        {
          id: 3,
          label: "Country",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "option",
            data: optiondata2.map((option) => (
              <option
                style={headerTableStyle}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )),
          },
          handle: (e) => handleData(e),
        },
        {
          id: 4,
          label: "City",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
        },
        {
          id: 5,
          label: "State",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 6,
          label: "Postal",
          xl: 2,
          md: 6,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
      ],
    },
    {
      id: "4",
      title: "Social",
      content: [
        {
          id: 1,
          label: (
            <Grid container alignItems="center">
              <AlternateEmailIcon style={{ marginRight: 10, color: "green" }} />
              Line
            </Grid>
          ),
          xl: 2,
          md: 2,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 2,
          label: (
            <Grid container alignItems="center">
              <WhatsAppIcon style={{ marginRight: 10, color: "green" }} />
              WhatsApp
            </Grid>
          ),
          xl: 2,
          md: 2,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 3,
          label: (
            <Grid container alignItems="center">
              <FacebookIcon style={{ marginRight: 10, color: "blue" }} />
              Facebook
            </Grid>
          ),
          xl: 2,
          md: 2,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 4,
          label: (
            <Grid container alignItems="center">
              <InstagramIcon style={{ marginRight: 10, color: "orange" }} />
              Instagram
            </Grid>
          ),
          xl: 2,
          md: 2,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 5,
          label: (
            <Grid container alignItems="center">
              <TwitterIcon style={{ marginRight: 10, color: "#1DA1F2" }} />
              Twitter
            </Grid>
          ),
          xl: 2,
          md: 2,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
      ],
    },
    {
      id: "5",
      title: "Note",
      content: [
        {
          id: 1,
          label: "Note",
          xl: 4,
          md: 6,
          xs: 12,
          select: {
            status: "note",
            data: "",
          },
          handle: (e) => handleData(e),
        },
      ],
    },
    {
      id: "6",
      title: "Booking History",
      content: [
        {
          id: 1,
          label: "booking data list here !!!",
          xl: 12,
          md: 12,
          xs: 12,
          select: {
            status: "list",
            data: "",
          },
          handle: (e) => handleData(e),
        },
      ],
    },
  ]);

  const [list, setList] = React.useState(demoData);
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setList(reorder(list, result.source.index, result.destination.index));
    console.log(result);
  };
  const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      background: "lightblue",
    }),
  });

  const handleData = (e) => {
    console.log("Value from handleData : ", e.target.value);
  };

  const handleComponentState = async (comp) => {
    console.log("setcomp", comp);
    props.nextComponent(comp);
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        paddingTop: 20,
        color: themeState.color,
        marginTop: 15,
        backgroundColor: themeState.background,
      }}
    >
      <Grid item style={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 3, md: 3 }}
          columns={{ xs: 2, sm: 2, md: 2 }}
        >
          <Grid item xs={6} sm={10} md={10}>
            <Typography
              variant="h6"
              style={{ marginBottom: 15, fontSize: 26, color: mainColor }}
            >
              Profile Individual
            </Typography>
          </Grid>

          <Grid item xs={6} sm={2} md={2} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "blue", color: "white" }}
              startIcon={<SaveOutlinedIcon />}
              onClick={() => handleComponentState("ProfileIndivisual")}
            >
              Save
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "red", color: "white", marginLeft: 15 }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <DragDropContext onDragEnd={onEnd}>
        <Droppable droppableId="01">
          {(provided, snapshot) => (
            <Paper
              elevation={3}
              style={{
                padding: 20,
                color: themeState.color,
                backgroundColor: themeState.paper,
              }}
            >
              <Divider
                style={{ marginTop: 10, backgroundColor: themeState.color }}
              />
              <Container
                maxWidth="xl"
                disableGutters
                style={{ marginTop: 10, backgroundColor: themeState.paper }}
                ref={provided.innerRef}
              >
                {list.map((item, index) => (
                  <Draggable draggableId={item.id} key={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Accordion
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        className={classes.defaultTheme}
                      >
                        <AccordionSummary
                          style={{ color: mainColor, fontSize: 18 }}
                          expandIcon={
                            <ArrowDropDownIcon
                              style={{ color: mainColor, fontSize: 30 }}
                            />
                          }
                        >
                          {item.title}
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            {item.content.map((detail, index) => (
                              <Grid
                                item
                                key={detail.id}
                                index={index}
                                xl={detail.xl}
                                md={detail.md}
                                xs={detail.xs}
                              >
                                {detail.select.status === "fill" ? (
                                  <TextField
                                    className={classes.root}
                                    label={detail.label}
                                    variant="outlined"
                                    InputProps={{
                                      style: headerTableStyle,
                                    }}
                                    fullWidth
                                    onChange={detail.handle}
                                  />
                                ) : detail.select.status === "option" ? (
                                  <TextField
                                    className={classes.root}
                                    label={detail.label}
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
                                    onChange={detail.handle}
                                  >
                                    {detail.select.data}
                                  </TextField>
                                ) : detail.select.status === "datetime" ? (
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      className={classes.root}
                                      label={detail.label}
                                      inputVariant="outlined"
                                      InputProps={{
                                        style: headerTableStyle,
                                      }}
                                      // format="dd/MM/yyyy"
                                      // value={selectedDateStartEdit}
                                      // onChange={handleDateStartEdit}
                                      onChange={detail.handle}
                                      fullWidth
                                    />
                                  </MuiPickersUtilsProvider>
                                ) : detail.select.status === "note" ? (
                                  <TextField
                                    className={classes.root}
                                    // label={detail.label}
                                    variant="outlined"
                                    InputProps={{
                                      style: headerTableStyle,
                                    }}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    onChange={detail.handle}
                                  />
                                ) : (
                                  <MaterialTable
                                    elevation={0}
                                    style={{
                                      paddingLeft: 30,
                                      paddingRight: 30,
                                      color: themeState.color,
                                      backgroundColor: themeState.paper,
                                    }}
                                    columns={[
                                      {
                                        title: "Room",
                                        field: "room",
                                        headerStyle: headerTableStyle,
                                      },
                                      {
                                        title: "Arrival",
                                        field: "arrival",
                                        headerStyle: headerTableStyle,
                                      },
                                      {
                                        title: "Departure",
                                        field: "departure",
                                        headerStyle: headerTableStyle,
                                      },

                                      {
                                        title: "Night",
                                        field: "night",
                                        headerStyle: headerTableStyle,
                                      },

                                      {
                                        title: "Rate",
                                        field: "rate",
                                        headerStyle: headerTableStyle,
                                      },

                                      {
                                        render: (rowData) => {
                                          return rowData.status ===
                                            "Check-Out" ? (
                                            <Button
                                              variant="contained"
                                              style={{
                                                borderRadius: 20,
                                                backgroundColor: "red",
                                                color: "white",
                                              }}
                                            >
                                              {rowData.status}
                                            </Button>
                                          ) : (
                                            <Button
                                              variant="contained"
                                              style={{
                                                borderRadius: 20,
                                                backgroundColor: mainColor,
                                                color: "white",
                                              }}
                                            >
                                              {rowData.status}
                                            </Button>
                                          );
                                        },
                                        cellStyle: { textAlign: "center" },
                                        headerStyle: {
                                          textAlign: "center",
                                          paddingLeft: 37,
                                          backgroundColor: themeState.paper,
                                          color: themeState.color,
                                        },
                                        title: "Status",
                                        field: "status",
                                      },
                                    ]}
                                    data={rows}
                                    options={{
                                      // searchFieldAlignment: "left",
                                      showTitle: false,
                                      search: false,
                                      actionsColumnIndex: -1,
                                      pageSizeOptions: [
                                        5,
                                        10,
                                        20,
                                        { value: rows.length, label: "All" },
                                      ],
                                      headerStyle: headerTableStyle,
                                    }}
                                  />
                                )}
                              </Grid>
                            ))}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Container>
            </Paper>
          )}
        </Droppable>
      </DragDropContext>
      {/* <TestDnD /> */}
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

// {
//   <Accordion>
//     <AccordionSummary expandIcon={<ExpandMore />}>
//       Booking History
//     </AccordionSummary>
//     <AccordionDetails>
//       <Divider style={{ marginTop: 10, backgroundColor: themeState.color }} />
//       <Typography
//         variant="subtitle1"
//         color="initial"
//         style={{ paddingBottom: 10, paddingTop: 10 }}
//       >
//         booking data list here !!!
//       </Typography>
//     </AccordionDetails>
//   </Accordion>;
// }
