import React from "react";
import { connect } from "react-redux";
import Calendar from "../components/Calendar";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export const ReservationPage = (props) => {
  return (
    <Container maxWidth="xl" style={{ marginTop: 100 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box borderBottom={5} borderColor="#2D62ED" borderRadius={10}>
            <Paper
              style={{
                minHeight: 50,
              }}
              elevation={3}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ padding: 10 }}
              >
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Room Reservation
                </Typography>
                <Button variant="contained" color="primary">
                  New Reservation
                </Button>
              </Grid>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Paper elevation={3} style={{ width: "100%", minHeight: "100%" }}>
            <Container
              style={{
                backgroundColor: "#2D62ED",
                color: "#FFFFFF",
                borderRadius: "8px 8px 0 0",
              }}
            >
              <Typography variant="h6" color="initial" style={{ padding: 10 }}>
                Room Information
              </Typography>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
          <Calendar />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationPage);
