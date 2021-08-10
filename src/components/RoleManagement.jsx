import React from "react";
import Link from "@material-ui/core/Link";
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
  Divider,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";
import Menu from "@material-ui/core/Menu";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

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

const rows = [
  createData(
    0,
    "FSDH",
    "8038",
    "SUPERVISOR",
    "3RDFLOOR",
    "TOWER1",
    "Desription",
    "IN",
    "-"
  ),
  createData(1, "FSDH", "8038", "DELUX", "F4", "A", "Desription", "VC", "-"),
  createData(
    2,
    "FSDH",
    "8038",
    "SUPERVISOR",
    "F5",
    "TOWER1",
    "Desription",
    "IN",
    "-"
  ),
];
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

export default function RoleManagement() {
  const classes = useStyles();
  const [dialogAddRoom, setDialogAddRoom] = React.useState(false);
  const [languageDialog, setLanguageDialog] = React.useState("EN");

  const handleLanguageDialog = (event) => {
    setLanguageDialog(event.target.value);
  };
  const handleDialogAddRoom = () => {
    setDialogAddRoom(true);
  };

  const handleDialogAddRoomClose = () => {
    setDialogAddRoom(false);
  };

  return (
    <Container maxWidth="xl">
      <React.Fragment>
        <Typography
          variant="h6"
          style={{ marginBottom: 15, fontSize: 18, color: "#2B4EAD" }}
        >
          Role Management
        </Typography>
        <Paper>
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
                  onChange={" "}
                  style={{ maxWidth: 600 }}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
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
                      fullWidth
                    />
                  </Grid>
                  <Grid container spacing={2} style={{ paddingTop: 10 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        autoFocus
                        id="outlined-basic"
                        label="Room Number"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        autoFocus
                        select
                        id="outlined-basic"
                        label="Room Type"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ paddingTop: 15 }}>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                      <TextField
                        autoFocus
                        id="outlined-basic"
                        label="Floor"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                      <TextField
                        autoFocus
                        select
                        id="outlined-basic"
                        label="Building"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                      <TextField
                        autoFocus
                        select
                        id="outlined-basic"
                        label="Wing"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ paddingTop: 5 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        autoFocus
                        select
                        id="outlined-basic"
                        label="Room Number"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        autoFocus
                        select
                        id="outlined-basic"
                        label="Exposure"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{ paddingTop: 5 }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        autoFocus
                        select
                        id="outlined-basic"
                        label="Room Seq"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <TextField
                        autoFocus
                        select
                        id="outlined-basic"
                        label="Room Status"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    style={{ paddingTop: 10 }}
                  >
                    <TextField
                      fullWidth
                      autoFocus
                      id="outlined-select-language"
                      select
                      // fullWidth

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
                    />
                  </Grid>
                </Container>
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
                  onClick={handleDialogAddRoomClose}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
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
                    {/* <TableCell align="center">Sale Amount</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      {/* return { id, property, number, roomType, floor, building,desc,status,attribute }; */}

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
                        <IconButton>
                          <EditRoundedIcon />
                        </IconButton>
                        <IconButton>
                          <SaveRoundedIcon />
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
                      // value={page}
                      // onChange={handleChangePage}
                      label="Page"
                      // style={{" "}}
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
          </Grid>
        </Paper>
      </React.Fragment>
    </Container>
  );
}
