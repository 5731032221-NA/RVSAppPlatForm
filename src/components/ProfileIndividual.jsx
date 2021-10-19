import React from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateRangePicker,
} from "@material-ui/pickers";

export const ProfileIndividual = (props) => {
  return (
    <Container maxWidth="xl">
      <Paper elevation={3}>
        <Container maxWidth="xl" style={{ paddingTop: 15 }}>
          <Grid container>
            <Typography variant="h6" color="primary" style={{ flexGrow: 1 }}>
              Profile Detail
            </Typography>
            <Button
              variant="contained"
              style={{ backgroundColor: "red", color: "white" }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
          <Divider style={{ marginTop: 10 }} />
        </Container>
        <Container maxWidth="xl" style={{ paddingTop: 15, paddingBottom: 15 }}>
          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10 }}
          >
            Personal
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={4} md={6} xs={12}>
              <TextField label="First Name" variant="outlined" fullWidth />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField label="Last Name" variant="outlined" fullWidth />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField label="Gender" variant="outlined" fullWidth select />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                label="Choose a Document Type*"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                label="ID Number*"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                label="Nationality*"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xl={4} md={6} xs={12}>
                <KeyboardDatePicker
                  label="Issue Date"
                  inputVariant="outlined"
                  // format="dd/MM/yyyy"
                  // value={selectedDateStartEdit}
                  // onChange={handleDateStartEdit}
                  fullWidth
                />
              </Grid>
              <Grid item xl={4} md={6} xs={12}>
                <KeyboardDatePicker
                  label="Expiry Date"
                  inputVariant="outlined"
                  // format="dd/MM/yyyy"
                  // value={selectedDateStartEdit}
                  // onChange={handleDateStartEdit}
                  fullWidth
                />
              </Grid>
              <Grid item xl={4} md={6} xs={12}>
                <KeyboardDatePicker
                  label="Date of Birth"
                  inputVariant="outlined"
                  // format="dd/MM/yyyy"
                  // value={selectedDateStartEdit}
                  // onChange={handleDateStartEdit}
                  fullWidth
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>

          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            Communication
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={4} md={6} xs={12}>
              <TextField label="Email" variant="outlined" fullWidth />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField label="Phone Number" variant="outlined" fullWidth />
            </Grid>
          </Grid>

          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={4} md={6} xs={12}>
              <TextField label="OrganiZation" variant="outlined" fullWidth />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField label="Address Line 1" variant="outlined" fullWidth />
            </Grid>
            <Grid item xl={4} md={6} xs={12}>
              <TextField label="Address Line 2" variant="outlined" fullWidth />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField
                label="Choose a country"
                variant="outlined"
                fullWidth
                select
              />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField label="City" variant="outlined" fullWidth />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField label="State" variant="outlined" fullWidth />
            </Grid>
            <Grid item xl={3} md={6} xs={12}>
              <TextField label="Postal" variant="outlined" fullWidth />
            </Grid>
          </Grid>

          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            Rerationship (Internal)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={4} md={6} xs={12}>
              <TextField
                label={
                  <Grid container alignItems="center">
                    <PublicRoundedIcon style={{ marginRight: 10 }} />
                    Web site
                  </Grid>
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                label={
                  <Grid container alignItems="center">
                    <AlternateEmailIcon style={{ marginRight: 10 }} />
                    Line
                  </Grid>
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                label={
                  <Grid container alignItems="center">
                    <FacebookIcon style={{ marginRight: 10 }} />
                    Facebook
                  </Grid>
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                label={
                  <Grid container alignItems="center">
                    <InstagramIcon style={{ marginRight: 10 }} />
                    Instagram
                  </Grid>
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xl={2} md={6} xs={12}>
              <TextField
                label={
                  <Grid container alignItems="center">
                    <TwitterIcon style={{ marginRight: 10 }} />
                    Twitter
                  </Grid>
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          <Typography variant="h6" color="primary" style={{ paddingTop: 20 }}>
            Booking History
          </Typography>
          <Divider style={{ marginTop: 10 }} />
          <Typography
            variant="subtitle1"
            color="initial"
            style={{ paddingBottom: 10, paddingTop: 10 }}
          >
            booking data list here !!!
          </Typography>
        </Container>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndividual);
