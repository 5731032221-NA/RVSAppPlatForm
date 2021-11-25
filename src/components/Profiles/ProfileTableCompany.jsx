import React from "react";
import { connect, ReactReduxContext, useSelector } from "react-redux";
import { nextComponent } from "../../middleware/action";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { blue, green, yellow } from "@material-ui/core/colors";
import ClearIcon from "@material-ui/icons/Clear";

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
import ProfileCompany from "./ProfileCompany";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from "@material-ui/icons/Search";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  getCompanyProfile,
  getCompanyProfileById,
  postCompanyProfile,
  updateCompanyProfile,
  deleteCompanyProfileById,
} from "../../services/companyprofile.service";
import StandardTable from "../Table/StandardTable";
import Test2 from "../Table/test";

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
  firstname,
  lastname,
  title,
  sex,
  idcardandpass,
  nationality,
  nextstay,
  laststay,
  score,
  status
) {
  return {
    firstname,
    lastname,
    title,
    sex,
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
    "Mr.",
    "Male",
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



export const ProfileTableCompany = (props) => {
  const [action, setAction] = React.useState("");
  const [triggerButton, setTriggerButton] = React.useState(false);
  const [editData, setEditData] = React.useState(" ");
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

  const theme = useTheme();
const smUp = useMediaQuery(theme.breakpoints.up("sm"));

let customStyle = {
  padding: theme.spacing(0, 0, 0, 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
  transition: theme.transitions.create("width"),
  width: "100%"
};

if (smUp) {
  customStyle = {
    ...customStyle,
    width: "54ch",
    // color: "red",
    }
  };

  // if (smUp) {
  //   customStyle = {
  //     ...customStyle,
  //     width: "54ch",
  //     // color: "red",
  //   };
  // }

  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };


  const [companyData, setcompanyData] = React.useState([]);
  // const [companyData, setcompanyData] = React.useState(null);
  const [statusprofile, setStatusprofile] = React.useState("none");
  const [dialogDelete, setDialogDelete] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState({
    title: "title",
    firstname: "firstname",
    lastname: "lastname",
  });
  const [Columns, setColumns] = React.useState([
    {
      title: "Name",
      field: "name",
      headerStyle: headerTableStyle,
    },
    {
      title: "Abbreviation",
      field: "abbreviation",
      headerStyle: headerTableStyle,
    },
    {
      title: "WWW",
      field: "www",
      headerStyle: headerTableStyle,
    },
    {
      title: "City/Country",
      field: "citycountry",
      headerStyle: headerTableStyle,
    },
  
    {
      title: "Industry",
      field: "industrycode",
      headerStyle: headerTableStyle,
    },
    {
      title: "IATA",
      field: "iata",
      headerStyle: headerTableStyle,
    },
  ]);

  React.useEffect(async () => {
    if (action == "success") {
      await handleGetCompanyProfile();
      await setStatusprofile("moredata");
    }
  }, [action]);

  React.useEffect(async () => {
    await handleGetCompanyProfile();
  }, []);

  const handleGetCompanyProfile = async () => {
    const resp = await getCompanyProfile(sessionStorage.getItem("auth"));
    if (resp.status == "2000") {
      if (resp.content[0].length > 0) {
        resp.content[0].forEach(function (part, index) {
          this[index].citycountry =
            (this[index].city ? this[index].city : "-") +
            "/" +
            (this[index].countrycode ? this[index].countrycode : "-");
        }, resp.content[0]);
        setStatusprofile("moredata");
        console.log("resp.content[0]:", resp.content[0]);
        setcompanyData(resp.content[0]);
      }
    }
  };

  const handleComponentState = async (comp) => {
    console.log("setcomp", comp);
    props.nextComponent(comp);
  };
  const handleStatusProfile = () => {
    setStatusprofile();
  };
  const handleNewData = async () => {
    await setTriggerButton(!triggerButton);
    await setAction("none");
    await setEditData(null);
    await setStatusprofile("add");
  };
  const handleAddData = async (companyData) => {
    await setTriggerButton(!triggerButton);
    await setAction("add");
  };
  const handleAddDataEdit = async (companyData) => {
    await setTriggerButton(!triggerButton);
    await setAction("edit");
  };

  const handleEditData = async (data) => {
    await setTriggerButton(!triggerButton);
    const resp = await getCompanyProfileById(
      sessionStorage.getItem("auth"),
      data.id
    );
    await setEditData(resp.content);
    await setAction("none");
    await setStatusprofile("edit");
  };

  const handleDeleteData = async () => {
    try {
      const resp = await deleteCompanyProfileById(
        sessionStorage.getItem("auth"),
        deleteData.id
      );
      if (resp.status == "2000") {
        await handleGetCompanyProfile();
      }
      await setStatusprofile("moredata");
      await setDialogDelete(false);
    } catch (error) {}
  };

  const handleDialogDeleteOpen = async (id, name, www, city) => {
    await setDeleteData({ id: id, name: name, www: www, city: city });
    await setDialogDelete(true);
  };

  const handleDialogDeleteClose = async () => {
    await setDialogDelete(false);
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
      <Grid container style={{ paddingLeft: 25, paddingRight: 25 }}>
        <Grid item xs={6} sm={10} md={10} lg={10} style={{ flexGrow: 1 }}>
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
            <Link
              color="inherit"
              href="#"
              onClick={() => setStatusprofile("moredata")}
            >
              <Typography
                variant="h6"
                style={{
                  marginBottom: 15,
                  fontSize: 14,
                  color: themeState.color,
                }}
              >
                Company
              </Typography>
            </Link>
          </Breadcrumbs>
        </Grid>
        {/* {statusprofile === "add" || statusprofile === "edit"  ? (
            <Grid item xs={6} sm={2} md={2} style={{ paddingLeft: 1200 ,textAlign: "right" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "gray", color: "white" }}
                startIcon={<ClearIcon />}
                onClick={() => setStatusprofile("moredata")}
              >
                Cancel
              </Button>
            </Grid>
          ) : null} */}
        {statusprofile === "add" ? (
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            item
            xs={6}
            sm={2}
            md={2}
            style={{ textAlign: "right" }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "gray", color: "white" }}
              startIcon={<ClearIcon />}
              onClick={() => setStatusprofile("moredata")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: mainColor, color: "white" }}
              startIcon={<SaveOutlinedIcon />}
              onClick={() => handleAddData(companyData)}
            >
              Save
            </Button>
          </Grid>
        ) : statusprofile === "edit" ? (
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            item
            xs={6}
            sm={2}
            md={2}
            style={{ textAlign: "right" }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "gray", color: "white" }}
              startIcon={<ClearIcon />}
              onClick={() => setStatusprofile("moredata")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: mainColor, color: "white" }}
              startIcon={<SaveOutlinedIcon />}
              onClick={() => handleAddDataEdit(companyData)}
            >
              Save
            </Button>
            {/* <Button
              variant="contained"
              style={{ backgroundColor: "red", color: "white", marginLeft: 15 }}
              startIcon={<DeleteIcon />}
              onClick={() => handleDialogDeleteOpen()}
            >
              Delete
            </Button> */}
          </Grid>
        ) : statusprofile === "moredata" || statusprofile === "none" ? (
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
        <ProfileCompany
          editdata={editData}
          action={action}
          setAction={setAction}
          trigger={triggerButton}
        />
      ) : (
        [
          companyData == null ? (
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
                {/* <Grid item>
                  <Button
                    startIcon={<AddOutlinedIcon />}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleNewData()}
                  >
                    Create New CompanyProfile
                  </Button>
                </Grid> */}
              </Grid>
            </Grid>
          ) : (
            <Container maxWidth="xl">
              {/* <StandardTable Data={companyData} Columns={Columns} FuncEdit={handleEditData} /> */}
               {/* <StandardTable Data={companyData} Columns={Columns}  /> */}
               <Test2 Datachile={companyData} />
              {/* <MaterialTable
                localization={{
                  body: {
                    emptyDataSourceMessage: (
                      <>
                        {" "}
                        <Typography
                          variant="h1"
                          align="center"
                          style={{ fontSize: 25, color: themeState.color }}
                        >
                          <ErrorOutlineOutlinedIcon
                            style={{ fontSize: 100, color: "lightgray" }}
                          />
                        </Typography>
                        <Typography
                          align="center"
                          variant="h2"
                          style={{
                            fontWeight: 400,
                            fontSize: 30,
                            color: "rgb(0 0 0 / 47%)",
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
                            // style={{ padding: 13 }}
                            // fullWidth
                            // onClick={() => setCreateindividual(true)}
                            onClick={() => handleNewData()}
                          >
                            New CompanyProfile
                          </Button>
                        </Grid>
                      </>
                    ),
                  },
                }}
                style={{
                  paddingLeft: 30,
                  paddingRight: 30,
                  color: themeState.color,
                  backgroundColor: themeState.paper,
                }}
                columns={[
                  {
                    title: "Name",
                    field: "name",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "Abbreviation",
                    field: "abbreviation",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "WWW",
                    field: "www",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "City/Country",
                    field: "citycountry",
                    headerStyle: headerTableStyle,
                  },

                  {
                    title: "Industry",
                    field: "industrycode",
                    headerStyle: headerTableStyle,
                  },
                  {
                    title: "IATA",
                    field: "iata",
                    headerStyle: headerTableStyle,
                  },
                ]}
                data={companyData}
                options={{
                  searchFieldAlignment: "left",
                  showTitle: false,
                  search: true,
                  actionsColumnIndex: -1,
                  //   page: page,
                  //   pageSize: rowsPerPage,
                  pageSize: 10,
                  pageSizeOptions: [
                    10,
                    20,
                    30,
                    { value: companyData.length, label: "All" },
                  ],
                  headerStyle: headerTableStyle,
                  // searchFieldStyle: {
                  //   backgroundColor: themeState.paper,
                  //   color: themeState.color,
                  //   borderBottomColor: themeState.color,
                  //   width: 530,

                  // },
                  searchFieldStyle: customStyle,
                }}
                localization={{
                  toolbar: {
                    searchPlaceholder:
                      "Search by Name, www, City/Country, Industry, IATA",
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
                        rowData.id,
                        rowData.name,
                        rowData.www,
                        rowData.city
                      );
                    },
                  },
                ]}
              /> */}
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
              Confirm Delete CompanyProfile
            </DialogTitle>
            <DialogContent style={headerTableStyle}>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  Name:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.name}
                </Typography>
              </Typography>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  www:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.www}
                </Typography>
              </Typography>
              <Typography>
                <Typography
                  color="initial"
                  style={{ fontWeight: 600 }}
                  display="inline"
                >
                  City:&nbsp;
                </Typography>
                <Typography color="initial" display="inline">
                  {deleteData.city}
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
                    onClick={() => handleDeleteData()}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTableCompany);
