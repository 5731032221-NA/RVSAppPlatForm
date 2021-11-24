import uuid from 'react-native-uuid';
import React, { useState, useContext } from "react";
import "../assets/login.css";
import "../assets/variable.css";
import background from "../assets/img/imgbackground.png";
import backgroundLogo from "../assets/img/imgbackground-logo.png";
import BusinessIcon from '@material-ui/icons/Business';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Box from '@material-ui/core/Box';
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { FormControl, FormLabel, Select, MenuItem } from '@material-ui/core';
import menus from "../services/menus.service";
import propertypermission from "../services/propertypermission.service";
import { getasset } from "../services/assest.service";
import propertyrole from "../services/propertyrole.service"
import { useCookies } from 'react-cookie';

import { ReactReduxContext } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  paper: {
    flex: "display",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: theme.spacing(38),
    height: theme.spacing(48),
    marginTop: 100,
  },
  imglogo: {
    maxHeight: 220, maxWidth: 220,
  },
  formlogin: {
    marginBottom: 20, padding: 10,
  },
  sysname: {
    color: "#393737", fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 15
  },
  errorMessage: {
    color: "#ff0033", fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 15
  },
  seletprop: {
    fontSize: 15,
    color: "#164BD8",
    paddingBottom: 20
  }
}));

