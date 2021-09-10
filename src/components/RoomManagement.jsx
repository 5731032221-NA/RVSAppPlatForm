import React, { useState, useContext } from "react";
// import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ReactReduxContext, useSelector } from "react-redux";
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
  Link
} from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  listRoom,
  postRoom,
  getRoombyid,
  updateRoom,
  getRoombykey,
  deletebyroomnum,
} from "../services/roomMaster.service";
import {
  listallproperty,
  getconfigurationbypropertycode
} from "../services/user.service"

import TablePagination from "@material-ui/core/TablePagination";
import { EDIT_CONFIGSTATE } from "../middleware/action";
// Generate Order Data
function createData(
  id,
  property,
  number,
  roomType,
  floor,
  building,
  desc,
  status,
  attribute
) {
  return {
    id,
    property,
    number,
    roomType,
    floor,
    building,
    desc,
    status,
    attribute,
  };
}


// const roomType = [
//   {
//     value: "SUPERIOR",
//     label: "SUPERIOR",
//   },
//   {
//     value: "DELUX",
//     label: "DELUX",
//   },
// ];
// const building = [
//   {
//     value: "A",
//     label: "A",
//   },
//   {
//     value: "TOWER1",
//     label: "TOWER 1",
//   },

//   {
//     value: "TOWER2",
//     label: "TOWER 2",
//   },
//   {
//     value: "TOWER3",
//     label: "TOWER 3",
//   },
// ];
// const wing = [
//   {
//     value: "East",
//     label: "East",
//   },
//   {
//     value: "North",
//     label: "North",
//   },
//   {
//     value: "South",
//     label: "South",
//   },
//   {
//     value: "West",
//     label: "West",
//   },
// ];
// const exposure = [
//   {
//     value: "{1}",
//     label: "Mountain View",
//   },
//   {
//     value: "{2}",
//     label: "Sea View",
//   },
//   {
//     value: "{3}",
//     label: "Town View",
//   },
//   {
//     value: "{4}",
//     label: "Market View",
//   },
// ];
// const roomSize = [
//   {
//     value: "SQ56",
//     label: "56 sq.m",
//   },
//   {
//     value: "SQ100",
//     label: "100 sq.m",
//   },
// ];
// const roomSeg = [
//   {
//     value: "1",
//     label: "1",
//   },
//   {
//     value: "2",
//     label: "2",
//   },
//   {
//     value: "3",
//     label: "3",
//   },
//   {
//     value: "90",
//     label: "90",
//   },
//   {
//     value: "100",
//     label: "100",
//   },
//   {
//     value: "110",
//     label: "110",
//   },
//   {
//     value: "120",
//     label: "120",
//   },
//   {
//     value: "130",
//     label: "130",
//   },
//   {
//     value: "140",
//     label: "140",
//   },
// ];
// const roomStatus = [
//   {
//     value: "IN",
//     label: "In House",
//   },
//   {
//     value: "VC",
//     label: "Vacant Clean",
//   },
// ];
const attribute = [
  {
    key: "BC",
    label: "BC",
  },
  {
    key: "MINIBAR",
    label: "Minibar",
  },
  {
    key: "NTV",
    label: "NTV",
  },
  {
    key: "SM",
    label: "SM",
  }
];
const userValues = "";

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

