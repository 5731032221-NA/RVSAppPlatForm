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

import ButtomBar from "../../layouts/ButtomBar";
import TestGraph2 from "./TestGraph2";

export class FrontDesk extends Component {
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
    }, 100);
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

          <h3 style={{ color: this.state.color, marginBottom: 25 }}>
            Dashboard
          </h3>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="start"
          >
            <Grid container spacing={3} xs={12} md={12} lg={9} xl={9}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Paper elevation={3} style={{ minHeight: 430 }}>
                  <Grid container style={{ padding: 20 }}>
                    <Grid
                      container
                      direction="row"
                      style={{ marginBottom: 20, marginLeft: 20 }}
                    >
                      <Grid container style={{ marginBottom: 10 }}>
                        <Typography variant="h6" component="h6">
                          Sales Statistical Overview
                        </Typography>
                      </Grid>
                      <Grid item style={{ flexGrow: 1 }}>
                        <Typography variant="body1" component="body1">
                          Start Collecting data from February 2019
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button size="small">1D</Button>
                        <Button size="small">5D</Button>
                        <Button variant="contained" size="small">
                          1M
                        </Button>
                        <Button size="small">1Y</Button>
                        <Button size="small">Max</Button>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="start"
                      alignItems="center"
                      style={{ marginLeft: 15 }}
                      spacing={3}
                    >
                      <Grid item sx={4} md={4} lg={4} xl={4}>
                        <Typography
                          variant="body1"
                          style={{ color: "darkblue" }}
                        >
                          Total cost
                        </Typography>
                        <Grid
                          container
                          direction="row"
                          justifyContent="start"
                          alignItems="center"
                        >
                          <Grid item sx={6} md={6} lg={6} xl={6}>
                            <Typography variant="h5">15,236</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">
                              89.5% of 20,000 Total
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sx={4} md={4} lg={4} xl={4}>
                        <Typography
                          variant="body1"
                          style={{ color: "darkblue" }}
                        >
                          Total Revenue
                        </Typography>
                        <Grid
                          container
                          direction="row"
                          justifyContent="start"
                          alignItems="center"
                        >
                          <Grid item sx={6} md={6} lg={6} xl={6}>
                            <Typography variant="h5">$753,098</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">
                              10.5% of 20,000 Total
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item sx={4} md={4} lg={4} xl={4}>
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-around"
                          alignItems="center"
                          spacing={3}
                        >
                          <Typography variant="body1">Sales</Typography>
                          <Typography variant="body1">Avenue</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      item
                      lg={12}
                      xs={12}
                      md={12}
                      xl={12}
                    >
                      <Paper
                        style={{
                          // backgroundColor: "#BDBFC3",
                          width: "100%",
                          height: 190,
                          marginTop: 20,
                        }}
                        elevation={0}
                      >
                        <TestGraph />
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

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
                        Website Audience Metrics
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
                            height: 150,
                            marginBottom: 20,
                          }}
                        ></Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          style={{
                            backgroundColor: "#BDBFC3",
                            width: "100%",
                            height: 150,
                            marginBottom: 20,
                          }}
                        ></Paper>
                      </Grid>
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
                      style={{ marginTop: 15 }}
                    >
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          style={{
                            backgroundColor: "#BDBFC3",
                            width: "100%",
                            height: 120,
                            marginBottom: 20,
                          }}
                        ></Paper>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Paper
                          style={{
                            backgroundColor: "#BDBFC3",
                            width: "100%",
                            height: 120,
                            marginBottom: 20,
                          }}
                        ></Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={4}>
                <Paper elevation={3} style={{ minHeight: 430 }}>
                  <Grid container spacing={3} style={{ padding: 20 }}>
                    <Grid container style={{ marginBottom: 20 }}>
                      <Typography variant="h6" component="h6">
                        World Selling
                      </Typography>
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                      <Paper
                        style={{
                          backgroundColor: "#BDBFC3",
                          width: "100%",
                          height: 200,
                          marginBottom: 20,
                        }}
                      ></Paper>
                    </Grid>
                    <Grid container direction="row" style={{ marginTop: 5 }}>
                      <Grid item style={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" component="subtitle1">
                          California
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={3}>
                          <Grid item>
                            <Typography variant="subtitle1" component="h1">
                              26,473
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" component="h1">
                              26%
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* ================================================ */}
                    <Grid container direction="row" style={{ marginTop: 5 }}>
                      <Grid item style={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" component="subtitle1">
                          Washington
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container spacing={3}>
                          <Grid item>
                            <Typography variant="subtitle1" component="h1">
                              63,252
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" component="h1">
                              64%
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
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
                        Net Profit Margin
                      </Typography>

                      <Typography variant="body1" component="body1">
                        Start Collecting data from February 2019
                      </Typography>
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                      <Paper
                        elevation={0}
                        style={{
                          // backgroundColor: "#BDBFC3",
                          width: "100%",
                          height: 275,
                        }}
                      >
                        <TestGraph2 />
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            {/* right  */}

            <Grid item xs={12} md={12} lg={3} xl={3}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Paper
                  elevation={3}
                  style={{ minHeight: 150, backgroundColor: "#030AAC" }}
                >
                  <Grid
                    container
                    spacing={3}
                    style={{ padding: 20, color: "#FFFFFF" }}
                    direction="row"
                  >
                    <Grid item style={{ flexGrow: 1 }}>
                      <Typography variant="" component="h1">
                        4,624
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
                      <Grid item style={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h1">
                          Average Booking
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="p1" component="p1">
                          Since last month
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Paper elevation={3} style={{ minHeight: 700, marginTop: 20 }}>
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
  // console.log("mapStateToProps");
  return {
    lang: state.reducer.lang,
    color: state.reducer.color,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontDesk);
