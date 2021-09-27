import React, { useState, useContext } from "react";
import { ReactReduxContext, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
import UpdateIcon from '@material-ui/icons/Update';
import {
    listcomputerprinter, listregisterdhardware
} from "../services/device.service";
import {
    getusernamebyproperty,
    listallproperty
} from "../services/user.service";

import TablePagination from "@material-ui/core/TablePagination";
import { EDIT_CONFIGSTATE } from "../middleware/action";

// Generate Order Data
function createData(username, computercode, action, devicecode, tray, remark) {
    return {
        username, computercode, action, devicecode, tray, remark
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
export default function ComputerPrinter() {
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

    const [usernames, setUsernames] = useState([{
        value: '',
        label: '',
    }])
    const [computers, setComputers] = useState([{
        value: '',
        label: '',
    }]);
    const [listprinters, setPrintersCode] = useState([{
        value: '',
        label: '',
    }])

    const [actions, setActions] = useState([
        {
            key: "1",
            label: "Print Folio (bill)",
        },
        {
            key: "2",
            label: "Print Bill Info",
        },
        {
            key: "3",
            label: "Print Registration Card",
        }
    ])

    const [trays, setTrays] = useState([
        {
            key: "1",
            label: "Default",
        },
        {
            key: "2",
            label: "Tray#1",
        },
        {
            key: "3",
            label: "Tray#2",
        },
        {
            key: "4",
            label: "Tray#3",
        }
    ])

    const [remarks, setRemarks] = useState([
        {
            key: "1",
            label: "Preprinted",
        },
        {
            key: "2",
            label: "Blank Paper",
        },
        {
            key: "3",
            label: "RegisForm",
        }
    ])
    const [properties, setProperties] = useState([
        {
            key: "",
            label: "",
        }
    ])

    const [updateData, setUpdateData] = useState({})

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
                    element.username, element.computercode, element.action, element.devicecode, element.tray, element.remark
                )
            )
        );
        setRows(userdata);
        updatePageData(userdata, page, rowsPerPage);
    }, []);

    const handleChangeProperty= async (selectProperty) => {
        let _userdata = await getusernamebyproperty(sessionStorage.getItem("auth"), selectProperty);
        let _users = []
        if (_userdata.content[_userdata.content.length - 1] != "") {
            _userdata.content[_userdata.content.length - 1].split(",").forEach((element) => {
                if (_users.filter(x => x.label === element).length == 0) {
                    _users.push({ key: element, label: element })
                }
            })
        }
        setUsernames(_users);
    }
    const handleComponentState = async (comp) => {
        console.log("setcomp", comp)
        store.dispatch({
            type: EDIT_CONFIGSTATE,
            payload: comp
        })
    }

    const handleDialogDeleteOpen = async () => {

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
        let _userdata = await getusernamebyproperty(sessionStorage.getItem("auth"), pageProperty);
        // username, computercode, action, devicecode, tray, remark
        let _users = []
        if (_userdata.content[_userdata.content.length - 1] != "") {
            _userdata.content[_userdata.content.length - 1].split(",").forEach((element) => {
                if (_users.filter(x => x.label === element).length == 0) {
                    _users.push({ key: element, label: element })
                }
            })
        }
        let _data = await listregisterdhardware(sessionStorage.getItem("auth"));
        let _computers = [];
        let _listprinters = [];
        _data.content[_data.content.length - 1].forEach((element) => {
            if (element.type == 'COMP') {
                if (_computers.filter((x) => x.value === element.code).length == 0) {
                    _computers.push({
                        value: element.code,
                        label: element.name,
                    });
                }
            } else if (element.type == 'PRINT') {
                if (_listprinters.filter((x) => x.value === element.code).length == 0) {
                    _listprinters.push({
                        value: element.code,
                        label: element.name,
                    });
                }
            }
        }
        );
        setUsernames(_users);
        setComputers(_computers);
        setPrintersCode(_listprinters);
        setUpdateData({ computercode: _computers[0].label, devicecode: _listprinters[0].label });
        setDialogAdd(true);
    };

    const handleDialogAddClose = async () => {
        setDialogAdd(false);
    };

    const handleInsert = async () => {
        let data = await listcomputerprinter(sessionStorage.getItem("auth"));
        let userdata = [];
        data.content[data.content.length - 1].forEach((element) =>
            userdata.push(
                createData(
                    element.username, element.computercode, element.action, element.devicecode, element.tray, element.remark
                )
            )
        );
        setRows(userdata);
        updatePageData(userdata, page, rowsPerPage);
        setDialogAdd(false);
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
                                    Computer-printer
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
                                New Setting
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
                                    Computer-printer
                                </Typography>
                            </Grid>
                        }
                        columns={[
                            { title: "Username", field: "username" },
                            {
                                title: "Computer Code",
                                field: "computercode"
                            },
                            { title: "Action", field: "action" },
                            { title: "Device Code", field: "devicecode" },
                            { title: "Tray", field: "tray" },
                            { title: "Remark", field: "remark" },


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
                                    handleDialogEdit();
                                },
                            },
                            {
                                icon: DeleteRoundedIcon,
                                tooltip: "Delete",
                                onClick: (event, rowData) => {
                                    handleDialogDeleteOpen();
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
                                <Container maxWidth="xl" disableGutters>
                                    <Grid container spacing={2} style={{ paddingTop: 10 }}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                            New Device
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                            <TextField
                                                select
                                                id="outlined-basic"
                                                label="Property"
                                                variant="outlined"
                                                defaultValue={properties[0].label}
                                                fullWidth
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                onChange={(e) => handleChangeProperty(e.target.value)}
                                            >
                                                {properties.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </DialogTitle>

                            <DialogContent>
                                {/* username, computercode, action, devicecode, tray, remark */}
                                <Container maxWidth="xl" disableGutters>
                                    <Grid container spacing={2} style={{ paddingTop: 10 }}>
                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                            <TextField
                                                select
                                                id="outlined-basic"
                                                label="Username"
                                                variant="outlined"
                                                defaultValue={usernames[0].label}
                                                fullWidth
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                onChange={(e) => setUpdateData({ ...updateData, username: e.target.value })}
                                            >
                                                {usernames.map((option) => (
                                                    <option key={option.value} value={option.value}>
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
                                                defaultValue={computers[0].value}
                                                fullWidth
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                onChange={(e) => setUpdateData({ ...updateData, computercode: e.target.value })}
                                            >
                                                {computers.map((option) => (
                                                    <option key={option.value} value={option.value}>
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
                                                defaultValue={computers[0].label}
                                                fullWidth
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                onChange={(e) => setUpdateData({ ...updateData, action: e.target.value })}
                                            >
                                                {actions.map((option) => (
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
                                                label="Printer Code"
                                                variant="outlined"
                                                fullWidth
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                defaultValue={listprinters[0].value}
                                                onChange={(e) => setUpdateData({ ...updateData, listprinters: e.target.value })}
                                            >
                                                {listprinters.map((option) => (
                                                    <option key={option.value} value={option.value}>
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
                                                defaultValue={computers[0].label}
                                                fullWidth
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                onChange={(e) => setUpdateData({ ...updateData, tray: e.target.value })}
                                            >
                                                {trays.map((option) => (
                                                    <option key={option.value} value={option.value}>
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
                                                defaultValue={computers[0].label}
                                                fullWidth
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                onChange={(e) => setUpdateData({ ...updateData, remark: e.target.value })}
                                            >
                                                {remarks.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
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
