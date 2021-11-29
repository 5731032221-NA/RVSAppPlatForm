import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import MaterialTable from "material-table";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
const func1Default = () => {
  console.log("func1");
};

const func2Default = () => {
  console.log("func2");
};

const func3Default = () => {
  console.log("func2");
};

export default function MaterialTableComponent({
  placeHolder = "Search",
  companyData = [],
  columns = columns,
  handleNewData = func1Default,
  handleEditData = func2Default,
  handleDialogDeleteOpen = func3Default
}) {

  const [themeState, setThemeState] = React.useState({
    background: "#FFFFFF",
    color: "#000000",
    paper: "#FFFFFF",
    colorlevel: "900",
  });
  const themeBackground = useSelector((state) => state.reducer.themeBackground);
  const headerTableStyle = {
    backgroundColor: themeState.paper,
    color: themeState.color,
  };
  // const [companyData, setCompanyData] = React.useState([]);
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

  return (
    <Container maxWidth="xl">
      <MaterialTable
        localization={{
          toolbar: {
            searchPlaceholder: placeHolder
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
                    onClick={() => handleNewData()}
                  >
                    New Travel Agent Profile
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
        columns={columns}
        data={companyData}
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
            { value: companyData.length, label: "All" },
          ],
          headerStyle: headerTableStyle,
          searchFieldStyle: {
            backgroundColor: themeState.paper,
            color: themeState.color,
            borderBottomColor: themeState.color,
            width: 530,
          },
        }}
        actions={[
          {
            icon: "edit",
            iconProps: { style: { color: themeState.color } },
            tooltip: "Edit",
            onClick: (event, rowData) => {
              handleEditData(rowData);
            },
          },
          {
            icon: "delete",
            iconProps: { style: { color: themeState.color } },
            tooltip: "Delete",
            onClick: (event, rowData) => {
              handleDialogDeleteOpen(
                rowData.id,
                rowData.name,
                rowData.www,
                rowData.city
              );
            },
          },
        ]}
      />
    </Container>

  );
}