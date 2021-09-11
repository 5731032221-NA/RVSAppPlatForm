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
import UpdateIcon from '@material-ui/icons/Update';
import {
  listrole,
  getrolebyid,
  updaterole,
  postrole,
  deleterolebyid,
  listallproperty,
  deleterolebycode,
  rolepermissionbyrole
} from "../services/user.service";
// from "../services/roleManagement.service";
import TablePagination from "@material-ui/core/TablePagination";
import { EDIT_CONFIGSTATE } from "../middleware/action";

// Generate Order Data
function createData(id, rolecode, rolename, description, count, applyproperty, status) {
  return {
    id,
    rolecode,
    rolename,
    description,
    count,
    applyproperty,
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

export default function RoleManagement() {
  const classes = useStyles();
  const { store } = useContext(ReactReduxContext);
  const [data, setData] = React.useState([]);

  const [dialogAddRole, setDialogAddRole] = React.useState(false);
  const [dialogEditRole, setDialogEditRole] = React.useState(false);
  const [dialogDeleteRole, setDialogDeleteRole] = React.useState(false);

  const [status, setStatus] = React.useState(null);
  const [selectUser, setSelectUser] = React.useState(null);
  const [roleID, setRoleID] = React.useState(null);
  const [roleCode, setRoleCode] = React.useState(null);
  const [oldrolecode, setOldRoleCode] = React.useState(null);
  const [roleName, setRoleName] = React.useState(null);
  const [descriptionsRole, setDescriptionsRole] = React.useState(null);
  const [rows, setRows] = useState([]);

  const [editRolecode, setEditRolecode] = useState([]);
  const [editRolename, setEditRolename] = useState([]);
  const [editDescription, setEditDescription] = useState([]);
  const [editStatus, setEditStatus] = useState([]);
  const [allProperty, setAllProperty] = useState([]);

  const [pageData, setPageData] = React.useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ChipPropertyDialog, setChipPropertyDialog] = React.useState([]);

  const [errorMessage, setErrorMessage] = useState(false);
  const [errorParameter, setErrorParameter] = useState(null);

  React.useEffect(async () => {
    let data = await listrole(sessionStorage.getItem("auth"));
    console.log("listrole", listrole);
    let userdata = [];
    // let i = 0;
    data.content[data.content.length - 1].forEach((element) =>
      userdata.push(
        createData(
          element.code,
          element.rolecode,
          element.rolename,
          element.description,
          element.count,
          element.applyproperty,
          element.status
        )
      )
    );
    console.log(sessionStorage.getItem("auth"));
    console.log("userdata", userdata);
    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);
  }, []);

  const handleDialogAddRole = async () => {
    let propertydata = await listallproperty(sessionStorage.getItem("auth"));
    console.log("propertydata", propertydata);
    let tempproperty = [{
      key: "*ALL",
      label: "*ALL",
    }];
    propertydata.content[propertydata.content.length - 1].split(",").forEach((element) => {
      if (tempproperty.filter(x => x.label === element).length == 0) {
        tempproperty.push({
          key: element,
          label: element,
        })
      }
    }

    );
    console.log("tempproperty", tempproperty)
    // console.log(defaultdata.val());
    // let _data = defaultdata.val();
    setData(JSON.parse(JSON.stringify(defaultdata)));
    setChipPropertyDialog([])
    setAllProperty(tempproperty);
    setRoleCode(null);
    setRoleName(null);
    setDescriptionsRole(null);
    setStatus("Active");
    setErrorMessage(false);
    setDialogAddRole(true);
  };


  const propertylist = async (array, rolecode) => {
    let list = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (obj.edited_create ||
        obj.edited_read ||
        obj.edited_update ||
        obj.edited_delete) {
        list.push(
          {
            rolecode: rolecode,
            componentcode: obj.code,
            permissioncreate: +obj.create,
            permissionread: +obj.read,
            permissionupdate: +obj.update,
            permissiondelete: +obj.delete
          }
        )
      }
      if (obj.children) {
        // list = [...list, ...propertylist(obj.children)];
        let append = await propertylist(obj.children, rolecode);
        if (append.length > 0) list = list.concat(append);
      }
    }
    return list;
  };


  const handleDialogAddRoleSave = async (
    rolecode,
    rolename,
    description,
    status
  ) => {
    if (rolecode == null || rolecode == '') {setErrorMessage(true); setErrorParameter("Role Code");}
    else if (rolename == null || rolename == '') {setErrorMessage(true); setErrorParameter("Role Name");}
    else if (ChipPropertyDialog.length == 0) {setErrorMessage(true); setErrorParameter("Property");}
    else if (description == null || description == '') {setErrorMessage(true); setErrorParameter("Description");}
    else {
      setErrorMessage(false);

      let perm = await propertylist(data, rolecode);
      const temp = new Set();
      if (ChipPropertyDialog.length) {
        for (var i in ChipPropertyDialog) {
          temp.add(ChipPropertyDialog[i].key);
        }
      }
      const tempArray = Array.from(temp).join(",");
      let insert = await postrole(sessionStorage.getItem("auth"), {
        rolecode: rolecode,
        rolename: rolename,
        description: description,
        status: status,
        applyproperty: tempArray,
        permission: perm
      });
      if (insert.status == '2000') {
        let roledata = await listrole(sessionStorage.getItem("auth"));
        let userdata = [];
        roledata.content[roledata.content.length - 1].forEach((element) =>
          userdata.push(
            createData(
              element.code,
              element.rolecode,
              element.rolename,
              element.description,
              element.count,
              element.applyproperty,
              element.status
            )
          )
        );

        console.log(sessionStorage.getItem("auth"));
        console.log("userdata", userdata);
        setRows(userdata);
        updatePageData(userdata, page, rowsPerPage);

        setDialogAddRole(false);
      }
    }
  };

  const handleDialogAddRoleClose = () => {
    setChipPropertyDialog([]);
    setDialogAddRole(false);
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

        obj.edited_create = !!parseInt(permission[obj.code].permissioncreate);
        obj.edited_read = !!parseInt(permission[obj.code].permissionread);
        obj.edited_update = !!parseInt(permission[obj.code].permissionupdate);
        obj.edited_delete = !!parseInt(permission[obj.code].permissiondelete);
      }
      if (obj.children) {
        // list = [...list, ...propertylist(obj.children)];
        rolepermission(obj.children, permission);
      }
    }
    return list;
  };

  const handleDialogEditRole = async (rolecode, rolename, description, applyproperty, status) => {

    let propertydata = await listallproperty(sessionStorage.getItem("auth"));
    console.log("propertydata", propertydata);
    let tempproperty = [{
      key: "*ALL",
      label: "*ALL",
    }];
    propertydata.content[propertydata.content.length - 1].split(",").forEach((element) => {
      if (tempproperty.filter(x => x.label === element).length == 0) {
        tempproperty.push({
          key: element,
          label: element,
        })
      }
    }

    );
    console.log("tempproperty", tempproperty)

    if (applyproperty.indexOf("*ALL") < 0) {
      let property = []
      applyproperty.split(",").forEach((element) => {
        if (property.filter(x => x.label === element).length == 0) {
          property.push({ key: element, label: element })
        }
      })
      setChipPropertyDialog((chips) => property)
    } else {
      setChipPropertyDialog((chips) => [
        { key: "*ALL", label: "*ALL" }
      ])
    }

    // console.log(defaultdata.val());
    // let _data = defaultdata.val();
    setAllProperty(tempproperty);

    let roleper = await rolepermissionbyrole(sessionStorage.getItem("auth"), { roles: [rolecode] })
    console.log("roleper", roleper)
    let _data = JSON.parse(JSON.stringify(defaultdata));
    rolepermission(_data, roleper.content[roleper.content.length - 1])
    setData(_data);
    setData((prevState) => [...prevState]);
    // const databyid = await getuserbyid(
    //   sessionStorage.getItem("auth"),
    //   idForEdit
    // );
    // setStatusRec(databyid.content[databyid.content.length - 1].status_record);
    // console.log("idForEdit", idForEdit);

    setRoleCode(rolecode);
    setRoleName(rolename);
    setDescriptionsRole(description);
    setStatus(status);
    setOldRoleCode(rolecode);
    setErrorMessage(false);
    setDialogEditRole(true);


  }
  // const handleDialogEditRole = async (id) => {
  //   console.log("idForEdit", id);
  //   const rolebyid = await getrolebyid(sessionStorage.getItem("auth"), id);
  //   setRoleID(rolebyid.content[rolebyid.content.length - 1].code);
  //   setRoleCode(rolebyid.content[rolebyid.content.length - 1].rolecode);
  //   setRoleName(rolebyid.content[rolebyid.content.length - 1].rolename);
  //   setDescriptionsRole(
  //     rolebyid.content[rolebyid.content.length - 1].description
  //   );
  //   setStatus(rolebyid.content[rolebyid.content.length - 1].status);
  //   console.log("rolebyid", rolebyid);

  //   setDialogEditRole(true);
  // };


  const handleDialogEditRoleSave = async (
    rolecode,
    rolename,
    description,
    status
  ) => {
    console.log(
      "rolecode,rolename,description,status",
      rolecode,
      rolename,
      description,
      status
    );
    if (rolecode == null || rolecode == '') {setErrorMessage(true); setErrorParameter("Role Code");}
    else if (rolename == null || rolename == '') {setErrorMessage(true); setErrorParameter("Role Name");}
    else if (ChipPropertyDialog.length == 0) {setErrorMessage(true); setErrorParameter("Property");}
    else if (description == null || description == '') {setErrorMessage(true); setErrorParameter("Description");}
    else {
      setErrorMessage(false);
      let perm = await propertylist(data, rolecode);
      const temp = new Set();
      if (ChipPropertyDialog.length) {
        for (var i in ChipPropertyDialog) {
          temp.add(ChipPropertyDialog[i].key);
        }
      }
      const tempArray = Array.from(temp).join(",");
      const roleupdate = await updaterole(
        sessionStorage.getItem("auth"),
        {
          oldrolecode: oldrolecode,
          rolecode: rolecode,
          rolename: rolename,
          description: description,
          status: status,
          applyproperty: tempArray,
          permission: perm
        }
      );
      console.log("roleupdate func:", roleupdate);
      if (roleupdate.status == '2000') {
        let _data = await listrole(sessionStorage.getItem("auth"));
        console.log("listrole", listrole);
        let userdata = [];
        // let i = 0;
        _data.content[_data.content.length - 1].forEach((element) =>
          userdata.push(
            createData(
              element.code,
              element.rolecode,
              element.rolename,
              element.description,
              element.count,
              element.applyproperty,
              element.status
            )
          )
        );


        setRows(userdata);
        updatePageData(userdata, page, rowsPerPage);
        setErrorMessage(false);
        setDialogEditRole(false);
      }
    }
  };

  const handleDialogDeleteRoleClose = () => {
    setDialogDeleteRole(false);
  };

  const handleDialogDeleteRoleOpen = async (rolecode, rolename, description) => {
    // console.log("idForDelete", id);
    // const rolebyid = await getrolebyid(sessionStorage.getItem("auth"), id);
    // setRoleID(rolebyid.content[rolebyid.content.length - 1].code);
    setRoleCode(rolecode);
    setRoleName(rolename);
    setDescriptionsRole(description);

    setDialogDeleteRole(true);
  };

  const handleDialogDelete = async (code) => {
    // console.log("id for delete", id);

    const roleDelete = await deleterolebycode(sessionStorage.getItem("auth"), code);
    console.log("roleuDelete func:", roleDelete);

    let data = await listrole(sessionStorage.getItem("auth"));
    console.log("listrole", listrole);
    let userdata = [];
    // let i = 0;
    data.content[data.content.length - 1].forEach((element) =>
      userdata.push(
        createData(
          element.code,
          element.rolecode,
          element.rolename,
          element.description,
          element.count,
          element.applyproperty,
          element.status
        )
      )
    );
    console.log(sessionStorage.getItem("auth"));
    console.log("userdata", userdata);
    setRows(userdata);
    updatePageData(userdata, page, rowsPerPage);

    setDialogDeleteRole(false);
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
      console.log(obj.code, label);
      if (obj.code === label) {
        obj.edited_create = !obj.edited_create;
        obj.create = !obj.create;
      } else if (obj.children) {
        editing_create(obj.children, label);
      }
    }
  };

  const handleComponentState = async (comp) => {
    console.log("setcomp", comp)
    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: comp
    })
  }

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

  const select_all = async (array) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];

      obj.edited_delete = true;
      obj.delete = true;

      obj.edited_update = true;
      obj.update = true;

      obj.edited_read = true;
      obj.read = true;

      obj.edited_create = true;
      obj.create = true;

      if (obj.children) {
        select_all(obj.children);
      }
    }
  };

  const clear_all = async (array) => {
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];

      obj.edited_delete = false;
      obj.delete = false;

      obj.edited_update = false;
      obj.update = false;

      obj.edited_read = false;
      obj.read = false;

      obj.edited_create = false;
      obj.create = false;

      if (obj.children) {
        clear_all(obj.children);
      }
    }
  };
  const handleSelectAllPermission = async () => {
    let _data = data;
    await select_all(_data);
    setData(_data);
    setData((prevState) => [...prevState]);
  }
  const handleClearAllPermission = async () => {
    let _data = data;
    await clear_all(_data);
    setData(_data);
    setData((prevState) => [...prevState]);
  }


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
  // const demoUser = [
  //   {
  //     key: "1",
  //     label: "Admin",
  //   },
  //   {
  //     key: "2",
  //     label: "User1",
  //   },
  //   {
  //     key: "3",
  //     label: "User1",
  //   },
  // ];


  // const attribute = [
  //   {
  //     key: "1",
  //     label: "Novotel Pattaya",
  //   },
  //   {
  //     key: "2",
  //     label: "Novotel Rayong",
  //   },
  // ];

  const userValues = "";
  const handleSelectProperty = (event) => {
    if (event.target.value == "*ALL") setChipPropertyDialog([
      { key: event.target.value, label: event.target.value }
    ]);
    else {
      const temp = new Set();

      if (ChipPropertyDialog.length) {
        for (var i in ChipPropertyDialog) {
          if (ChipPropertyDialog[i].label == "*ALL") setChipPropertyDialog((chips) =>
            chips.filter((chips) => chips.key !== "*ALL")
          );
          // setChipPropertyDialog(prevState => prevState.filter((_, index) => index !== i)) 
          temp.add(ChipPropertyDialog[i].label);
        }
        if (temp.has(event.target.value)) {
          // console.log("had value");
        } else {
          setChipPropertyDialog((chips) => ([
            ...chips,
            { key: event.target.value, label: event.target.value },
          ]));
        }
      } else {
        setChipPropertyDialog((chips) => ([
          ...chips,
          { key: event.target.value, label: event.target.value },
        ]));
      }
    }
  };
  const handleDeleteProperty = (chipToDelete) => () => {
    setChipPropertyDialog((chips) =>
      chips.filter((chips) => chips.key !== chipToDelete.key)
    );
  };

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
                          style={{ fontSize: 16, paddingTop: 10, paddingBottom: 10 }}
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
                        <TableRow key={row.code}>
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
                              onClick={() => handleDialogEditRole(row.rolecode, row.rolename, row.description, row.applyproperty, row.status)}
                            >
                              <EditRoundedIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDialogDeleteRoleOpen(row.rolecode, row.rolename, row.description)}
                            >
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

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                        defaultValue={""}
                        onChange={(e) => setRoleCode(e.target.value)}
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
                        defaultValue={""}
                        onChange={(e) => setRoleName(e.target.value)}
                      ></TextField>
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
                      onChange={(event) => handleSelectProperty(event)}
                    >
                      {allProperty.map((option) => (
                        <MenuItem key={option.key} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {ChipPropertyDialog.map((data, index) => {
                      return (
                        <Chip
                          style={{ marginTop: 10 }}
                          key={data.key + index}
                          label={data.label}
                          onDelete={handleDeleteProperty(data)}
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
                      defaultValue={""}
                      onChange={(e) => setDescriptionsRole(e.target.value)}
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
                              ? setStatus("Active")
                              : setStatus("Inactive")
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
                    <Button
                      onClick={handleSelectAllPermission}
                      variant="contained"
                      color="primary"
                    >
                      Select All Permission
                    </Button>

                    <Button
                      onClick={handleClearAllPermission}
                      variant="contained"
                      color="inherit"
                      style={{ marginLeft: 20 }}
                    >
                      Clear All Permission
                    </Button>
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
                {errorMessage ? <div style={{ background: "#ff0033", textAlign: "center", color: "white", height: "30px", paddingTop: 5 }}>{errorParameter} is required</div> : null}
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
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleDialogAddRoleSave(
                      roleCode,
                      roleName,
                      descriptionsRole,
                      status
                    )
                  }
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

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                        // value={editRolecode}
                        fullWidth
                        defaultValue={roleCode}
                        onChange={(e) => setRoleCode(e.target.value)}
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

                        // value={editRolename}

                        defaultValue={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                      ></TextField>
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
                      // value={userValues}
                      onChange={(event) => handleSelectProperty(event)}
                    >
                      {allProperty.map((option) => (
                        <MenuItem key={option.key} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    {ChipPropertyDialog.map((data, index) => {
                      return (
                        <Chip
                          style={{ marginTop: 10 }}
                          key={data.key + index}
                          label={data.label}
                          onDelete={handleDeleteProperty(data)}
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
                      // value={editDescription}
                      multiline
                      rows={4}
                      variant="outlined"
                      defaultValue={descriptionsRole}
                      onChange={(e) => setDescriptionsRole(e.target.value)}
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
                        status === "Active" || status === "active" ? (
                          <Switch
                            defaultChecked={true}
                            color="primary"
                            onChange={(e) =>
                              e.target.checked
                                ? setStatus("Active")
                                : setStatus("Inactive")
                            }
                          />
                        ) : (
                          <Switch
                            defaultChecked={false}
                            color="primary"
                            // value={editStatus}
                            // onChange={(e) => setEditStatus(e.target.checked)}


                            onChange={(e) =>
                              e.target.checked
                                ? setStatus("Active")
                                : setStatus("Inactive")
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
                    <Button
                      onClick={handleSelectAllPermission}
                      variant="contained"
                      color="primary"
                    >
                      Select All Permission
                    </Button>

                    <Button
                      onClick={handleClearAllPermission}
                      variant="contained"
                      color="inherit"
                      style={{ marginLeft: 20 }}
                    >
                      Clear All Permission
                    </Button>
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
                {errorMessage ? <div style={{ background: "#ff0033", textAlign: "center", color: "white", height: "30px", paddingTop: 5 }}>{errorParameter} is required</div> : null}
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
                  onClick={() =>
                    handleDialogEditRoleSave(
                      roleCode,
                      roleName,
                      descriptionsRole,
                      status
                    )
                  }
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </Dialog>
        {/* ==================== Dialog Delete User========================= */}
        <Dialog
          maxWidth="sm"
          open={dialogDeleteRole}
          onClose={handleDialogDeleteRoleClose}
          aria-labelledby="form-dialog-title"

        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <DialogTitle id="form-dialog-title" style={{ color: "blue" }}>
                Confirm Delete User
              </DialogTitle>
              <DialogContent>
                <Typography variant="h5" color="initial">
                  Confirm Delete {roleName}
                </Typography>
                <Typography variant="body1" color="initial">
                  Code: {roleCode}
                </Typography>
                <Typography variant="title1" color="initial">
                  Descrioption: {descriptionsRole}
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
                      onClick={handleDialogDeleteRoleClose}
                      variant="contained"
                      color="default"
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item sm={6} md={6} lg={6} xl={6}>
                    <Button
                      fullWidth
                      onClick={() => handleDialogDelete(roleCode)}
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
      </React.Fragment>
    </Container>
  );
}
