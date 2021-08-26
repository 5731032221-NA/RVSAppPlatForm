import React, { useState, useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Container,
  Grid,
  Paper,
  Typography,
  //Divider,
  //TextField,
  //InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
  TextField,
  Chip,
  Divider,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
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

import {
  getuser,
  postuser,
  updateuser,
  getuserbyid,
} from "../services/user.service";
import TablePagination from "@material-ui/core/TablePagination";

import Checkbox from "@material-ui/core/Checkbox";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import user from "../services/user.service";

// Generate Order Data
function createData(id, userID, userName, position, roles, status) {
  return {
    id,
    userID,
    userName,
    position,
    roles,
    status,
  };
}
// const rows = [
//   createData(
//     0,
//     "Somchai",
//     "Somchai Wong nut",
//     "Front Office",
//     "Cashier",
//     "Active"
//   ),
//   createData(1, "Fah", "Mekha Wihok", "Reception", "Night", "Inactive"),
//   createData(2, "Mon", "Month main", "Front Office", "Cashaier", "Active"),
// ];

const roles = [
  {
    key: "1",
    label: "Cahshier",
  },
  {
    key: "2",
    label: "Account",
  },
];

const position = [
  {
    key: "1",
    label: "Front office",
  },
  {
    key: "2",
    label: "Receptionist",
  },
];
const property = [
  {
    key: "1",
    label: "Novotel Pattaya",
  },
  {
    key: "2",
    label: "Novotel Bangkok",
  },
  {
    key: "3",
    label: "Novotel Rayong",
  },
];
const RoleValues = "";

function preventDefault(event) {
  event.preventDefault();
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
}));



