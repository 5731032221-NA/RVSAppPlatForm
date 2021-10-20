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
import ProfileTable from "../components/ProfileTable";
import ProfileIndividual from "../components/ProfileIndividual";

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
  const [switchPage, setSwitchPage] = React.useState("individual");
  const classes = useStyles(themeState);

  const handlePage = (page) => {
    setSwitchPage(page);
  };

  return (
    <Container maxWidth="xl">
      <Grid item style={{ flexGrow: 1, marginLeft: 30 }}>
        <Breadcrumbs
          separator={
            <Typography
              variant="h6"
              style={{
                marginBottom: 15,
                fontSize: 20,
                color: themeState.color,
              }}
            >
              /
            </Typography>
          }
        >
          <Link
            color="inherit"
            href="#"
            onClick={() => handlePage("tableprofile")}
          >
            {switchPage === "tableprofile" ? (
              <Typography
                variant="h6"
                style={{
                  marginBottom: 15,
                  fontSize: 20,
                  color: mainColor,
                }}
              >
                Profiles
              </Typography>
            ) : (
              <Typography
                variant="h6"
                style={{
                  marginBottom: 15,
                  fontSize: 14,
                  color: themeState.color,
                }}
              >
                Profiles
              </Typography>
            )}
          </Link>
          <Link color="inherit" onClick={() => handlePage("individual")}>
            {switchPage === "individual" ? (
              <Typography
                variant="h6"
                style={{
                  marginBottom: 15,
                  fontSize: 20,
                  color: mainColor,
                }}
              >
                Individual
              </Typography>
            ) : (
              <Typography
                variant="h6"
                style={{
                  marginBottom: 15,
                  fontSize: 14,
                  color: themeState.color,
                }}
              >
                Individual
              </Typography>
            )}
          </Link>
        </Breadcrumbs>
      </Grid>
      {switchPage === "tableprofile" ? (
        <ProfileTable />
      ) : switchPage === "individual" ? (
        <ProfileIndividual />
      ) : null}
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
