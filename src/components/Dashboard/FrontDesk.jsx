import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export class FrontDesk extends Component {
  render() {
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
  }
}

export default FrontDesk;
