import React from "react";
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
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState("");

  const handleChangePage = (event) => {
    setPage(event.target.value);
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  return (
    <div>
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
              <TreeItem
                nodeId="1"
                label={
                  <div>
                    <Grid container direction="row" alignItems="center">
                      <Grid item className={classes.root}>
                        <Typography
                          variant="body1"
                          color="initial"
                          style={{ paddind: 5 }}
                        >
                          System Configuration
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
                <TreeItem
                  nodeId="2"
                  label={
                    <div>
                      <Grid container direction="row" alignItems="center">
                        <Grid item className={classes.root}>
                          <Typography
                            variant="body1"
                            color="initial"
                            style={{ paddind: 5 }}
                          >
                            User Maintenance{" "}
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
                    </div>
                  }
                />
                <Divider />
                <TreeItem
                  nodeId="3"
                  label={
                    <div>
                      <Grid container direction="row" alignItems="center">
                        <Grid item className={classes.root}>
                          <Typography
                            variant="body1"
                            color="initial"
                            style={{ paddind: 5 }}
                          >
                            Role Management{" "}
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
                    </div>
                  }
                />
                <Divider />
              </TreeItem>

              <TreeItem
                nodeId="4"
                label={
                  <div>
                    <Grid container direction="row" alignItems="center">
                      <Grid item className={classes.root}>
                        <Typography
                          variant="body1"
                          color="initial"
                          style={{ paddind: 5 }}
                        >
                          PMS Configuration
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
                <TreeItem
                  nodeId="5"
                  label={
                    <div>
                      <Grid container direction="row" alignItems="center">
                        <Grid item className={classes.root}>
                          <Typography
                            variant="body1"
                            color="initial"
                            style={{ paddind: 5 }}
                          >
                            Property Configuration
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
                  <TreeItem
                    nodeId="6"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Property Master
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
                  />
                  <TreeItem
                    nodeId="7"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Building Master
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
                  />
                  <TreeItem
                    nodeId="8"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Exposure
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
                  />
                  <TreeItem
                    nodeId="9"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Floor
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
                  />
                  <TreeItem
                    nodeId="10"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Zone/Wing
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
                  />
                </TreeItem>
                <TreeItem
                  nodeId="11"
                  label={
                    <div>
                      <Grid container direction="row" alignItems="center">
                        <Grid item className={classes.root}>
                          <Typography
                            variant="body1"
                            color="initial"
                            style={{ paddind: 5 }}
                          >
                            Room Configuration
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
                  <TreeItem
                    nodeId="12"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Room Type
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
                  />
                  <TreeItem
                    nodeId="13"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Room Category
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
                  />
                  <TreeItem
                    nodeId="14"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Room Master Maintenance
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
                  />
                </TreeItem>

                <TreeItem
                  nodeId="15"
                  label={
                    <div>
                      <Grid container direction="row" alignItems="center">
                        <Grid item className={classes.root}>
                          <Typography
                            variant="body1"
                            color="initial"
                            style={{ paddind: 5 }}
                          >
                            Item Configuration
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
                  <TreeItem
                    nodeId="16"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Item Type
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
                  />
                  <TreeItem
                    nodeId="17"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Item Category
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
                  />
                </TreeItem>
                <TreeItem
                  nodeId="18"
                  label={
                    <div>
                      <Grid container direction="row" alignItems="center">
                        <Grid item className={classes.root}>
                          <Typography
                            variant="body1"
                            color="initial"
                            style={{ paddind: 5 }}
                          >
                            Reservation Configuration
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
                  <TreeItem
                    nodeId="19"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Market segment Maintenance
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
                  />
                  <TreeItem
                    nodeId="20"
                    label={
                      <div>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.root}>
                            <Typography
                              variant="body1"
                              color="initial"
                              style={{ paddind: 5 }}
                            >
                              Source Maintenance
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
                  />
                </TreeItem>
              </TreeItem>
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
    </div>
  );
}
