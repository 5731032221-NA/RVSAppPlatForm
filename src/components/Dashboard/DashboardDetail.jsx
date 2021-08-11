import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Container maxWidth="xl">
          <Typography variant="h4" style={{ padding: 20, color: "#1118B9" }}>
            Dashboard
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            // spacing={4}
          >
            <Grid item sm={12} xs={12} md={12} lg={9} xl={9}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                sm={12}
                xs={12}
                md={12}
                lg={12}
                xl={12}
                spacing={4}
              >
                <Grid item sm={12} xs={12} md={6} lg={4} xl={4}>
                  <Paper
                    variant="outlined"
                    square
                    style={{ minHeight: 350, width: "100%" }}
                  >
                    <Grid container spacing={4} style={{ padding: 25 }}>
                      <Grid container>
                        <Typography variant="h6" color="initial">
                          Paper1
                        </Typography>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                    </Grid>
                    <Grid container style={{ minHeight: 60 }}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        style={{
                          backgroundColor: "#4A4A4A",
                          color: "white",
                          marginTop: 10,
                        }}
                      >
                        CHECK OUT
                      </Button>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={4} xl={4}>
                  <Paper
                    variant="outlined"
                    square
                    style={{ minHeight: 350, width: "100%" }}
                  >
                    <Grid container spacing={4} style={{ padding: 25 }}>
                      <Grid container>
                        <Typography variant="h6" color="initial">
                          Paper2
                        </Typography>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={4} xs={4} md={4} lg={4} xl={4}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={8} xs={8} md={8} lg={8} xl={8}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                    </Grid>
                    <Grid container style={{ minHeight: 60 }}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        style={{ backgroundColor: "#164BD8", color: "white" }}
                      >
                        CHECK OUT
                      </Button>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={4} xl={4}>
                  <Paper
                    variant="outlined"
                    square
                    style={{ minHeight: 350, width: "100%" }}
                  >
                    <Grid container spacing={4} style={{ padding: 25 }}>
                      <Grid container>
                        <Typography variant="h6" color="initial">
                          Paper3
                        </Typography>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                    </Grid>
                    <Grid container style={{ minHeight: 60 }}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        style={{ backgroundColor: "#164BD8", color: "white" }}
                      >
                        CHECK OUT
                      </Button>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={4} xl={4}>
                  <Paper
                    variant="outlined"
                    square
                    style={{ minHeight: 350, width: "100%" }}
                  >
                    <Grid container spacing={4} style={{ padding: 25 }}>
                      <Grid container>
                        <Typography variant="h6" color="initial">
                          Paper4
                        </Typography>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                    </Grid>
                    <Grid container style={{ minHeight: 60 }}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        style={{ backgroundColor: "#4A4A4A", color: "white" }}
                      >
                        CHECK OUT
                      </Button>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={4} xl={4}>
                  <Paper
                    variant="outlined"
                    square
                    style={{ minHeight: 350, width: "100%" }}
                  >
                    <Grid container spacing={4} style={{ padding: 25 }}>
                      <Grid container>
                        <Typography variant="h6" color="initial">
                          Paper5
                        </Typography>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#376CF7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                    </Grid>
                    <Grid container style={{ minHeight: 60 }}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        style={{ backgroundColor: "#164BD8", color: "white" }}
                      >
                        CHECK OUT
                      </Button>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={4} xl={4}>
                  <Paper
                    variant="outlined"
                    square
                    style={{ minHeight: 350, width: "100%" }}
                  >
                    <Grid container spacing={4} style={{ padding: 25 }}>
                      <Grid container>
                        <Typography variant="h6" color="initial">
                          Paper6
                        </Typography>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#376CF7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#214EC4",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                      <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                        <Paper
                          variant="outlined"
                          style={{
                            minHeight: 110,
                            width: "100%",
                            backgroundColor: "#F7F7F7",
                          }}
                        >
                          Paper2
                        </Paper>
                      </Grid>
                    </Grid>
                    <Grid container style={{ minHeight: 60 }}>
                      <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        style={{ backgroundColor: "#164BD8", color: "white" }}
                      >
                        CHECK OUT
                      </Button>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item sm={12} xs={12} md={12} lg={3} xl={3}> */}
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              sm={12}
              xs={12}
              md={12}
              lg={3}
              xl={3}
            >
              <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                <Paper
                  variant="outlined"
                  square
                  style={{
                    minHeight: 300,
                    width: "100%",
                    backgroundColor: "#1118B9",
                  }}
                >
                  Paper7
                </Paper>
              </Grid>
              <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
                <Paper
                  variant="outlined"
                  square
                  style={{ minHeight: 520, width: "100%" }}
                >
                  Paper8
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          {/* </Grid> */}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
