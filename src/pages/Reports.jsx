import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import DateFnsUtils from "@date-io/date-fns";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import MaterialTable from "material-table";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

import * as actions from "../middleware/action";
import MaterialTableComponent from "../components/Table/MaterialTableComponent";
import MaterialButtonComponent from "../components/Button/MaterialButtonComponent";
import { getReports } from "../services/reports.service";

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
        borderColor: "grey.500",
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
  id,
  username,
  computercode,
  action,
  devicecode,
  tray,
  remark,
  specialstrings,
  propertycode
) {
  return {
    id,
    username,
    computercode,
    action,
    devicecode,
    tray,
    remark,
    specialstrings,
    propertycode,
  };
}

export const Reports = (props) => {
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
        color: "#666666",
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
        holderColor: "A9A9AC",
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
  const [smallwidth, setSmallwidth] = React.useState(window.innerWidth < 1000);
  React.useEffect(() => {
    setSmallwidth(window.innerWidth < 1000);
  }, []);

  const classes = useStyles(themeState);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };

  const [reportsData, setReportsData] = useState("");
  const [titleTable, setTitleTable] = useState([]);
  const [rows, setRows] = useState([]);

  React.useEffect(() => {
    async function getReportsData() {
      const reportData = await getReports(sessionStorage.getItem("auth"));
      const newReportsData = reportData.content[0].reportjson;
      if (reportData) {
        console.log("newReportsData", newReportsData);
        setReportsData(reportData.content[0].reportjson);

        const getTitleTable = [];
        Object.values(reportData.content[0].reportjson.titles).forEach(
          (element) => {
            getTitleTable.push(element.title);
          }
        );
        setTitleTable(getTitleTable);

        var getRowsTable = [];
        var status = false;
        const newRowsTable = newReportsData.details.sub[0];
        console.log("getRowsTable == >", typeof newRowsTable, newRowsTable);
        Object.entries(newRowsTable).forEach((entry) => {
          const [key, value] = entry;
          if (key === "sub") {
            Object.entries(value).forEach((entry) => {
              const [key, value] = entry;
              let data = Object.entries(value).map((entry) => {
                const [key, value] = entry;
                if (key === "detail") {
                  Object.entries(value).forEach((entry) => {
                    const [key, value] = entry;
                    getRowsTable.push(value);
                  });
                } else if (key === "total") {
                  return value;
                }
              });
              getRowsTable.push(data[0]);
            });
          } else if (key === "total") {
            getRowsTable.push(value);
          }
        });
        // console.log("grand", newReportsData.grand_total);
        getRowsTable.push(newReportsData.grand_total);
        setRows(getRowsTable);
        console.log("getRowsTable ##", getRowsTable);

        // var getRowsTable = [];
        // const newRowsTable = newReportsData.details.sub[0];
        // console.log("getRowsTable == >", typeof newRowsTable, newRowsTable);
        // Object.entries(newRowsTable).map((entry) => {
        //   const [key, value] = entry;
        //   //   console.log("entry entry", entry);
        //   if (key === "sub") {
        //     Object.entries(value).map((entry) => {
        //       const [key, value] = entry;
        //       //   console.log("entry entry", entry);
        //       Object.entries(value).map((entry) => {
        //         const [key, value] = entry;
        //         // console.log("entry entry", entry);
        //         if (key === "detail") {
        //           //   console.log("entry entry|| ", entry);
        //           Object.entries(value).map((entry) => {
        //             const [key, value] = entry;
        //             getRowsTable.push(value);
        //           });
        //         } else if (key === "total") {
        //           getRowsTable.push(value);
        //         }
        //       });
        //     });
        //   } else if (key === "total") {
        //     getRowsTable.push(value);
        //   }
        // });
        // // console.log("grand", newReportsData.grand_total);
        // getRowsTable.push(newReportsData.grand_total);
        // setRows(getRowsTable);
        // console.log("getRowsTable ##", getRowsTable);

        //   if (key === "sub") {
        //     Object.entries(value).map((entry) => {
        //       const [key, value] = entry;
        //       //   console.log("entry entry|| ", entry);
        //       if (key === "detail") {
        //         // console.log("entry entry|| ", entry);
        //       } else if (key === "total") {
        //         getRowsTable.push(value);
        //       }
        //     });
        //     // console.log("entry entry|| ", entry);
        //   } else if (key === "total") {
        //     getRowsTable.push(value);
        //   }

        // // var somedata = "some thing testt";
        // var getRowsTable = Object.entries(newReportsData.details).map(
        //   (entry) => {
        //     const [key, value] = entry;
        //     console.log("entry", value);
        //     Object.entries(value).map((entrySub1) => {
        //       const [key, value] = entrySub1;
        //       Object.entries(value).map((entrySub2) => {
        //         const [key, value] = entrySub2;
        //         if (key == "total") {
        //           //   console.log("mainTotal1####", value);
        //           var mainTotal1 = value;
        //         } else {
        //           Object.entries(value).map((entrySub3) => {
        //             const [key, value] = entrySub3;
        //             Object.entries(value).map((entrySub4) => {
        //               const [key, value] = entrySub4;
        //               if (key == "total") {
        //                 var subTotal = value;
        //                 console.log("subTotal ++++", entrySub4);
        //               } else {
        //                 const entrySub55 = Object.entries(value).map(
        //                   (entrySub5) => {
        //                     const [key, value] = entrySub5;
        //                     var returnData = value;
        //                     console.log("entrySub5 --->", returnData);
        //                     console.log("mainTotal1 ||--->", mainTotal1);
        //                     // console.log("entrySub5 Return||", returnData);
        //                     // return returnData;
        //                   }
        //                 );
        //               }
        //             });
        //           });
        //         }
        //       });
        //     });
        //   }
        // );
        // console.log("getRowsTable", getRowsTable);
        // const getRowsTable = [];
        // var getRowsTable = Object.entries(newReportsData.details).map(
        //   (entry) => {
        //     const [key, value] = entry;
        //     Object.entries(value).forEach((entrySub1) => {
        //       const [key, value] = entrySub1;
        //       Object.entries(value).forEach((entrySub2) => {
        //         const [key, value] = entrySub2;
        //         if (key == "total") {
        //           console.log("mainTotal1####", value);
        //           // var mainTotal1 = value;
        //           // console.log("mainTotal1out;;;", mainTotal1);
        //         } else {
        //           Object.entries(value).forEach((entrySub3) => {
        //             const [key, value] = entrySub3;
        //             Object.entries(value).forEach((entrySub4) => {
        //               const [key, value] = entrySub4;
        //               if (key == "total") {
        //                 console.log("subTotal ++++", entrySub4);
        //               } else {
        //                 const entrySub55 = Object.entries(value).map(
        //                   (entrySub5) => {
        //                     const [key, value] = entrySub5;
        //                     //   const returnData = [];
        //                     const returnData = value;
        //                     // console.log("entrySub5 --->", entrySub5);
        //                     console.log("entrySub5 Return||", returnData);
        //                     return returnData;
        //                   }
        //                 );
        //                 console.log("entrySub5 Return//", entrySub55);
        //               }
        //             });
        //           });
        //         }
        //       });
        //     });
        //   }
        // );
        // const getRowsTable = [];
        // Object.entries(newReportsData).forEach((entry) => {
        //   const [key, value] = entry;
        //   if (key === "details") {
        //     Object.entries(value.sub).forEach((entrySub1) => {
        //       const [key, value] = entrySub1;
        //       //   console.log("main Catagory", key, "=====", value);
        //       Object.entries(value.sub).forEach((entrySub2) => {
        //         const [key, value] = entrySub2;
        //         // console.log("sub Catagory", key, "=====", value);
        //         Object.entries(value).forEach((entrySub3) => {
        //           const [key, value] = entrySub3;
        //           if (key === "detail") {
        //             value.forEach((entrySub4) => {
        //               console.log("entrySub4", entrySub4);
        //             });
        //           } else {
        //             console.log("Total::", key, value);
        //           }
        //         });
        //       });
        //     });
        //   }
        // });

        //   setRows(reportData.content[0].reportjson);

        // let deconstructData = [];
        // newReportsData.detail.sub.forEach((element) =>
        //   console.log("dedata::", element)
        // );
        // let deconstructData = [];
        // reportData.content[0].forEach((element) =>
        //   // deconstructData.push(
        //   //     createData(
        //   //       element.id,
        //   //       element.username,
        //   //       element.computercode,
        //   //       element.action,
        //   //       element.devicecode,
        //   //       element.tray,
        //   //       element.remark,
        //   //       element.specialstrings,
        //   //       element.propertycode
        //   //     )
        //   //   )
        // );
      }
    }
    getReportsData();
  }, []);

  const numbers = [0, 1, 2, 3, 4, 5];

  const NewTitle = titleTable.map((title) => {
    return (
      <div>
        <Grid container justifyContent="center" maxWidth="xl">
          <Typography
            variant="h6"
            noWrap
            fullWidth
            style={{ fontSize: 16, color: themeState.color }}
          >
            {title}
          </Typography>
        </Grid>
      </div>
    );
  });

  //   titleTable.map((title) => {
  //     return (
  //      <div>
  //           <Grid container justifyContent="center">
  //         <Typography
  //           variant="h6"
  //           noWrap
  //           style={{ fontSize: 16, color: themeState.color }}
  //         >
  //           {title}
  //         </Typography>
  //       </Grid>
  //      </div>
  //     );
  //   })

  return (
    <Container
      maxWidth="xl"
      style={{
        paddingTop: 20,
        color: themeState.color,
        marginTop: 15,
        backgroundColor: themeState.background,
      }}
    >
      {NewTitle}
      <MaterialTable
        localization={{
          body: {
            emptyDataSourceMessage: (
              <>
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
                    New Data
                  </Button>
                </Grid>
              </>
            ),
          },
          title: {
            NewTitle,
          },
        }}
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 20,
          color: themeState.color,
          backgroundColor: themeState.paper,
        }}
        title={NewTitle}
        columns={reportsData.columns}
        data={rows}
        options={{
          showTitle: true,

          search: false,
          pageSize: 10,
          pageSizeOptions: [10, 20, 30, { value: rows.length, label: "All" }],
          headerStyle: headerTableStyle,
        }}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
