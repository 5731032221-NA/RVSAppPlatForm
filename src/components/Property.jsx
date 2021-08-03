import React, { useState, useContext } from "react";
import "../assets/login.css";
import "../assets/variable.css";
import background from "../assets/img/imgbackground.jpg";

import PropTypes from "prop-types";
import auth from "../services/auth.service";
import menu from "../services/menus.service";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Divider from "@material-ui/core/Divider";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import {
    EDIT_AUTHORIZATION
} from "../middleware/action";
import { ReactReduxContext } from 'react-redux'


const useStyles = makeStyles((theme) => ({
    paper: {
        flex: "display",
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        // margin: theme.spacing(1),
        width: theme.spacing(38),
        height: theme.spacing(48),
        marginTop: 100,
    },
    imglogo: {
        maxHeight: 220, maxWidth: 220,
    },
    formlogin: {
        marginBottom: 20, padding: 10,
    },
    sysname: {
        color: "#393737", fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 15
    },
    errorMessage: {
        color: "#ff0033", fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 15
    },
    seletprop: {
        fontSize: 14,
        fontWeight: 'bold'
    }
}));



export default function Property({ setToken,setProperty }) {
    const { store } = useContext(ReactReduxContext);
    const classes = useStyles();
    const radioProp = ''

    const [selectedProperty, setSelectedProperty] = useState([store.getState().reducer.propertys][0].content.propertyID);
    
    const [list, setList] = useState([]);

    const handleChange = event => {
        console.log("handleChange 1:", selectedProperty);
        console.log(event.target.value)
        setSelectedProperty(event.target.value);
        // console.log("handleChange 2:", selectedProperty);

    };
    const handleCancle = () => {
      console.log("cancle")
        setToken(false);

    };
    const handleSelect = () => {
        setProperty(selectedProperty)
    };
    console.log("store1", store.getState())
    console.log("store2", store.getState().reducer)
    console.log("store3", store.getState().reducer.propertys)

    // store.get
    // const apitest = await menu(store.getState().reducer.auth);
    // console.log("apitest", [apitest])

    // if (selectedProperty != "") {
    //     setList([store.getState().reducer.propertys].map((item) => (

    //         <FormControlLabel value={item.content.propertyID} control={<Radio />} label={item.content.propertyID} />

    //         // <FormControlLabel value={item.contents.propertyID} control={<StyledRadio />} label={item.contents.propertyID} />

    //     ))
    //     );
    // }
    // if(store.getState().reducer.propertys != ''){
    // console.log("a", [store.getState().reducer.propertys].map((item) => (

    //     <FormControlLabel value={item.content.propertyID} control={<Radio />} label={item.content.propertyID} />

    //     // <FormControlLabel value={item.contents.propertyID} control={<StyledRadio />} label={item.contents.propertyID} />

    // )))



    return (
        <div className="Login-component" style={{ backgroundImage: `url(${background})` }} >
            <Container
                component="main"
                maxWidth="xs"
                alignItems="center"
                justifyContent="center"
            >
                <Paper className={classes.paper}>
                    <img className={classes.imglogo} src="loginlogo.png" alt="logo" />
                    <h5 className={classes.sysname} >Hotel Property Management System </h5>
                    <Divider variant="middle" />
                    <h5  ></h5>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className={classes.seletprop}>Select Property</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={selectedProperty} onClick={handleChange}>
                            {[store.getState().reducer.propertys].map((item) => (

                                <FormControlLabel key={item.content.propertyID} value={item.content.propertyID} control={<Radio />} label={item.content.propertyID} />

                                // <FormControlLabel value={item.contents.propertyID} control={<StyledRadio />} label={item.contents.propertyID} />

                            ))}
                        </RadioGroup>
                    </FormControl>
                    <div variant="middle" style={{paddingTop: 30}}/>
                    {/* <Button
                        fullWidth
                        variant="contained"
                        style={{ backgroundColor: "#2D62ED", color: "white" }}
                        onClick={handleCancle}
                    >
                        Cancle
                    </Button> */}
                    <Button
                        fullWidth
                        variant="contained"
                        style={{ backgroundColor: "#2D62ED", color: "white" }}
                        onClick={handleSelect}
                    >
                        Select
                    </Button>
                </Paper>
            </Container>
        </div>
    );
}

Property.propTypes = {
    setToken: PropTypes.func.isRequired,
    setProperty: PropTypes.func.isRequired
    
  
    // store: PropTypes.func.isRequired

};
