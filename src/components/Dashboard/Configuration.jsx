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
import { ReactReduxContext, useSelector } from "react-redux";
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
  const [languageDialog, setLanguageDialog] = React.useState("EN");
  const [addChildid, setAddChuldid] = React.useState(null);
  const [addChildName, setAddChuldName] = React.useState(null);
  const [addChildValue, setAddChuldValue] = React.useState(null);
  const [page, setPage] = React.useState("");
  const [data, setData] = React.useState(
    // {
    // id: "root",
    // name: "Configuration",
    // children: 
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
    ],
    // }
  )

  // const [store.getState().reducer.configState, setstore.getState().reducer.configState] = React.useState("Configuration");
  const configState = useSelector(state => state.reducer.configState);
  const handleLanguageDialog = (event) => {
    setLanguageDialog(event.target.value);
  };

  const handleClick = (event,name,id) => {
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

  const handleDialogAddClose = () => {
    setDialogAdd(false);
  };

  const handleChangeAdd = (event) => {
    setAddChuldValue(event.target.value);
  };


  const roleclick = () => {
    console.log("testclick")
    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: "UserManagement"
    })
    // configState
    // console.log(event)
    // setstore.getState().reducer.configState("UserManagement")
  }

  const testclick = () => {
    console.log("testclick")
    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: "RoleManagement"
    })
    // configState
    // console.log(event)
    // setstore.getState().reducer.configState("UserManagement")
  }

  // const delnode = (data, key) => {

  //   // data.forEach(function (subdata) {
  //   //   if (subdata.hasOwnProperty('children')) {
  //   //     delnode(subdata.children,)
  //   //   }
  //   // })

  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i].hasOwnProperty('children')) {
  //       delnode(data[i].children, data[i][i])
  //     }
  //   }
  // }

  function addObj(itemArr, nId, newObj) {
    for (var i = 0; i < itemArr.length; i++) {
      if (itemArr[i].id && itemArr[i].id === nId) {
        itemArr.push(newObj);
      } else {
        if (itemArr[i].items) {
          addObj(itemArr[i].items, nId, newObj);
        }
      }
    }
  }

  function chgObj(itemArr, nId, operator, prop, val) {
    for (var i = 0; i < itemArr.length; i++) {
      if (itemArr[i].id && itemArr[i].id === nId) {
        switch (operator) {
          case '+':
            if (!itemArr[i][prop]) {
              itemArr[i][prop] = val;
            }
            break;

          case '-':
            if (itemArr[i][prop]) {
              delete itemArr[i][prop];
            }
            break;

          case '^':
            if (itemArr[i][prop]) {
              itemArr[i][prop] = val;
            }
            break;
        }
      } else {
        if (itemArr[i].items) {
          chgObj(itemArr[i].items, nId, operator, prop, val);
        }
      }
    }
  }

  function dltObj(itemArr, nId) {
    for (var i = 0; i < itemArr.length; i++) {
      if (itemArr[i].id && itemArr[i].id === nId) {
        itemArr.splice(i, 1);
      } else {
        if (itemArr[i].items) {
          dltObj(itemArr[i].items, nId);
        }
      }
    }
  }

  function filterObject(obj, id) {
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (typeof obj[i] == 'object') {
        filterObject(obj[i], id);
      } else if (i.id == id) {
        return null;
      }
    }
    return obj;
  }

  // const delnode = async (data, id) => {

  //   // data.forEach(function (subdata) {
  //   //   if (subdata.hasOwnProperty('children')) {
  //   //     delnode(subdata.children,)
  //   //   }
  //   // })
  //   console.log("hmm")

  //   data.forEach(function (subdata) {
  //     if (subdata.hasOwnProperty('children')) {
  //       delnode(subdata.children, id)
  //     }
  //     console.log(subdata)
  //     console.log(subdata.id,id)
  //     if(subdata.id == id){
  //     console.log("del",subdata.name)
  //     // delete subdata.id;
  //     array.splice(i, 1);
  //     }
  //   })

  //   return data;
  // } 

  async function prune(array, label) {
    console.log("pr")
    console.log(array)
    console.log(array.length)
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.id, label)
      if (obj.id === label) {
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
      console.log(obj.id, label)
      if (obj.id === label) {
        if (obj.children) {
          obj.children = [...obj.children, {
            id: newid,
            name: name,
            createdate: "2021-08-13 13:03:00",
            master: false,
          }]
        } else {
          obj.children = [ {
            id: newid,
            name: name,
            createdate: "2021-08-13 13:03:00",
            master: false,
          }]
        }
      }
      else if (obj.children) {
        adding(obj.children, label, name, newid);
      }
    }
  }


  const handleAdd = async () => {
    let id = addChildid;
    console.log("addparentid", id);
    let newid = await runningid(data, id)
    console.log("newid", newid)
    await (adding(data, id, addChildValue, newid))
    console.log(data)
    // setData(data)
    setDialogAdd(false);
  }


  const renderTree = (nodes) => (
    <div>
      {nodes.name == "Room Master Maintenance" ?
        <TreeItem
          key={nodes.id}
          nodeId={nodes.id}
          label={
            <div>
              <Grid container direction="row" alignItems="center">
                <Grid item className={classes.root}>
                  <Typography
                    variant="body1"
                    color="initial"
                    style={{ paddind: 5 }}
                  >
                    <div onClick={testclick}>
                      {nodes.name}
                    </div>
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton>
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(nodes.id)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                  <IconButton
                      aria-controls={nodes.id}
                      aria-haspopup="true" 
                      onClick={(e)=>handleClick(e,nodes.name,nodes.id)}
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                </Grid>
              </Grid>
              <Divider />
              <Menu
                id={nodes.id}
                anchorEl={addChild}
                keepMounted
                open={Boolean(addChild)}
                onClose={handleClose}
              >
                <MenuItem id={nodes.id+"-"+nodes.name} onClick={handleDialogAdd}>
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
                        onChange={(e) => handleChangeAdd(e) }
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
                    {/* <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
                      <TextField
                        autoFocus
                        id="outlined-basic"
                        label="Decription (en)"
                        variant="outlined"
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
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                      style={{ paddingTop: 20 }}
                    >
                      <Grid item style={{ marginRight: 15 }}>
                        <AddRoundedIcon />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          fullWidth
                          autoFocus
                          id="outlined-select-language"
                          select
                          // fullWidth
                          alignItems="flex-end"
                          label="Add Language"
                          value={languageDialog}
                          onChange={handleLanguageDialog}
                          SelectProps={{
                            native: true,
                          }}
                          variant="outlined"
                        >
                          {language.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid> */}
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
            </div>
          }
        >
          {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </TreeItem>
        : nodes.name == "User Management" ?
          <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={
              <div>
                <Grid container direction="row" alignItems="center">
                  <Grid item className={classes.root}>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={{ paddind: 5 }}
                    >
                      <div onClick={roleclick}>
                        {nodes.name}
                      </div>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(nodes.id)}>
                      <DeleteRoundedIcon />
                    </IconButton>
                    <IconButton
                      aria-controls={nodes.id}
                      aria-haspopup="true" 
                      onClick={(e)=>handleClick(e,nodes.name,nodes.id)}
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider />
                <Menu
                  id={nodes.id}
                  anchorEl={addChild}
                  keepMounted
                  open={Boolean(addChild)}
                  onClose={handleClose}
                >
                  <MenuItem id={nodes.id+"-"+nodes.name} onClick={handleDialogAdd}>
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
                          onChange={(e) => handleChangeAdd(e) }
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
                      {/* <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
                        <TextField
                          autoFocus
                          id="outlined-basic"
                          label="Decription (en)"
                          variant="outlined"
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
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        style={{ paddingTop: 20 }}
                      >
                        <Grid item style={{ marginRight: 15 }}>
                          <AddRoundedIcon />
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            fullWidth
                            autoFocus
                            id="outlined-select-language"
                            select
                            // fullWidth
                            alignItems="flex-end"
                            label="Add Language"
                            value={languageDialog}
                            onChange={handleLanguageDialog}
                            SelectProps={{
                              native: true,
                            }}
                            variant="outlined"
                          >
                            {language.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid> */}
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
              </div>
            }
          >
            {Array.isArray(nodes.children)
              ? nodes.children.map((node) => renderTree(node))
              : null}
          </TreeItem>
          :
          <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={
              <div>
                <Grid container direction="row" alignItems="center">
                  <Grid item className={classes.root}>
                    <Typography
                      variant="body1"
                      color="initial"
                      style={{ paddind: 5 }}
                    >
                      {nodes.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(nodes.id)}>
                      <DeleteRoundedIcon />
                    </IconButton>
                    <IconButton
                      aria-controls={nodes.id}
                      aria-haspopup="true" 
                      onClick={(e)=>handleClick(e,nodes.name,nodes.id)}
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider />
                <Menu
                  id={nodes.id}
                  anchorEl={addChild}
                  keepMounted
                  open={Boolean(addChild)}
                  onClose={handleClose}
                >
                  <MenuItem id={nodes.id+"-"+nodes.name} onClick={handleDialogAdd}>
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
                          onChange={(e) => handleChangeAdd(e) }
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
                      {/* <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
                        <TextField
                          autoFocus
                          id="outlined-basic"
                          label="Decription (en)"
                          variant="outlined"
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
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        style={{ paddingTop: 20 }}
                      >
                        <Grid item style={{ marginRight: 15 }}>
                          <AddRoundedIcon />
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            fullWidth
                            autoFocus
                            id="outlined-select-language"
                            select
                            // fullWidth
                            alignItems="flex-end"
                            label="Add Language"
                            value={languageDialog}
                            onChange={handleLanguageDialog}
                            SelectProps={{
                              native: true,
                            }}
                            variant="outlined"
                          >
                            {language.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid> */}
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
            Configuration
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
        : <UserManagement />
      }
    </div>
  );
}
