import React from "react";
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
  Breadcrumbs,
  Link,
} from "@material-ui/core";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";

// Generate Order Data
function createData(id, userID, userName, position, roles, status) {
  return {
    id,
    userID,
    userName,
    position,
    roles,
    status,
  };
}

const rows = [
  createData(
    0,
    "Somchai",
    "Somchai Wong nut",
    "Front Office",
    "Cashaier",
    "Active"
  ),
  createData(1, "Fah", "Mekha Wihok", "Reception", "Night", "Inactive"),
  createData(2, "Mon", "Month main", "Front Office", "Cashaier", "Active"),
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

export default function UserManagement() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <React.Fragment>
        <Grid
          container
          //   direction="row"
          //   justifyContent="flex-start"
          //   alignItems="center"
        >
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
            <Link color="inherit" href="#" onClick={" "}>
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
                Permission
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

                    <TableCell align="center">Status</TableCell>
                    {/* <TableCell align="center">Sale Amount</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.userID}</TableCell>
                      <TableCell>{row.userName}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.roles}</TableCell>
                      {`${row.status}` === "Active" ? (
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