export default function Property({ setToken, setProperty }) {
  const { store } = useContext(ReactReduxContext);
  const classes = useStyles();
  const [selectedProperty, setSelectedProperty] = useState(JSON.parse(sessionStorage.getItem("grantproperty"))[0].propertycode);
  const [cookies, setCookie] = useCookies(['name']);

  const pageProperty = useSelector((state) => state.reducer.property);
  const [data, setData] = React.useState([]);

  const [dialogAdd, setDialogAdd] = React.useState(false);
  const [dialogEdit, setDialogEdit] = React.useState(false);
  const [dialogDelete, setDialogDelete] = React.useState(false);
  const [rows, setRows] = useState([]);

  const [pageData, setPageData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [properties, setProperty] = React.useState([]);
  const [deviceTypes, setDeviceType] = useState([
    {
      key: "1",
      label: "COMP",
    },
    {
      key: "2",
      label: "PRINT",
    },
  ]);

  const [updateData, setUpdateData] = useState({});

  const [errorMessage, setErrorMessage] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);

  const [errorMessageDu, setErrorMessageDu] = useState(false);
  const [errorParameterDu, setErrorParameterDu] = useState(null);

  React.useEffect(async () => {
    // macaddress.all().then(function (all) {
    //   console.log(JSON.stringify(all, null, 2));
    // });
    let _data = await listregisterdhardware(sessionStorage.getItem("auth"));
    let devicedata = [];
    // let i = 0;
    _data.content[_data.content.length - 1].forEach((element) =>
      devicedata.push(
        createData(
          element.id,
          element.propertycode,
          element.code,
          element.type,
          element.name,
          element.macaddress,
          element.ip
        )
      )
    );
    setRows(devicedata);
    updatePageData(devicedata, page, rowsPerPage);
  }, []);

  const handleComponentState = async (comp) => {
    console.log("setcomp", comp);
    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: comp,
    });
  };

  const handleDialogDeleteOpen = async (id, code, type, name) => {
    setUpdateData({
      code: code,
      type: type,
      name: name,
      id: id,
    });
    setDialogDelete(true);
  };

  const handleDialogDeleteClose = async () => {
    setDialogDelete(false);
  };

  const handleDialogAdd = async () => {
    let propertydata = await listallproperty(sessionStorage.getItem("auth"));
    let tempproperty = [];
    propertydata.content[propertydata.content.length - 1]
      .split(",")
      .forEach((element) => {
        if (tempproperty.filter((x) => x.label === element).length == 0) {
          tempproperty.push({
            value: element,
            label: element,
          });
        }
      });
    console.log("tempproperty", tempproperty);
    setProperty(tempproperty);
    setUpdateData({ type: deviceTypes[0].label });
    setErrorMessageDu(false);
    setErrorMessage(false);
    setDialogAdd(true);
  };

  const handleDialogAddClose = async () => {
    setDialogAdd(false);
  };

  const handleDialogEdit = async (rowData) => {
    let _rowData = JSON.parse(JSON.stringify(rowData));
    _rowData.tableData = undefined;
    console.log("handleDialogEdit", _rowData);
    let propertydata = await listallproperty(sessionStorage.getItem("auth"));
    let tempproperty = [];
    propertydata.content[propertydata.content.length - 1]
      .split(",")
      .forEach((element) => {
        if (tempproperty.filter((x) => x.label === element).length == 0) {
          tempproperty.push({
            value: element,
            label: element,
          });
        }
      });
    console.log("tempproperty", tempproperty);
    setProperty(tempproperty);
    setUpdateData(_rowData);
    setErrorMessageDu(false);
    setErrorMessage(false);
    setDialogEdit(true);
  };

  const handleDialogEditClose = async () => {
    setDialogEdit(false);
  };

  const handleInsert = async () => {
    console.log(updateData);
    setErrorMessageDu(false);
    if (updateData.code == null || updateData.code == "") {
      setErrorMessage(true);
      setErrorParameter("Device Code");
    } else if (updateData.name == null || updateData.name == "") {
      setErrorMessage(true);
      setErrorParameter("Device Name");
    } else {
      setErrorMessage(false);
      let _inserthardware = await inserthardware(
        sessionStorage.getItem("auth"),
        updateData
      );
      if (_inserthardware.status == "2000") {
        let _data = await listregisterdhardware(sessionStorage.getItem("auth"));
        let devicedata = [];
        // let i = 0;
        _data.content[_data.content.length - 1].forEach((element) =>
          devicedata.push(
            createData(
              element.id,
              element.propertycode,
              element.code,
              element.type,
              element.name,
              element.macaddress,
              element.ip
            )
          )
        );
        setRows(devicedata);
        updatePageData(devicedata, page, rowsPerPage);
        setDialogAdd(false);
      }else if(_inserthardware.status == "1000"){
        setErrorMessageDu(true);
        const dupic = _inserthardware.msg +" Device Code: "+ updateData.code;
        setErrorParameterDu(dupic)
      }
    }
  };

  const handleDelete = async (id) => {
    let _deletehardware = await deletehardware(
      sessionStorage.getItem("auth"),
      id
    );
    if (_deletehardware.status == "2000") {
      let _data = await listregisterdhardware(sessionStorage.getItem("auth"));
      let devicedata = [];
      // let i = 0;
      _data.content[_data.content.length - 1].forEach((element) =>
        devicedata.push(
          createData(
            element.id,
            element.propertycode,
            element.code,
            element.type,
            element.name,
            element.macaddress,
            element.ip
          )
        )
      );
      setRows(devicedata);
      updatePageData(devicedata, page, rowsPerPage);
      setDialogDelete(false);
    }
  };

  const handleEdit = async (id) => {
    setErrorMessageDu(false);
    if (updateData.code == null || updateData.code == "") {
      setErrorMessage(true);
      setErrorParameter("Device Code");
    } else if (updateData.name == null || updateData.name == "") {
      setErrorMessage(true);
      setErrorParameter("Device Name");
    } else {
      setErrorMessage(false);
    let _updatehardware = await updatehardware(
      sessionStorage.getItem("auth"),
      id,
      updateData
    );
    if (_updatehardware.status == "2000") {
      let _data = await listregisterdhardware(sessionStorage.getItem("auth"));
      let devicedata = [];
      // let i = 0;
      _data.content[_data.content.length - 1].forEach((element) =>
        devicedata.push(
          createData(
            element.id,
            element.propertycode,
            element.code,
            element.type,
            element.name,
            element.macaddress,
            element.ip
          )
        )
      );
      setRows(devicedata);
      updatePageData(devicedata, page, rowsPerPage);
      setDialogEdit(false);
    }else if(_updatehardware.status == "1000"){
      setErrorMessageDu(true);
      const dupic = _updatehardware.msg +" Device Code: "+ updateData.code;
      setErrorParameterDu(dupic)
    }
  }
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

  React.useEffect(() => {
    getLogo();
    // var d1 = new Date(),
    //   d2 = new Date(d1);
    // d2.setFullYear(d2.getFullYear() + 100)
    // setCookie("UUID-" + sessionStorage.getItem("username"), sessionStorage.getItem("username") + uuid.v4(), { path: '/', expires: d2 });
  }, [])


  // const handleCancle = () => {
  //     console.log("cancle")
  //     setToken(false);

  // };
  const handleSelect = async () => {
    const permission = await propertypermission(sessionStorage.getItem("auth"), selectedProperty, sessionStorage.getItem("username"));
    console.log("permission", permission)

    // sessionStorage.setItem("permissionref", permission.content[permission.content.length - 1]);
    store.dispatch({
      type: EDIT_PERMISSION,
      payload: permission.content[permission.content.length - 1],
    });




    const role = await propertyrole(sessionStorage.getItem("auth"), selectedProperty, sessionStorage.getItem("username"));
    sessionStorage.setItem("role", role.content[role.content.length - 1]);
    console.log("::::::::::::::::role::", role.content[role.content.length - 1]);
    // const menu = await menus(sessionStorage.getItem("auth"),selectedProperty);
    // sessionStorage.setItem('comp', JSON.stringify(menu.content.components));
    store.dispatch({
      type: EDIT_PROPERTY,
      payload: selectedProperty,
    });
    sessionStorage.setItem('property', selectedProperty);
    console.log("Dashboard::::::")
    store.dispatch({
      type: EDIT_COMPONENT,
      payload: "Dashboard"
    })
    setProperty(selectedProperty);


  };

  return (
    <Grid className="Login-component" style={{
      backgroundImage: `url(${background})`, backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }} >
      <Container
        component="main"
        maxWidth="xs"
        alignitems="center"
        justifycontent="center"
      >
        <Box
          p={2}
          position="absolute"
          top="88%"
          left="89%"
          zIndex="tooltip"
          style={{ backgroundRepeat: 'no-repeat' }}
          sx={{ display: { xs: "none", md: "none", lg: "flex" } }}
        >
          {/* <img className={classes.imglogo} src={file} alt="logo" width="150" /> */}
          {file ? <img src={file} className={classes.imglogo} alt="logo" width="150" /> : <img src="loginlogo.png" className={classes.imglogo} alt="logo" width="150" />}
        </Box>
        <Paper className={classes.paper}>
          <img className={classes.imglogo} src="loginlogo.png" alt="logo" />
          <h5 className={classes.sysname} >Hotel Property Management System </h5>
          <Divider variant="middle" />
          <h5> </h5>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <DialogTitle
                id="form-dialog-title"
                style={{ backgroundColor: themeState.paper, color: mainColor }}
              >
                New Device
              </DialogTitle>

              <DialogContent style={headerTableStyle}>
                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
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
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        onChange={(e) =>
                          setUpdateData({
                            ...updateData,
                            propertycode: e.target.value,
                          })
                        }
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
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        className={classes.root}
                        select
                        id="outlined-basic"
                        label="Device Type"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        InputProps={{
                          style: headerTableStyle,
                        }}
                        defaultValue={deviceTypes[0].label}
                        onChange={(e) =>
                          setUpdateData({ ...updateData, type: e.target.value })
                        }
                      >
                        {deviceTypes.map((option) => (
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
                        id="outlined-basic"
                        label="Device Code"
                        variant="outlined"
                        fullWidth
                        onChange={(e) =>
                          setUpdateData({ ...updateData, code: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        // autoFocus
                        id="outlined-basic"
                        label="Device Name"
                        variant="outlined"
                        fullWidth
                        onChange={(e) =>
                          setUpdateData({ ...updateData, name: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Container>
                {errorMessage ? (
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
                      {errorParameter} is required
                    </div>
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
          <div variant="middle" style={{ paddingTop: 30 }} />
          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#2D62ED", color: "white" }}
            onClick={handleSelect}
          >
            Select <ArrowForwardIcon style={{ paddingLeft: 10 }} />
          </Button>
        </Paper>
      </Container>
    </Grid>
  );
}

Property.propTypes = {
  setToken: PropTypes.func.isRequired,
  setProperty: PropTypes.func.isRequired
};
