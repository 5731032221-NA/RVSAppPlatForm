import React from "react";
import { connect, ReactReduxContext, useSelector } from "react-redux";
import { nextComponent } from "../../middleware/action";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { blue, green, yellow } from "@material-ui/core/colors";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import ProfileIndividual from "./ProfileIndividual";
import TestDnD from "./TestDnD";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import ClearIcon from '@material-ui/icons/Clear';
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  getIndividualProfile,
  getIndividualProfileById,
  postIndividualProfile,
  updateIndividualProfile,
  deleteIndividualProfileById,
} from "../../services/individualprofile.service";

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

function createData(
  nameid,
  firstname,
  lastname,
  nameprefix,
  gender,
  idcardandpass,
  nationality,
  nextstay,
  laststay,
  score,
  status
) {
  return {
    nameid,
    firstname,
    lastname,
    nameprefix,
    gender,
    idcardandpass,
    nationality,
    nextstay,
    laststay,
    score,
    status,
  };
}

const rows = [
  createData(
    "Somchai",
    "Wongnut",
    "Mr.",
    "Male",
    "1100700222876",
    "Thai",
    "12/11/2021",
    "30/10/2020",
    "5",
    "Check-Out"
  ),
  createData(
    "Sommul",
    "Liu",
    "Ms.",
    "Female",
    "C00102188",
    "China",
    "22/11/2021",
    "10/12/2020",
    "2",
    "Check-In"
  ),
  // createData("YongAPI", " ", "Joy", "DOS", "A", 3),
  // createData("TH Chamber", " ", "Joy", "Secretary", "A", 4),
  // createData("MSC", "SIG/DTS", "P'Pui", "VP", "I-24/09/21", " "),
  // createData("MSC", "SIG/BIG", "P'Pui", "VP", "A", " "),
];

const family = [
  {
    fullname: "Joy,Chat",
    status: "sprouse",
  },
];

