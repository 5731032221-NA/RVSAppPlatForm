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

import UpdateIcon from '@material-ui/icons/Update';
import IconButton from "@material-ui/core/IconButton";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
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
  listuser,
  getuser,
  postuser,
  updateuser,
  getuserbyid,
  deleteuserbyid,
  // listrole,
  listpropertybyroles,
  listallproperty,
  deleteuserbyusername,
  rolepermissionbyrole,
  userrolebyusername,
  userpropertybyusername,
  getposition,
  postposition,
  getuserpermission
} from "../services/user.service";
import { listrole } from "../services/roleManagement.service";
import TablePagination from "@material-ui/core/TablePagination";

import Checkbox from "@material-ui/core/Checkbox";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { EDIT_CONFIGSTATE } from "../middleware/action";
// import user from "../services/user.service";

// Generate Order Data
function createData(
  id,
  userID,
  firstname,
  lastname,
  position,
  roles,
  property,
  status
) {
  return {
    id,
    userID,
    firstname,
    lastname,
    position,
    roles,
    property,
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

// const roles = [
//   {
//     key: "1",
//     label: "Cahshier",
//   },
//   {
//     key: "2",
//     label: "Accountant",
//   },
// ];


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
const PropertyValues = "";

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

var roles = [];

const defaultdata = [
  {
    name: "Dashboard",
    code: "DB",
    permision: true,
    create: false,
    read: false,
    update: false,
    delete: false,
    edited_create: false,
    edited_read: false,
    edited_update: false,
    edited_delete: false,
  },
  {
    name: "Reservartion",
    code: "RV",
    permision: true,
    create: false,
    read: false,
    update: false,
    delete: false,
    edited_create: false,
    edited_read: false,
    edited_update: false,
    edited_delete: false,
  },
  {
    name: "Front Desk",
    code: "FD",
    permision: false,
    children: [
      {
        name: "Walk-in",
        code: "FD-WN",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Check-in",
        code: "FD-CI",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Checkout",
        code: "FD-CO",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "RoomStatus",
        code: "FD-RS",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
    ],
  },
  {
    name: "Cashier",
    code: "CS",
    permision: false,
    children: [
      {
        name: "Folio Management",
        code: "CS-FM",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Reports",
        code: "CS-RP",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      }
    ],
  },
  {
    name: "Profile",
    code: "PF",
    permision: false,
    children: [
      {
        name: "Individual",
        code: "PF-ID",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Travel Agen",
        code: "PF-TA",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Company",
        code: "PF-CP",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Group",
        code: "PF-GR",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
    ],
  },
  {
    name: "Night Auditor",
    code: "NA",
    permision: false,
    children: [
      {
        name: "Reports",
        code: "NA-RP",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Hotel Date Maintenance",
        code: "NA-HD",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Close-Day Procedure",
        code: "NA-CD",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Auto-Sequence Reports",
        code: "NA-AS",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
    ],
  },
  {
    name: "House Keeping",
    code: "HK",
    permision: false,
    children: [
      {
        name: "Item Management",
        code: "HK-IM",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      },
      {
        name: "Room Status",
        code: "HK-RS",
        permision: true,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
      }
    ],
  },
  {
    name: "Engineering",
    code: "EN",
    permision: true,
    create: false,
    read: false,
    update: false,
    delete: false,
    edited_create: false,
    edited_read: false,
    edited_update: false,
    edited_delete: false,
  },
  {
    name: "Reporting Systems",
    code: "RS",
    permision: true,
    create: false,
    read: false,
    update: false,
    delete: false,
    edited_create: false,
    edited_read: false,
    edited_update: false,
    edited_delete: false,
  },
  {
    name: "Configuration",
    code: "CF",
    permision: false,
    create: false,
    read: false,
    update: false,
    delete: false,
    edited_create: false,
    edited_read: false,
    edited_update: false,
    edited_delete: false,
    children: [
      {
        name: "PMS Configuration",
        code: "CF-PC",
        permision: false,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
        children: [
          {
            name: "Property Configuration",
            code: "CF-PC-PC",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          },
          {
            name: "Room Configuration",
            code: "CF-PC-RC",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          },
          {
            name: "Item Configuration",
            code: "CF-PC-IC",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          },
          {
            name: "Reservation Configuration",
            code: "CF-PC-RE",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          }
        ]
      },
      {
        name: "System Configuration",
        code: "CF-SC",
        permision: false,
        create: false,
        read: false,
        update: false,
        delete: false,
        edited_create: false,
        edited_read: false,
        edited_update: false,
        edited_delete: false,
        children: [
          {
            name: "User Management",
            code: "CF-UM",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          },
          {
            name: "Role Management",
            code: "CF-RM",
            permision: true,
            create: false,
            read: false,
            update: false,
            delete: false,
            edited_create: false,
            edited_read: false,
            edited_update: false,
            edited_delete: false,
          }
        ]
      }
    ],
  },
];


export default function UserManagement() {
  const classes = useStyles();
  const [position, setPosition] = useState([{ "key": "Administrator", "label": "Administrator" }])
  const [dialogAddUser, setDialogAddUser] = React.useState(false);
  const [dialogEditUser, setDialogEditUser] = React.useState(false);
  const [dialogDeleteUser, setDialogDeleteUser] = React.useState(false);
  const [selectPosition, setSelectPosition] = React.useState(null);
  const [selectProperty, setSelectProperty] = React.useState(null);
  const [permissionDialog, setPermissionDialog] = React.useState(false);
  const [chipRolesDialog, setChipRolesDialog] = React.useState([]);
  const [chipPropertyDialog, setChipPropertyDialog] = React.useState([]);
  const [dialogSize, setDialogSize] = React.useState("sm");
  const [dialogRatio, setDialogRatio] = React.useState(12);
  const [pageData, setPageData] = React.useState([]);
  const [editLastName, setEditLastName] = React.useState(null);
  const [editFirstName, setEditFirstName] = React.useState(null);
  const [editUserName, setEditUserName] = React.useState(null);
  const [editUserID, setEditUserID] = React.useState(null);
  const [oldUserName, setoldUserName] = React.useState(null);
  const [newPosition, setNewPosition] = React.useState(null);
  // const [editFirstname, setEditFirstname] = React.useState(null);
  // const [editLastname, setEditLastname] = React.useState(null);
  const [properties, setProperties] = React.useState([]);
  const [editID, setEditID] = React.useState(null);
  const [editStatus, setEditStatus] = React.useState(true);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [errorMessage, setErrorMessage] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);

  const { store } = useContext(ReactReduxContext);

  React.useEffect(async () => {
    let dataRole = await listrole(sessionStorage.getItem("auth"));
    console.log("listrole", dataRole.content[dataRole.content.length - 1]);
    roles = [];
    dataRole.content[dataRole.content.length - 1].forEach((element) =>
      roles.push({
        key: element.rolecode,
        label: element.rolename,
      })
    );
    console.log("roles", roles);

    const data = await listuser(sessionStorage.getItem("auth"));
    let userdata = [];
    data.content[data.content.length - 1].forEach((element) =>
      userdata.push(
        createData(
          element.code,
          element.username,
          element.firstname,
          element.lastname,
          element.position,
          element.roles,
          element.property,
          element.status
        )
      )
    );
    console.log(sessionStorage.getItem("auth"));
    console.log(userdata);
    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);
    setSelectPosition(position[0].label);
  }, []);

  const handleComponentState = async (comp) => {
    console.log("setcomp", comp)
    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: comp
    })
  }

  const updatePageData = async (rowsdata, _page, _rowsPerPage) => {
    let data = [];
    for (let i = _page * _rowsPerPage; i < (_page + 1) * _rowsPerPage; i++) {
      if (rowsdata[i]) data.push(rowsdata[i]);
    }
    setPageData(data);
  };

  const handleDialogAddUser = async () => {
    let position_json = []
    let listposition = await getposition(sessionStorage.getItem("auth"));
    listposition.content[listposition.content.length - 1].forEach((element) => {

      position_json.push({ key: element.position, label: element.position })

    })
    position_json.push({ key: "Add new position", label: "Add new position" })
    setPosition(position_json);
    setSelectPosition(position_json[0].label);
    setNewPosition(null);
    setPermissionDialog(false);
    setChipRolesDialog([]);
    setChipPropertyDialog([]);
    setEditFirstName(null);
    setEditLastName(null);
    setEditStatus(true)
    setErrorMessage(false);
    setDialogAddUser(true);
  };

  const handleDialogAddUserClose = () => {
    setDialogAddUser(false);
  };



  const handleDialogEditUser = async (username, firstname, lastname, position, status) => {
    // const databyid = await getuserbyid(sessionStorage.getItem("auth"), id);
    // setEditFirstName(databyid.content[databyid.content.length - 1].firstname);
    // setEditLastName(databyid.content[databyid.content.length - 1].lastname);
    // setEditUserName(databyid.content[databyid.content.length - 1].username);
    // setEditStatus(databyid.content[databyid.content.length - 1].status);
    // setSelectPosition(databyid.content[databyid.content.length - 1].position);

    // setChipRolesDialog([]);
    // if (databyid.content[databyid.content.length - 1].roles) {
    //   const roleDataEdit = databyid.content[databyid.content.length - 1].roles;
    //   var tempRole = roleDataEdit.split(", ");
    //   for (let i in roles) {
    //     if (tempRole.includes(roles[i].key)) {
    //       setChipRolesDialog((prevState) => [
    //         ...prevState,
    //         { key: roles[i].key, label: roles[i].label },
    //       ]);
    //     }
    //   }
    // }
    // console.log("Edit databyid:", databyid);
    // console.log("Edit ID:", id);
    // setEditID(id);
    let userrole = await userrolebyusername(sessionStorage.getItem("auth"), username);
    let userproperty = await userpropertybyusername(sessionStorage.getItem("auth"), username);
    console.log(userproperty.content[userproperty.content.length - 1])
    console.log(userrole.content[userrole.content.length - 1])
    let role = []
    userrole.content[userrole.content.length - 1].split(",").forEach((element) => {
      if (role.filter(x => x.label === element).length == 0) {
        role.push({ key: element, label: element })
      }
    })

    let property = []
    userproperty.content[userproperty.content.length - 1].split(",").forEach((element) => {
      if (property.filter(x => x.label === element).length == 0) {
        property.push({ key: element, label: element })
      }
    })

    let position_json = []
    let listposition = await getposition(sessionStorage.getItem("auth"));
    listposition.content[listposition.content.length - 1].forEach((element) => {

      position_json.push({ key: element.position, label: element.position })

    })
    position_json.push({ key: "Add new position", label: "Add new position" })

    setEditUserName(username);
    setoldUserName(username);
    setEditFirstName(firstname);
    setEditLastName(lastname);
    setSelectPosition(position);
    setPermissionDialog(false);
    setEditStatus(status)
    setChipRolesDialog((prev) => role);
    setChipPropertyDialog((prev) => property);
    setPosition((prev) => position_json);
    setSelectPosition(position_json[0].label);
    setNewPosition(null);
    setErrorMessage(false);
    setDialogEditUser(true);
  };

  const handleDialogEditUserClose = () => {
    setDialogEditUser(false);
  };

  const rolepermission = async (array, permission) => {
    let list = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (permission.hasOwnProperty(obj.code)) {
        obj.create = !!parseInt(permission[obj.code].permissioncreate);
        obj.read = !!parseInt(permission[obj.code].permissionread);
        obj.update = !!parseInt(permission[obj.code].permissionupdate);
        obj.delete = !!parseInt(permission[obj.code].permissiondelete);

      }
      if (obj.children) {
        // list = [...list, ...propertylist(obj.children)];
        rolepermission(obj.children, permission);
      }
    }
    return list;
  };

  const handlePermission = async (roles) => {
    const temp = new Set();
    if (chipRolesDialog.length) {
      for (var i in chipRolesDialog) {
        temp.add(chipRolesDialog[i].key);
      }
      let roleper = await rolepermissionbyrole(sessionStorage.getItem("auth"), { roles: Array.from(temp) })
      console.log("roleper", roleper)
      let _data = JSON.parse(JSON.stringify(defaultdata));
      rolepermission(_data, roleper.content[roleper.content.length - 1])
      setData(_data);
      setData((prevState) => [...prevState]);

    } else {
      setData(JSON.parse(JSON.stringify(defaultdata)))
    }


    setPermissionDialog(!permissionDialog);
    if (permissionDialog) {
      setDialogSize("sm");
      setDialogRatio(12);
    } else {
      setDialogSize("md");
      setDialogRatio(12);
    }
  };

  const rolepermissionedit = async (array, permission, userpermission) => {
    let list = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (permission.hasOwnProperty(obj.code)) {
        if (userpermission.hasOwnProperty(obj.code)) {
          if (userpermission[obj.code].permissioncreate == 0) obj.create = !!parseInt(permission[obj.code].permissioncreate);
          else {
            obj.create = (userpermission[obj.code].permissioncreate == 1);
            obj.edited_create = true;
          }
          if (userpermission[obj.code].permissionread == 0) obj.read = !!parseInt(permission[obj.code].permissionread);
          else {
            obj.read = (userpermission[obj.code].permissionread == 1);
            obj.edited_read = true;
          }
          if (userpermission[obj.code].permissionupdate == 0) obj.update = !!parseInt(permission[obj.code].permissionupdate);
          else {
            obj.update = (userpermission[obj.code].permissionupdate == 1);
            obj.edited_update = true;
          }
          if (userpermission[obj.code].permissiondelete == 0) obj.delete = !!parseInt(permission[obj.code].permissiondelete);
          else {
            obj.delete = (userpermission[obj.code].permissiondelete == 1);
            obj.edited_delete = true;
          }
        }
        else {
          obj.create = !!parseInt(permission[obj.code].permissioncreate);
          obj.read = !!parseInt(permission[obj.code].permissionread);
          obj.update = !!parseInt(permission[obj.code].permissionupdate);
          obj.delete = !!parseInt(permission[obj.code].permissiondelete);
        }
      } else if (userpermission.hasOwnProperty(obj.code)) {
        if (userpermission[obj.code].permissioncreate == 1) {
          obj.create = true;
          obj.edited_create = true;
        } else if (userpermission[obj.code].permissioncreate == -1) {
          obj.edited_create = true;
        }

        if (userpermission[obj.code].permissionread == 1) {
          obj.read = true;
          obj.edited_read = true;
        } else if (userpermission[obj.code].permissionread == -1) {
          obj.edited_read = true;
        }

        if (userpermission[obj.code].permissionupdate == 1) {
          obj.update = true;
          obj.edited_update = true;
        } else if (userpermission[obj.code].permissionupdate == -1) {
          obj.edited_update = true;
        }

        if (userpermission[obj.code].permissiondelete == 1) {
          obj.delete = true;
          obj.edited_delete = true;
        } else if (userpermission[obj.code].permissiondelete == -1) {
          obj.edited_delete = true;
        }

      }
      if (obj.children) {
        // list = [...list, ...propertylist(obj.children)];
        rolepermissionedit(obj.children, permission, userpermission);
      }
    }
    return list;
  };


  const handlePermissionEdit = async (roles) => {
    const temp = new Set();
    if (chipRolesDialog.length) {
      for (var i in chipRolesDialog) {
        temp.add(chipRolesDialog[i].key);
      }
      let roleper = await rolepermissionbyrole(sessionStorage.getItem("auth"), { roles: Array.from(temp) });
      console.log("roleper", roleper)
      let _data = JSON.parse(JSON.stringify(defaultdata));
      let userper = await getuserpermission(sessionStorage.getItem("auth"), oldUserName);

      rolepermissionedit(_data, roleper.content[roleper.content.length - 1], userper.content[userper.content.length - 1])
      setData(_data);
      setData((prevState) => [...prevState]);

    } else {
      setData(JSON.parse(JSON.stringify(defaultdata)))
    }


    setPermissionDialog(!permissionDialog);
    if (permissionDialog) {
      setDialogSize("sm");
      setDialogRatio(12);
    } else {
      setDialogSize("md");
      setDialogRatio(12);
    }
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

  const propertylist = async (array, code) => {
    let list = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (obj.edited_create ||
        obj.edited_read ||
        obj.edited_update ||
        obj.edited_delete) {
        list.push(
          {
            username: code,
            componentcode: obj.code,
            permissioncreate: obj.edited_create ? (obj.create ? 1 : -1) : 0,
            permissionread: obj.edited_read ? (obj.read ? 1 : -1) : 0,
            permissionupdate: obj.edited_update ? (obj.update ? 1 : -1) : 0,
            permissiondelete: obj.edited_delete ? (obj.delete ? 1 : -1) : 0,
          }
        )
      }
      if (obj.children) {
        // list = [...list, ...propertylist(obj.children)];
        let append = await propertylist(obj.children, code);
        if (append.length > 0) list = list.concat(append);
      }
    }
    return list;
  };

  const handleInsertUser = async (
    code,
    firstName,
    lastName,
    status,
    position,
    role
  ) => {
    // setEditFirstName(null);
    // setEditLastName(null);
    if (code == null) {setErrorMessage(true); setErrorParameter("UserID");}
    else if (firstName == null) {setErrorMessage(true); setErrorParameter("Firstname");}
    else if (lastName == null) {setErrorMessage(true); setErrorParameter("Lastname");}
    else if (chipRolesDialog.length == 0) {setErrorMessage(true); setErrorParameter("Roles");}
    else if (chipPropertyDialog.length == 0) {setErrorMessage(true); setErrorParameter("Property");}
    else {
      setErrorMessage(false);
      if (position == "Add new position") {
        let addPosition = await postposition(sessionStorage.getItem("auth"), { "position": newPosition });
      }
      let perm = await propertylist(data, code);
      console.log(perm)
      const roletemp = new Set();
      if (chipRolesDialog.length) {
        for (let i in chipRolesDialog) {
          roletemp.add(chipRolesDialog[i].key);
        }
      }
      const roleTempArray = Array.from(roletemp).join(",");
      const propertytemp = new Set();
      if (chipPropertyDialog.length) {
        for (let i in chipPropertyDialog) {
          propertytemp.add(chipPropertyDialog[i].key);
        }
      }
      const propertyTempArray = Array.from(propertytemp).join(",");
      console.log(firstName, lastName, status, position, role);
      let insert = await postuser(sessionStorage.getItem("auth"), {
        firstname: firstName,
        lastname: lastName,
        code: code,
        status: status ? 'Active' : 'Inactive',
        position: (position == "Add new position") ? newPosition : position,
        userproperty: propertyTempArray,
        role: roleTempArray,
        permission: perm
      });
      console.log(insert);
      if (insert.status == '2000') {
        const data = await listuser(sessionStorage.getItem("auth"));
        let userdata = [];
        data.content[data.content.length - 1].forEach((element) =>
          userdata.push(
            createData(
              element.code,
              element.username,
              element.firstname,
              element.lastname,
              element.position,
              element.roles,
              element.property,
              element.status
            )
          )
        )
        setRows(userdata);
        updatePageData(userdata, page, rowsPerPage);
        setDialogAddUser(false);
      }
    }


  };

  const handleSelectPosition = (event) => {
    setSelectPosition(event.target.value);
  };
  // const handleSelectProperty = (event) => {
  //   setSelectProperty(event.target.value);
  // };

  const listproperty = async (roles) => {
    let changeproperty = await listpropertybyroles(
      sessionStorage.getItem("auth"),
      { roles: roles }
    );
    console.log("changeproperty", changeproperty);
    let tempproperty = [];

    changeproperty.content[changeproperty.content.length - 1].split(",").forEach((element) => {
      if (tempproperty.filter(x => x.label === element).length == 0) {

        tempproperty.push({
          key: element,
          label: element,
        })

      }
    }
    );
    console.log("tempproperty", tempproperty)
    setProperties(tempproperty)
  }


  const handleSelectRoles = async (event, key) => {
    setPermissionDialog(false);
    const temp = new Set();
    if (chipRolesDialog.length) {
      for (var i in chipRolesDialog) {
        temp.add(chipRolesDialog[i].key);
      }
      if (temp.has(key.props.name)) {
        // console.log("had value");
      } else {
        setChipRolesDialog([
          ...chipRolesDialog,
          { key: key.props.name, label: event.target.value },
        ]);
        temp.add(key.props.name);
        console.log("temp", temp);
        listproperty(Array.from(temp));
      }
    } else {
      setChipRolesDialog([
        ...chipRolesDialog,
        { key: key.props.name, label: event.target.value },
      ]);
      temp.add(key.props.name);
      console.log("temp", temp);
      listproperty(Array.from(temp));
    }
  };
  const handleDeleteRoles = (chipToDelete) => () => {
    setPermissionDialog(false);
    setChipRolesDialog((chips) =>
      chips.filter((chips) => chips.key !== chipToDelete.key)
    );
    const temp = new Set();
    for (var i in chipRolesDialog) {
      if (chipRolesDialog[i].key != chipToDelete.key)
        temp.add(chipRolesDialog[i].key);
    }
    listproperty(Array.from(temp));
  };

  const handleSelectProperty = (event, key) => {
    const temp = new Set();
    if (chipPropertyDialog.length) {
      for (var i in chipPropertyDialog) {
        temp.add(chipPropertyDialog[i].key);
      }
      if (temp.has(key.props.name)) {
        // console.log("had value");
      } else {
        setChipPropertyDialog([
          ...chipPropertyDialog,
          { key: key.props.name, label: event.target.value },
        ]);
      }
    } else {
      setChipPropertyDialog([
        ...chipPropertyDialog,
        { key: key.props.name, label: event.target.value },
      ]);
    }
  };
  const handleDeleteProperty = (chipToDelete) => () => {
    setChipPropertyDialog((chips) =>
      chips.filter((chips) => chips.key !== chipToDelete.key)
    );
  };



  const editing_create = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.code, label);
      if (obj.code === label) {
        obj.edited_create = !obj.edited_create;
        obj.create = !obj.create;
      } else if (obj.children) {
        editing_create(obj.children, label);
      }
    }
  };



  const handleCheckPermision_create = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.code);
    await editing_create(_data, nodes.code);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editing_read = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.code, label);
      if (obj.code === label) {
        obj.edited_read = !obj.edited_read;
        obj.read = !obj.read;
      } else if (obj.children) {
        editing_read(obj.children, label);
      }
    }
  };

  const handleCheckPermision_read = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.code);
    await editing_read(_data, nodes.code);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editing_update = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.code, label);
      if (obj.code === label) {
        obj.edited_update = !obj.edited_update;
        obj.update = !obj.update;
      } else if (obj.children) {
        editing_update(obj.children, label);
      }
    }
  };

  const handleCheckPermision_update = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.code);
    await editing_update(_data, nodes.code);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editing_delete = async (array, label) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.code, label);
      if (obj.code === label) {
        obj.edited_delete = !obj.edited_delete;
        obj.delete = !obj.delete;
      } else if (obj.children) {
        editing_delete(obj.children, label);
      }
    }
  };

  const handleCheckPermision_delete = async (nodes) => {
    let _data = data;
    console.log("nid", nodes.code);
    await editing_delete(_data, nodes.code);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const editing_all = async (array, label, checked) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      console.log(obj.code, label);
      if (obj.code === label) {
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
    console.log("nid", nodes.code, event.target.checked);
    await editing_all(_data, nodes.code, !event.target.checked);
    setData(_data);
    setData((prevState) => [...prevState]);
  };

  const [data, setData] = React.useState([]);

  const renderTree = (nodes) => (
    <div>
      <TreeItem
        key={nodes.code}
        nodeId={nodes.code}
        label={
          <div>
            {nodes.permision ? (
              <div>
                <Grid container direction="row" alignItems="center">


                  <Grid item style={{ flexGrow: 1 }} >
                    {nodes.edited_create || nodes.edited_read || nodes.edited_update || nodes.edited_delete ?
                      <Typography
                        variant="h6"
                        color="initial"
                        style={{ color: '#1F51FF', fontSize: 16, paddingTop: 5, paddingBottom: 10 }}
                      >
                        {nodes.name}  <UpdateIcon style={{ fontSize: 16 }} />
                      </Typography>
                      :
                      <Typography
                        variant="h6"
                        color="initial"
                        style={{ fontSize: 16, paddingTop: 10, paddingBottom: 10 }}
                      >
                        {nodes.name}
                      </Typography>
                    }
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
                              style={{
                                color: "green",
                              }}
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
                              style={{
                                color: "red",
                              }}
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
                              style={{
                                color: "green",
                              }}
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
                              style={{
                                color: "red",
                              }}
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
                              style={{
                                color: "green",
                              }}
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
                              style={{
                                color: "red",
                              }}
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
                              style={{
                                color: "green",
                              }}
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
                              style={{
                                color: "red",
                              }}
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
                    {
                      nodes.children.some(item => {
                        if (item.permision == false) return item.children.some(childitem => childitem.edited_create === true)
                        else return item.edited_create === true
                      }) ||
                        nodes.children.some(item => {
                          if (item.permision == false) return item.children.some(childitem => childitem.edited_read === true)
                          else return item.edited_read === true
                        }) ||
                        nodes.children.some(item => {
                          if (item.permision == false) return item.children.some(childitem => childitem.edited_update === true)
                          else return item.edited_update === true
                        }) ||
                        nodes.children.some(item => {
                          if (item.permision == false) return item.children.some(childitem => childitem.edited_delete === true)
                          else return item.edited_delete === true
                        })
                        ?
                        <Typography
                          variant="h6"
                          color="initial"
                          style={{ color: '#1F51FF', fontSize: 16, paddingTop: 5, paddingBottom: 10 }}
                        >
                          {nodes.name}  <UpdateIcon style={{ fontSize: 16 }} />
                        </Typography>
                        :
                        <Typography
                          variant="h6"
                          color="initial"
                          style={{ fontSize: 16, paddingTop: 5, paddingBottom: 10 }}
                        >
                          {nodes.name}
                        </Typography>
                    }
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


  const handleSaveEdit = async (
    code,
    firstName,
    lastName,
    status,
    position,
    role
  ) => {
    console.log(
      "Handle save Edit : id, firstname, userName, status",
      code,
      firstName,
      lastName,
      status,
      position,
      role
    );
    if (code == null) {setErrorMessage(true); setErrorParameter("UserID");}
    else if (firstName == null) {setErrorMessage(true); setErrorParameter("Firstname");}
    else if (lastName == null) {setErrorMessage(true); setErrorParameter("Lastname");}
    else if (chipRolesDialog.length == 0) {setErrorMessage(true); setErrorParameter("Roles");}
    else if (chipPropertyDialog.length == 0) {setErrorMessage(true); setErrorParameter("Property");}
    else {
      setErrorMessage(false);
      if (position == "Add new position") {
        let addPosition = await postposition(sessionStorage.getItem("auth"), { "position": newPosition });
      }
      let perm = await propertylist(data, code);
      console.log(perm)
      const roletemp = new Set();
      if (chipRolesDialog.length) {
        for (let i in chipRolesDialog) {
          roletemp.add(chipRolesDialog[i].key);
        }
      }
      const roleTempArray = Array.from(roletemp).join(",");
      const propertytemp = new Set();
      if (chipPropertyDialog.length) {
        for (let i in chipPropertyDialog) {
          propertytemp.add(chipPropertyDialog[i].key);
        }
      }
      const propertyTempArray = Array.from(propertytemp).join(",");
      console.log(firstName, lastName, status, position, role);
      let update = await updateuser(sessionStorage.getItem("auth"), {
        oldUserName: oldUserName,
        firstname: firstName,
        lastname: lastName,
        code: code,
        status: status,
        position: (position == "Add new position") ? newPosition : position,
        userproperty: propertyTempArray,
        role: roleTempArray,
        permission: perm
      });
      // const temp = new Set();
      // if (role.length) {
      //   for (var i in role) {
      //     temp.add(role[i].key);
      //   }
      // }
      // const roleArray = Array.from(temp).join(",");
      // console.log("roleArray", roleArray);

      // const userupdate = await updateuser(
      //   sessionStorage.getItem("auth"),
      //   {
      //     username: username,
      //     firstname: firstName,
      //     lastname: lastName,
      //     status: status,
      //     position: position,
      //     role: roleArray,
      //   },
      //   id
      // );
      // console.log("userupdate func:", userupdate);

      if (update.status == '2000') {
        const _data = await listuser(sessionStorage.getItem("auth"));
        let userdata = [];
        _data.content[_data.content.length - 1].forEach((element) =>
          userdata.push(
            createData(
              element.code,
              element.username,
              element.firstname,
              element.lastname,
              element.position,
              element.roles,
              element.property,
              element.status
            )
          )
        );

        setRows(userdata);
        updatePageData(userdata, page, rowsPerPage);
        setDialogEditUser(false);
      }
    }

  };

  const handleDialogDeleteUserClose = () => {
    setDialogDeleteUser(false);
  };
  const handleDialogDeleteUserOpen = async (username, firstname, lastname) => {
    // setEditID(id);
    // const databyid = await getuserbyid(sessionStorage.getItem("auth"), id);
    console.log("delete dialog", username, firstname, lastname)
    setEditUserName(username);
    setEditFirstName(firstname);
    setEditLastName(lastname);

    setDialogDeleteUser(true);
  };

  const handleDialogDelete = async (username, fname, lname) => {
    // console.log("DeleteID:", id);
    console.log("DeleteUsername:", username);
    console.log("DeleteFname:", fname);
    console.log("DeleteLname:", lname);

    const deleteuser = await deleteuserbyusername(
      sessionStorage.getItem("auth"),
      username
    );
    console.log("userupdate func:", deleteuser);
    const data = await listuser(sessionStorage.getItem("auth"));
    let userdata = [];
    data.content[data.content.length - 1].forEach((element) =>
      userdata.push(
        createData(
          element.code,
          element.username,
          element.firstname,
          element.lastname,
          element.position,
          element.roles,
          element.property,
          element.status

        )
      )
    );
    console.log(sessionStorage.getItem("auth"));
    console.log(userdata);
    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);

    setDialogDeleteUser(false);
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
                    <TableCell>Property</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pageData.map((row) => (
                    <TableRow key={row.code}>
                      <TableCell>{row.userID}</TableCell>
                      <TableCell>
                        {row.firstname} {row.lastname}
                      </TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.roles}</TableCell>
                      <TableCell>{row.property}</TableCell>
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
                          onClick={() => handleDialogEditUser(row.userID, row.firstname, row.lastname, row.position, row.status)}
                        >
                          <EditRoundedIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDialogDeleteUserOpen(row.userID, row.firstname, row.lastname)}
                        >
                          <DeleteRoundedIcon />
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
          maxWidth={dialogSize}
          open={dialogAddUser}
          onClose={handleDialogAddUserClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container>

            <Grid
              item
              xs={dialogRatio}
              sm={dialogRatio}
              md={dialogRatio}
              lg={dialogRatio}
              xl={dialogRatio}
            >
              <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                New User
              </DialogTitle>

              <DialogContent>

                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        // autoFocus
                        id="outlined-basic"
                        label="UserID"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditUserID(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        // autoFocus
                        id="outlined-basic"
                        label="Firstname"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditFirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        id="outlined-basic"
                        label="Lastname"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        // value={" "}
                        onChange={(e) => setEditLastName(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>

                  {/* <Grid container spacing={2} style={{ paddingTop: 5 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
              </Grid> */}
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
                      onChange={(event, name) => handleSelectRoles(event, name)}
                    >
                      {roles.map((option) => (
                        <MenuItem
                          key={option.key}
                          name={option.key}
                          value={option.label}
                        >
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
                  <Grid style={{ paddingTop: 10 }}>
                    <Divider />
                  </Grid>
                  <TextField
                    fullWidth
                    // autoFocus
                    variant="outlined"
                    selectSelectProps={{
                      native: true,
                    }}
                    label="Property"
                    select
                    value={PropertyValues}
                    onChange={(event, name) => handleSelectProperty(event, name)}
                  >
                    {properties.map((option) => (
                      <MenuItem
                        key={option.key}
                        name={option.key}
                        value={option.label}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {chipPropertyDialog.map((data, index) => {
                    return (
                      <Chip
                        style={{ marginTop: 10 }}
                        key={data.key + index}
                        label={data.label}
                        onDelete={handleDeleteProperty(data)}
                      />
                    );
                  })}
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>

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

                      {/* <TextField
                    id="outlined-basic"
                    label="username@mail.com"
                    variant="outlined"
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    // value={" "}
                    // onChange={" "}
                  ></TextField> */}
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

                          <Switch
                            defaultChecked={true}
                            color="primary"
                            onChange={(e) =>
                              e.target.checked
                                ? setEditStatus("Active")
                                : setEditStatus("Inactive")
                            }
                          />

                        }
                        label="Status"
                        labelPlacement="start"
                      />
                    </Grid>
                  </Grid>
                  {selectPosition == "Add new position" ?
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        // autoFocus
                        id="outlined-basic"
                        label="Position"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setNewPosition(e.target.value)}
                      />
                    </Grid>
                    : null}

                </Container>
                {permissionDialog ? (
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
                    ></Grid>
                    <Divider style={{ marginTop: 10 }} />
                    <Container disableGutters>
                      <Button style={{ margin: 15 }} variant="contained" onClick={() => setPermissionDialog(!permissionDialog)}>
                        Reset to Default
                      </Button>
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
                      >
                        {data.map((node) => renderTree(node))}
                      </TreeView>
                    </Container>
                  </Grid>
                ) : null}
                {errorMessage ? <div style={{ background: "#ff0033", textAlign: "center", color: "white", height: "30px", paddingTop: 5 }}>{errorParameter} is required</div> : null}
              </DialogContent>
            </Grid>
          </Grid>
          <DialogActions style={{ padding: 20 }}>
            {!permissionDialog ?
              <Grid item style={{ flexGrow: 1 }}>
                <Button
                  onClick={handlePermission}
                  variant="contained"
                  // color="#20C1BB"
                  style={{ backgroundColor: "#20C1BB", color: "white" }}
                >
                  <VpnKeyOutlinedIcon style={{ marginRight: 15 }} />
                  Permission
                </Button>
              </Grid>
              : null}
            <Button
              onClick={handleDialogAddUserClose}
              variant="text"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleInsertUser(
                  editUserID,
                  editFirstName,
                  editLastName,
                  editStatus,
                  selectPosition,
                  chipRolesDialog
                )
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
          maxWidth={dialogSize}
          open={dialogEditUser}
          onClose={handleDialogEditUserClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container>

            <Grid
              item
              xs={dialogRatio}
              sm={dialogRatio}
              md={dialogRatio}
              lg={dialogRatio}
              xl={dialogRatio}
            >
              <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                Edit User
              </DialogTitle>
              <DialogContent>

                <Container maxWidth="xl" disableGutters>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <TextField
                        // autoFocus
                        id="outlined-basic"
                        label="UserID"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditUserName(e.target.value)}
                        defaultValue={editUserName}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        // autoFocus
                        id="outlined-basic"
                        label="Firstname"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setEditFirstName(e.target.value)}
                        defaultValue={editFirstName}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        id="outlined-basic"
                        label="Lastname"
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        // value={" "}
                        defaultValue={editLastName}
                        onChange={(e) => setEditLastName(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>

                  {/* <Grid container spacing={2} style={{ paddingTop: 5 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
              </Grid> */}
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
                      onChange={(event, name) => handleSelectRoles(event, name)}
                    >
                      {roles.map((option) => (
                        <MenuItem
                          key={option.key}
                          name={option.key}
                          value={option.label}
                        >
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
                  <Grid style={{ paddingTop: 10 }}>
                    <Divider />
                  </Grid>
                  <TextField
                    fullWidth
                    // autoFocus
                    variant="outlined"
                    selectSelectProps={{
                      native: true,
                    }}
                    label="Property"
                    select
                    value={PropertyValues}
                    onChange={(event, name) => handleSelectProperty(event, name)}
                  >
                    {properties.map((option) => (
                      <MenuItem
                        key={option.key}
                        name={option.key}
                        value={option.label}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {chipPropertyDialog.map((data, index) => {
                    return (
                      <Chip
                        style={{ marginTop: 10 }}
                        key={data.key + index}
                        label={data.label}
                        onDelete={handleDeleteProperty(data)}
                      />
                    );
                  })}
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>

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
                        // defaultValue={selectPosition}
                        onChange={handleSelectPosition}
                      >
                        {position.map((option) => (
                          <option key={option.key} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>


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
                              onChange={(e) =>
                                e.target.checked
                                  ? setEditStatus("Active")
                                  : setEditStatus("Inactive")
                              }
                            />
                          )
                        }
                      />
                    </Grid>

                    {selectPosition == "Add new position" ?
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                          // autoFocus
                          id="outlined-basic"
                          label="Position"
                          variant="outlined"
                          fullWidth
                          onChange={(e) => setNewPosition(e.target.value)}
                        />
                      </Grid>
                      : null}
                  </Grid>
                </Container>

                {permissionDialog ? (
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
                    ></Grid>
                    <Divider style={{ marginTop: 10 }} />
                    <Container disableGutters>
                      <Button style={{ margin: 15 }} variant="contained" onClick={() => setPermissionDialog(!permissionDialog)}>
                        Reset to Default
                      </Button>
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
                      >
                        {data.map((node) => renderTree(node))}
                      </TreeView>
                    </Container>
                  </Grid>
                ) : null}
                {errorMessage ? <div style={{ background: "#ff0033", textAlign: "center", color: "white", height: "30px", paddingTop: 5 }}>{errorParameter} is required</div> : null}
              </DialogContent>

              <DialogActions style={{ padding: 20 }}>
                <Grid container>
                  <Grid item style={{ flexGrow: 1 }}>
                    {!permissionDialog ?
                      <Button
                        onClick={handlePermissionEdit}
                        variant="contained"
                        // color="#20C1BB"
                        style={{ backgroundColor: "#20C1BB", color: "white" }}
                      >
                        <VpnKeyOutlinedIcon style={{ marginRight: 15 }} />
                        Permission
                      </Button>
                      : null}
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleDialogEditUserClose}
                      variant="text"
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() =>
                        handleSaveEdit(
                          editUserName,
                          editFirstName,
                          editLastName,
                          editStatus,
                          selectPosition,
                          chipRolesDialog
                        )
                      }
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>

        {/* ==================== Dialog Delete User========================= */}
        <Dialog
          maxWidth="sm"
          open={dialogDeleteUser}
          onClose={handleDialogDeleteUserClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                Confirm Delete User
              </DialogTitle>
              <DialogContent>
                <Typography variant="h5" color="initial">
                  Confirm Delete {editUserName} {editFirstName} {editLastName}
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
                      onClick={handleDialogDeleteUserClose}
                      variant="contained"
                      color="default"
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item sm={6} md={6} lg={6} xl={6}>
                    <Button
                      fullWidth
                      onClick={() =>
                        handleDialogDelete(
                          editUserName,
                          editFirstName,
                          editLastName
                        )
                      }
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
      </React.Fragment>
    </Container>
  );
}
