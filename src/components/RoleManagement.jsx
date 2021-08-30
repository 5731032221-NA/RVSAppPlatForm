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
  Divider,
  Chip,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

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
import {
  getuser,
  listrole,
  postuser,
  updateuser,
  getuserbyid,
} from "../services/user.service";
import TablePagination from "@material-ui/core/TablePagination";

// Generate Order Data
function createData(id, rolecode, rolename, description, count, status) {
  return {
    id,
    rolecode,
    rolename,
    description,
    count,
    status
  };
}



// const rows = [
//   createData(0, "CASHIER", "Cashier", "All Shifts Cashier", "5", "Active"),
//   createData(1, "Reception", "Receptionist", "All Shifts", "4", "Inactive"),
//   createData(2, "ACCOUNT", "Accountant", "All Accountant", "6", "Active"),
// ];

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

export default function RoleManagement() {
  const classes = useStyles();
  const [dialogAddRole, setDialogAddRole] = React.useState(false);
  const [dialogEditRole, setDialogEditRole] = React.useState(false);
  const [statusRec, setStatusRec] = React.useState(null);
  const [selectUser, setSelectUser] = React.useState(null);
  const [rows, setRows] = useState([]);

  const [editRolecode, setEditRolecode] = useState([]);
  const [editRolename, setEditRolename] = useState([]);
  const [editDescription, setEditDescription] = useState([]);
  const [editStatus, setEditStatus] = useState([]);


  const [pageData, setPageData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [chipAttributeDialog, setChipAttributeDialog] = React.useState([]);
  React.useEffect(async () => {
    let data = await listrole(sessionStorage.getItem("auth"));
    console.log("listrole", listrole);
    let userdata = [];
    // let i = 0;
    console.log("aaa", data);
    data.content[data.content.length - 1].forEach((element) =>
      userdata.push(
        createData(
          element.rolecode,
          element.rolecode,
          element.rolename,
          element.description,
          element.count,
          element.status
        )
      )
    );
    console.log(sessionStorage.getItem("auth"));
    console.log("userdata", userdata);
    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);
  }, []);

  const handleDialogAddRole = () => {
    setDialogAddRole(true);
  };

  const handleDialogAddRoleClose = () => {
    setDialogAddRole(false);
  };
  const handleDialogEditRole = async (rolecode,rolename,description,status) => {
    // const databyid = await getuserbyid(
    //   sessionStorage.getItem("auth"),
    //   idForEdit
    // );
    // setStatusRec(databyid.content[databyid.content.length - 1].status_record);
    // console.log("idForEdit", idForEdit);
    setEditRolecode(rolecode);
    setEditRolename(rolename);
    setEditDescription(description);
    setEditStatus(status);
    setDialogEditRole(true);
  };

  const handleDialogEditRoleClose = () => {
    setDialogEditRole(false);
  };
  const handleSelectUser = (event) => {
    setSelectUser(event.target.value);
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

  const editing_create = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.id, label);
      if (obj.id === label) {
        obj.edited_create = !obj.edited_create;
        obj.create = !obj.create;
      } else if (obj.children) {
        editing_create(obj.children, label);
      }
    }
  };

  const handleCheckPermision_create = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.id);
    await editing_create(_data, nodes.id);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editing_read = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.id, label);
      if (obj.id === label) {
        obj.edited_read = !obj.edited_read;
        obj.read = !obj.read;
      } else if (obj.children) {
        editing_read(obj.children, label);
      }
    }
  };

  const handleCheckPermision_read = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.id);
    await editing_read(_data, nodes.id);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editing_update = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.id, label);
      if (obj.id === label) {
        obj.edited_update = !obj.edited_update;
        obj.update = !obj.update;
      } else if (obj.children) {
        editing_update(obj.children, label);
      }
    }
  };

  const handleCheckPermision_update = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.id);
    await editing_update(_data, nodes.id);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editing_delete = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.id, label);
      if (obj.id === label) {
        obj.edited_delete = !obj.edited_delete;
        obj.delete = !obj.delete;
      } else if (obj.children) {
        editing_delete(obj.children, label);
      }
    }
  };

  const handleCheckPermision_delete = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.id);
    await editing_delete(_data, nodes.id);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editing_all = async (array, label, checked) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.id, label);
      if (obj.id === label) {
        if (obj.delete == checked) {
          obj.edited_delete = !obj.edited_delete;
          obj.delete = !obj.delete;
        }
        if (obj.update == checked) {
          obj.edited_update = !obj.edited_update;
          obj.update = !obj.update;
        }
        if (obj.read == checked) {
          obj.edited_read = !obj.edited_read;
          obj.read = !obj.read;
        }
        if (obj.create == checked) {
          obj.edited_create = !obj.edited_create;
          obj.create = !obj.create;
        }
      } else if (obj.children) {
        editing_all(obj.children, label, checked);
      }
    }
  };

  const handleCheckPermision_all = async (nodes, event) => {
    let _data = data;
    console.log("nid", nodes.id, event.target.checked);
    await editing_all(_data, nodes.id, !event.target.checked);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const [data, setData] = React.useState([
    {
      id: "1.1",
      name: "Dashboard",
      code: "DB",
      permision: true,
      create: false,
      read: true,
      update: false,
      delete: false,
      edited_create: false,
      edited_read: false,
      edited_update: false,
      edited_delete: false,
    },
    {
      id: "1.2",
      name: "Reservartion",
      code: "RS",
      permision: true,
      create: false,
      read: true,
      update: false,
      delete: false,
      edited_create: false,
      edited_read: false,
      edited_update: false,
      edited_delete: false,
    },
    {
      id: "1.3",
      name: "Front Desk",
      code: "FD",
      permision: false,
      children: [
        {
          id: "1.3.1",
          name: "Walk-in",
          code: "FD-WN",
          permision: true,
          create: true,
          read: true,
          update: true,
          delete: true,
          edited_create: false,
          edited_read: false,
          edited_update: false,
          edited_delete: false,
        },
        {
          id: "1.3.2",
          name: "Check-in",
          code: "FD-CI",
          permision: true,
          create: true,
          read: true,
          update: true,
          delete: true,
          edited_create: false,
          edited_read: false,
          edited_update: false,
          edited_delete: false,
        },
        {
          id: "1.3.3",
          name: "Checkout",
          code: "FD-CO",
          permision: true,
          create: true,
          read: true,
          update: true,
          delete: true,
          edited_create: false,
          edited_read: false,
          edited_update: false,
          edited_delete: false,
        },
        {
          id: "1.3.4",
          name: "RoomStatus",
          code: "FD-RS",
          permision: true,
          create: true,
          read: true,
          update: true,
          delete: true,
          edited_create: false,
          edited_read: false,
          edited_update: false,
          edited_delete: false,
        },
      ],
    },
  ]);

  const [dataMenu, setDataMenu] = React.useState(
    [
      {
        id: "1.1",
        name: "PMS Configuration",
        createdate: "2021-08-13 12:03:00",
        master: true,
        children: [
          {
            id: "1.1.1",
            name: "Property Configuration",
            createdate: "2021-08-13 12:03:00",
            master: true,
            children: [
              {
                id: "1.1.1.1",
                name: "Property Master",
                createdate: "2021-08-13 12:03:00",
                master: true,
              },
              {
                id: "1.1.1.2",
                name: "Building Master",
                createdate: "2021-08-13 12:03:00",
              },
              {
                id: "1.1.1.3",
                name: "Exposure ",
                createdate: "2021-08-13 12:03:00",
              },
              {
                id: "1.1.1.4",
                name: "Floor ",
                createdate: "2021-08-13 12:03:00",
                master: true,
              },
              {
                id: "1.1.1.5",
                name: "Zone/Wing",
                createdate: "2021-08-13 12:03:00",
                master: true,
              },
            ],
          },
          {
            id: "1.1.2",
            name: "Room Configuration",
            createdate: "2021-08-13 12:03:00",
            master: true,
            children: [
              {
                id: "1.1.2.1",
                name: "Room Type",
                master: true,
                createdate: "2021-08-13 12:03:00",
              },
              {
                id: "1.1.2.2",
                name: "Room Category",
                master: true,
                createdate: "2021-08-13 12:03:00",
              },
              {
                id: "1.1.2.3",
                name: "Room Master Maintenance",
                master: true,
                createdate: "2021-08-13 12:03:00",
              },
            ],
          },
          {
            id: "1.1.3",
            name: "Item Configuration",
            createdate: "2021-08-13 12:03:00",
            master: true,
            children: [
              {
                id: "1.1.3.1",
                name: "Item Type",
                createdate: "2021-08-13 12:03:00",
                master: true,
              },
              {
                id: "1.1.3.2",
                name: "Item Category",
                createdate: "2021-08-13 12:03:00",
                master: true,
              },
            ],
          },
          {
            id: "1.1.4",
            name: "Reservation Configuration",
            createdate: "2021-08-13 12:03:00",
            master: true,
            children: [
              {
                id: "1.1.4.1",
                name: "Market segment Maintenance",
                createdate: "2021-08-13 12:03:00",
                master: true,
              },
              {
                id: "1.1.4.2",
                name: "Source Maintenance",
                createdate: "2021-08-13 12:03:00",
                master: true,
              },
            ],
          },
        ],
      },
      {
        id: "1.2",
        name: "System Configuration",
        createdate: "2021-08-13 12:03:00",
        master: true,
        children: [
          {
            id: "1.2.1",
            name: "User Management",
            createdate: "2021-08-13 12:03:00",
            master: true,
          },
          {
            id: "1.2.2",
            name: "Role Management",
            createdate: "2021-08-13 12:03:00",
            master: true,
          },
        ],
      },
    ]
    // }
  );
  const demoUser = [
    {
      key: "1",
      label: "Admin",
    },
    {
      key: "2",
      label: "User1",
    },
    {
      key: "3",
      label: "User1",
    },
  ];

  const attribute = [
    {
      key: "1",
      label: "Novotel Pattaya",
    },
    {
      key: "2",
      label: "Novotel Rayong",
    },
  ];
  const userValues = "";
  const handleSelectAttribute = (event) => {
    const temp = new Set();

    if (chipAttributeDialog.length) {
      for (var i in chipAttributeDialog) {
        temp.add(chipAttributeDialog[i].label);
      }
      if (temp.has(event.target.value)) {
        // console.log("had value");
      } else {
        setChipAttributeDialog([
          ...chipAttributeDialog,
          { key: event.target.value, label: event.target.value },
        ]);
      }
    } else {
      setChipAttributeDialog([
        ...chipAttributeDialog,
        { key: event.target.value, label: event.target.value },
      ]);
    }
  };
  const handleDeleteAttribute = (chipToDelete) => () => {
    setChipAttributeDialog((chips) =>
      chips.filter((chips) => chips.key !== chipToDelete.key)
    );
  };

  const renderTree = (nodes) => (
    <div>
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <div>
            {nodes.permision ? (
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
                      control={
                        <Checkbox
                          color="primary"
                          checked={
                            nodes.create &&
                            nodes.read &&
                            nodes.update &&
                            nodes.delete
                          }
                          onClick={(event) =>
                            handleCheckPermision_all(nodes, event)
                          }
                        />
                      }
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
                    {nodes.edited_create ? (
                      nodes.create ? (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              color="primary"
                              checked={nodes.create}
                              onChange={() =>
                                handleCheckPermision_create(nodes)
                              }
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "green" }}
                            >
                              Create
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      ) : (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              color="primary"
                              checked={nodes.create}
                              onChange={() =>
                                handleCheckPermision_create(nodes)
                              }
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "red" }}
                            >
                              Create
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      )
                    ) : (
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            color="primary"
                            checked={nodes.create}
                            onChange={() => handleCheckPermision_create(nodes)}
                          />
                        }
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
                    )}
                    {nodes.edited_read ? (
                      nodes.read ? (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              color="primary"
                              checked={nodes.read}
                              onChange={() => handleCheckPermision_read(nodes)}
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "green" }}
                            >
                              Read
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      ) : (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              color="primary"
                              checked={nodes.read}
                              onChange={() => handleCheckPermision_read(nodes)}
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "red" }}
                            >
                              Read
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      )
                    ) : (
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            color="primary"
                            checked={nodes.read}
                            onChange={() => handleCheckPermision_read(nodes)}
                          />
                        }
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
                    )}
                    {nodes.edited_update ? (
                      nodes.update ? (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              color="primary"
                              checked={nodes.update}
                              onChange={() =>
                                handleCheckPermision_update(nodes)
                              }
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "green" }}
                            >
                              Update
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      ) : (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              color="primary"
                              checked={nodes.update}
                              onChange={() =>
                                handleCheckPermision_update(nodes)
                              }
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "red" }}
                            >
                              Update
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      )
                    ) : (
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            color="primary"
                            checked={nodes.update}
                            onChange={() => handleCheckPermision_update(nodes)}
                          />
                        }
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
                    )}
                    {nodes.edited_delete ? (
                      nodes.delete ? (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              color="primary"
                              checked={nodes.delete}
                              onChange={() =>
                                handleCheckPermision_delete(nodes)
                              }
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "green" }}
                            >
                              Delete
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      ) : (
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              color="primary"
                              checked={nodes.delete}
                              onChange={() =>
                                handleCheckPermision_delete(nodes)
                              }
                            />
                          }
                          label={
                            <Typography
                              variant="title1"
                              color="initial"
                              style={{ fontSize: 12, color: "red" }}
                            >
                              Delete
                            </Typography>
                          }
                          labelPlacement="end"
                        />
                      )
                    ) : (
                      <FormControlLabel
                        value="end"
                        control={
                          <Checkbox
                            color="primary"
                            checked={nodes.delete}
                            onChange={() => handleCheckPermision_delete(nodes)}
                          />
                        }
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
                    )}
                  </Grid>
                </Grid>
                <Divider />
              </div>
            ) : (
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
                </Grid>
                <Divider />
              </div>
            )}
          </div>
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    </div>
  );

  const renderTreeSubMenu = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTreeSubMenu(node))
        : null}
    </TreeItem>
  );

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
                  Role Management
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
              onClick={handleDialogAddRole}
            >
              <AddRoundedIcon />
              <Typography variant="body1" style={{}}>
                New Role
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Paper
            square
            style={{
              minHeight: 50,
              alignItems: "center",
              width: "100%",
            }}
          >
            <Grid
              style={{ padding: 15 }}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                xl={3}
                style={{ flexGrow: 1 }}
              >
                <Typography variant="h6" style={{ fontSize: 25 }}>
                  Role Management
                </Typography>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <TextField
                  select
                  // id="outlined-basic"
                  label="Select Username"
                  variant="outlined"
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                  value={selectUser}
                  onChange={handleSelectUser}
                >
                  {demoUser.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid> */}
            </Grid>
            <Divider />
          </Paper>
        </Grid>

        <Grid container>
          {/* <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Paper square style={{ minHeight: "100%", padding: 20 }}>
              <TreeView
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
              >
                {dataMenu.map((node) => renderTreeSubMenu(node))}
              </TreeView>
            </Paper>
          </Grid> */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper square style={{ minHeight: "100%" }}>
              <Grid container style={{ padding: 30 }}>
                <Grid container>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Role Code</TableCell>
                        <TableCell>Role Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>#User</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                        {/* <TableCell align="center">Sale Amount</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pageData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.rolecode}</TableCell>
                          <TableCell>{row.rolename}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.count}</TableCell>
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
                              onClick={() => handleDialogEditRole(row.rolecode,row.rolename,row.description,row.status)}
                            >
                              <EditRoundedIcon />
                            </IconButton>
                            <IconButton onClick={" "}>
                              <DeleteRoundedIcon />
                            </IconButton>
                          </TableCell>
                          {/* <TableCell align="right">{row.amount}</TableCell> */}
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
          </Grid>
        </Grid>

        {/* ==================== Dialog New Role ========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="md"
          open={dialogAddRole}
          onClose={handleDialogAddRoleClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container>
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
            <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
              <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                New Role
              </DialogTitle>

              <DialogContent>
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        // autoFocus
                        id="outlined-basic"
                        label="Role Code"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        id="outlined-basic"
                        label="Role Name"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        // value={roomTypeDialog}
                        // onChange={handleRoomTypeDialog}
                      >
                        {/* {roomType.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))} */}
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
                      label="Property"
                      select
                      value={userValues}
                      onChange={(event) => handleSelectAttribute(event)}
                    >
                      {attribute.map((option) => (
                        <MenuItem key={option.key} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {chipAttributeDialog.map((data, index) => {
                      return (
                        <Chip
                          style={{ marginTop: 10 }}
                          key={data.key + index}
                          label={data.label}
                          onDelete={handleDeleteAttribute(data)}
                        />
                      );
                    })}
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
                      // id="outlined-multiline-static"
                      label="Description"
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    container
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    // spacing={2}
                    // style={{ paddingTop: 10 }}
                  >
                    <FormControlLabel
                      style={{ paddingTop: 15 }}
                      value="Status"
                      control={
                        <Switch
                          defaultChecked={true}
                          color="primary"
                          onChange={(e) =>
                            e.target.checked
                              ? setStatusRec("Active")
                              : setStatusRec("Inactive")
                          }
                        />
                      }
                      label="Status"
                      labelPlacement="start"
                    />
                  </Grid>
                  <Divider style={{ marginTop: 15 }} />
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
                      value="end"
                      control={<Checkbox color="primary" />}
                      label={
                        <Typography
                          variant="title1"
                          color="initial"
                          style={{ fontSize: 18 }}
                        >
                          Select Permission All
                        </Typography>
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
                </Container>
              </DialogContent>
              <DialogActions style={{ padding: 20 }}>
                <Button
                  onClick={handleDialogAddRoleClose}
                  variant="text"
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDialogAddRoleClose}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>
        {/* ---------------------------------------- */}
        {/* ==================== Dialog Edit Role========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="md"
          open={dialogEditRole}
          onClose={handleDialogEditRoleClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container>
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
            <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
              <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                Edit Role
              </DialogTitle>

              <DialogContent>
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        // autoFocus
                        id="outlined-basic"
                        label="Role Code"
                        variant="outlined"
                        value={editRolecode}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        id="outlined-basic"
                        label="Role Name"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        value={editRolename}
                        // value={roomTypeDialog}
                        // onChange={handleRoomTypeDialog}
                      >
                        {/* {roomType.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))} */}
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
                      label="Property"
                      select
                      value={userValues}
                      onChange={(event) => handleSelectAttribute(event)}
                    >
                      {attribute.map((option) => (
                        <MenuItem key={option.key} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {chipAttributeDialog.map((data, index) => {
                      return (
                        <Chip
                          style={{ marginTop: 10 }}
                          key={data.key + index}
                          label={data.label}
                          onDelete={handleDeleteAttribute(data)}
                        />
                      );
                    })}
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
                      // id="outlined-multiline-static"
                      label="Description"
                      value={editDescription}
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    container
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    // spacing={2}
                    // style={{ paddingTop: 10 }}
                  >
                    <FormControlLabel
                      style={{ paddingTop: 15 }}
                      value="Status"
                      control={
                        statusRec === "Active" || statusRec === "active" ? (
                          <Switch
                            defaultChecked={true}
                            color="primary"
                            // value={checked}
                            // onChange={(e) => setEditStatus(e.target.checked)}

                            onChange={(e) =>
                              e.target.checked
                                ? setStatusRec("Active")
                                : setStatusRec("Inactive")
                            }
                          />
                        ) : (
                          <Switch
                            defaultChecked={false}
                            color="primary"
                            value={editStatus}
                            // onChange={(e) => setEditStatus(e.target.checked)}

                            onChange={(e) =>
                              e.target.checked
                                ? setStatusRec("Active")
                                : setStatusRec("Inactive")
                            }
                          />
                        )
                      }
                      label="Status"
                      labelPlacement="start"
                    />
                  </Grid>
                  <Divider style={{ marginTop: 15 }} />
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
                      value="end"
                      control={<Checkbox color="primary" />}
                      label={
                        <Typography
                          variant="title1"
                          color="initial"
                          style={{ fontSize: 18 }}
                        >
                          Select Permission All
                        </Typography>
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
                </Container>
              </DialogContent>
              <DialogActions style={{ padding: 20 }}>
                <Button
                  onClick={handleDialogEditRoleClose}
                  variant="text"
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDialogEditRoleClose}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>
        {/* ---------------------------------------- */}
      </React.Fragment>
    </Container>
  );
}
