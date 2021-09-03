import React, { useState, useContext } from "react";
import { ReactReduxContext } from 'react-redux';
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
import Checkbox from "@material-ui/core/Checkbox";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import {
  getuser
} from "../services/user.service";
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
  const [rows, setRows] = useState([]);
  const { store } = useContext(ReactReduxContext);
  React.useEffect(async () => {
    const data = await getuser(sessionStorage.getItem("auth"));
    let userdata = [];
    let i = 0;
    data.content[data.content.length-1].forEach(element =>
      userdata.push(createData(



        element.id,
        "",
        element.role,
        "",
        element.id,
        element.status_record
        
      ))
    );
    console.log("a",userdata)
    setRows(userdata)

  }, []);
  
  const handleDialogAddRole = () => {
    setDialogAddRole(true);
  };

  const handleDialogAddRoleClose = () => {
    setDialogAddRole(false);
  };
  const handleDialogEditRole = () => {
    setDialogEditRole(true);
  };

  const handleDialogEditRoleClose = () => {
    setDialogEditRole(false);
  };
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

        <Paper>
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
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.userID}</TableCell>
                      <TableCell>{row.userName}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.roles}</TableCell>
                      {`${row.status}` === "Active" || (`${row.status}` === "active") ? (
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
                        <IconButton onClick={handleDialogEditRole}>
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={" "}>
                          <SaveRoundedIcon />
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
                    item 11-13 of 13 Total
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="title1" color="initial">
                    Row per Page
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl
                    variant="outlined"
                    size="small"
                    className={classes.selectPage}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Page
                    </InputLabel>
                    <Select
                      // value={page}
                      // onChange={handleChangePage}
                      label="Page"
                      // style={{" "}}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>1-4 of 10</Grid>
                <Grid item>
                  <IconButton>
                    <FirstPageRoundedIcon />
                  </IconButton>
                  <IconButton>
                    <NavigateBeforeRoundedIcon />
                  </IconButton>
                  <IconButton>
                    <NavigateNextRoundedIcon />
                  </IconButton>
                  <IconButton>
                    <LastPageRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        {/* ==================== Dialog New Role ========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="sm"
          open={dialogAddRole}
          onClose={handleDialogAddRoleClose}
          aria-labelledby="form-dialog-title"
        >
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
                  control={<Switch color="primary" />}
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
        </Dialog>
        {/* ---------------------------------------- */}
        {/* ==================== Dialog New Role========================= */}
        <Dialog
          fullWidth="true"
          maxWidth="sm"
          open={dialogEditRole}
          onClose={handleDialogEditRoleClose}
          aria-labelledby="form-dialog-title"
        >
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
                  control={<Switch color="primary" />}
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
        </Dialog>
        {/* ---------------------------------------- */}
      </React.Fragment>
    </Container>
  );
}
