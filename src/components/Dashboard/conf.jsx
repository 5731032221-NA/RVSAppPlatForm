import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import TreeItem from "@material-ui/lab/TreeItem";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import RoleManagement from "../RoleManagement";
import UserManagement from "../UserManagement";
import RoomManagement from "../RoomManagement";
import { ReactReduxContext, useSelector } from "react-redux";
import LockIcon from '@material-ui/icons/Https';
import { EDIT_CONFIGSTATE } from "../../middleware/action";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    justifySelf: "center",
    justifyItems: "center",
  },
  selectPage: {
    minWidth: 90,
    textAlign: "center",
  },
});

const language = [
  {
    value: "TH",
    label: "TH",
  },
  {
    value: "EN",
    label: "EN",
  },
];

export default function Configuration() {


  const classes = useStyles();
  const { store } = useContext(ReactReduxContext);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [addChild, setAddchild] = React.useState(null);
  const [dialogAdd, setDialogAdd] = React.useState(false);
  const [dialogEdit, setDialogEdit] = React.useState(false);
  const [languageDialog, setLanguageDialog] = React.useState("EN");
  const [addChildid, setAddChuldid] = React.useState(null);
  const [addChildName, setAddChuldName] = React.useState(null);
  const [addChildValue, setAddChuldValue] = React.useState(null);
  const testa = "testa2";
  const [page, setPage] = React.useState("");
  const [data, setData] = React.useState(
    // {
    // id: "root",
    // name: "Configuration",
    // children: 
    [
      {
        id: 1000000001,
        RefNo: "1.1",
        name: "PMS Configuration",
        createdate: "2021-08-13 12:03:00",
        master: true,
        addchild: false,
        children: [
          {
            id: 1000000002,
            RefNo: "1.1.1",
            name: "Property Configuration",
            createdate: "2021-08-13 12:03:00",
            master: true,
            addchild: false,
            children: [
              {
                id: 1000000003,
                RefNo: "1.1.1.1",
                name: "Property Master",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000004,
                RefNo: "1.1.1.2",
                name: "Building Master",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000005,
                RefNo: "1.1.1.3",
                name: "Exposure ",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000006,
                RefNo: "1.1.1.4",
                name: "Floor ",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000007,
                RefNo: "1.1.1.5",
                name: "Zone/Wing",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
            ],
          },
          {
            id: 1000000008,
            RefNo: "1.1.2",
            name: "Room Configuration",
            createdate: "2021-08-13 12:03:00",
            master: true,
            addchild: false,
            children: [
              {
                id: 1000000009,
                RefNo: "1.1.2.1",
                name: "Room Type",
                master: true,
                addchild: true,
                createdate: "2021-08-13 12:03:00",
              },
              {
                id: 1000000010,
                RefNo: "1.1.2.2",
                name: "Room Category",
                master: true,
                addchild: true,
                createdate: "2021-08-13 12:03:00",
              },
              {
                id: 1000000011,
                RefNo: "1.1.2.3",
                name: "Room Master Maintenance",
                master: true,
                addchild: true,
                createdate: "2021-08-13 12:03:00",
              },
            ],
          },
          {
            id: 1000000012,
            RefNo: "1.1.3",
            name: "Item Configuration",
            createdate: "2021-08-13 12:03:00",
            master: true,
            addchild: false,
            children: [
              {
                id: 1000000013,
                RefNo: "1.1.3.1",
                name: "Item Type",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000014,
                RefNo: "1.1.3.2",
                name: "Item Category",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
            ],
          },
          {
            id: 1000000015,
            RefNo: "1.1.4",
            name: "Reservation Configuration",
            createdate: "2021-08-13 12:03:00",
            master: true,
            addchild: false,
            children: [
              {
                id: 1000000016,
                RefNo: "1.1.4.1",
                name: "Market segment Maintenance",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000017,
                RefNo: "1.1.4.2",
                name: "Source Maintenance",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
            ],
          },
        ],
      },
      {
        id: 1000000018,
        RefNo: "1.2",
        name: "System Configuration",
        createdate: "2021-08-13 12:03:00",
        master: true,
        addchild: false,
        children: [
          {
            id: 1000000019,
            RefNo: "1.2.1",
            name: "User Management",
            createdate: "2021-08-13 12:03:00",
            master: true,
            addchild: true,
          },
          {
            id: 1000000020,
            RefNo: "1.2.2",
            name: "Role Management",
            createdate: "2021-08-13 12:03:00",
            master: true,
            addchild: true,
          },
        ],
      },
    ]

  )

  // const [store.getState().reducer.configState, setstore.getState().reducer.configState] = React.useState("Configuration");
  const configState = useSelector(state => state.reducer.configState);
  const handleLanguageDialog = (event) => {
    setLanguageDialog(event.target.value);
  };

  const handleClick = (event, name, id) => {
    // console.log(event)
    // console.log("ids",event.target.id);
    // console.log("id",event.target.id.split("-")[0]);
    // console.log("name",event.target.id.split("-")[1])
    setAddChuldid(id);
    setAddChuldName(name);

    setAddchild(event.target);
  };

  const handleClose = () => {
    setAddchild(false);
  };
  const handleChangePage = (event) => {
    setPage(event.target.value);
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const handleDialogAdd = (event) => {
    // console.log("ids",event.target.id);
    // console.log("id",event.target.id.split("-")[0]);
    // console.log("name",event.target.id.split("-")[1])
    // setAddChuldid(event.target.id.split("-")[0]);
    // setAddChuldName(event.target.id.split("-")[1]);
    // setAddchild(null);
    setDialogAdd(true);
  };

  const handleDialogEdit = (name, id) => {
    // console.log("ids",event.target.id);
    // console.log("id",event.target.id.split("-")[0]);
    // console.log("name",event.target.id.split("-")[1])
    // setAddChuldid(event.target.id.split("-")[0]);
    // setAddChuldName(event.target.id.split("-")[1]);
    // setAddchild(null);
    setAddChuldid(id);
    setAddChuldName(name);
    setDialogEdit(true);
  };

  const handleDialogAddClose = () => {
    setDialogAdd(false);
  };

  const handleDialogEditClose = () => {
    setDialogEdit(false);
  };


  const handleChangeAdd = (event) => {
    setAddChuldValue(event.target.value);
  };

  const handleConfig = async (name) => {
    if (name == "Role Management") {
      store.dispatch({
        type: EDIT_CONFIGSTATE,
        payload: "RoleManagement"
      })
    } else if (name == "User Management") {
      store.dispatch({
        type: EDIT_CONFIGSTATE,
        payload: "UserManagement"
      })
    } else if (name == "Room Master Maintenance") {
      store.dispatch({
        type: EDIT_CONFIGSTATE,
        payload: "RoomManagement"
      })
    }
  }


  async function prune(array, label) {
    console.log("pr")
    console.log(array)
    console.log(array.length)
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.RefNo, label)
      if (obj.RefNo === label) {
        // splice out 1 element starting at position i
        array.splice(i, 1);
        return true;
      }
      else if (obj.children) {
        prune(obj.children, label)

      }
    }
  }


  const handleDelete = async (id) => {
    console.log("deleteid", id);
    await prune(data, id);
  }

  const maxchildid = async (array, parentid) => {
    let max = 0;
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      let num = parseInt(obj.id.replace(parentid + ".", ""));
      console.log("cc", max, num)
      if (num > max) max = num
    }
    return max;
  }

  const runningid = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.id, label)
      if (obj.id === label) {
        if (obj.children) {
          let newmaxid = await maxchildid(obj.children, obj.id);
          return obj.id + "." + (newmaxid + 1)
        }
        else {
          console.log("label", label)
          console.log("labelid", label + ".1")
          return label + ".1"
        }
      }
      else if (obj.children) {
        let a = await runningid(obj.children, label);
        if (a != undefined) return a;
      }
    }
  }

  const adding = async (array, label, name, newid) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.RefNo, label)
      if (obj.RefNo === label) {
        if (obj.children) {
          obj.children = [...obj.children, {
            RefNo: newid,
            name: name,
            createdate: "2021-08-13 13:03:00",
            master: false,
            addchild: false,
          }]
        } else {
          obj.children = [{
            RefNo: newid,
            name: name,
            createdate: "2021-08-13 13:03:00",
            master: false,
            addchild: false,
          }]
        }
      }
      else if (obj.children) {
        adding(obj.children, label, name, newid);
      }
    }
  }


  const handleAdd = async () => {
    setAddchild(false);
    let id = addChildid;
    console.log("addparentid", id);
    let newid = await runningid(data, id)
    console.log("newid", newid)
    await (adding(data, id, addChildValue, newid))
    console.log("added",data)
    // setData(data)
    setDialogAdd(false);
  }

  const editing = async (array, label, name) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.RefNo, label)
      if (obj.RefNo === label) {

        obj.name = name
      }
      else if (obj.children) {
        editing(obj.children, label, name);
      }
    }
  }

  const handleEdit = async () => {
    let id = addChildid;
    console.log("editparentid", id);
    let newid = await runningid(data, id)
    console.log("newid", newid)
    await (editing(data, id, addChildValue))
    console.log(data)
    // setData(data)
    setDialogEdit(false);
  }


  const renderTree = (nodes) => (
    <div>
      {nodes.addchild == true ?
        <TreeItem
          key={nodes.RefNo}
          nodeId={nodes.RefNo}
          label={
            <div>
              <Grid container direction="row" alignItems="center">
                <Grid item className={classes.root}>
                  <Typography
                    variant="body1"
                    color="initial"
                    style={{ paddind: 5 }}
                  >
                    <div onClick={() => handleConfig(nodes.name)}>
                      {nodes.name}
                    </div>
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => handleDialogEdit(nodes.name, nodes.RefNo)}>
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(nodes.RefNo)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                  <IconButton
                    aria-controls={nodes.RefNo}
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e, nodes.name, nodes.RefNo)}
                  >
                    <MoreVertRoundedIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Divider />
              <Menu
                id={nodes.RefNo}
                anchorEl={addChild}
                keepMounted
                open={Boolean(addChild)}
                onClose={handleClose}
              >
                <MenuItem id={nodes.RefNo + "-" + nodes.name} onClick={handleDialogAdd}>
                  {/* <MenuItem onClick={handleClose}> */}
                  <AddRoundedIcon /> Add child
                </MenuItem>
              </Menu>

              <Dialog
                fullWidth="true"
                maxWidth="xs"
                open={dialogAdd}
                onClose={handleDialogAddClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                  New Master Config
                </DialogTitle>

                <DialogContent>
                  <Container maxWidth="xl" disableGutters>
                    {/* <TextField
                        autoFocus
                        helperText={
                          <Grid
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <Typography variant="title1" color="initial">
                              3/50
                            </Typography>
                          </Grid>
                        }
                        id="outlined-basic"
                        label="Parent"
                        variant="outlined"
                        fullWidth
                      /> */}
                    <h2>Parent Name: {addChildName}</h2>
                    <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
                      <TextField
                        autoFocus
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        onChange={(e) => handleChangeAdd(e)}
                        helperText={
                          <Grid
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <Typography variant="title1" color="initial">
                              0/50
                            </Typography>
                          </Grid>
                        }
                        fullWidth
                      />
                    </Grid>

                  </Container>
                </DialogContent>
                <DialogActions style={{ padding: 20 }}>
                  <Button
                    onClick={handleDialogAddClose}
                    variant="text"
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                fullWidth="true"
                maxWidth="xs"
                open={dialogEdit}
                onClose={handleDialogAddClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                  Edit Master Config
                </DialogTitle>

                <DialogContent>
                  <Container maxWidth="xl" disableGutters>

                    <h2>Old Name: {addChildName}</h2>
                    <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
                      <TextField
                        autoFocus
                        id="outlined-basic"
                        label="New Name"
                        variant="outlined"
                        onChange={(e) => handleChangeAdd(e)}
                        helperText={
                          <Grid
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <Typography variant="title1" color="initial">
                              0/50
                            </Typography>
                          </Grid>
                        }
                        fullWidth
                      />
                    </Grid>

                  </Container>
                </DialogContent>
                <DialogActions style={{ padding: 20 }}>
                  <Button
                    onClick={handleDialogEditClose}
                    variant="text"
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>


            </div>
          }
        >
          {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </TreeItem>
        :
        <TreeItem
          key={nodes.RefNo}
          nodeId={nodes.RefNo}
          label={
            <div>
              <Grid container direction="row" alignItems="center">
                <Grid item className={classes.root}>
                  <Typography
                    variant="body1"
                    color="initial"
                    style={{ paddind: 5 }}
                  >
                    <div onClick={() => handleConfig(nodes.name)}>
                      {nodes.name}
                    </div>
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton>
                    <EditRoundedIcon style={{ color: "#d8d8d8" }} />
                  </IconButton>
                  <IconButton >
                    <DeleteRoundedIcon style={{ color: "#d8d8d8" }} />
                  </IconButton>
                  <IconButton
                    aria-controls={nodes.RefNo}
                    aria-haspopup="true"

                  >
                    <MoreVertRoundedIcon style={{ color: "#d8d8d8" }} />
                  </IconButton>
                </Grid>
              </Grid>

            </div>
          }
        >
          {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </TreeItem>
      }
    </div>
  );

  return (
    <div>
      {configState == "Configuration" ? (
        <Container maxWidth="xl">
          <Typography
            variant="h6"
            style={{ marginBottom: 15, fontSize: 18, color: "blue" }}
          >
            Configuration {data[0][testa]}
          </Typography>
          <Paper elevation={3} style={{ minHeight: 150, width: "100%" }}>
            <Grid container style={{ padding: 20 }}>
              <TreeView
                className={classes.root}
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
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
              >
                {/* {renderTree(data)} */}
                {data.map((node) => renderTree(node))}
              </TreeView>
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
                      //   labelId="demo-simple-select-outlined-label"
                      //   id="demo-simple-select-outlined"
                      value={page}
                      onChange={handleChangePage}
                      label="Page"
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
          </Paper>
        </Container>
      ) : configState == "RoleManagement" ? <RoleManagement />
        : configState == "RoomManagement" ? <RoomManagement />
          : <UserManagement />
      }
    </div>
  );
}
