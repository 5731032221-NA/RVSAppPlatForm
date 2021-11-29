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





import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



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



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


















    const [rowData, setrowData] = React.useState(null);
    const [Columnss, setColumns] = React.useState(null);
    React.useEffect( () => {

     const setDatashow = async() => {
       console.log("props.statusProfile:",props.statusProfile);
      if(props.statusProfile == "moredata"){
        await setColumns(props.Columns);
        await setrowData(props.Data);
        console.log("props.Data22:",props.Data);
        console.log("Columns.:",Columnss);
       }else {
        await setColumns(null);
        console.log("props.Data22:",props.Data);
        console.log("Columns.:",Columnss);
       }
        // setData(props.Data);
        
      }
      

      setDatashow();
      
  });
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

      const handleEditData = (id) => {
        alert(id)
      }

    return (
        <>
           {/* {
              rowData != null ? (
              <MaterialTable
              localization={{
                toolbar: {
                  searchPlaceholder:
                    "Search by Name, www, City/Country, Industry, IATA",
                },
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
              columns={Columnss ? Columnss : null}
              data={rowData ? rowData : null}
              options={{
                searchFieldAlignment: "left",
                showTitle: false,
                search: true,
                actionsColumnIndex: -1,
                pageSize: 10,
                pageSizeOptions: [
                  10,
                  20,
                  30,
                  { value:  rowData.length , label: "All" },
                ],
                headerStyle: headerTableStyle,
                searchFieldStyle: customStyle,
              }}
              actions={[
                {
                  icon: "edit",
                  iconProps: { style: { color: themeState.color } },
                  tooltip: "Edit",
                  onClick: (event, rowData) => {
                    // handleEditData(rowData);
                  },
                },
                {
                  icon: "delete",
                  iconProps: { style: { color: themeState.color } },
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    // handleDialogDeleteOpen(
                    //   rowData.id,
                    //   rowData.name,
                    //   rowData.www,
                    //   rowData.city
                    // );
                  },
                },
              ]}
            /> 
             ) : ""
           } */}

          
            {
               Columnss != null ? (
                <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {Columnss.map((column) => (
                          <TableCell
                            key={column.field}
                           
                          >
                            {column.title}
                          </TableCell>
                        ))}
                         <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      { rowData ? rowData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {Columnss.map((column) => {
                              const value = row[column.field];
                              return (
                                <TableCell key={column.field}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                              );
                            })}
                            <TableCell component="th" scope="row"  align="center"  onClick={() => handleEditData("Configuration")}>
                               <span >434</span>
                                </TableCell>
                          </TableRow>
                        );
                      }) : ""}
                    </TableBody>
                  </Table>
                </TableContainer>
               {rowData ? ( <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rowData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />) : ""
              }
              </Paper>
              ) : "dfd"
            }
        </>
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