export default function UserManagement() {
  const classes = useStyles();
  const [dialogAddUser, setDialogAddUser] = React.useState(false);
  const [dialogEditUser, setDialogEditUser] = React.useState(false);
  const [selectPosition, setSelectPosition] = React.useState(null);
  const [selectProperty, setSelectProperty] = React.useState(null);
  const [permissionDialog, setPermissionDialog] = React.useState(false);
  const [chipRolesDialog, setChipRolesDialog] = React.useState([]);
  const [pageData, setPageData] = React.useState([]);
  const [editUserName, setEditUserName] = React.useState(null);
  const [editUserID, setEditUserID] = React.useState(null);
  const [editID, setEditID] = React.useState(null);
  const [editStatus, setEditStatus] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { store } = useContext(ReactReduxContext);
  React.useEffect(async () => {
    const data = await getuser(sessionStorage.getItem("auth"));
    let userdata = [];
    data.content[data.content.length - 1].forEach((element) =>
      userdata.push(
        createData(
          element.id,
          element.userid,
          element.firstname + " " + element.lastname,
          "",
          element.role,
          element.status_record
        )
      )
    );
    console.log(sessionStorage.getItem("auth"));
    console.log(userdata);
    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);
  }, []);



  const updatePageData = async (rowsdata, _page, _rowsPerPage) => {
    let data = [];
    for (let i = _page * _rowsPerPage; i < (_page + 1) * _rowsPerPage; i++) {
      if (rowsdata[i]) data.push(rowsdata[i]);
    }
    setPageData(data);
  };

  const handleDialogAddUser = () => {
    setDialogAddUser(true);
  };

  const handleDialogAddUserClose = () => {
    setDialogAddUser(false);
  };
  const handleDialogEditUser = async (id, firstName, lastName, status) => {
    // const databyid = await getuserbyid(sessionStorage.getItem("auth"), id);
    // setEditUserID(databyid.content[databyid.content.length - 1].firstname);
    // setEditUserName(databyid.content[databyid.content.length - 1].lastname);
    // setEditStatus(databyid.content[databyid.content.length - 1].status_record);

    // setChipRolesDialog();
    // setEditID(id);

    // setDialogEditUser(true);

    // console.log("databyid :", databyid);
    // console.log(
    //   "databyid Firstname:",
    //   databyid.content[databyid.content.length - 1].firstname
    // );
    // console.log(
    //   "databyid Lastname :",
    //   databyid.content[databyid.content.length - 1].lastname
    // );
    // console.log(
    //   "databyid status_record :",
    //   databyid.content[databyid.content.length - 1].status_record
    // );
    // console.log(
    //   "databyid Role :",
    //   databyid.content[databyid.content.length - 1].role
    // );

    // console.log("id :", id);
    // console.log("firstName :", firstName);
    // console.log("lastName :", lastName);
    // console.log("status :", status);
  };

  const handleDialogEditUserClose = () => {
    setDialogEditUser(false);
  };

  const handlePermission = () => {
    setPermissionDialog(!permissionDialog);
  };

  const handlePermissionClose = () => {
    setPermissionDialog(false);
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


  const handleInsertUser = async (firstName, lastName, statusRec) => {
    setEditUserID(null);
    setEditUserName(null);
    let insert = await postuser(sessionStorage.getItem("auth"), {
      firstname: firstName,
      lastname: lastName,
      age: 1,
      status_record: statusRec,
      status_marriaged: "S",
    });
    console.log(insert);
    const data = await getuser(sessionStorage.getItem("auth"));
    let userdata = [];
    data.content[data.content.length - 1].forEach((element) =>
      userdata.push(
        createData(
          element.id,
          element.userid,
          element.firstname + " " + element.lastname,
          "",
          element.role,
          element.status_record
        )
      )
    );

    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);
    setDialogAddUser(false);
  };

  const handleSelectPosition = (event) => {
    setSelectPosition(event.target.value);
  };
  const handleSelectProperty = (event) => {
    setSelectProperty(event.target.value);
  };

  const handleSelectRoles = (event) => {
    const temp = new Set();
    if (chipRolesDialog.length) {
      for (var i in chipRolesDialog) {
        temp.add(chipRolesDialog[i].label);
      }
      if (temp.has(event.target.value)) {
        // console.log("had value");
      } else {
        setChipRolesDialog([
          ...chipRolesDialog,
          { key: event.target.value, label: event.target.value },
        ]);
      }
    } else {
      setChipRolesDialog([
        ...chipRolesDialog,
        { key: event.target.value, label: event.target.value },
      ]);
    }
  };
  const handleDeleteRoles = (chipToDelete) => () => {
    setChipRolesDialog((chips) =>
      chips.filter((chips) => chips.key !== chipToDelete.key)
    );
  };

  const renderTreeSubMenu = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTreeSubMenu(node))
        : null}
    </TreeItem>
  );


  const [data, setData] = React.useState([
    {
      id: "1.1",
      name: "Dashboard",
    },
    {
      id: "1.2",
      name: "Reservartion",
    },
    {
      id: "1.3",
      name: "Front Desk",
      children: [
        {
          id: "1.3.1",
          name: "Walk-in",
        },
        {
          id: "1.3.2",
          name: "Check-in",
        },
        {
          id: "1.3.3",
          name: "Checkout",
        },
        {
          id: "1.3.4",
          name: "RoomStatus",
        },
      ],
    },
  ]);


  const renderTree = (nodes) => (
    <div>
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <div>
            <Grid container direction="row" alignItems="center">
              <Grid item style={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  color="initial"
                  style={{ paddind: 5, fontSize: 16 }}
                >
                  {nodes.name}
                </Typography>
              </Grid>
              <Grid item>
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label={
                    <Typography
                      variant="title1"
                      color="initial"
                      style={{ fontSize: 12 }}
                    >
                      All
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label={
                    <Typography
                      variant="title1"
                      color="initial"
                      style={{ fontSize: 12 }}
                    >
                      Create
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label={
                    <Typography
                      variant="title1"
                      color="initial"
                      style={{ fontSize: 12 }}
                    >
                      Read
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label={
                    <Typography
                      variant="title1"
                      color="initial"
                      style={{ fontSize: 12 }}
                    >
                      Update
                    </Typography>
                  }
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="end"
                  control={<Checkbox color="primary" />}
                  label={
                    <Typography
                      variant="title1"
                      color="initial"
                      style={{ fontSize: 12 }}
                    >
                      Delete
                    </Typography>
                  }
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
            <Divider />
          </div>
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    </div>
  );

  // const handleToggleStatus = (event) => {
  //   setToggleStatus(event.target.value);
  // };
  const handleSaveEdit = async (id, firstName, lastName, status) => {
    console.log(
      "Handle save Edit : id, firstname, userName, status",
      id,
      firstName,
      lastName,
      status
    );

    const userupdate = await updateuser(
      sessionStorage.getItem("auth"),
      {
        id: id,
        firstname: firstName,
        lastname: lastName,
        age: 20,
        status_record: status,
        status_marriaged: "S",
      },
      id
    );
    console.log("userupdate func:", userupdate);
    const data = await getuser(sessionStorage.getItem("auth"));
    let userdata = [];
    data.content[data.content.length - 1].forEach((element) =>
      userdata.push(
        createData(
          element.id,
          element.userid,
          element.firstname + " " + element.lastname,
          "",
          element.role,
          element.status_record
        )
      )
    );

    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);
    setDialogEditUser(false);
  };

  return (
    <Container maxWidth="xl">
      <React.Fragment>
        <Grid
          container
          //   direction="row"
          //   justifyContent="flex-start"
          //   alignItems="center"
          style={{ padding: 20 }}
        >
          <Grid item style={{ flexGrow: 1 }}>
            <Breadcrumbs
              separator={
                <Typography
                  variant="h6"
                  style={{ marginBottom: 15, fontSize: 20 }}
                >
                  /
                </Typography>
              }
            >
              <Link color="inherit" href="#" onClick={" "}>
                <Typography
                  variant="h6"
                  style={{ marginBottom: 15, fontSize: 20, color: "#2B4EAD" }}
                >
                  Configuration
                </Typography>
              </Link>
              <Link color="inherit" href="#" onClick={" "}>
                <Typography
                  variant="h6"
                  style={{ marginBottom: 15, fontSize: 14 }}
                >
                  Permission
                </Typography>
              </Link>
              <Typography>
                <Typography
                  variant="h6"
                  style={{ marginBottom: 15, fontSize: 14 }}
                >
                  User Management
                </Typography>
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              style={{
                backgroundColor: "#2949A0",
                color: "white",
                alignItems: "center",
              }}
              size="large"
              onClick={handleDialogAddUser}
            >
              <AddRoundedIcon />
              <Typography variant="body1" style={{}}>
                New User
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Paper>
          <Grid container style={{ padding: 30 }}>
            <Grid container>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Roles</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pageData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.userID}</TableCell>
                      <TableCell>{row.userName}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.roles}</TableCell>
                      {`${row.status}` === "Active" ||
                        `${row.status}` === "active" ? (
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            style={{
                              borderRadius: 20,
                              backgroundColor: "#2D62ED",
                              color: "white",
                            }}
                            onClick={" "}
                          >
                            {row.status}
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            style={{
                              borderRadius: 20,
                              backgroundColor: "#DEDFE0",
                              color: "black",
                            }}
                          >
                            {row.status}
                          </Button>
                        </TableCell>
                      )}
                      <TableCell align="center">
                        <IconButton
                          onClick={() =>
                            handleDialogEditUser(
                              row.id,
                              row.userID,
                              row.userName,
                              row.status
                            )
                          }
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={" "}>
                          <SaveRoundedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={3}
                style={{ marginTop: 15 }}
              >
                <Grid item style={{ flexGrow: 1 }}>
                  <Typography variant="title1" color="initial">
                    item {page * rowsPerPage + 1}-
                    {(page + 1) * rowsPerPage > rows.length
                      ? rows.length
                      : (page + 1) * rowsPerPage}{" "}
                    of {rows.length} Total
                  </Typography>
                </Grid>
                <Grid item>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    page={page}
                    // onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  // onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        {/* ==================== Dialog New User========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="sm"
          open={dialogAddUser}
          onClose={handleDialogAddUserClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
            New User
          </DialogTitle>

          <DialogContent>
            <Container maxWidth="xl" disableGutters>
              <Grid container spacing={2} style={{ paddingTop: 10 }}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    // autoFocus
                    id="outlined-basic"
                    label="Firstname"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setEditUserID(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    id="outlined-basic"
                    label="Lastnameame"
                    variant="outlined"
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}

                    // value={" "}
                    onChange={(e) => setEditUserName(e.target.value)}
                  ></TextField>
                </Grid>
              </Grid>

              <Grid container spacing={2} style={{ paddingTop: 5 }}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    select
                    id="outlined-basic"
                    label="Position"
                    variant="outlined"
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    value={selectPosition}
                    onChange={handleSelectPosition}
                  >
                    {position.map((option) => (
                      <option key={option.key} value={option.label}>
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
                    label="Property"
                    variant="outlined"
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    value={selectProperty}
                    onChange={handleSelectProperty}
                  >
                    {property.map((option) => (
                      <option key={option.key} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                style={{ paddingTop: 10 }}
              >
                <TextField
                  fullWidth
                  // autoFocus
                  variant="outlined"
                  selectSelectProps={{
                    native: true,
                  }}
                  label="Roles"
                  select
                  value={RoleValues}
                  onChange={(event) => handleSelectRoles(event)}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.key} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {chipRolesDialog.map((data, index) => {
                  return (
                    <Chip
                      style={{ marginTop: 10 }}
                      key={data.key + index}
                      label={data.label}
                      onDelete={handleDeleteRoles(data)}
                    />
                  );
                })}
              </Grid>
              <Grid container spacing={2} style={{ paddingTop: 10 }}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                  <TextField
                    id="outlined-basic"
                    label="username@mail.com"
                    variant="outlined"
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                  // value={" "}
                  // onChange={" "}
                  ></TextField>
                </Grid>
                <Grid
                  container
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  style={{ alignContent: "center", padding: 20 }}
                >
                  <FormControlLabel
                    value="Status"
                    control={
                      editStatus === "Active" || editStatus === "active" ? (
                        <Switch
                          defaultChecked={true}
                          color="primary"
                          onChange={(e) =>
                            e.target.checked
                              ? setEditStatus("Active")
                              : setEditStatus("Inactive")
                          }
                        />
                      ) : (
                        <Switch
                          defaultChecked={false}
                          color="primary"
                          // value={checked}
                          // onChange={(e) => setEditStatus(e.target.checked)}

                          onChange={(e) =>
                            e.target.checked
                              ? setEditStatus("Active")
                              : setEditStatus("Inactive")
                          }
                        />
                      )
                    }
                    label="Status"
                    labelPlacement="start"
                  />
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions style={{ padding: 20 }}>
            <Button
              onClick={handleDialogAddUserClose}
              variant="text"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              // onClick={handleInsertUser}
              variant="contained"
              color="primary"
              onClick={() =>
                handleInsertUser(editUserID, editUserName, editStatus)
              }
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* ---------------------------------------- */}
        {/* ==================== Dialog Edit User========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="sm"
          open={dialogEditUser}
          onClose={handleDialogEditUserClose}
          aria-labelledby="form-dialog-title"
        >

          <Grid container>
          {permissionDialog ?
            <Grid
              item
              sm={3}
              md={3}
              lg={3}
              xl={3}
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <TreeView
                style={{ padding: 20 }}
                defaultCollapseIcon={
                  <RemoveRoundedIcon
                    style={{
                      backgroundColor: "#717171",
                      borderRadius: 2,
                      color: "white",
                    }}
                  />
                }
                defaultExpandIcon={
                  <AddRoundedIcon
                    style={{
                      backgroundColor: "#2D62ED",
                      borderRadius: 2,
                      color: "white",
                    }}
                  />
                }
              >
                {data.map((node) => renderTreeSubMenu(node))}
              </TreeView>
            </Grid>
            : null}
            <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
              <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                Edit User
              </DialogTitle>
              <DialogContent>
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        // autoFocus
                        label="Username"
                        variant="outlined"
                        id="outlined-basic"
                        defaultValue={editUserID}
                        // value={" "}
                        onChange={(e) => setEditUserID(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}

                        // value={" "}
                        defaultValue={editUserName}
                        onChange={(e) => setEditUserName(e.target.value)}

                      ></TextField>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} style={{ paddingTop: 5 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        select
                        id="outlined-basic"
                        label="Position"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        value={selectPosition}
                        onChange={handleSelectPosition}
                      >
                        {position.map((option) => (
                          <option key={option.key} value={option.label}>
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
                        label="Property"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        value={selectProperty}
                        onChange={handleSelectProperty}
                      >
                        {property.map((option) => (
                          <option key={option.key} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{ paddingTop: 10 }}
                  >
                    <TextField
                      fullWidth
                      // autoFocus
                      variant="outlined"
                      selectSelectProps={{
                        native: true,
                      }}
                      label="Roles"
                      select
                      value={RoleValues}
                      onChange={(event) => handleSelectRoles(event)}
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.key} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {chipRolesDialog.map((data, index) => {
                      return (
                        <Chip
                          style={{ marginTop: 10 }}
                          key={data.key + index}
                          label={data.label}
                          onDelete={handleDeleteRoles(data)}
                        />
                      );
                    })}
                  </Grid>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        id="outlined-basic"
                        label="username@mail.com"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}


                      // value={" "}
                      // onChange={" "}
                      ></TextField>
                    </Grid>
                    <Grid
                      container
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      style={{ alignContent: "center", padding: 20 }}
                    >
                      <FormControlLabel
                        label="Status"
                        labelPlacement="start"
                        value="Status"
                        control={
                          <Switch
                            defaultChecked={editStatus}
                            color="primary"
                            // value={checked}
                            // onChange={(e) => setEditStatus(e.target.checked)}
                            onChange={(e) =>
                              e.target.checked
                                ? setEditStatus("Active")
                                : setEditStatus("Inactive")
                            }
                          />
                        }
                      />
                    </Grid>
                  </Grid>
                </Container>
                <Button
                  onClick={handlePermission}
                  variant="contained"
                  color="primary"
                >
                  Permission
                </Button>

                {permissionDialog ?
                <Grid>
                <Grid
                  container
                  alignItems="center"
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ paddingTop: 10 }}
                >
                  <FormControlLabel

                    label="Status"
                    labelPlacement="start"
                    value="Status"
                    control={
                      editStatus === "Active" || editStatus === "active" ? (
                        <Switch
                          defaultChecked={true}
                          color="primary"
                          // value={checked}
                          // onChange={(e) => setEditStatus(e.target.checked)}

                          onChange={(e) =>
                            e.target.checked
                              ? setEditStatus("Active")
                              : setEditStatus("Inactive")
                          }
                        />
                      ) : (
                        <Switch
                          defaultChecked={false}
                          color="primary"
                          // value={checked}
                          // onChange={(e) => setEditStatus(e.target.checked)}

                          onChange={(e) =>
                            e.target.checked
                              ? setEditStatus("Active")
                              : setEditStatus("Inactive")
                          }
                        />
                      )
                    }
                    labelPlacement="end"
                  />
                </Grid>
                <Divider style={{ marginTop: 10 }} />
                <Container disableGutters>
                  <TreeView
                    // className={classes.root}
                    defaultCollapseIcon={
                      <RemoveRoundedIcon
                        style={{
                          backgroundColor: "#717171",
                          borderRadius: 2,
                          color: "white",
                        }}
                      />
                    }
                    defaultExpandIcon={
                      <AddRoundedIcon
                        style={{
                          backgroundColor: "#2D62ED",
                          borderRadius: 2,
                          color: "white",
                        }}
                      />
                    }
                  // expanded={expanded}
                  // selected={selected}
                  // onNodeToggle={handleToggle}
                  // onNodeSelect={handleSelect}
                  >
                    {data.map((node) => renderTree(node))}
                  </TreeView>
                </Container>
                </Grid>
            : null}
              </DialogContent>
              <DialogActions style={{ padding: 20 }}>
                <Button
                  onClick={handleDialogEditUserClose}
                  variant="text"
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    handleSaveEdit(editID, editUserID, editUserName, editStatus)
                  }
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>
      </React.Fragment>
    </Container>
  );
}
