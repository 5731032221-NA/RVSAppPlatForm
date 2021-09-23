import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../middleware/action";
import en_lang from "../../static/lang/en.json";
import th_lang from "../../static/lang/th.json";
// const [SomeThingInFrontDesk, setSomeThingInFrontDesk] = useState(en_lang.SomeThingInFrontDesk)
// const [lang, setLang] = useState('en')

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import WorkIcon from "@material-ui/icons/Work";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TestGraph from "./TestGraph";
import Radialbarchart from "./Radialbarchart";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ArrivalBarChart from "./ArrivalBarChart";
import InHouseBarChart from "./InHouseBarChart";
import TodayPickupBarChart from "./TodayPickupBarChart";
import { getweather } from "../../services/weather.service";
export class Reservation extends Component {
  constructor(props) {
    super(props);
    this.props.getUserList();
    this.state = {
      lang: "en",

      Dashboard: en_lang.Dashboard,
      color: this.props.color,
      weather: [],
      weatherIcon: "",
    };
  }

  async componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.lang != this.props.lang) {
        this.setState({ lang: "th" });
        if (this.props.lang == "th") {
          this.setState({
            lang: "th",
            Dashboard: th_lang.Dashboard,
            color: this.props.color,
          });
        } else if (this.props.lang == "en") {
          this.setState({
            lang: "en",
            Dashboard: en_lang.Dashboard,
            color: this.props.color,
          });
        }
      }
    }, 1000);
    const item = await getweather();
    this.setState({ weather: item });
    this.setState({ weatherIcon: item.weather.icon });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <Container maxWidth="xl">
          {/* <h3 style={{ color: "blue" }}>{this.state.Dashboard}</h3>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={9} xl={9}>
              <Grid item spacing={1} xs={12} md={12} lg={12} xl={12}>
                <Paper elevation={3} style={{ minHeight: 300 }}>
                  Gride layout 12 */}

          <h3 style={{ color: this.state.color, marginBottom: 30 }}>
            Reservation
          </h3>

          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="start"
          >
            <Grid container spacing={3} xs={12} md={12} lg={9} xl={9}>
              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper
                  variant="outlined"
                  elevation={0}
                  square
                  style={{ minHeight: 430 }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    style={{ padding: 20 }}
                  >
                    <Grid
                      container
                      style={{ marginBottom: 20, marginLeft: 20 }}
                    >
                      <Typography variant="h6" component="h6">
                        Depart Date
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                      xs={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70 }}
                            >
                              28
                            </Typography>
                            <Typography variant="h5" color="initial">
                              80% Out
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "red" }}
                            >
                              35
                            </Typography>
                            <Typography variant="h5" color="initial">
                              Expected
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                            marginBottom: 20,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "red" }}
                            >
                              5
                            </Typography>
                            <Typography variant="h5" color="initial">
                              Due Out
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          // variant="outlined"
                          elevation={0}
                          style={{
                            // backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                            marginBottom: 20,
                          }}
                        >
                          <Radialbarchart />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="stretch"
                    style={{ minHeight: 55 }}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      style={{
                        backgroundColor: "#4A4A4A",
                        color: "white",
                        fontSize: 18,
                      }}
                      fullWidth
                    >
                      CHECK OUT
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper
                  variant="outlined"
                  elevation={0}
                  square
                  style={{ minHeight: 430 }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    style={{ padding: 20 }}
                  >
                    <Grid
                      container
                      style={{ marginBottom: 20, marginLeft: 20 }}
                    >
                      <Typography variant="h6" component="h6">
                        Arrival Today (Rooms)
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                      xs={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "black" }}
                            >
                              28
                            </Typography>
                            <Typography variant="h5" color="initial">
                              Expected
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "blue" }}
                            >
                              32
                            </Typography>
                            <Typography variant="h5" color="initial">
                              20 % Arrival
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4} xl={4}>
                        <Paper
                          elevation={0}
                          style={{
                            width: "100%",
                            marginBottom: 20,
                          }}
                        >
                          <Grid
                            container
                            direction="row"
                            justifyContent="start"
                            alignItems="center"
                          >
                            <FiberManualRecordIcon
                              style={{ color: "#2D62ED", marginRight: 5 }}
                            />
                            <Typography variant="h6" color="initial">
                              Desktop
                            </Typography>
                          </Grid>
                          <Divider
                            style={{ marginTop: 10, marginBottom: 10 }}
                          />
                          <Grid
                            container
                            direction="row"
                            justifyContent="start"
                            alignItems="center"
                          >
                            <FiberManualRecordIcon
                              style={{ color: "#D8D8D8", marginRight: 5 }}
                            />
                            <Typography variant="h6" color="initial">
                              Mobile
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={8} lg={8} xl={8}>
                        <Paper
                          // variant="outlined"
                          elevation={0}
                          style={{
                            // backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            marginBottom: 20,
                          }}
                        >
                          <ArrivalBarChart />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="stretch"
                    style={{ minHeight: 55 }}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      style={{
                        backgroundColor: "#164BD8",
                        color: "white",
                        fontSize: 18,
                      }}
                      fullWidth
                    >
                      CHECK IN
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper
                  variant="outlined"
                  elevation={0}
                  square
                  style={{ minHeight: 430 }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    style={{ padding: 20 }}
                  >
                    <Grid
                      container
                      style={{ marginBottom: 20, marginLeft: 20 }}
                    >
                      <Typography variant="h6" component="h6">
                        In-house Today (Rooms)
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                      xs={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "black" }}
                            >
                              28
                            </Typography>
                            <Typography variant="h5" color="initial">
                              OCC 90 %
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "black" }}
                            >
                              32
                            </Typography>
                            <Typography variant="h5" color="initial">
                              Out
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>

                      <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Paper
                          // variant="outlined"
                          elevation={0}
                          style={{
                            // backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 135,
                            // marginBottom: 20,
                          }}
                        >
                          <InHouseBarChart />
                        </Paper>
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <FiberManualRecordIcon
                            style={{ color: "#2D62ED", marginRight: 5 }}
                          />
                          <Typography variant="body1" component="body1">
                            Income
                          </Typography>

                          <FiberManualRecordIcon
                            style={{ color: "#21C5FB", marginRight: 5 }}
                          />
                          <Typography variant="body1" component="body1">
                            cashflow
                          </Typography>

                          <FiberManualRecordIcon
                            style={{ color: "#D8D8D8", marginRight: 5 }}
                          />
                          <Typography variant="body1" component="body1">
                            Revenue
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="stretch"
                    style={{ minHeight: 55 }}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      style={{
                        backgroundColor: "#164BD8",
                        color: "white",
                        fontSize: 18,
                      }}
                      fullWidth
                    >
                      AMENTMENT
                    </Button>
                  </Grid>
                </Paper>
              </Grid>

              {/* -----------------------2-------------------------------- */}
              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper
                  variant="outlined"
                  elevation={0}
                  square
                  style={{ minHeight: 430 }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    style={{ padding: 20 }}
                  >
                    <Grid
                      container
                      style={{ marginBottom: 20, marginLeft: 20 }}
                    >
                      <Typography variant="h6" component="h6">
                        Departure Today
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                      xs={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "black" }}
                            >
                              35
                            </Typography>
                            <Typography variant="h5" color="initial">
                              80 % Out
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "red" }}
                            >
                              28
                            </Typography>
                            <Typography variant="h5" color="initial">
                              Expected
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                            marginBottom: 20,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "red" }}
                            >
                              5
                            </Typography>
                            <Typography variant="h5" color="initial">
                              Due Out
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                            marginBottom: 20,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "black" }}
                            >
                              7
                            </Typography>
                            <Typography variant="h5" color="initial">
                              Left to Out
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="stretch"
                    style={{ minHeight: 55 }}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      style={{
                        backgroundColor: "#4A4A4A",
                        color: "white",
                        fontSize: 18,
                      }}
                      fullWidth
                    >
                      CHECK OUT
                    </Button>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper
                  variant="outlined"
                  elevation={0}
                  square
                  style={{ minHeight: 430 }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    style={{ padding: 20 }}
                  >
                    <Grid
                      container
                      style={{ marginBottom: 20, marginLeft: 20 }}
                    >
                      <Typography variant="h6" component="h6">
                        Today Hotel Statistic
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                      xs={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#376CF7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              style={{ fontSize: 70, color: "white" }}
                            >
                              90<span style={{ fontSize: 50 }}>%</span>
                            </Typography>
                            <Typography variant="h5" style={{ color: "white" }}>
                              Occ.
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "blue" }}
                            >
                              15
                            </Typography>
                            <Typography variant="h5" color="initial">
                              Vc+Vl
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                            marginBottom: 20,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "red" }}
                            >
                              13
                            </Typography>
                            <Typography variant="h5" color="initial">
                              VD
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                            marginBottom: 20,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              color="initial"
                              style={{ fontSize: 70, color: "black" }}
                            >
                              3
                            </Typography>
                            <Typography variant="h5" color="initial">
                              0-0-0
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="stretch"
                    style={{ minHeight: 55 }}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      style={{
                        backgroundColor: "#164BD8",
                        color: "white",
                        fontSize: 18,
                      }}
                      fullWidth
                    >
                      ROOM INQUIRY
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper
                  variant="outlined"
                  elevation={0}
                  square
                  style={{ minHeight: 430 }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    style={{ padding: 20 }}
                  >
                    <Grid
                      container
                      style={{ marginBottom: 20, marginLeft: 20 }}
                    >
                      <Typography variant="h6" component="h6">
                        Today Pickup
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                      xs={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#376CF7",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              style={{ fontSize: 70, color: "white" }}
                            >
                              12
                            </Typography>
                            <Typography variant="h5" style={{ color: "white" }}>
                              Booking
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          elevation={0}
                          style={{
                            backgroundColor: "#214EC4",
                            width: "100%",
                            height: 140,
                            borderRadius: 15,
                          }}
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            style={{ padding: 10 }}
                          >
                            <Typography
                              variant="h3"
                              style={{ fontSize: 70, color: "white" }}
                            >
                              15
                            </Typography>
                            <Typography variant="h5" style={{ color: "white" }}>
                              Rooms
                            </Typography>
                          </Grid>
                        </Paper>
                      </Grid>

                      <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Paper
                          // variant="outlined"
                          elevation={0}
                          style={{
                            // backgroundColor: "#F7F7F7",
                            width: "100%",
                            height: 140,
                            marginBottom: 20,
                          }}
                        >
                          <TodayPickupBarChart />
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justifyContent="center"
                    alignItems="stretch"
                    style={{ minHeight: 55 }}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      style={{
                        backgroundColor: "#164BD8",
                        color: "white",
                        fontSize: 18,
                      }}
                      fullWidth
                    >
                      MAKE A BOOKING
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            {/* right  */}

            <Grid item xs={12} md={12} lg={3} xl={3}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Paper
                  elevation={3}
                  style={{
                    minHeight: 300,
                    backgroundColor: "#030AAC",
                    borderRadius: 0,
                  }}
                >
                  <Grid
                    container
                    spacing={3}
                    style={{ padding: 20, color: "#FFFFFF" }}
                    direction="row"
                  >
                    <Grid item style={{ flexGrow: 1 }}>
                      <Typography variant="" component="h1">
                        {/* Weather content */}
                        {this.state.weather.name}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <img
                        src="http://openweathermap.org/img/wn/04d@2x.png"
                        alt="weatherIMG"
                      />
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                      <Grid
                        item
                        style={{ flexGrow: 1, padding: 20, color: "#FFFFFF" }}
                      >
                        <Typography variant="h6" component="h1">
                          Average Booking
                        </Typography>
                      </Grid>
                      <Grid item style={{ padding: 10 }}>
                        <Typography variant="p1" component="p1">
                          Since last month
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                      <Grid
                        item
                        style={{ flexGrow: 1, padding: 20, color: "#FFFFFF" }}
                      >
                        <Typography variant="h6" component="h1">
                          {/* {this.state.weather.main} */}
                        </Typography>
                      </Grid>
                      <Grid item style={{ padding: 10 }}></Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Paper
                  variant="outlined"
                  elevation={0}
                  square
                  style={{ minHeight: 620 }}
                >
                  <Grid container style={{ padding: 20 }}>
                    <Grid container style={{ marginBottom: 20 }}>
                      <Typography variant="h6" component="h6">
                        Top Performance
                      </Typography>
                    </Grid>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Avatar
                          style={{
                            width: 50,
                            height: 50,
                          }}
                          alt="Remy Sharp"
                          src="https://images.generated.photos/Vju0wVYI8Qk7k-sFT6qguoAvnNa2pzgUFOTG8jx9UWU/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyOTg4MTAuanBn.jpg"
                        />
                      </Grid>
                      <Grid item style={{ marginLeft: 10, flexGrow: 1 }}>
                        <Grid item>
                          <Typography variant="h6" component="h6">
                            Remy Sharp
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" component="body1">
                            162543
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="p1"
                          component="h6"
                          style={{ color: "lightgrey" }}
                        >
                          3 Hours ago
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps");
  return {
    lang: state.reducer.lang,
    color: state.reducer.color,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
