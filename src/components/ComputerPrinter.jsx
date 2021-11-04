import React, { useState, useContext } from "react";
import { ReactReduxContext, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MaterialTable from "material-table";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
  TextField,
  Divider,
  Chip,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { blue } from "@material-ui/core/colors";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import UpdateIcon from "@material-ui/icons/Update";
import {
  updatecomputerprinter,
  listcomputerprinter,
  listregisterdhardware,
  insertcomputerprinter,
  deletecomputerprinter,
} from "../services/device.service";
import {
  getusernamebyproperty,
  listallproperty,
} from "../services/user.service";

import {
  insertconfigmaster,
  listconfigmaster,
  updateconfigmaster,
  deleteconfigmaster,
} from "../services/configmaster.service";

import TablePagination from "@material-ui/core/TablePagination";
import { EDIT_CONFIGSTATE } from "../middleware/action";
import { useHistory } from "react-router-dom";
// Generate Order Data
function createData(
  id,
  username,
  computercode,
  action,
  devicecode,
  tray,
  remark,
  specialstrings,
  propertycode
) {
  return {
    id,
    username,
    computercode,
    action,
    devicecode,
    tray,
    remark,
    specialstrings,
    propertycode,
  };
}

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

  //   roottable: {
  //     backgroundColor: "blue",
  //     color: "green",
  //   },
  //   toolbar: {
  //     backgroundColor: "white",
  //   },
  //   caption: {
  //     color: "red",
  //     fontSize: "20px",
  //   },
  //   selectIcon: {
  //     color: "green",
  //   },
  //   select: {
  //     color: "green",
  //     fontSize: "20px",
  //   },
  //   actions: {
  //     color: "blue",
  //   },
}));
export default function ComputerPrinter() {
  const history = useHistory();
  const { store } = useContext(ReactReduxContext);
  const pageProperty = useSelector((state) => state.reducer.property);
  const [data, setData] = React.useState([]);

  const [dialogAdd, setDialogAdd] = React.useState(false);
  const [dialogEdit, setDialogEdit] = React.useState(false);
  const [dialogDelete, setDialogDelete] = React.useState(false);
  const [rows, setRows] = useState([]);

  const [pageData, setPageData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [errorMessageDu, setErrorMessageDu] = useState(false);
  const [errorParameterDu, setErrorParameterDu] = useState(null);

  const [usernames, setUsernames] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [computers, setComputers] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [listprinters, setPrintersCode] = useState([
    {
      value: "",
      label: "",
    },
  ]);

  const [actions, setActions] = useState([
    {
      key: "",
      label: "",
    },
  ]);

  const [trays, setTrays] = useState([
    {
      key: "",
      label: "",
    },
  ]);

  const [remarks, setRemarks] = useState([
    {
      key: "",
      label: "",
    },
  ]);
  const [properties, setProperties] = useState([
    {
      key: "",
      label: "",
    },
  ]);

  const [updateData, setUpdateData] = useState({});

  const [errorMessage, setErrorMessage] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);

  React.useEffect(async () => {
    let propertydata = await listallproperty(sessionStorage.getItem("auth"));
    let tempproperty = [];
    propertydata.content[propertydata.content.length - 1]
      .split(",")
      .forEach((element) => {
        // if (tempproperty.filter((x) => x.label === element).length == 0) {
        tempproperty.push({
          key: element,
          label: element,
        });
        // }
      });
    setProperties(tempproperty);
    let data = await listcomputerprinter(sessionStorage.getItem("auth"));
    let userdata = [];
    data.content[data.content.length - 1].forEach((element) =>
      userdata.push(
        createData(
          element.id,
          element.username,
          element.computercode,
          element.action,
          element.devicecode,
          element.tray,
          element.remark,
          element.specialstrings,
          element.propertycode
        )
      )
    );
    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);
  }, []);

  const handleChangeProperty = async (selectProperty) => {
    let _userdata = await getusernamebyproperty(
      sessionStorage.getItem("auth"),
      selectProperty
    );
    let _users = [{ key: "ADMIN", label: "ADMIN" }];
    if (_userdata.content[_userdata.content.length - 1] != "") {
      _userdata.content[_userdata.content.length - 1]
        .split(",")
        .forEach((element) => {
          if (_users.filter((x) => x.label === element).length == 0) {
            _users.push({ key: element, label: element });
          }
        });
    }
    setUpdateData({ ...updateData, propertycode: selectProperty });
    setUsernames(_users);
  };
  const handleComponentState = async (comp) => {
    const comlower = comp.toLowerCase();
    history.replace(`/${comlower}`);
    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: comp,
    });
  };

  const handleDialogDeleteOpen = async (id, computercode, devicecode) => {
    setUpdateData({
      computercode: computercode,
      devicecode: devicecode,
      id: id,
    });
    setDialogDelete(true);
  };

  const handleDialogDeleteClose = async () => {
    setDialogDelete(false);
  };

  const handleDialogAdd = async () => {
    let _userdata = await getusernamebyproperty(
      sessionStorage.getItem("auth"),
      pageProperty
    );
    // username, computercode, action, devicecode, tray, remark
    let _users = [{ key: "ADMIN", label: "ADMIN" }];
    if (_userdata.content[_userdata.content.length - 1] != "") {
      _userdata.content[_userdata.content.length - 1]
        .split(",")
        .forEach((element) => {
          if (_users.filter((x) => x.label === element).length == 0) {
            _users.push({ key: element, label: element });
          }
        });
    }
    let _data = await listregisterdhardware(sessionStorage.getItem("auth"));
    let _computers = [];
    let _listprinters = [];
    _data.content[_data.content.length - 1].forEach((element) => {
      if (element.type == "COMP") {
        if (_computers.filter((x) => x.value === element.code).length == 0) {
          _computers.push({
            value: element.code,
            label: element.name,
          });
        }
      } else if (element.type == "PRINT") {
        if (_listprinters.filter((x) => x.value === element.code).length == 0) {
          _listprinters.push({
            value: element.code,
            label: element.name,
          });
        }
      }
    });

    let _dataconfigmaster = await listconfigmaster(
      sessionStorage.getItem("auth")
    );
    let _actions = [];
    let _trays = [];
    let _remarks = [];

    _dataconfigmaster.content[_dataconfigmaster.content.length - 1].forEach(
      (element) => {
        if (element.name == "actions") {
          if (_actions.filter((x) => x.key === element.config).length == 0) {
            let labeldata = element.config.split(",");
            for (let i = 0; i < labeldata.length; i++) {
              _actions.push({
                key: i + 1,
                label: labeldata[i],
              });
            }
          }
        } else if (element.name == "trays") {
          if (_trays.filter((x) => x.key === element.config).length == 0) {
            let labeldata = element.config.split(",");
            for (let i = 0; i < labeldata.length; i++) {
              _trays.push({
                key: i + 1,
                label: labeldata[i],
              });
            }
          }
        } else if (element.name == "remarks") {
          if (_remarks.filter((x) => x.key === element.config).length == 0) {
            let labeldata = element.config.split(",");
            for (let i = 0; i < labeldata.length; i++) {
              _remarks.push({
                key: i + 1,
                label: labeldata[i],
              });
            }
          }
        }
      }
    );
console.log("_users,_computers,_listprinters,_actions,_trays,_remarks:",_users,_computers,_listprinters,_actions,_trays,_remarks);
    setUsernames(_users);
    setComputers(_computers);
    setPrintersCode(_listprinters);
    setActions(_actions);
    setTrays(_trays);
    setRemarks(_remarks);
      setUpdateData({
      propertycode: pageProperty,
      computercode: _computers[0].value,
      devicecode: _listprinters[0].value,
      // tray: trays[0].label,
      // username: usernames[0].label,
      // action: actions[0].label,
      // remark: remarks[0].label,
      tray: _trays[0].label,
      username: _users[0].label,
      action: _actions[0].label,
      remark: _remarks[0].label,
    });
    setErrorMessageDu(false);
    setDialogAdd(true);
  };

  const handleDialogEdit = async (rowData) => {
    let _rowData = JSON.parse(JSON.stringify(rowData));
    _rowData.tableData = undefined;
    console.log("handleDialogEdit", _rowData);
    let _userdata = await getusernamebyproperty(
      sessionStorage.getItem("auth"),
      rowData.propertycode
    );
    // username, computercode, action, devicecode, tray, remark
    let _users = [{ key: "ADMIN", label: "ADMIN" }];
    if (_userdata.content[_userdata.content.length - 1] != "") {
      _userdata.content[_userdata.content.length - 1]
        .split(",")
        .forEach((element) => {
          if (_users.filter((x) => x.label === element).length == 0) {
            _users.push({ key: element, label: element });
          }
        });
    }
    let _data = await listregisterdhardware(sessionStorage.getItem("auth"));
    let _computers = [];
    let _listprinters = [];
    _data.content[_data.content.length - 1].forEach((element) => {
      if (element.type == "COMP") {
        if (_computers.filter((x) => x.value === element.code).length == 0) {
          _computers.push({
            value: element.code,
            label: element.name,
          });
        }
      } else if (element.type == "PRINT") {
        if (_listprinters.filter((x) => x.value === element.code).length == 0) {
          _listprinters.push({
            value: element.code,
            label: element.name,
          });
        }
      }
    });

    let _dataconfigmaster = await listconfigmaster(
      sessionStorage.getItem("auth")
    );

    let _actions = [];
    let _trays = [];
    let _remarks = [];

    _dataconfigmaster.content[_dataconfigmaster.content.length - 1].forEach(
      (element) => {
        if (element.name == "actions") {
          if (_actions.filter((x) => x.key === element.config).length == 0) {
            let labeldata = element.config.split(",");
            for (let i = 0; i < labeldata.length; i++) {
              _actions.push({
                key: i + 1,
                label: labeldata[i],
              });
            }
          }
        } else if (element.name == "trays") {
          if (_trays.filter((x) => x.key === element.config).length == 0) {
            let labeldata = element.config.split(",");
            for (let i = 0; i < labeldata.length; i++) {
              _trays.push({
                key: i + 1,
                label: labeldata[i],
              });
            }
          }
        } else if (element.name == "remarks") {
          if (_remarks.filter((x) => x.key === element.config).length == 0) {
            let labeldata = element.config.split(",");
            for (let i = 0; i < labeldata.length; i++) {
              _remarks.push({
                key: i + 1,
                label: labeldata[i],
              });
            }
          }
        }
      }
    );

    setUsernames(_users);
    setComputers(_computers);
    setPrintersCode(_listprinters);
    setActions(_actions);
    setTrays(_trays);
    setRemarks(_remarks);
    setUpdateData(_rowData);
    setErrorMessageDu(false);
    setDialogEdit(true);
  };

  const handleDialogEditClose = async () => {
    setDialogEdit(false);
  };

  const handleDialogAddClose = async () => {
    setDialogAdd(false);
  };

  const handleInsert = async () => {
    console.log(updateData);
    setErrorMessageDu(false);
    let _insertcomputerprinter = await insertcomputerprinter(
      sessionStorage.getItem("auth"),
      updateData
    );
    if (_insertcomputerprinter.status == "2000") {
      let data = await listcomputerprinter(sessionStorage.getItem("auth"));
      let userdata = [];
      data.content[data.content.length - 1].forEach((element) =>
        userdata.push(
          createData(
            element.id,
            element.username,
            element.computercode,
            element.action,
            element.devicecode,
            element.tray,
            element.remark,
            element.specialstrings,
            element.propertycode
          )
        )
      );
      setRows(userdata);
      updatePageData(userdata, page, rowsPerPage);
      setDialogAdd(false);
    }else if(_insertcomputerprinter.status == "1000"){
      setErrorMessageDu(true);
      setErrorParameterDu(_insertcomputerprinter.msg);

    }
  };

  const handleEdit = async (id) => {
    console.log(id, "handleEdit", updateData);
    let _updatecomputerprinter = await updatecomputerprinter(
      sessionStorage.getItem("auth"),
      id,
      updateData
    );
    setErrorMessageDu(false);
    if (_updatecomputerprinter.status == "2000") {
      let data = await listcomputerprinter(sessionStorage.getItem("auth"));
      let userdata = [];
      data.content[data.content.length - 1].forEach((element) =>
        userdata.push(
          createData(
            element.id,
            element.username,
            element.computercode,
            element.action,
            element.devicecode,
            element.tray,
            element.remark,
            element.specialstrings,
            element.propertycode
          )
        )
      );
      setRows(userdata);
      updatePageData(userdata, page, rowsPerPage);
      setDialogEdit(false);
    }else if(_updatecomputerprinter.status == "1000"){
      setErrorMessageDu(true);
      setErrorParameterDu(_updatecomputerprinter.msg);

    }
  };

  const handleDelete = async (id) => {
    let _deletecomputerprinter = await deletecomputerprinter(
      sessionStorage.getItem("auth"),
      id
    );
    if (_deletecomputerprinter.status == "2000") {
      let data = await listcomputerprinter(sessionStorage.getItem("auth"));
      let userdata = [];
      data.content[data.content.length - 1].forEach((element) =>
        userdata.push(
          createData(
            element.id,
            element.username,
            element.computercode,
            element.action,
            element.devicecode,
            element.tray,
            element.remark,
            element.specialstrings,
            element.propertycode
          )
        )
      );
      setRows(userdata);
      updatePageData(userdata, page, rowsPerPage);
      setDialogDelete(false);
    }
  };

  const updatePageData = async (rowsdata, _page, _rowsPerPage) => {
    let data = [];
    for (let i = _page * _rowsPerPage; i < (_page + 1) * _rowsPerPage; i++) {
      if (rowsdata[i]) data.push(rowsdata[i]);
    }
    setPageData(data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    updatePageData(rows, newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    updatePageData(rows, 0, event.target.value);
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
    <Container maxWidth="xl" style={themeState}>
      <React.Fragment>
        <Grid container style={{ padding: 20,marginTop: 22 }}>
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
                  Configuration
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
                  System Configuration
                </Typography>
              </Link>
              <Typography>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: 15,
                    fontSize: 14,
                    color: themeState.color,
                  }}
                >
                  Device Management
                </Typography>
              </Typography>
              <Typography>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: 15,
                    fontSize: 14,
                    color: themeState.color,
                  }}
                >
                  Computer-printer
                </Typography>
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              style={{
                backgroundColor: mainColor,
                color: "white",
                alignItems: "center",
              }}
              size="large"
              onClick={handleDialogAdd}
            >
              <AddRoundedIcon />
              <Typography variant="body1" style={{}}>
                New Setting
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
           localization={{ body:{ emptyDataSourceMessage: <>   <Typography
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
          </Typography> </> }}}
            style={{
              paddingLeft: 30,
              paddingRight: 30,
              color: themeState.color,
              backgroundColor: themeState.paper,
            }}
            title={
              <Grid>
                <Typography
                  variant="h6" noWrap
                  style={{ fontSize: 25, color: themeState.color }}
                >
                  Computer-printer
                </Typography>
              </Grid>
            }
            columns={[
              {
                title: "Property",
                field: "propertycode",
                headerStyle: headerTableStyle,
              },
              {
                title: "Username",
                field: "username",
                headerStyle: headerTableStyle,
              },
              {
                title: "Computer Code",
                field: "computercode",
                headerStyle: headerTableStyle,
              },
              {
                title: "Action",
                field: "action",
                headerStyle: headerTableStyle,
              },
              {
                title: "Device Code",
                field: "devicecode",
                headerStyle: headerTableStyle,
              },
              {
                title: "Tray",
                field: "tray",
                headerStyle: headerTableStyle,
              },
              {
                title: "Remark",
                field: "remark",
                headerStyle: headerTableStyle,
              },
              {
                title: "Special Strings",
                field: "specialstrings",
                headerStyle: headerTableStyle,
              },
            ]}
            data={rows}
            // totalCount={rows.length}
            // page={page}

            
            options={{
              actionsColumnIndex: -1,
              // filtering: true,
              search: true,
              searchFieldAlignment: "left",
              page: page,
              pageSize: rowsPerPage,
              pageSizeOptions: [
                5,
                10,
                20,
                { value: rows.length, label: "All" },
              ],
              searchFieldStyle: headerTableStyle,
              headerStyle: headerTableStyle,
            }}
            actions={[
              {
                icon: "edit",
                iconProps: { style: { color: themeState.color } },
                tooltip: "Edit",
                onClick: (event, rowData) => {
                  handleDialogEdit(rowData);
                },
              },
              {
                icon: "delete",
                iconProps: { style: { color: themeState.color } },
                tooltip: "Delete",
                onClick: (event, rowData) => {
                  handleDialogDeleteOpen(
                    rowData.id,
                    rowData.computercode,
                    rowData.devicecode
                  );
                },
              },
            ]}
            // components={{
            //   Pagination: (page, rowsPerPage, rows) => (
            //     console.log("Pagination data", page, rowsPerPage, rows),
            //     (
            //       <TablePagination
            //         rowsPerPageOptions={[5, 10, 25]}
            //         component="div"
            //         count={rows.length}
            //         page={page}
            //         //   colSpan={props.colSpan}
            //         // count={rows.length}

            //         rowsPerPage={rowsPerPage}
            //         onChangePage={handleChangePage}
            //         onChangeRowsPerPage={handleChangeRowsPerPage}
            //         classes={{
            //           root: classes.roottable,
            //           toolbar: classes.toolbar,
            //           caption: classes.caption,
            //           selectIcon: classes.selectIcon,
            //           select: classes.select,
            //           actions: classes.actions,
            //         }}
            //       />
            //     )
            //   ),
            // }}
            onChangePage={(page) => console.log("page")}
            // onChangePage={(event, page) => console.log(event, page)}
          />
        </div>
        {/* ==================== Dialog New Device========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="md"
          open={dialogAdd}
          onClose={handleDialogAddClose}
          aria-labelledby="form-dialog-title"
          className={classes.root}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <DialogTitle
                id="form-dialog-title"
                style={{ backgroundColor: themeState.paper, color: mainColor }}
              >
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                      New Device
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        select
                        className={classes.root}
                        id="outlined-basic"
                        label="Property"
                        variant="outlined"
                        defaultValue={properties[0].label}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) => handleChangeProperty(e.target.value)}
                      >
                        {properties.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Container>
              </DialogTitle>

              <DialogContent style={headerTableStyle}>
                {/* username, computercode, action, devicecode, tray, remark */}
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        defaultValue={usernames[0].label}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            username: e.target.value,
                          })
                        }
                      >
                        {usernames.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Computer Code"
                        variant="outlined"
                        defaultValue={computers[0].value}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            computercode: e.target.value,
                          })
                        }
                      >
                        {computers.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Action"
                        variant="outlined"
                        defaultValue={actions[0].label}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            action: e.target.value,
                          })
                        }
                      >
                        {actions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Printer Code"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        defaultValue={listprinters[0].value}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            devicecode: e.target.value,
                          })
                        }
                      >
                        {listprinters.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Tray"
                        variant="outlined"
                        defaultValue={trays[0].label}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({ ...updateData, tray: e.target.value })
                        }
                      >
                        {trays.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Remark"
                        variant="outlined"
                        defaultValue={remarks[0].label}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            remark: e.target.value,
                          })
                        }
                      >
                        {remarks.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        className={classes.root}
                        id="outlined-basic"
                        label="Special String"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            specialstrings: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Container>
                {errorMessage ? (
                  <div
                    style={{
                      background: "#ff0033",
                      textAlign: "center",
                      color: "white",
                      height: "30px",
                      paddingTop: 5,
                    }}
                  >
                    {errorParameter} is required
                  </div>
                ) : null}
                 {errorMessageDu ? (
                  <div style={{ marginTop: 15 }}>
                    <div
                      style={{
                        background: "#ff0033",
                        textAlign: "center",
                        color: "white",
                        height: "30px",
                        paddingTop: 5,
                      }}
                    >
                      {errorParameterDu} 
                    </div>
                  </div>
                ) : null}
              </DialogContent>
            </Grid>
          </Grid>
          <DialogActions
            style={{
              padding: 20,
              backgroundColor: themeState.paper,
              color: themeState.color,
            }}
          >
            <Button
              onClick={handleDialogAddClose}
              variant="text"
              color="primary"
              style={{ color: mainColor }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                color: themeState.color,
                backgroundColor: mainColor,
              }}
              onClick={() => handleInsert()}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* ==================== Dialog Edit Device ========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="md"
          open={dialogEdit}
          onClose={handleDialogEditClose}
          aria-labelledby="form-dialog-title"
          className={classes.root}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <DialogTitle id="form-dialog-title" style={headerTableStyle}>
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
                      Edit Device
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Property"
                        variant="outlined"
                        defaultValue={updateData.propertycode}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) => handleChangeProperty(e.target.value)}
                      >
                        {properties.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Container>
              </DialogTitle>

              <DialogContent
                style={{
                  backgroundColor: themeState.paper,
                  color: mainColor,
                }}
              >
                {/* username, computercode, action, devicecode, tray, remark */}
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        defaultValue={updateData.username}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            username: e.target.value,
                          })
                        }
                      >
                        {usernames.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Computer Code"
                        variant="outlined"
                        defaultValue={updateData.computercode}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            computercode: e.target.value,
                          })
                        }
                      >
                        {computers.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Action"
                        variant="outlined"
                        defaultValue={updateData.action}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            action: e.target.value,
                          })
                        }
                      >
                        {actions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        // autoFocus
                        select
                        id="outlined-basic"
                        label="Printer Code"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        defaultValue={updateData.devicecode}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            devicecode: e.target.value,
                          })
                        }
                      >
                        {listprinters.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.value}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Tray"
                        variant="outlined"
                        defaultValue={updateData.tray}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({ ...updateData, tray: e.target.value })
                        }
                      >
                        {trays.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Remark"
                        variant="outlined"
                        defaultValue={updateData.remark}
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            remark: e.target.value,
                          })
                        }
                      >
                        {remarks.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            style={headerTableStyle}
                          >
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        id="outlined-basic"
                        label="Special String"
                        variant="outlined"
                        defaultValue={updateData.specialstrings}
                        fullWidth
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            specialstrings: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Container>
                {errorMessage ? (
                  <div
                    style={{
                      background: "#ff0033",
                      textAlign: "center",
                      color: "white",
                      height: "30px",
                      paddingTop: 5,
                    }}
                  >
                    {errorParameter} is required
                  </div>
                ) : null}

                 {errorMessageDu ? (
                  <div
                    style={{
                      background: "#ff0033",
                      textAlign: "center",
                      color: "white",
                      height: "30px",
                      paddingTop: 5,
                      marginTop:5,
                    }}
                  >
                    {errorParameterDu} 
                  </div>
                ) : null}
              </DialogContent>
            </Grid>
          </Grid>
          <DialogActions
            style={{
              padding: 20,
              backgroundColor: themeState.paper,
              color: themeState.color,
            }}
          >
            <Button
              onClick={handleDialogEditClose}
              variant="text"
              color="primary"
              style={{ color: mainColor }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                color: themeState.color,
                backgroundColor: mainColor,
              }}
              onClick={() => handleEdit(updateData.id)}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

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
                Confirm Delete
              </DialogTitle>
              <DialogContent style={headerTableStyle}>
                <Typography>
                  <Typography
                    color="initial"
                    style={{ fontWeight: 600 }}
                    display="inline"
                  >
                    Computer Code:&nbsp;
                  </Typography>
                  <Typography color="initial" display="inline">
                    {updateData.computercode}
                  </Typography>
                </Typography>
                <Typography>
                  <Typography
                    color="initial"
                    style={{ fontWeight: 600 }}
                    display="inline"
                  >
                    Device Code:&nbsp;
                  </Typography>
                  <Typography color="initial" display="inline">
                    {updateData.devicecode}
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
                      onClick={() => handleDelete(updateData.id)}
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
      </React.Fragment>
    </Container>
  );
}
