import React from 'react'
import { connect, ReactReduxContext, useSelector } from "react-redux";
import { nextComponent } from "../../middleware/action";
import MaterialTable from "material-table";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { blue, green, yellow } from "@material-ui/core/colors";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ClearIcon from "@material-ui/icons/Clear";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
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
// import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
// import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
// import ProfileCompany from "./ProfileCompany";
// import DeleteIcon from "@material-ui/icons/DeleteOutlined";
// import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
// import AddRoundedIcon from "@material-ui/icons/AddRounded";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import SearchIcon from "@material-ui/icons/Search";
// import { useTheme } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";


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
  
//   function createData(
//     firstname,
//     lastname,
//     title,
//     sex,
//     idcardandpass,
//     nationality,
//     nextstay,
//     laststay,
//     score,
//     status
//   ) {
//     return {
//       firstname,
//       lastname,
//       title,
//       sex,
//       idcardandpass,
//       nationality,
//       nextstay,
//       laststay,
//       score,
//       status,
//     };
//   }
  
//   const rows = [
//     createData(
//       "Somchai",
//       "Wongnut",
//       "Mr.",
//       "Male",
//       "1100700222876",
//       "Thai",
//       "12/11/2021",
//       "30/10/2020",
//       "5",
//       "Check-Out"
//     ),
//     createData(
//       "Sommul",
//       "Liu",
//       "Mr.",
//       "Male",
//       "C00102188",
//       "China",
//       "22/11/2021",
//       "10/12/2020",
//       "2",
//       "Check-In"
//     ),
//     // createData("YongAPI", " ", "Joy", "DOS", "A", 3),
//     // createData("TH Chamber", " ", "Joy", "Secretary", "A", 4),
//     // createData("MSC", "SIG/DTS", "P'Pui", "VP", "I-24/09/21", " "),
//     // createData("MSC", "SIG/BIG", "P'Pui", "VP", "A", " "),
//   ];
  
//   const family = [
//     {
//       fullname: "Joy,Chat",
//       status: "sprouse",
//     },
//   ];

 const StandardTable = (props) => {
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
    
      const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"));
    
    let customStyle = {
      padding: theme.spacing(0, 0, 0, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%"
    };
    
    if (smUp) {
      customStyle = {
        ...customStyle,
        width: "54ch",
        // color: "red",
        }
      };
    
     
    
      const headerTableStyle = {
        backgroundColor: themeState.paper,
        color: themeState.color,
      };
    React.useEffect(() => {
        console.log("props.Data:",props.Data);
    },[])
    return (
        <div>
               <MaterialTable
                localization={{
                  body: {
                    emptyDataSourceMessage: (
                      <>
                        {" "}
                        <Typography
                          variant="h1"
                          align="center"
                          style={{ fontSize: 25, color: themeState.color }}
                        >
                          <ErrorOutlineOutlinedIcon
                            style={{ fontSize: 100, color: "lightgray" }}
                          />
                        </Typography>
                        <Typography
                          align="center"
                          variant="h2"
                          style={{
                            fontWeight: 400,
                            fontSize: 30,
                            color: "rgb(0 0 0 / 47%)",
                            marginBottom: 20,
                          }}
                        >
                          No Data Available
                        </Typography>
                        <Grid item>
                          <Button
                            startIcon={<AddOutlinedIcon />}
                            size="large"
                            variant="contained"
                            color="primary"
                            // style={{ padding: 13 }}
                            // fullWidth
                            // onClick={() => setCreateindividual(true)}
                            // onClick={() => handleNewData()}
                          >
                            New CompanyProfile
                          </Button>
                        </Grid>
                      </>
                    ),
                  },
                }}
                style={{
                  paddingLeft: 30,
                  paddingRight: 30,
                  color: themeState.color,
                  backgroundColor: themeState.paper,
                }}
                columns={props.Columns}
                data={props.Data}
                options={{
                  searchFieldAlignment: "left",
                  showTitle: false,
                  search: true,
                  actionsColumnIndex: -1,
                  //   page: page,
                  //   pageSize: rowsPerPage,
                  pageSize: 10,
                  pageSizeOptions: [
                    10,
                    20,
                    30,
                    { value: props.Data.length, label: "All" },
                  ],
                  headerStyle: headerTableStyle,
                  // searchFieldStyle: {
                  //   backgroundColor: themeState.paper,
                  //   color: themeState.color,
                  //   borderBottomColor: themeState.color,
                  //   width: 530,

                  // },
                  searchFieldStyle: customStyle,
                }}
                localization={{
                  toolbar: {
                    searchPlaceholder:
                      "Search by Name, www, City/Country, Industry, IATA",
                  },
                }}
                actions={[
                  {
                    icon: "edit",
                    iconProps: { style: { color: themeState.color } },
                    tooltip: "Edit",
                    onClick: (event, rowData) => {
                        // props.FuncEdit(rowData);
                    },
                  },
                  {
                    icon: "delete",
                    iconProps: { style: { color: themeState.color } },
                    tooltip: "Delete",
                    // onClick: (event, rowData) => {
                    //   handleDialogDeleteOpen(
                    //     rowData.id,
                    //     rowData.name,
                    //     rowData.www,
                    //     rowData.city
                    //   );
                    // },
                  },
                ]}
              />
        </div>
    )
}

export default StandardTable

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     nextComponent: (comp) => dispatch(nextComponent(comp)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(StandardTable);