export default function RoomManagement() {
  const classes = useStyles();
  const [dialogAddRoom, setDialogAddRoom] = React.useState(false);
  const [dialogEditRoom, setDialogEditRoom] = React.useState(false);
  const [dialogDeleteRoom, setDialogDeleteRoom] = React.useState(false);
  // const [attributeDialog, setAttributeDialog] = React.useState("Minibar");
  const [roomID, setRoomID] = React.useState("");
  const [propertyDialog, setPropertyDialog] = React.useState("");
  const [roomTypeDialog, setRoomTypeDialog] = React.useState("");
  const [buildingDialog, setBuildingDialog] = React.useState("");
  const [wingDialog, setWingDialog] = React.useState("");
  const [exposureDialog, setExposureDialog] = React.useState("");
  const [roomSizeDialog, setRoomSizeDialog] = React.useState("");
  const [roomSegDialog, setRoomSegDialog] = React.useState("");
  const [roomStatusDialog, setRoomStatusDialog] = React.useState("");
  const [chipAttributeDialog, setChipAttributeDialog] = React.useState([]);
  const [roomNumber, setRoomNumber] = React.useState(null);
  const [roomDesc, setRoomDesc] = React.useState(null);
  const [roomFloor, setRoomFloor] = React.useState(null);
  const [searchKey, setSearchKey] = React.useState(null);
  const pageProperty = useSelector(state => state.reducer.property);
  const [properties, setProperty] = React.useState([]);
  const [roomType, setRoomType] = React.useState([]);
  const [building, setBuilding] = React.useState([]);
  const [exposure, setExposure] = React.useState([]);
  const [roomSize, setRoomSize] = React.useState([]);
  const [roomSeg, setRoomSeg] = React.useState([]);
  const [roomStatus, setRoomStatus] = React.useState([]);
  const [wing, setWing] = React.useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);
  //Master Config
  const [rows, setRows] = useState([
    // createData(
    //   0,
    //   "FSDH",
    //   "8038",
    //   "SUPERVISOR",
    //   "3RDFLOOR",
    //   "TOWER1",
    //   "Desription",
    //   "IN",
    //   "-"
    // ),
  ]);
  const [pageData, setPageData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { store } = useContext(ReactReduxContext);
  React.useEffect(async () => {
    const data = await listRoom(sessionStorage.getItem("auth"));
    console.log("data", data);
    let roomdata = [];
    let i = 0;
    data.content[data.content.length - 1].forEach((element) =>
      roomdata.push(
        createData(
          element.id,
          element.propertycode,
          element.no,
          element.type,
          element.floor,
          element.building,
          element.description,
          element.status,
          element.attribute
        )
      )
    );
    console.log("a", roomdata);
    setRows(roomdata);
    updatePageData(roomdata, page, rowsPerPage);
  }, []);

  const updatePageData = async (rowsdata, _page, _rowsPerPage) => {
    let data = [];
    console.log("rowsdata", rowsdata);
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

  const handleAttributeDialog = (event) => {
    setChipAttributeDialog(event.target.value);
  };

  const handleRoomNumber = (event) => {
    setRoomNumber(event.target.value);
  };
  const handleDescription = (event) => {
    setRoomDesc(event.target.value);
  };
  const handleFloor = (event) => {
    setRoomFloor(event.target.value);
  };

  const handlePropertyDialog = async (event) => {
    let getconfigdata = await getconfigurationbypropertycode(sessionStorage.getItem("auth"), event.target.value);
    let configdata = getconfigdata.content[getconfigdata.content.length - 1]
    let listroomtype = await getlist(configdata, "Room Type");
    let listWing = await getlist(configdata, "Zone/Wing");
    let listBuilding = await getlist(configdata, "Building Master");
    let listExposure = await getlist(configdata, "Exposure");
    let listRoomSize = await getlist(configdata, "Room Size");
    let listRoomSeg = await getlist(configdata, "Room Seg");
    let listRoomStatus = await getlist(configdata, "Room Status");

    setWing(listWing)
    setRoomType(listroomtype);
    setBuilding(listBuilding);
    setExposure(listExposure);
    setRoomSize(listRoomSize);
    setRoomSeg(listRoomSeg);
    setRoomStatus(listRoomStatus);
    setPropertyDialog(event.target.value);
  };
  const handleRoomTypeDialog = (event) => {
    setRoomTypeDialog(event.target.value);
  };
  const handleBuildingDialog = (event) => {
    setBuildingDialog(event.target.value);
  };
  const handleWingDialog = (event) => {
    setWingDialog(event.target.value);
  };
  const handleExposureDialog = (event) => {
    setExposureDialog(event.target.value);
  };
  const handleRoomSizeDialog = (event) => {
    setRoomSizeDialog(event.target.value);
  };
  const handleRoomSegDialog = (event) => {
    setRoomSegDialog(event.target.value);
  };
  const handleRoomStatusDialog = (event) => {
    setRoomStatusDialog(event.target.value);
  };

  async function getlist(config, field) {

    for (var i = 0; i < config.length; i++) {
      var obj = config[i];
      if (obj.name_en === field) {
        let list = [];
        obj.children.forEach(element =>
          list.push({
            value: element.name_en,
            label: element.name_en
          })
        );
        return list;
      }
      else if (obj.children) {
        let _getlist = await getlist(obj.children, field);
        if (_getlist) return _getlist;

      }
    }
  }

  const handleDialogAddRoom = async () => {
    let propertydata = await listallproperty(sessionStorage.getItem("auth"));
    let tempproperty = [];
    propertydata.content[propertydata.content.length - 1].split(",").forEach((element) => {
      if (tempproperty.filter(x => x.label === element).length == 0) {
        tempproperty.push({
          value: element,
          label: element,
        })
      }
    }
    );
    let getconfigdata = await getconfigurationbypropertycode(sessionStorage.getItem("auth"), pageProperty);
    let configdata = getconfigdata.content[getconfigdata.content.length - 1]
    let listroomtype = await getlist(configdata, "Room Type");
    let listWing = await getlist(configdata, "Zone/Wing");
    let listBuilding = await getlist(configdata, "Building Master");
    let listExposure = await getlist(configdata, "Exposure");
    let listRoomSize = await getlist(configdata, "Room Size");
    let listRoomSeg = await getlist(configdata, "Room Seg");
    let listRoomStatus = await getlist(configdata, "Room Status");

    setProperty(tempproperty);
    setWing(listWing);
    setRoomType(listroomtype);
    setBuilding(listBuilding);
    setExposure(listExposure);
    setRoomSize(listRoomSize);
    setRoomSeg(listRoomSeg);
    setRoomStatus(listRoomStatus);

    setChipAttributeDialog([]);
    setPropertyDialog(pageProperty);
    setRoomTypeDialog(listroomtype[0].value);
    setBuildingDialog(listBuilding[0].value);
    setWingDialog(listWing[0].value);
    setExposureDialog(listExposure[0].value);
    setRoomSizeDialog(listRoomSize[0].value);
    setRoomSegDialog(listRoomSeg[0].value);
    setRoomStatusDialog(listRoomStatus[0].value);

    setErrorMessage(false);
    setDialogAddRoom(true);
  };

  const handleDialogAddRoomClose = () => {
    setDialogAddRoom(false);
  };

  const handleComponentState = async (comp) => {
    console.log("setcomp", comp)
    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: comp
    })
  }

  const handleDialogEditRoom = async (roomNo) => {
    let propertydata = await listallproperty(sessionStorage.getItem("auth"));
    let tempproperty = [];
    propertydata.content[propertydata.content.length - 1].split(",").forEach((element) => {
      if (tempproperty.filter(x => x.label === element).length == 0) {
        tempproperty.push({
          value: element,
          label: element,
        })
      }
    }
    );


    const dataRoombyid = await getRoombyid(
      sessionStorage.getItem("auth"),
      roomNo
    );
    console.log("dataRoombyid", dataRoombyid);

    let getconfigdata = await getconfigurationbypropertycode(sessionStorage.getItem("auth"), dataRoombyid.content[0].propertycode);
    let configdata = getconfigdata.content[getconfigdata.content.length - 1]
    let listroomtype = await getlist(configdata, "Room Type");
    let listWing = await getlist(configdata, "Zone/Wing");
    let listBuilding = await getlist(configdata, "Building Master");
    let listExposure = await getlist(configdata, "Exposure");
    let listRoomSize = await getlist(configdata, "Room Size");
    let listRoomSeg = await getlist(configdata, "Room Seg");
    let listRoomStatus = await getlist(configdata, "Room Status");

    setProperty(tempproperty);
    setWing(listWing);
    setRoomType(listroomtype);
    setBuilding(listBuilding);
    setExposure(listExposure);
    setRoomSize(listRoomSize);
    setRoomSeg(listRoomSeg);
    setRoomStatus(listRoomStatus);

    setChipAttributeDialog([]);
    setRoomID(dataRoombyid.content[0].id)
    setPropertyDialog(dataRoombyid.content[0].propertycode);
    setRoomTypeDialog(dataRoombyid.content[0].type);
    setBuildingDialog(dataRoombyid.content[0].building);
    setWingDialog(dataRoombyid.content[0].wing);
    setExposureDialog(dataRoombyid.content[0].exposureids);
    setRoomSizeDialog(dataRoombyid.content[0].sqsize);
    setRoomSegDialog(dataRoombyid.content[0].seq);
    setRoomStatusDialog(dataRoombyid.content[0].status);
    setRoomNumber(dataRoombyid.content[0].no);
    setRoomDesc(dataRoombyid.content[0].description);
    setRoomFloor(dataRoombyid.content[0].floor);
    const roomDataEdit = dataRoombyid.content[0].attribute;
    var tempRoom = roomDataEdit.split(",");
    for (let i in attribute) {
      if (tempRoom.includes(attribute[i].key)) {
        setChipAttributeDialog((prevState) => [
          ...prevState,
          { key: attribute[i].key, label: attribute[i].label },
        ]);
      }
    }

    setErrorMessage(false);
    setDialogEditRoom(true);
  };

  const handleDialogEditRoomSave = async (
    roomNo,
    propertyDialog,
    roomTypeDialog,
    buildingDialog,
    wingDialog,
    exposureDialog,
    roomSizeDialog,
    roomSegDialog,
    roomStatusDialog,
    chipAttributeDialog,
    roomDesc,
    roomFloor
  ) => {
    console.log(`
      roomNo : ${roomNo},
      propertyDialog : ${propertyDialog},
      roomTypeDialog : ${roomTypeDialog},
      buildingDialog : ${buildingDialog},
      wingDialog : ${wingDialog},
      exposureDialog : ${exposureDialog},
      roomSizeDialog : ${roomSizeDialog},
      roomSegDialog : ${roomSegDialog},
      roomStatusDialog : ${roomStatusDialog},
      chipAttributeDialog : ${chipAttributeDialog},
      roomDesc : ${roomDesc},
      roomFloor : ${roomFloor}`);
    if (roomNo == null) { setErrorMessage(true); setErrorParameter("Room Number"); }
    else if (roomFloor == null) { setErrorMessage(true); setErrorParameter("Floor"); }
    else {
      setErrorMessage(false);
      const AttributeTemp = new Set();
      if (chipAttributeDialog.length) {
        for (var A in chipAttributeDialog) {
          AttributeTemp.add(chipAttributeDialog[A].key);
        }
      }
      const attributeTempArray = Array.from(AttributeTemp).join(",");

      const dataRoombyid = await updateRoom(
        sessionStorage.getItem("auth"),
        roomID,
        {
          roomNo: roomNo,
          propertyDialog: propertyDialog,
          roomTypeDialog: roomTypeDialog,
          buildingDialog: buildingDialog,
          wingDialog: wingDialog,
          exposureDialog: exposureDialog,
          roomSizeDialog: roomSizeDialog,
          roomSegDialog: roomSegDialog,
          roomStatusDialog: roomStatusDialog,
          chipAttributeDialog: attributeTempArray,
          roomDesc: roomDesc,
          roomFloor: roomFloor,
        }
      );
      console.log("dataRoombyid", dataRoombyid);

      const data = await listRoom(sessionStorage.getItem("auth"));
      console.log("data", data);
      let roomdata = [];
      let i = 0;
      data.content[data.content.length - 1].forEach((element) =>
        roomdata.push(
          createData(
            element.id,
            element.propertycode,
            element.no,
            element.type,
            element.floor,
            element.building,
            element.description,
            element.status,
            element.attribute
          )
        )
      );
      console.log("a", roomdata);
      setRows(roomdata);
      updatePageData(roomdata, page, rowsPerPage);

      setDialogEditRoom(false);
    }
  };

  const handleDialogEditRoomClose = () => {
    setDialogEditRoom(false);
  };

  const handleSelectAttribute = (event, key) => {
    console.log(event);
    console.log(key.props);
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
          { key: key.props.name, label: event.target.value },
        ]);
      }
    } else {
      setChipAttributeDialog([
        ...chipAttributeDialog,
        { key: key.props.name, label: event.target.value },
      ]);
    }
  };
  const handleDeleteAttribute = (chipToDelete) => () => {
    setChipAttributeDialog((chips) =>
      chips.filter((chips) => chips.key !== chipToDelete.key)
    );
  };

  const handleDialogInsert = async (
    roomNo,
    propertyDialog,
    roomTypeDialog,
    buildingDialog,
    wingDialog,
    exposureDialog,
    roomSizeDialog,
    roomSegDialog,
    roomStatusDialog,
    chipAttributeDialog,
    roomDesc,
    roomFloor
  ) => {
    console.log(`
    ================= Insert ================
      roomNo : ${roomNo},
      propertyDialog : ${propertyDialog},
      roomTypeDialog : ${roomTypeDialog},
      buildingDialog : ${buildingDialog},
      wingDialog : ${wingDialog},
      exposureDialog : ${exposureDialog},
      roomSizeDialog : ${roomSizeDialog},
      roomSegDialog : ${roomSegDialog},
      roomStatusDialog : ${roomStatusDialog},
      chipAttributeDialog : ${chipAttributeDialog},
      roomDesc : ${roomDesc},
      roomFloor : ${roomFloor}`);
    if (roomNo == null) { setErrorMessage(true); setErrorParameter("Room Number"); }
    else if (roomFloor == null) { setErrorMessage(true); setErrorParameter("Floor"); }
    else {
      setErrorMessage(false);
      const AttributeTemp = new Set();
      if (chipAttributeDialog.length) {
        for (var A in chipAttributeDialog) {
          AttributeTemp.add(chipAttributeDialog[A].key);
        }
      }
      const attributeTempArray = Array.from(AttributeTemp).join(",");

      const postData = await postRoom(sessionStorage.getItem("auth"), {
        roomNo: roomNo,
        propertyDialog: propertyDialog,
        roomTypeDialog: roomTypeDialog,
        buildingDialog: buildingDialog,
        wingDialog: wingDialog,
        exposureDialog: exposureDialog,
        roomSizeDialog: roomSizeDialog,
        roomSegDialog: roomSegDialog,
        roomStatusDialog: roomStatusDialog,
        chipAttributeDialog: attributeTempArray,
        roomDesc: roomDesc,
        roomFloor: roomFloor,
      });
      console.log("postData", postData);

      const data = await listRoom(sessionStorage.getItem("auth"));
      console.log("data", data);
      let roomdata = [];
      let i = 0;
      data.content[data.content.length - 1].forEach((element) =>
        roomdata.push(
          createData(
            element.id,
            element.propertycode,
            element.no,
            element.type,
            element.floor,
            element.building,
            element.description,
            element.status,
            element.attribute
          )
        )
      );
      console.log("a", roomdata);
      setRows(roomdata);
      updatePageData(roomdata, page, rowsPerPage);

      setDialogAddRoom(false);
    }
  };

  const handleSeaarch = (event) => {
    setSearchKey(event.target.value);
  };

  const handleSeaarchRequest = async (forSearch) => {
    console.log("forSearch", forSearch);
    if (forSearch === null || forSearch === undefined || forSearch === "") {
      const data = await listRoom(sessionStorage.getItem("auth"));
      console.log("data", data);
      let roomdata = [];
      let i = 0;
      data.content[data.content.length - 1].forEach((element) =>
        roomdata.push(
          createData(
            i++,
            element.propertycode,
            element.no,
            element.type,
            element.floor,
            element.building,
            element.description,
            element.status,
            element.attribute
          )
        )
      );
      console.log("a", roomdata);
      setRows(roomdata);
      updatePageData(roomdata, page, rowsPerPage);
    } else {
      const databysearch = await getRoombykey(
        sessionStorage.getItem("auth"),
        forSearch
      );
      console.log("databysearch", databysearch);
      if (databysearch.content.length != null) {
        let roomdata = [];
        let i = 0;
        databysearch.content[databysearch.content.length - 1].forEach(
          (element) =>
            roomdata.push(
              createData(
                element.id,
                element.propertycode,
                element.no,
                element.type,
                element.floor,
                element.building,
                element.description,
                element.status,
                element.attribute
              )
            )
        );
        console.log("a", roomdata);
        setRows(roomdata);
        updatePageData(roomdata, page, rowsPerPage);
      }
    }
  };

  const handleDialogDeleteRoomClose = () => {
    setDialogDeleteRoom(false);
  };

  const handleDialogDeleteRoomOpen = async (roomNum) => {
    setRoomNumber(roomNum);
    setDialogDeleteRoom(true);
  };

  const handleDialogDelete = async (roomNum) => {
    console.log("roomNum for delete : ", roomNum);

    const roomDelete = await deletebyroomnum(
      sessionStorage.getItem("auth"),
      roomNum
    );
    console.log("roomDelete func:", roomDelete);

    const data = await listRoom(sessionStorage.getItem("auth"));
    console.log("data", data);
    let roomdata = [];
    let i = 0;
    data.content[data.content.length - 1].forEach((element) =>
      roomdata.push(
        createData(
          i++,
          element.propertycode,
          element.no,
          element.type,
          element.floor,
          element.building,
          element.description,
          element.status,
          element.attribute
        )
      )
    );
    console.log("a", roomdata);
    setRows(roomdata);
    updatePageData(roomdata, page, rowsPerPage);

    setDialogDeleteRoom(false);
  };

  return (
    <Container maxWidth="xl">
      <React.Fragment>

        <Paper>
          <Grid
            container

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
                <Link color="inherit" href="#" onClick={() => handleComponentState("Configuration")}>
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
                    PMS Configuration
                  </Typography>
                </Link>
                <Link color="inherit" href="#" onClick={" "}>
                  <Typography
                    variant="h6"
                    style={{ marginBottom: 15, fontSize: 14 }}
                  >
                    Room Configuration
                  </Typography>
                </Link>
                <Typography>
                  <Typography
                    variant="h6"
                    style={{ marginBottom: 15, fontSize: 14 }}
                  >
                    Room Master Maintenance
                  </Typography>
                </Typography>
              </Breadcrumbs>
            </Grid>

            <Grid container style={{ padding: 30 }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                style={{ marginBottom: 30 }}
              >
                <Grid item style={{ marginLeft: 10, marginRight: 20 }}>
                  <Typography
                    variant="h6"
                    style={{ fontSize: 25, color: "black" }}
                  >
                    Room Master
                  </Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item className={classes.searchLayout}>
                  <TextField
                    id="standard-basic"
                    label=" Search "
                    htmlFor="Search"
                    href="#"
                    type="text"
                    style={{ maxWidth: 600 }}
                    fullWidth
                    onChange={(e) => handleSeaarch(e)}
                    onKeyDown={(event) =>
                      event.key === "Enter"
                        ? handleSeaarchRequest(searchKey)
                        : null
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          onClick={() => handleSeaarchRequest(searchKey)}
                          position="end"
                        >
                          <SearchRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item style={{ marginLeft: 20, marginRight: 20 }}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#2D62ED",
                      color: "white",
                      textAlign: "center",
                    }}
                    onClick={handleDialogAddRoom}
                  >
                    NEW ROOM MASTER
                  </Button>
                </Grid>
              </Grid>

              <Grid container>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Property</TableCell>
                      <TableCell>#Number</TableCell>
                      <TableCell>Room Type</TableCell>
                      <TableCell>Floor</TableCell>
                      <TableCell>Building</TableCell>
                      <TableCell>Desc</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Attribute</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pageData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.property}</TableCell>
                        <TableCell style={{ color: "blue" }}>
                          {row.number}
                        </TableCell>
                        <TableCell>{row.roomType}</TableCell>
                        <TableCell>{row.floor}</TableCell>
                        <TableCell>{row.building}</TableCell>
                        <TableCell>{row.desc}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{row.attribute}</TableCell>

                        <TableCell align="center">
                          <IconButton
                            onClick={() =>
                              handleDialogEditRoom(
                                row.number,
                                row.property,
                                row.roomType
                              )
                            }
                          >
                            <EditRoundedIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDialogDeleteRoomOpen(row.number)}
                          >
                            <DeleteRoundedIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* ==================== Dialog New Room========================= */}
                <Dialog
                  fullWidth="true"
                  maxWidth="sm"
                  open={dialogAddRoom}
                  onClose={handleDialogAddRoomClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                    New Room Master
                  </DialogTitle>

                  <DialogContent>
                    <Container maxWidth="xl" disableGutters>
                      <Grid container>
                        <TextField
                          autoFocus
                          select
                          id="outlined-basic"
                          label="Property"
                          variant="outlined"
                          defaultValue={pageProperty}
                          fullWidth
                          SelectProps={{
                            native: true,
                          }}
                          // value={propertyDialog}
                          onChange={(event) => handlePropertyDialog(event)}
                        >
                          {properties.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid container spacing={2} style={{ paddingTop: 10 }}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            // autoFocus
                            id="outlined-basic"
                            label="Room Number"
                            variant="outlined"
                            // value={roomNumber}
                            defaultValue={""}
                            onChange={(e) => handleRoomNumber(e)}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            // autoFocus
                            select
                            id="outlined-basic"
                            label="Room Type"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            // value={roomTypeDialog}
                            defaultValue={""}
                            onChange={(e) => handleRoomTypeDialog(e)}
                          >
                            {roomType.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} style={{ paddingTop: 15 }}>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                          <TextField
                            // autoFocus
                            id="outlined-basic"
                            label="Floor"
                            variant="outlined"
                            fullWidth
                            // value={roomFloor}
                            defaultValue={""}
                            onChange={(e) => handleFloor(e)}
                          />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                          <TextField
                            // autoFocus
                            select
                            id="outlined-basic"
                            label="Building"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            // value={buildingDialog}
                            defaultValue={""}
                            onChange={(e) => handleBuildingDialog(e)}
                          >
                            {building.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                          <TextField
                            // autoFocus
                            select
                            id="outlined-basic"
                            label="Wing"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            // value={wingDialog}
                            defaultValue={""}
                            onChange={(e) => handleWingDialog(e)}
                          >
                            {wing.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} style={{ paddingTop: 5 }}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            // autoFocus
                            select
                            id="outlined-basic"
                            label="Exposure"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            // value={exposureDialog}
                            defaultValue={""}
                            onChange={(e) => handleExposureDialog(e)}
                          >
                            {exposure.map((option) => (
                              <option key={option.value} value={option.value}>
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
                            label="Room Size"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            // value={roomSizeDialog}
                            defaultValue={""}
                            onChange={(e) => handleRoomSizeDialog(e)}
                          >
                            {roomSize.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} style={{ paddingTop: 5 }}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            // autoFocus
                            select
                            id="outlined-basic"
                            label="Room Seg"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            // value={roomSegDialog}
                            defaultValue={""}
                            onChange={(e) => handleRoomSegDialog(e)}
                          >
                            {roomSeg.map((option) => (
                              <option key={option.value} value={option.value}>
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
                            label="Room Status"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            // value={roomStatusDialog}
                            defaultValue={""}
                            onChange={(e) => handleRoomStatusDialog(e)}
                          >
                            {roomStatus.map((option) => (
                              <option key={option.value} value={option.value}>
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
                          label="Attribute"
                          select
                          // value={" "}
                          defaultValue={""}
                          onChange={(event, key) =>
                            handleSelectAttribute(event, key)
                          }
                        >
                          {attribute.map((option) => (
                            <MenuItem
                              key={option.key}
                              name={option.key}
                              value={option.label}
                            >
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
                          defaultValue={""}
                          onChange={(e) => handleDescription(e)}
                        />
                      </Grid>
                    </Container>
                    {errorMessage ? <div style={{ background: "#ff0033", textAlign: "center", color: "white", height: "30px", paddingTop: 5 }}>{errorParameter} is required</div> : null}
                  </DialogContent>
                  <DialogActions style={{ padding: 20 }}>
                    <Button
                      onClick={handleDialogAddRoomClose}
                      variant="text"
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleDialogInsert(
                          roomNumber,
                          propertyDialog,
                          roomTypeDialog,
                          buildingDialog,
                          wingDialog,
                          exposureDialog,
                          roomSizeDialog,
                          roomSegDialog,
                          roomStatusDialog,
                          chipAttributeDialog,
                          roomDesc,
                          roomFloor
                        )
                      }
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
                {/* ---------------------------------------- */}
                {/* ==================== Dialog Edit Room ========================= */}
                <Dialog
                  fullWidth="true"
                  maxWidth="sm"
                  open={dialogEditRoom}
                  onClose={handleDialogEditRoomClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                    Edit Room Master
                  </DialogTitle>

                  <DialogContent>
                    <Container maxWidth="xl" disableGutters>
                      <Grid container>
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
                          defaultValue={propertyDialog}
                          onChange={(event) => handlePropertyDialog(event)}
                        >
                          {properties.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid container spacing={2} style={{ paddingTop: 10 }}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            // autoFocus
                            id="outlined-basic"
                            label="Room Number"
                            variant="outlined"
                            fullWidth
                            value={roomNumber}
                            onChange={(e) => handleRoomNumber(e)}
                          />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            // autoFocus
                            select
                            id="outlined-basic"
                            label="Room Type"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            value={roomTypeDialog}
                            onChange={(e) => handleRoomTypeDialog(e)}
                          >
                            {roomType.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} style={{ paddingTop: 15 }}>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                          <TextField
                            // autoFocus
                            id="outlined-basic"
                            label="Floor"
                            variant="outlined"
                            fullWidth
                            value={roomFloor}
                            onChange={(e) => handleFloor(e)}
                          />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                          <TextField
                            // autoFocus
                            select
                            id="outlined-basic"
                            label="Building"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            value={buildingDialog}
                            onChange={(e) => handleBuildingDialog(e)}
                          >
                            {building.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                          <TextField
                            // autoFocus
                            select
                            id="outlined-basic"
                            label="Wing"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            value={wingDialog}
                            onChange={(e) => handleWingDialog(e)}
                          >
                            {wing.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} style={{ paddingTop: 5 }}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            // autoFocus
                            select
                            id="outlined-basic"
                            label="Exposure"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            value={exposureDialog}
                            onChange={(e) => handleExposureDialog(e)}
                          >
                            {exposure.map((option) => (
                              <option key={option.value} value={option.value}>
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
                            label="Room Size"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            value={roomSizeDialog}
                            onChange={(e) => handleRoomSizeDialog(e)}
                          >
                            {roomSize.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} style={{ paddingTop: 5 }}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                          <TextField
                            // autoFocus
                            select
                            id="outlined-basic"
                            label="Room Seg"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            value={roomSegDialog}
                            onChange={(e) => handleRoomSegDialog(e)}
                          >
                            {roomSeg.map((option) => (
                              <option key={option.value} value={option.value}>
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
                            label="Room Status"
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                              native: true,
                            }}
                            value={roomStatusDialog}
                            onChange={(e) => handleRoomStatusDialog(e)}
                          >
                            {roomStatus.map((option) => (
                              <option key={option.value} value={option.value}>
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
                          label="Attribute"
                          select
                          // name={key}
                          value={chipAttributeDialog}
                          onChange={(event, key) =>
                            handleSelectAttribute(event, key)
                          }
                        >
                          {attribute.map((option) => (
                            <MenuItem
                              key={option.key}
                              name={option.key}
                              value={option.label}
                            >
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
                          label="Description"
                          multiline
                          rows={4}
                          variant="outlined"
                          value={roomDesc}
                          onChange={(e) => handleDescription(e)}
                        />
                      </Grid>
                    </Container>
                    {errorMessage ? <div style={{ background: "#ff0033", textAlign: "center", color: "white", height: "30px", paddingTop: 5 }}>{errorParameter} is required</div> : null}
                  </DialogContent>
                  <DialogActions style={{ padding: 20 }}>
                    <Button
                      onClick={handleDialogEditRoomClose}
                      variant="text"
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() =>
                        handleDialogEditRoomSave(
                          roomNumber,
                          propertyDialog,
                          roomTypeDialog,
                          buildingDialog,
                          wingDialog,
                          exposureDialog,
                          roomSizeDialog,
                          roomSegDialog,
                          roomStatusDialog,
                          chipAttributeDialog,
                          roomDesc,
                          roomFloor
                        )
                      }
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
                {/* -------------------------------------- */}

                {/* ==================== Dialog Delete User========================= */}
                <Dialog
                  maxWidth="sm"
                  open={dialogDeleteRoom}
                  onClose={handleDialogDeleteRoomClose}
                  aria-labelledby="form-dialog-title"
                >
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <DialogTitle
                        id="form-dialog-title"
                        style={{ color: "blue" }}
                      >
                        Confirm Delete Room Information
                      </DialogTitle>
                      <DialogContent>
                        <Typography variant="h5" color="initial">
                          Confirm Delete Room : {roomNumber}
                        </Typography>
                      </DialogContent>
                      <DialogActions style={{ padding: 20 }}>
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
                              onClick={handleDialogDeleteRoomClose}
                              variant="contained"
                              color="default"
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item sm={6} md={6} lg={6} xl={6}>
                            <Button
                              fullWidth
                              onClick={() => handleDialogDelete(roomNumber)}
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
                {/* ---------------------------------------- */}
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
          </Grid>
        </Paper>
      </React.Fragment>
    </Container>
  );
}
