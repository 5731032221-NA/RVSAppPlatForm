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
  const [addChildNameLang, setAddChuldNameLang] = React.useState("");
  const [row, setRow] = React.useState(null);
  const [code, setCode] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [addChildValue, setAddChuldValue] = React.useState(null);
  const testa = "testa2";
  const [page, setPage] = React.useState("");
  const [data, setData] = React.useState(
    // {
    // id: "root",
    // name_en: "Configuration",
    // children: 
    [
      {
        id: 1000000001,
        RefNo: "1.1",
        code: "CFGPMS",
        name_en: "PMS Configuration",
        name_th: "การกำหนดค่า PMS",
        name_cn: "PMS 配置",
        description: "PMS Configuration",
        createdate: "2021-08-13 12:03:00",
        master: true,
        addchild: false,
        children: [
          {
            id: 1000000002,
            RefNo: "1.1.1",
            code: "CFGPROP",
            name_en: "Property Configuration",
            name_th: "การกำหนดค่า Property",
            description: "Property Configuration",
            createdate: "2021-08-13 12:03:00",
            master: true,
            addchild: false,
            children: [
              {
                id: 1000000003,
                RefNo: "1.1.1.1",
                code: "PROPERTY",
                name_en: "Property Master",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000004,
                RefNo: "1.1.1.2",
                code: "BUILDING",
                name_en: "Building Master",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000005,
                RefNo: "1.1.1.3",
                code: "EXPOSURE",
                name_en: "Exposure",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000006,
                RefNo: "1.1.1.4",
                code: "FLOOR",
                name_en: "Floor",
                name_th: "ชั้น",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000007,
                RefNo: "1.1.1.5",
                code: "ZONE",
                name_en: "Zone/Wing",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
            ],
          },
          {
            id: 1000000008,
            RefNo: "1.1.2",
            code: "CFGROOM",
            name_en: "Room Configuration",
            name_th: "การกำหนดค่าห้อง",
            createdate: "2021-08-13 12:03:00",
            master: true,
            addchild: false,
            children: [
              {
                id: 1000000009,
                RefNo: "1.1.2.1",
                code: "RMTYPE",
                name_en: "Room Type",
                name_th: "ประเภทห้อง",
                master: true,
                addchild: true,
                createdate: "2021-08-13 12:03:00",
              },
              {
                id: 1000000010,
                RefNo: "1.1.2.2",
                code: "RMCAT",
                name_en: "Room Category",
                name_th: "ประเภทห้อง",
                master: true,
                addchild: true,
                createdate: "2021-08-13 12:03:00",
              },
              {
                id: 1000000011,
                RefNo: "1.1.2.3",
                code: "ROOM",
                name_en: "Room Master Maintenance",
                name_th: "การบำรุงรักษาห้องมาสเตอร์",
                master: true,
                addchild: true,
                createdate: "2021-08-13 12:03:00",
              },
            ],
          },
          {
            id: 1000000012,
            RefNo: "1.1.3",
            code: "CFGITEM",
            name_en: "Item Configuration",
            name_th: "การกำหนดค่ารายการ",
            createdate: "2021-08-13 12:03:00",
            master: true,
            addchild: false,
            children: [
              {
                id: 1000000013,
                RefNo: "1.1.3.1",
                code: "ITEMTYPE",
                name_en: "Item Type",
                name_th: "ประเภทรายการ",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000014,
                RefNo: "1.1.3.2",
                code: "ITEMCAT",
                name_en: "Item Category",
                name_th: "หมวดหมู่รายการ",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
            ],
          },
          {
            id: 1000000015,
            RefNo: "1.1.4",
            code: "CFGRSVN",
            name_en: "Reservation Configuration",
            name_th: "การกำหนดค่าการจอง",
            createdate: "2021-08-13 12:03:00",
            master: true,
            addchild: false,
            children: [
              {
                id: 1000000016,
                RefNo: "1.1.4.1",
                code: "MARKET",
                name_en: "Market segment Maintenance",
                name_th: "การบำรุงรักษาส่วนตลาด",
                createdate: "2021-08-13 12:03:00",
                master: true,
                addchild: true,
              },
              {
                id: 1000000017,
                RefNo: "1.1.4.2",
                code: "SOURCE",
                name_en: "Source Maintenance",
                name_th: "การบำรุงรักษาแหล่งที่มา",
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
        code: "CFGSYS",
        name_en: "System Configuration",
        name_th: "การกำหนดค่าระบบ",
        createdate: "2021-08-13 12:03:00",
        master: true,
        addchild: false,
        children: [
          {
            id: 1000000019,
            RefNo: "1.2.1",
            code: "USER",
            name_en: "User Management",
            name_th: "การจัดการผู้ใช้",
            createdate: "2021-08-13 12:03:00",
            master: true,
            addchild: true,
          },
          {
            id: 1000000020,
            RefNo: "1.2.2",
            code: "ROLE",
            name_en: "Role Management",
            name_th: "การจัดการบทบาท",
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
  const lang = useSelector(state => state.reducer.lang);
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
    setAddchild(false);
    setDialogAdd(true);
  };

  const handleDialogEdit = (name, id, node) => {
    // console.log("debug",name,id)
    // console.log("ids",event.target.id);
    // console.log("id",event.target.id.split("-")[0]);
    // console.log("name",event.target.id.split("-")[1])
    // setAddChuldid(event.target.id.split("-")[0]);
    // setAddChuldName(event.target.id.split("-")[1]);
    // setAddchild(null);
    setAddChuldid(id);
    setAddChuldName(name);
    setCode(node.code);
    setDescription(node.description)
    setAddChuldNameLang(node["name_"+lang])
    // setRow(node)
    setDialogEdit(true);
  };

  const handleDialogEditLang = (name, namelang, id) => {
    setAddChuldid(id);
    setAddChuldName(name);
    setAddChuldNameLang(namelang);
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
  const handleChangeLang = (event) => {
    setAddChuldNameLang(event.target.value);
  };
  

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleConfig = async (name) => {
    if (name == "ROLE") {
      store.dispatch({
        type: EDIT_CONFIGSTATE,
        payload: "RoleManagement"
      })
    } else if (name == "USER") {
      store.dispatch({
        type: EDIT_CONFIGSTATE,
        payload: "UserManagement"
      })
    } else if (name == "ROOM") {
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
      let num = parseInt(obj.RefNo.replace(parentid + ".", ""));
      console.log("cc", max, num)
      if (num > max) max = num
    }
    return max;
  }

  const runningid = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.RefNo, label)
      if (obj.RefNo === label) {
        if (obj.children) {
          let newmaxid = await maxchildid(obj.children, obj.RefNo);
          return obj.RefNo + "." + (newmaxid + 1)
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
        let currentdate = new Date();
        let day = ("0" + currentdate.getDate()).slice(-2);
        let month = ("0" + (currentdate.getMonth() + 1)).slice(-2);
        let year = currentdate.getFullYear();
        let hours = currentdate.getHours();
        let minutes = currentdate.getMinutes();
        let seconds = currentdate.getSeconds();

        if (obj.children) {
          obj.children = [...obj.children, {
            RefNo: newid,
            code: code,
            name_en: name,
            description: description,
            createdate: (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds),
            master: false,
            addchild: false,
          }]
        } else {
          obj.children = [{
            RefNo: newid,
            code: code,
            name_en: name,
            description: description,
            createdate: (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds),
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
    let id = addChildid;
    console.log("addparentid", id);
    let newid = await runningid(data, id)
    console.log("newid", newid)
    await (adding(data, id, addChildValue, newid))
    console.log("added", data)
    // setData(data)
    setDialogAdd(false);
  }

  const editing = async (array, label, name) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.RefNo, label)
      if (obj.RefNo === label) {
        obj.code = code;
        obj.name_en = name;
        obj.description = description;
      }
      else if (obj.children) {
        editing(obj.children, label, name);
      }
    }
  }

  const handleEdit = async () => {
    let id = addChildid;
    console.log("editparentid", id);
    // let newid = await runningid(data, id)
    // console.log("newid", newid)
    await (editing(data, id, addChildValue))
    console.log(data)
    // setData(data)
    setDialogEdit(false);
  }

  const editingLang = async (array, label, name) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.RefNo, label,addChildNameLang)
      if (obj.RefNo === label) {

        obj.code = code;
        obj.name_en = name;
        obj["name_" + lang] = addChildNameLang;
        obj.description = description;
      }
      else if (obj.children) {
        editingLang(obj.children, label, name);
      }
    }
  }

  const handleEditLang = async () => {
    let id = addChildid;
    console.log("editparentid", id);
    // let newid = await runningid(data, id)
    // console.log("newid", newid)
    await (editingLang(data, id, addChildValue))
    console.log(data)
    // setData(data)
    setDialogEdit(false);
  }



  const renderTree = (nodes) => (
    <div>
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
                  <div onClick={() => handleConfig(nodes.code)}>
                    {nodes["name_" + lang] != null ? nodes["name_" + lang] : nodes["name_en"]}
                    {
                      nodes.master == true ?
                        <LockIcon style={{ paddingTop: 10, color: "blue" }} /> :
                        null
                    }
                  </div>
                </Typography>
              </Grid>
              <Grid item>
                {nodes.master == false || (sessionStorage.getItem("role") == "root" || sessionStorage.getItem("role") == "Root" ) ?
                  <IconButton
                    onClick={() => handleDialogEdit(nodes.code, nodes.RefNo, nodes)}>
                    <EditRoundedIcon />
                  </IconButton>
                  :
                  <IconButton>
                    <EditRoundedIcon style={{ color: "#d8d8d8" }} />
                  </IconButton>
                }
                {nodes.master == false || (sessionStorage.getItem("role") == "root" || sessionStorage.getItem("role") == "Root" )  ?
                  <IconButton onClick={() => handleDelete(nodes.RefNo)}>
                    <DeleteRoundedIcon />
                  </IconButton>
                  :
                  <IconButton >
                    <DeleteRoundedIcon style={{ color: "#d8d8d8" }} />
                  </IconButton>
                }
                {nodes.addchild == true || sessionStorage.getItem("role") == "root" ?
                  <IconButton
                    aria-controls={nodes.RefNo}
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e, nodes.name_en, nodes.RefNo)}
                  >
                    <MoreVertRoundedIcon />
                  </IconButton>
                  :
                  <IconButton
                    aria-controls={nodes.RefNo}
                    aria-haspopup="true"

                  >
                    <MoreVertRoundedIcon style={{ color: "#d8d8d8" }} />
                  </IconButton>
                }
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
              <MenuItem id={nodes.RefNo + "-" + nodes.code} onClick={handleDialogAdd}>
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
              <DialogTitle id="form-dialog-title" style={{ color: "#2D62ED" }}>
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
                      label="Code"
                      variant="outlined"
                      // value={code}
                      onChange={(e) => handleChangeCode(e)}
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

                    <TextField
                      autoFocus
                      id="outlined-basic"
                      label="Name (EN)"
                      variant="outlined"
                      // value={addChildValue}
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

                    <TextField
                      autoFocus
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      // value={description}
                      onChange={(e) => handleChangeDescription(e)}
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

                  <h2>Code: {addChildName}</h2>
                  <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
                    <TextField
                      autoFocus
                      id="outlined-basic"
                      label="Name (EN)"
                      variant="outlined"
                      // defaultValue={row.name_en}
                      value={addChildValue}
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

                  {lang != "en" ?
                  <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
                    <TextField
                      autoFocus
                      id="outlined-basic"
                      label={"Name ("+lang.toUpperCase()+")"}
                      variant="outlined"
                      value={addChildNameLang}
                      onChange={(e) => handleChangeLang(e)}
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
                  :
                  null}

                  <Grid item style={{ paddingLeft: 20, paddingTop: 18 }}>
                    <TextField
                      autoFocus
                      id="outlined-basic"
                      label="Description"
                      variant="outlined"
                      // defaultValue={row.description}
                      value={description}
                      onChange={(e) => handleChangeDescription(e)}
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
                {lang == 'en' ?
                  <Button
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                  > Save
                  </Button>
                  :
                  <Button
                    onClick={handleEditLang}
                    variant="contained"
                    color="primary"
                  > Save
                  </Button>
                }

              </DialogActions>
            </Dialog>



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
