import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MaterialTable, { MTableToolbar } from "material-table";
import Typography from "@material-ui/core/Typography";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

import * as actions from "../middleware/action";
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
            getTitleTable.push(element);
            console.log("element ++", element);
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
      }
    }
    getReportsData();
  }, []);

  const NewTitle = titleTable.map((title) => {
    return (
      <div>
        <Grid container justifyContent="center">
          <Typography
            variant="h6"
            noWrap
            style={{
              fontSize: parseInt(title.style.fontSize),
              color: themeState.color,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: title.style.fontWeight,
            }}
          >
            {title.title}
          </Typography>
        </Grid>
      </div>
    );
  });

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
                {/* <Grid item>
                  <Button
                    startIcon={<AddOutlinedIcon />}
                    size="large"
                    variant="contained"
                    color="primary"
                    // onClick={() => handleNewData()}
                  >
                    New Data
                  </Button>
                </Grid> */}
              </>
            ),
          },
        }}
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 20,
          color: themeState.color,
          backgroundColor: themeState.paper,
        }}
        components={{
          Toolbar: (props) => (
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        title={NewTitle}
        columns={reportsData.columns}
        data={rows}
        options={{
          toolbar: true,
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
