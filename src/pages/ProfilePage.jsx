import React from "react";
import { connect, ReactReduxContext, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { blue, green, yellow } from "@material-ui/core/colors";
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
  Link,
} from "@material-ui/core";

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
  root: (themeState) => ({
    "& label.MuiInputLabel-root": {
      color: themeState.color,
    },
    "& label.Mui-focused": {
      color: blue[themeState.colorlevel],
    },
    "& .MuiInput-underline:after": {
      borderColor: themeState.color,
      color: themeState.color,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: themeState.color,
        color: themeState.color,
      },
      "&:hover fieldset": {
        borderColor: blue[themeState.colorlevel],
        color: themeState.color,
      },
      "&.Mui-focused fieldset": {
        borderColor: blue[themeState.colorlevel],
        color: themeState.color,
      },
    },
    "&.MuiPaper-root": {
      backgroundColor: themeState.paper,
    },
    "&.MuiMenu-paper": {
      backgroundColor: themeState.paper,
    },
  }),
}));

function createData(
  company,
  departmentanddivision,
  individual,
  position,
  status,
  createdate
) {
  return {
    company,
    departmentanddivision,
    individual,
    position,
    status,
    createdate,
  };
}

const rows = [
  createData("KongHQ", " ", "Joy", "A-SM", "A", 1),
  createData("YongAPI", " ", "Joy", "SM", "I-24/11/2022", 2),
  createData("YongAPI", " ", "Joy", "DOS", "A", 3),
  createData("TH Chamber", " ", "Joy", "Secretary", "A", 4),
  createData("MSC", "SIG/DTS", "P'Pui", "VP", "I-24/09/21", " "),
  createData("MSC", "SIG/BIG", "P'Pui", "VP", "A", " "),
];

const family = [
  {
    fullname: "Joy,Chat",
    status: "sprouse",
  },
];

export const ProfilePage = (props) => {
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
        colorlevel: "A400",
        // matStyle: this.classes.normalmode
      });
    } else {
      setThemeState({
        background: "#212121",
        color: "#FAFAFA",
        paper: "#424242",
        colorlevel: "600",
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

  const classes = useStyles(themeState);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };

  const headerTableStyleGreen = {
    backgroundColor: green[themeState.colorlevel],
    color: themeState.color,
  };

  const headerTableStyleYellow = {
    backgroundColor: yellow[themeState.colorlevel],
    color: themeState.color,
  };

  return (
    <Container maxWidth="xl">
      <Container maxWidth="xl">
        <MaterialTable
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            color: themeState.color,
            backgroundColor: themeState.paper,
          }}
          title={
            <Grid>
              <Typography
                variant="h6"
                style={{ fontSize: 25, color: themeState.color }}
              >
                Table Profile
              </Typography>
            </Grid>
          }
          columns={[
            {
              title: "Company",
              field: "company",
              headerStyle: headerTableStyleGreen,
            },
            {
              title: "Department/Division",
              field: "departmentanddivision",
              headerStyle: headerTableStyleGreen,
            },
            {
              title: "Individual",
              field: "individual",
              headerStyle: headerTableStyleGreen,
            },
            {
              title: "Position",
              field: "position",
              headerStyle: headerTableStyleYellow,
            },
            {
              title: "Status",
              field: "status",
              headerStyle: headerTableStyleYellow,
            },
            {
              title: "Create Date",
              field: "createdate",
              headerStyle: headerTableStyleYellow,
            },
          ]}
          data={rows}
          options={{
            search: false,
            //   page: page,
            //   pageSize: rowsPerPage,
            pageSizeOptions: [5, 10, 20, { value: rows.length, label: "All" }],
            headerStyle: headerTableStyle,
          }}
        />
      </Container>
      {/* ========================================================== */}
      <Container maxWidth="xl" style={{ marginTop: 50 }}>
        <MaterialTable
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            color: themeState.color,
            backgroundColor: themeState.paper,
          }}
          title={
            <Grid>
              <Typography
                variant="h6"
                style={{ fontSize: 25, color: themeState.color }}
              >
                Table Family
              </Typography>
            </Grid>
          }
          columns={[
            {
              title: "Fullname",
              field: "fullname",
              headerStyle: headerTableStyleGreen,
            },
            {
              title: "Status",
              field: "status",
              headerStyle: headerTableStyleYellow,
            },
          ]}
          data={family}
          options={{
            search: false,
            //   page: page,
            //   pageSize: rowsPerPage,
            pageSizeOptions: [5, 10, 20, { value: rows.length, label: "All" }],
            headerStyle: headerTableStyle,
          }}
        />
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
