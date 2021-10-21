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
import RemoveIcon from "@material-ui/icons/Remove";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import LayersIcon from "@material-ui/icons/Layers";

import Button from "@material-ui/core/Button";
import TestGraph from "./TestGraph";
import Divider from "@material-ui/core/Divider";

import ButtomBar from "../../layouts/ButtomBar";
import TestGraph2 from "./TestGraph2";
import GaugeChart from "react-gauge-chart";

import Barchart from "./Barchart";
import WorldMap from "./WorldMap";
import Piechart from "./Piechart";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

export class FrontDesk extends Component {
  constructor(props) {
    super(props);
    this.props.getUserList();
    // const classes = useStyles();
    this.state = {
      lang: "en",
      Dashboard: en_lang.Dashboard,
      color: this.props.color,
      themeBackground: "#FFFFFF",
      themeState: {
        background: "#FFFFFF",
        color: "#000000",
        paper: "#FFFFFF",
        colorlevel: "900",
      },
    };
  }

  componentDidMount() {
    // this.interval = setInterval(() => {
    // }, 1000);
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
    console.log("this.props.themeBackground", this.props.themeBackground);

    if (this.state.themeBackground != this.props.themeBackground) {
      console.log(this.state.themeBackground, this.props.themeBackground);
      if (this.props.themeBackground === "#FFFFFF") {
        this.setState({
          themeState: {
            background: "#FFFFFF",
            color: "#000000",
            paper: "#FFFFFF",
            colorlevel: "900",
            // matStyle: this.classes.normalmode
          },
        });
        this.setState({ color: this.props.color });
      } else {
        this.setState({
          themeState: {
            background: "#212121",
            color: "#FAFAFA",
            paper: "#424242",
            colorlevel: "A200",
            // matStyle: this.classes.darkmode
          },
        });
        this.setState({ color: "#2D62ED" });
      }
      this.setState({ themeBackground: this.props.themeBackground });
      console.log(this.props.themeBackground);
    }

    if (this.state.color != this.props.color) {
      if (this.props.themeBackground === "#FFFFFF") {
        this.setState({ color: this.props.color });
      } else {
        this.setState({ color: this.props.defaultColor });
      }
    }
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  componentDidUpdate() {
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
    if (this.state.themeBackground != this.props.themeBackground) {
      // console.log(this.state.themeBackground, this.props.themeBackground);
      if (this.props.themeBackground === "#FFFFFF") {
        this.setState({
          themeState: {
            background: "#FFFFFF",
            color: "#000000",
            paper: "#FFFFFF",
            colorlevel: "900",
            // matStyle: this.classes.normalmode
          },
        });
        this.setState({ color: this.props.color });
      } else {
        this.setState({
          themeState: {
            background: "#212121",
            color: "#FAFAFA",
            paper: "#424242",
            colorlevel: "800",
            // matStyle: this.classes.darkmode
          },
        });
        this.setState({ color: "#2D62ED" });
      }
      this.setState({ themeBackground: this.props.themeBackground });
    }

    if (this.state.color != this.props.color) {
      if (this.props.themeBackground === "#FFFFFF") {
        console.log("data color", this.props.color);
        this.setState({ color: this.props.color });
      } else {
        // this.setState({ color: this.props.defaultColor });
      }
    }
  }
  

  render() {
    return (
      <div style={this.state.themeState}>
        <Container maxWidth="xl">
          <div
            style={{
              color: this.state.themeState.color,
              backgroundColor: this.state.themeState.background,
              marginBottom: 20,
              marginTop: -20,
            }}
          >
            <Typography
              variant="h6"
              style={{ fontSize: 22, color: this.state.color }}
            >
              &nbsp;Front Desk
            </Typography>
          </div>
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
    defaultColor: state.reducer.defaultColor,
    themeBackground: state.reducer.themeBackground,
    property: state.reducer.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontDesk);
