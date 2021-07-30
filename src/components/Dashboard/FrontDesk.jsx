<<<<<<< HEAD
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../middleware/action";
import en_lang from "../../static/lang/en.json"
import th_lang from "../../static/lang/th.json"
// const [SomeThingInFrontDesk, setSomeThingInFrontDesk] = useState(en_lang.SomeThingInFrontDesk)
// const [lang, setLang] = useState('en')
=======
import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

>>>>>>> e6416016b59ab3571164c5088d600e43ddac053d
export class FrontDesk extends Component {
  constructor(props) {
    super(props);
    this.props.getUserList();
    this.state = {
      lang: 'en',
      SomeThingInFrontDesk: en_lang.SomeThingInFrontDesk
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.lang != this.props.lang) {
        this.setState({ lang: 'th' })
        if (this.props.lang == 'th') {
          this.setState({
            lang: 'th',
            SomeThingInFrontDesk: (th_lang.SomeThingInFrontDesk)
          });
        } else if (this.props.lang == 'en') {
          this.setState({
            lang: 'en',
            SomeThingInFrontDesk: (en_lang.SomeThingInFrontDesk)
          });
  
        }
  
      }
    } , 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
<<<<<<< HEAD
    
    return <div>{this.state.SomeThingInFrontDesk}</div>;
=======
    return (
      <div style={{ backgroundColor: "#F2F5FC" }}>
        <Container maxWidth="xl">
          <h3 style={{ color: "blue" }}>Dashboard</h3>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={9} xl={9}>
              <Grid item spacing={1} xs={12} md={12} lg={12} xl={12}>
                <Paper elevation={3} style={{ minHeight: 300 }}>
                  Gride layout 12
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                xl={12}
                style={{ marginTop: 20 }}
              >
                <Grid
                  lg={12}
                  xl={12}
                  spacing={3}
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={12} md={6} lg={4} xl={4}>
                    <Paper elevation={3} style={{ minHeight: 300 }}>
                      Gride layout3.1
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={4}>
                    <Paper elevation={3} style={{ minHeight: 300 }}>
                      Gride layout3.2
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4} xl={4}>
                    <Paper elevation={3} style={{ minHeight: 300 }}>
                      Gride layout3.3
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* right  */}
            <Grid item xs={12} md={12} lg={3} xl={3}>
              <Paper
                elevation={3}
                style={{ minHeight: 150, backgroundColor: "#030AAC" }}
              >
                <div style={{ padding: 20, color: "#FFFFFF" }}>
                  <h1>4,624</h1>
                </div>
              </Paper>
              <Paper elevation={3} style={{ minHeight: 450, marginTop: 20 }}>
                <div style={{ padding: 10, color: "black" }}>
                  <p>Top Performance</p>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
>>>>>>> e6416016b59ab3571164c5088d600e43ddac053d
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps")
  return {
    lang: state.reducer.lang,
  };
};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontDesk);
