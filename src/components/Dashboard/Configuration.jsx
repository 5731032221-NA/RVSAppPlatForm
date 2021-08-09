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

import RoleManagement from "../RoleManagement";
import UserManagement from "../UserManagement";
import { ReactReduxContext, useSelector } from "react-redux";
import { EDIT_CONFIGSTATE } from "../../middleware/action";

const data = {
  id: "root",
  name: "Configuration",
  children: [
    {
      id: "1.1",
      name: "PMS Configuration",
      children: [
        {
          id: "1.1.1",
          name: "Property Configuration",
          children: [
            {
              id: "1.1.1.1",
              name: "Property Master",
            },
            {
              id: "1.1.1.2",
              name: "Building Master",
            },
            {
              id: "1.1.1.3",
              name: "Exposure ",
            },
            {
              id: "1.1.1.4",
              name: "Floor ",
            },
            {
              id: "1.1.1.5",
              name: "Zone/Wing",
            },
          ],
        },
        {
          id: "1.1.2",
          name: "Room Configuration",
          children: [
            {
              id: "1.1.2.1",
              name: "Room Type",
            },
            {
              id: "1.1.2.2",
              name: "Room Category",
            },
            {
              id: "1.1.2.3",
              name: "Room Master Maintenance",
            },
          ],
        },
        {
          id: "1.1.3",
          name: "Item Configuration",
          children: [
            {
              id: "1.1.3.1",
              name: "Item Type",
            },
            {
              id: "1.1.3.2",
              name: "Item Category",
            },
          ],
        },
        {
          id: "1.1.4",
          name: "Reservation Configuration",
          children: [
            {
              id: "1.1.4.1",
              name: "Market segment Maintenance",
            },
            {
              id: "1.1.4.2",
              name: "Source Maintenance",
            },
          ],
        },
      ],
    },
    {
      id: "1.2",
      name: "System Configuration",
      children: [
        {
          id: "1.2.1",
          name: "User Management",
        },
        {
          id: "1.2.2",
          name: "Role Management",
        },
      ],
    },
  ],
};

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

export default function Configuration() {
  const classes = useStyles();
  const { store } = useContext(ReactReduxContext);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState("");

  // const [store.getState().reducer.configState, setstore.getState().reducer.configState] = React.useState("Configuration");
  const configState = useSelector(state => state.reducer.configState);
  const handleChangePage = (event) => {
    setPage(event.target.value);
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
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
                  <IconButton>
                    <DeleteRoundedIcon />
                  </IconButton>
                  <IconButton>
                    <MoreVertRoundedIcon />
                  </IconButton>
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
                    <IconButton>
                      <DeleteRoundedIcon />
                    </IconButton>
                    <IconButton>
                      <MoreVertRoundedIcon />
                    </IconButton>
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
                    <IconButton>
                      <DeleteRoundedIcon />
                    </IconButton>
                    <IconButton>
                      <MoreVertRoundedIcon />
                    </IconButton>
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
                {renderTree(data)}
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
