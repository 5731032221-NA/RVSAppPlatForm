import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MaterialTable, { MTableToolbar } from "material-table";
import Typography from "@material-ui/core/Typography";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CsvBuilder } from "filefy";

// import * as actions from "../middleware/action";
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
  const [titleExport, setTitleExport] = useState([]);
  const [rows, setRows] = useState([]);
  const [columnsData, setColumns] = useState("somedata");

  function listData(data) {
    let subDatas = [];
    data.forEach((groupData) => {
      if (groupData.hasOwnProperty("detail")) {
        groupData.detail.forEach((row) => {
          subDatas.push(row);
        });
        subDatas.push(groupData.total);
      } else {
        subDatas.push(...listData(groupData.sub));
        subDatas.push(groupData.total);
      }
    });
    return subDatas;
  }

  React.useEffect(() => {
    async function getReportsData() {
      const reportData = await getReports(sessionStorage.getItem("auth"));
      const newReportsData = reportData.content[0].reportjson;
      console.log("newReportsData", newReportsData);
      if (reportData) {
        setReportsData(reportData.content[0].reportjson);

        const getTitleTable = [];
        const getTitleExport = [];
        const getColumnsExport = [];
        Object.values(newReportsData.titles).forEach((element) => {
          getTitleTable.push(element);
          // getTitleExport.push(element.title);
        });
        Object.values(newReportsData.columns).forEach((element) => {
          getColumnsExport.push(element);
          // getTitleExport.push(element.title);
        });
        for (let i = 0; i < newReportsData.titles.length - 1; i++) {
          getTitleExport.push(newReportsData.titles[i].title);
        }
        setTitleTable(getTitleTable);
        setTitleExport(getTitleExport.join());

        // ==============================================

        let newListData = [];
        const newRowsTable = newReportsData.details.sub;
        newListData.push(...listData(newRowsTable));
        newListData.push(newReportsData.grand_total);
        setRows(newListData);
        setColumns(getColumnsExport);
        // console.table(JSON.stringify(newListData));
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
              marginLeft: 25,
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
            <Grid container style={{ paddingBottom: 10 }}>
              <Grid item xs={6} sm={4} md={4} lg={4} xl={4}></Grid>
              <Grid
                item
                justifyContent="center"
                xs={8}
                sm={8}
                md={8}
                lg={8}
                xl={8}
              >
                <MTableToolbar {...props} />
              </Grid>
            </Grid>
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
          exportButton: true,
          exportAllData: true,

          exportFileName: titleExport,
          rowStyle: (rowData) => {
            if (!rowData.Category || !rowData.SubCategory) {
              return { fontWeight: "bold" };
            }
          },
          exportPdf: (data, columns) => {
            const doc = new jsPDF("l");
            var newDataTemp = [];
            console.log("columnsData", columns);
            // console.log("data", data);
            for (let i = 0; i < columns.length; i++) {
              if (columns[i].Category) {
                var tempArray = columns[i].Category.split(" ");
                //console.log("tempArray", tempArray);
                //console.log("TTT", tempArray[tempArray.length - 1] === "Total");
                if (tempArray[tempArray.length - 1] === "Total") {
                  newDataTemp.push(i);
                }

                // console.log("columnsData", columns[i].Category);
                //var newDataTemp = columns[i].Category.split();
              }
            }
            //console.log("newDataTemp", newDataTemp);
            var newSplitData = [];
            for (let j = 0; j < newDataTemp.length; j++) {
              if (j === 0) {
                let tempi = j;
                let tempj = newDataTemp[j];
                console.log("tempI,j", tempi, tempj);
                var newSplit = columns.slice(tempi, tempj + 1);
                newSplitData.push(newSplit);
              } else {
                let tempi = newDataTemp[j - 1];
                let tempj = newDataTemp[j];
                console.log("tempI,j ===", tempi, tempj);
                var newSplit = columns.slice(tempi, tempj + 1);
                newSplitData.push(newSplit);
              }
            }

            console.log("newSplitData", newSplitData);

            const columnTitles = data.map((columnDef) => columnDef.title);
            // console.log("columnTitles", columns);

            const pdfData = columns.map((rowData) =>
              data.map((columnDef) => rowData[columnDef.field])
            );

            for (let k = 0; k < newSplitData.length - 1; k++) {
              console.log("newSplit", newSplitData[k]);

              const pdfData2 = newSplitData[k].map((rowData) =>
                data.map((columnDef) => rowData[columnDef.field])
              );
              if (k === 0) {
                doc.autoTable({
                  headStyles: { fillColor: [45, 98, 237] },
                  theme: "grid",
                  head: [columnTitles],
                  body: pdfData2,

                  columnStyles: {
                    3: { halign: "right" },
                    4: { halign: "right" },
                    5: { halign: "right" },
                    6: { halign: "right" },
                  },
                });
              } else {
                doc.autoTable({
                  pageBreak: "always",
                  headStyles: { fillColor: [45, 98, 237] },
                  theme: "grid",
                  head: [columnTitles],
                  body: pdfData2,

                  columnStyles: {
                    3: { halign: "right" },
                    4: { halign: "right" },
                    5: { halign: "right" },
                    6: { halign: "right" },
                  },
                });
              }
            }

            doc.autoTable({
              pageBreak: "always",
              headStyles: { fillColor: [45, 98, 237] },
              theme: "grid",
              head: [columnTitles],
              body: pdfData,

              columnStyles: {
                3: { halign: "right" },
                4: { halign: "right" },
                5: { halign: "right" },
                6: { halign: "right" },
              },
            });

            // doc.autoTable({
            //   headStyles: { fillColor: [45, 98, 237] },
            //   theme: "grid",
            //   head: [columnTitles],
            //   body: pdfData,

            //   columnStyles: {
            //     3: { halign: "right" },
            //     4: { halign: "right" },
            //     5: { halign: "right" },
            //     6: { halign: "right" },
            //   },
            // });

            doc.save(`reportTable.pdf`);
          },
          exportCsv: (data, columns) => {
            //const columnTitles = columns.map((columnDef) => columnDef.title);
            const columnTitles = data.map((columnDef) => columnDef.title);

            const csvData = columns.map((rowData) =>
              data.map((columnDef) => rowData[columnDef.field])
            );
            // const csvData = data.map((rowData) =>
            //   columns.map((columnDef) => rowData[columnDef.field])
            // );

            const builder = new CsvBuilder(`data.csv`)
              // .setColumns(["mycolumn"])
              // .addRow(["file title some thing blah blah"])
              .setColumns(columnTitles)
              .addRows(csvData)
              .exportFile();

            return builder;
          },
        }}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
