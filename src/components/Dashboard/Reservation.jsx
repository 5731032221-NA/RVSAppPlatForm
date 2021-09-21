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
import TestGraph from "./TestGraph";

export class Reservation extends Component {
  constructor(props) {
    super(props);
    this.props.getUserList();
    this.state = {
      lang: "en",
      Dashboard: en_lang.Dashboard,
      color: this.props.color,
    };
  }

  componentDidMount() {
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
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <Container maxWidth="xl">
          <h3 style={{ color: this.state.color, marginBottom: 45, marginTop:-5, fontWeight: '500' }}>
            &nbsp;Reservation
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
                <Paper elevation={3} style={{ minHeight: 430 }}>
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
                          style={{
                            backgroundColor: "#BDBFC3",
                            width: "100%",
                            height: 260,
                            marginBottom: 20,
                          }}
                        ></Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          style={{
                            backgroundColor: "#BDBFC3",
                            width: "100%",
                            height: 260,
                            marginBottom: 20,
                          }}
                        ></Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" alignItems="flex-end">
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{marginTop:30, backgroundColor:'#2b2b2b'}}
                    >
                      CHECK OUT
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper elevation={3} style={{ minHeight: 430 }}>
                  <Grid container spacing={3} style={{ padding: 20 }}>
                    <Grid container style={{ marginBottom: 20 }}>
                      <Typography variant="h6" component="h6">
                        Arrival Today (Rooms)
                      </Typography>
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                      <Paper
                        style={{
                          backgroundColor: "#BDBFC3",
                          width: "100%",
                          height: 260,
                          marginBottom: 20,
                        }}
                      ></Paper>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" alignItems="flex-end">
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{marginTop:30}}
                    >
                      CHECK IN
                    </Button>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper elevation={3} style={{ minHeight: 430 }}>
                  <Grid container spacing={3} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="column"
                      style={{ marginBottom: 20 }}
                    >
                      <Typography variant="h6" component="h6">
                        In-house Today (Rooms)
                      </Typography>
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                      <Paper
                        style={{
                          backgroundColor: "#BDBFC3",
                          width: "100%",
                          height: 245,
                        }}
                      ></Paper>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        style={{ padding: 20 }}
                      >
                        <Typography variant="body1" component="body1">
                          Income
                        </Typography>
                        <Typography variant="body1" component="body1">
                          cashflow
                        </Typography>
                        <Typography variant="body1" component="body1">
                          Revenue
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" alignItems="flex-end">
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      AMENTMENT
                    </Button>
                  </Grid>
                </Paper>
              </Grid>

              {/* -----------------------2-------------------------------- */}

              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper elevation={3} style={{ minHeight: 430 }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-end"
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
                          style={{
                            backgroundColor: "#BDBFC3",
                            width: "100%",
                            height: 290,
                            marginBottom: 20,
                          }}
                        ></Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          style={{
                            backgroundColor: "#BDBFC3",
                            width: "100%",
                            height: 290,
                            marginBottom: 20,
                          }}
                        ></Paper>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container justifyContent="center" alignItems="flex-end">
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{backgroundColor:'#2b2b2b'}}
                    >
                      CHECK OUT
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper elevation={3} style={{ minHeight: 430 }}>
                  <Grid container spacing={3} style={{ padding: 20 }}>
                    <Grid container style={{ marginBottom: 20 }}>
                      <Typography variant="h6" component="h6">
                        Today Hotel Statistic
                      </Typography>
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                      <Paper
                        style={{
                          backgroundColor: "#BDBFC3",
                          width: "100%",
                          height: 290,
                          marginBottom: 20,
                        }}
                      ></Paper>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" alignItems="center">
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      ROOM INQUIRY
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper elevation={3} style={{ minHeight: 430 }}>
                  <Grid container spacing={3} style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="column"
                      style={{ marginBottom: 20 }}
                    >
                      <Typography variant="h6" component="h6">
                        Today Pickup
                      </Typography>

                      <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        style={{ padding: 20 }}
                      >
                        <Typography variant="body1" component="body1">
                          Orders
                        </Typography>
                        <Typography variant="body1" component="body1">
                          Sales
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                      <Paper
                        style={{
                          backgroundColor: "#BDBFC3",
                          width: "100%",
                          height: 225,
                          marginBottom: 20,
                        }}
                      ></Paper>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center" alignItems="center">
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
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
                        Weather content
                      </Typography>
                    </Grid>

                    <Grid item>
                      <WorkIcon
                        style={{
                          backgroundColor: "#2A31B9",
                          color: "#FFFFFF",
                          padding: 10,
                          borderRadius: 8,
                          width: 35,
                          height: 35,
                        }}
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
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Paper elevation={3} style={{ minHeight: 570 }}>
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
