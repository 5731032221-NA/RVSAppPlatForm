import React, { useState } from "react";
import { connect, ReactReduxContext, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { blue, green, yellow } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import DateFnsUtils from "@date-io/date-fns";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
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

const optionTitle = [
  {
    value: "1",
    label: "Mr.",
  },
  {
    value: "2",
    label: "Mrs.",
  },
  {
    value: "3",
    label: "Ms.",
  },
];
const optionDocumentType = [
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
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  }
];

export const TestDnD = (props) => {
  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });
  const themeBackground = useSelector((state) => state.reducer.themeBackground);

  const [optionCity,setOptionCity] = React.useState([
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
  ]) 
  React.useEffect(() => {
    if (themeBackground === "#FFFFFF") {
      setThemeState({
        background: "#FFFFFF",
        color: "#666666",
        paper: "#FFFFFF",
        colorlevel: "A400"
        // matStyle: this.classes.normalmode
      });
    } else {
      setThemeState({
        background: "#212121",
        color: "#FAFAFA",
        paper: "#424242",
        colorlevel: "600",
        holderColor: "A9A9AC"
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

  const [demoData, setDemoData] = useState([
    {
      id: "1",
      title: "Personal",
      expend: true,
      content: [
        {
          id: 0,
          label: "Title",
          xl: 1,
          md: 1,
          xs: 2,
          select: {
            status: "option",
            data: optionTitle.map((option) => (
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
          id: 1,
          label: "First Name",
          xl: 5,
          md: 5,
          xs: 10,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 2,
          label: "Last Name",
          xl: 5,
          md: 5,
          xs: 10,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 3,
          label: "Gender",
          xl: 1,
          md: 1,
          xs: 2,
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
          label: "Choose a Document Type*",
          xl: 2,
          md: 2,
          xs: 4,
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
          id: 5,
          label: "ID Number*",
          xl: 2,
          md: 2,
          xs: 4,
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
          label: "Nationality*",
          xl: 2,
          md: 2,
          xs: 4,
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
          id: 7,
          label: "Issue Date",
          xl: 2,
          md: 2,
          xs: 4,
          select: {
            status: "datetime",
            data: "",
          },
          handle: " ",
        },
        {
          id: 8,
          label: "Expiry Date",
          xl: 2,
          md: 2,
          xs: 4,
          select: {
            status: "datetime",
            data: "",
          },
          handle: " ",
        },
        {
          id: 9,
          label: "Date of Birth",
          xl: 2,
          md: 2,
          xs: 4,
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
      expend: true,
      content: [
        {
          id: 1,
          label: "Email",
          xl: 4,
          md: 4,
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
          md: 4,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },,
        {
          id: 3,
          label: "Phone Number",
          xl: 4,
          md: 4,
          xs: 12,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        }
      ],
    },
    {
      id: "3",
      title: "Address",
      expend: true,
      content: [
        {
          id: 1,
          label: "Choose a Document Type",
          xl: 2,
          md: 2,
          xs: 4,
          select: {
            status: "option",
            data: optionDocumentType.map((option) => (
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
          md: 2,
          xs: 4,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 4,
          label: "Choose a country",
          xl: 2,
          md: 2,
          xs: 4,
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
          id: 5,
          label: "City",
          xl: 2,
          md: 2,
          xs: 4,
          select: {
            status: "option",
            data: optionCity.map((option) => (
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
          label: "State",
          xl: 2,
          md: 2,
          xs: 4,
          select: {
            status: "fill",
            data: "",
          },
          handle: (e) => handleData(e),
        },
        {
          id: 7,
          label: "Postal",
          xl: 2,
          md: 2,
          xs: 4,
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
      expend: true,
      content: [
        // {
        //   id: 1,
        //   label: (
        //     <Grid container alignItems="center">
        //       <PublicRoundedIcon style={{ marginRight: 10 }} />
        //       Web site
        //     </Grid>
        //   ),
        //   xl: 4,
        //   md: 6,
        //   xs: 12,
        //   select: {
        //     status: "fill",
        //     data: "",
        //   },
        //   handle: (e) => handleData(e),
        // },
        {
          id: 1,
          label: (
            <Grid container alignItems="center">
              <AlternateEmailIcon style={{ marginRight: 10 ,color: 'green'}} />
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
              <WhatsAppIcon style={{ marginRight: 10 ,color: 'green'}} />
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
              <FacebookIcon style={{ marginRight: 10 ,color: 'blue'}} />
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
              <InstagramIcon style={{ marginRight: 10 ,color: 'orange'}} />
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
              <TwitterIcon style={{ marginRight: 10 ,color: '#1DA1F2'}} />
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
  ]
  );
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
  const handleExpend = (id,expend) => {
    let index = demoData.findIndex(x=> x.id === id);
    console.log(Object.assign({}, demoData[index], {expend: !expend}))
    if (index === -1) return;
    else{
     let new_data = demoData[index];
     new_data.expend = !expend;
      setDemoData([
        ...demoData.slice(0,index),
        new_data,
        ...demoData.slice(index+1)
      ]);
    }
  };

  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId="01">
        {(provided, snapshot) => (
          <Paper
            elevation={3}
            style={{
              marginTop: 50,
              color: themeState.color,
              backgroundColor: themeState.paper,
            }}
          >
            <Container maxWidth="xl" disableGutters ref={provided.innerRef}>
              {list.map((item, index) => (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Grid
                      container
                      xl={12}
                      md={12}
                      xs={12}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Grid
                        style={{
                          minHeight: 100,
                          padding: 20,
                          minWidth: "100%",
                        }}
                      >
                        <Accordion expanded={item.expend} onClick={()=>handleExpend(item.id,item.expend)}>
                          <AccordionSummary 
                          // expandIcon={<ArrowDropDownIcon style={{color:'blue'}} />}
                          >
                            <div style={{color:'blue'}}>{item.title}&nbsp;</div> {item.expend ? <ArrowDropDownIcon style={{color:'blue'}} /> : <ArrowDropUpIcon style={{color:'blue'}} />}
                          </AccordionSummary>
                          {/* <Typography
                          variant="subtitle1"
                          color="initial"
                          style={{ paddingBottom: 10 }}
                        >
                          {item.title}
                        </Typography> */}
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
                                  ) : (
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
                                  )}
                                </Grid>
                              ))}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>

                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Container>
          </Paper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestDnD);
