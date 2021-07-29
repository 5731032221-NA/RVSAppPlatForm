import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  withStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import * as action from "../middleware/action";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#283593",
    },
    secondary: {
      main: "#e0f7fa",
    },
  },
});

const useStyles = (theme) => ({
  card: {
    maxWidth: 345,
    marginTop: 30,
  },
  media: {
    height: 250,
  },
  buttonColor: {
    backgroundColor: "#e57373",
    // warning: "#ffb74d",
    // error: "#e57373",
  },
});
class User extends Component {
  render() {
    const { classes } = this.props;
    const delFn = this.props.deleteUserAtList;
  
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <Grid>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/user/erondu"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Name : {this.props.data.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Email : {this.props.data.email}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Container style={{ contentJustify: "center" }}>
                  <CardActions>
                    <Button
                      style={{ backgroundColor: "#e57373" }}
                      className={classes.buttonColor.error}
                      variant="contained"
                      size="medium"
                      color="danger"
                      fullWidth
                    >
                      <DeleteIcon />
                      &nbsp; Delete
                    </Button>

                    <Button
                      style={{ backgroundColor: "#ffb74d" }}
                      variant="contained"
                      size="medium"
                      color="danger"
                      fullWidth
                    >
                      <EditIcon />
                      &nbsp; Edit
                    </Button>
                  </CardActions>
                </Container>
              </Card>
            </Grid>
          </Container>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserAtList: (id) => {
      return dispatch(action.delUser(id));
    },
  };
};
export default (connect(null, mapDispatchToProps), withStyles(useStyles))(User);
