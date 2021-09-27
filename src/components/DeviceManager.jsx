import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactReduxContext, useSelector } from "react-redux";
import MaterialTable from "material-table";
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

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
    listregisterdhardware,
    inserthardware
} from "../services/device.service";
import {
    listallproperty
} from "../services/user.service";
// from "../services/roleManagement.service";
import TablePagination from "@material-ui/core/TablePagination";
import { EDIT_CONFIGSTATE } from "../middleware/action";

// Generate Order Data
function createData(code, type, name, macaddress, ip) {
    return {
        code, type, name, macaddress, ip
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
}));
export default function DeviceManager() {
    const classes = useStyles();
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

    const [properties, setProperty] = React.useState([]);
    const [deviceTypes, setDeviceType] = useState([
        {
            key: "1",
            label: "COMP",
        },
        {
            key: "2",
            label: "PRINT",
        }
    ])

    const [updateData, setUpdateData] = useState({})

    const [errorMessage, setErrorMessage] = useState(false);
    const [errorParameter, setErrorParameter] = useState(null);

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
                    element.code, element.type, element.name, element.macaddress, element.ip
                )
            )
        );
        setRows(devicedata);
        updatePageData(devicedata, page, rowsPerPage);
    }, []);

    const handleComponentState = async (comp) => {
        console.log("setcomp", comp)
        store.dispatch({
            type: EDIT_CONFIGSTATE,
            payload: comp
        })
    }

    const handleDialogDeleteOpen = async (rolecode, rolename, description) => {

    };

    const handleDialogEdit = async () => {
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
        setDialogAdd(true);
    };

    const handleDialogAddClose = async () => {
        setDialogAdd(false);
    };

    const handleInsert = async () => {
        console.log(updateData);
        let _inserthardware = await inserthardware(sessionStorage.getItem("auth"), updateData);
        if (_inserthardware.status == '2000') {
            let _data = await listregisterdhardware(sessionStorage.getItem("auth"));
            let devicedata = [];
            // let i = 0;
            _data.content[_data.content.length - 1].forEach((element) =>
                devicedata.push(
                    createData(
                        element.code, element.type, element.name, element.macaddress, element.ip
                    )
                )
            );
            setRows(devicedata);
            updatePageData(devicedata, page, rowsPerPage);
            setDialogAdd(false);
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
                                    System Configuration
                                </Typography>
                            </Link>
                            <Typography>
                                <Typography
                                    variant="h6"
                                    style={{ marginBottom: 15, fontSize: 14 }}
                                >
                                    Device Management
                                </Typography>
                            </Typography>
                            <Typography>
                                <Typography
                                    variant="h6"
                                    style={{ marginBottom: 15, fontSize: 14 }}
                                >
                                    Device Manager
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
                            onClick={handleDialogAdd}
                        >
                            <AddRoundedIcon />
                            <Typography variant="body1" style={{}}>
                                New Device
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>



                <div style={{ maxWidth: "100%" }}>
                    <MaterialTable
                        style={{ paddingLeft: 30, paddingRight: 30 }}
                        title={
                            <Grid>
                                <Typography variant="h6" style={{ fontSize: 25, color: "black" }}>
                                    Device Manager
                                </Typography>
                            </Grid>
                        }
                        columns={[
                            { title: "Device Code", field: "code" },
                            { title: "Type", field: "type" },
                            { title: "Device Name", field: "name" },
                            { title: "MAC Address", field: "macaddress" },
                            { title: "IP Address", field: "ip" },
                        ]}
                        data={rows}
                        // totalCount={rows.length}
                        // page={page}
                        options={{
                            actionsColumnIndex: -1,
                            // filtering: true,
                            searchFieldAlignment: "left",
                            page: page,
                            pageSize: rowsPerPage,
                            pageSizeOptions: [5, 10, 20, { value: rows.length, label: "All" }],
                        }}
                        actions={[
                            {
                                icon: EditRoundedIcon,
                                tooltip: "Edit",
                                onClick: (event, rowData) => {
                                    handleDialogEdit(rowData.rolecode, rowData.rolename, rowData.description, rowData.applyproperty, rowData.status);
                                },
                            },
                            {
                                icon: DeleteRoundedIcon,
                                tooltip: "Delete",
                                onClick: (event, rowData) => {
                                    handleDialogDeleteOpen(rowData.rolecode, rowData.rolename, rowData.description);
                                },
                            },
                        ]}
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
                >
                    <Grid container>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                        >
                            <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                                New Device
                            </DialogTitle>

                            <DialogContent>

                                <Container maxWidth="xl" disableGutters>
                                    <Grid container spacing={2} style={{ paddingTop: 10 }}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
                                                onChange={(e) => setUpdateData({ ...updateData, property: e.target.value })}
                                            >
                                                {properties.map((option) => (
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
                                                label="Device Type"
                                                variant="outlined"
                                                fullWidth
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                defaultValue={deviceTypes[0].label}
                                                onChange={(e) => setUpdateData({ ...updateData, type: e.target.value })}
                                            >
                                                {deviceTypes.map((option) => (
                                                    <option key={option.value} value={option.value}>
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
                                                onChange={(e) => setUpdateData({ ...updateData, code: e.target.value })}
                                            />
                                        </Grid>

                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                            <TextField
                                                // autoFocus
                                                id="outlined-basic"
                                                label="Device Name"
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                            <TextField
                                                // autoFocus
                                                id="outlined-basic"
                                                label="MAC Address"
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => setUpdateData({ ...updateData, macaddress: e.target.value })}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                            <TextField
                                                // autoFocus
                                                id="outlined-basic"
                                                label="IP Address"
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => setUpdateData({ ...updateData, ip: e.target.value })}
                                            />
                                        </Grid>

                                    </Grid>
                                </Container>
                                {errorMessage ? <div style={{ background: "#ff0033", textAlign: "center", color: "white", height: "30px", paddingTop: 5 }}>{errorParameter} is required</div> : null}
                            </DialogContent>
                        </Grid>
                    </Grid>
                    <DialogActions style={{ padding: 20 }}>
                        <Button
                            onClick={handleDialogAddClose}
                            variant="text"
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                handleInsert()
                            }
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        </Container>
    );
}