export const ProfileTable = (props) => {
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

  // const [individualData, setIndividualData] = React.useState(rows);
  const [action, setAction] = React.useState("");
  const [individualData, setIndividualData] = React.useState(null);
  const [statusprofile, setStatusprofile] = React.useState("none");
  const [dialogDelete, setDialogDelete] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState({
    nameid: "nameid",
    nameprefix: "nameprefix",
    firstname: "firstname",
    lastname: "lastname",
  });
  const [editData, setEditData] = React.useState(" ");

  const handleComponentState = async (comp) => {
    console.log("setcomp", comp);
    props.nextComponent(comp);
  };
  // const handleStatusProfile = () => {
  //   setStatusprofile();
  // };
  const handleNewData = async () => {
    await setAction("none");
    await setEditData(null);
    await setStatusprofile("add");
  };

  //save button on **add component
  const handleAddData = async () => {
    await setAction("add");
    await setEditData(null);
    // await setStatusprofile("moredata");
    await handleReloadTable();
  };

  //save button on **edit component
  const handleSaveEditData = async () => {
    await setAction("edit");
    await setEditData(null);
    // await setStatusprofile("moredata");
    await handleReloadTable();
  };

  const handleEditData = async (rowData) => {
    await setAction("none");
    var individualdata = await getIndividualProfileById(
      sessionStorage.getItem("auth"),
      rowData.nameid
    );
    // console.log("rowData", rowData);
    console.log("individualdata ==", individualdata.content[0]);
    setEditData(individualdata.content[0]);
    handleDeleteData(
      rowData.nameid,
      rowData.nameprefix,
      rowData.firstname,
      rowData.lastname
    );
    setStatusprofile("edit");
  };
  const handleDeleteData = async (nameid, nameprefix, firstname, lastname) => {
    console.log("data : ", nameid, nameprefix, firstname, lastname);
    setDeleteData({
      nameid: nameid,
      nameprefix: nameprefix,
      firstname: firstname,
      lastname: lastname,
    });
  };

  const handleConfirmDeleteData = async () => {
    console.log(deleteData.nameid);
    let id = deleteData.nameid;
    let datafordelete = await deleteIndividualProfileById(
      sessionStorage.getItem("auth"),
      id
    );
    console.log("deleteData return", datafordelete);
    handleReloadTable();
    setDialogDelete(false);
  };

  const handleDialogDeleteOpen = async (
    nameid,
    firstname,
    lastname,
    nameprefix
  ) => {
    await setDeleteData({
      nameid: nameid,
      nameprefix: nameprefix,
      firstname: firstname,
      lastname: lastname,
    });
    console.log(nameid, firstname, lastname, nameprefix);
    await setDialogDelete(true);
  };
  const handleDialogDeleteClose = () => {
    setDialogDelete(false);
  };

  const handleReloadTable = async () => {
    const data = await getIndividualProfile(sessionStorage.getItem("auth"));
    console.log("data", data);
    let _individualData = [];
    if (data.content.length != 0) {
      data.content[data.content.length - 1].forEach((element) =>
        _individualData.push(
          createData(
            element.nameid,
            element.firstname,
            element.lastname,
            element.nameprefix,
            element.gender,
            element.idnumber,
            element.nationality,
            // element.nextstay,
            "22/11/2021",
            // element.laststay,
            "10/12/2020",
            // element.score,
            "5",
            // element.status
            "Check-In"
          )
        )
      );
    }
    console.log("individualData", _individualData);
    await setIndividualData(_individualData);
    await setStatusprofile("moredata");
  };

  //initial data to table
  React.useEffect(() => {
    async function fetchData() {
      const data = await getIndividualProfile(sessionStorage.getItem("auth"));
      console.log("data", data);
      let _individualData = [];
      if (data.content.length !== 0) {
        data.content[data.content.length - 1].forEach((element) =>
          _individualData.push(
            createData(
              element.nameid,
              element.firstname,
              element.lastname,
              element.nameprefix,
              element.gender,
              element.idnumber,
              element.nationality,
              // element.nextstay,
              "22/11/2021",
              // element.laststay,
              "10/12/2020",
              // element.score,
              "5",
              // element.status
              "Check-In"
            )
          )
        );
        console.log("individualData", _individualData);
      }

      setIndividualData(_individualData);
    }
    fetchData();
    setStatusprofile("moredata");
  }, []);

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
      <Grid container style={{ paddingLeft: 30, paddingRight: 30 }}>
        {/* <Grid item xs={6} sm={10} md={10} style={{ flexGrow: 1 }}> */}
        <Grid item style={{ flexGrow: 1 }}>
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
              onClick={() => handleComponentState("Configuration")}
            >
              <Typography
                variant="h6"
                style={{ marginBottom: 15, fontSize: 20, color: mainColor }}
              >
                Profiles
              </Typography>
            </Link>
            <Link color="inherit" href="#" onClick={() => setStatusprofile("moredata")}>
              <Typography
                variant="h6"
                style={{
                  marginBottom: 15,
                  fontSize: 14,
                  color: themeState.color,
                }}
              >
                Individual
              </Typography>
            </Link>
          </Breadcrumbs>
        </Grid>
          {statusprofile === "add" || statusprofile === "edit" || statusprofile === "delete" ? (
          <Grid item xs={6} sm={2} md={2} style={{ paddingLeft: 450 ,textAlign: "right" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "red", color: "white" }}
              startIcon={<ClearIcon />}
              onClick={() => setStatusprofile("moredata")}
            >
              Cancel
            </Button>
          </Grid>
        ) : null}
        {/* </Grid> */}
        {statusprofile === "add" ? (
          <Grid item xs={6} sm={2} md={2} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: mainColor, color: "white" }}
              startIcon={<SaveOutlinedIcon />}
              onClick={() => handleAddData()}
            >
              Save
            </Button>
          </Grid>
        ) : statusprofile === "edit" ? (
          <Grid item xs={6} sm={2} md={2} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: mainColor, color: "white" }}
              startIcon={<SaveOutlinedIcon />}
              onClick={() => handleSaveEditData()}
            >
              Save
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "red", color: "white", marginLeft: 15 }}
              startIcon={<DeleteIcon />}
              onClick={() => setDialogDelete(true)}
            >
              Delete
            </Button>
          </Grid>
        ) : statusprofile === "moredata" ? (
          <Grid item xs={6} sm={2} md={2} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: mainColor, color: "white" }}
              startIcon={<AddRoundedIcon />}
              onClick={() => handleNewData()}
            >
              Add New Profile
            </Button>
          </Grid>
        ) : null}
      </Grid>
      {statusprofile === "edit" || statusprofile === "add" ? (
        <TestDnD editdata={editData} action={action} />
      ) : (
        [
          individualData == null ? (
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "80vh" }}
            >
              <Grid item xs={6}>
                <Typography
                  variant="h1"
                  align="center"
                  style={{ fontSize: 25, color: themeState.color }}
                >
                  <ErrorOutlineOutlinedIcon
                    style={{ fontSize: 170, color: "lightgray" }}
                  />
                </Typography>
                <Typography
                  align="center"
                  variant="h2"
                  style={{
                    fontWeight: 400,
                    fontSize: 30,
                    color: themeState.color,
                    marginBottom: 20,
                  }}
                >
                  No Data Available
                </Typography>
                <Grid item>
                  <Button
                    startIcon={<AddOutlinedIcon />}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleNewData()}
                  >
                    Create New Profile
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Container maxWidth="xl">
              <MaterialTable
                style={{
                  paddingLeft: 30,
                  paddingRight: 30,
                  color: themeState.color,
                  backgroundColor: themeState.paper,
                }}
                columns={[
                  {
                    title: "Name ID",
                    field: "nameid",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "First Name",
                    field: "firstname",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Last Name",
                    field: "lastname",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Name Prefix",
                    field: "nameprefix",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Sex",
                    field: "gender",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "ID Card/Passport",
                    field: "idcardandpass",
                    headerStyle: headerTableStyle,
                  },
                  // {
                  //   title: "Next Stay",
                  //   field: "nextstay",
                  //   headerStyle: headerTableStyle,
                  // },
                  {
                    title: "Last Stay",
                    field: "laststay",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Score",
                    field: "score",
                    headerStyle: headerTableStyle,
                  },

                  {
                    render: (rowData) => {
                      return rowData.status === "Check-Out" ? (
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
                data={individualData}
                options={{
                  searchFieldAlignment: "left",
                  showTitle: false,
                  search: true,
                  actionsColumnIndex: -1,
                  //   page: page,
                  //   pageSize: rowsPerPage,
                  pageSizeOptions: [
                    5,
                    10,
                    20,
                    { value: rows.length, label: "All" },
                  ],
                  headerStyle: headerTableStyle,
                  searchFieldStyle: {
                    placeholder: "test",
                    backgroundColor: themeState.paper,
                    color: themeState.color,
                    borderBottomColor: themeState.color,
                    width: 430,
                  },
                }}
                localization={{
                  toolbar: {
                    searchPlaceholder:
                      "Search by name, ID Card/Passport, status",
                  },
                }}
                actions={[
                  {
                    icon: "edit",
                    iconProps: { style: { color: themeState.color } },
                    tooltip: "Edit",
                    onClick: (event, rowData) => {
                      handleEditData(rowData);
                    },
                  },
                  {
                    icon: "delete",
                    iconProps: { style: { color: themeState.color } },
                    tooltip: "Delete",
                    onClick: (event, rowData) => {
                      handleDialogDeleteOpen(
                        rowData.nameid,
                        rowData.firstname,
                        rowData.lastname,
                        rowData.nameprefix
                      );
                    },
                  },
                ]}
              />
            </Container>
          ),
        ]
      )}

      <Dialog
        maxWidth="sm"
        open={dialogDelete}
        onClose={handleDialogDeleteClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DialogTitle
              id="form-dialog-title"
              style={{
                backgroundColor: themeState.paper,
                color: mainColor,
              }}
            >
              Confirm Delete Profile
            </DialogTitle>
            <DialogContent style={headerTableStyle}>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  Title:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.nameprefix}
                </Typography>
              </Typography>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  First Name:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.firstname}
                </Typography>
              </Typography>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  Last Name:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.lastname}
                </Typography>
              </Typography>
            </DialogContent>
            <DialogActions
              style={{
                backgroundColor: themeState.paper,
                color: themeState.color,
                padding: 20,
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={4}
              >
                <Grid item sm={6} md={6} lg={6} xl={6}>
                  <Button
                    fullWidth
                    onClick={handleDialogDeleteClose}
                    variant="contained"
                    color="default"
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item sm={6} md={6} lg={6} xl={6}>
                  <Button
                    fullWidth
                    // onClick={() => handleDelete(updateData.id)}

                    onClick={() => handleConfirmDeleteData()}
                    variant="contained"
                    // color="primary"
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    nextComponent: (comp) => dispatch(nextComponent(comp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTable);
