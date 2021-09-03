// import React, { useState, useContext } from "react";
// import "../assets/login.css";
// import "../assets/variable.css";
// import background from "../assets/img/imgbackground.jpg";
// import BusinessIcon from '@material-ui/icons/Business';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// import PropTypes from "prop-types";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Container from "@material-ui/core/Container";
// import Divider from "@material-ui/core/Divider";
// import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, InputLabel, MenuItem } from '@material-ui/core';
// import {
//     EDIT_AUTHORIZATION
// } from "../middleware/action";
// import {
//     EDIT_PROPERTY
// } from "../middleware/action";

// import { ReactReduxContext } from 'react-redux'


// const useStyles = makeStyles((theme) => ({
//     paper: {
//         flex: "display",
//         padding: theme.spacing(2),
//         textAlign: "center",
//         color: theme.palette.text.secondary,
//         width: theme.spacing(38),
//         height: theme.spacing(48),
//         marginTop: 100,
//     },
//     imglogo: {
//         maxHeight: 220, maxWidth: 220,
//     },
//     formlogin: {
//         marginBottom: 20, padding: 10,
//     },
//     sysname: {
//         color: "#393737", fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 15
//     },
//     errorMessage: {
//         color: "#ff0033", fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 15
//     },
//     seletprop: {
//         fontSize: 15,
//         color: "#164BD8",
//         paddingBottom: 20
//     }
// }));



// export default function Property({ setToken, setProperty }) {
//     const { store } = useContext(ReactReduxContext);
//     const classes = useStyles();
//     const radioProp = ''

//     const [selectedProperty, setSelectedProperty] = useState(JSON.parse(sessionStorage.getItem("grantproperty"))[0].propertycode);

//     const [list, setList] = useState([]);

//     const handleChange = event => {
//         console.log("handleChange 1:", selectedProperty);
//         console.log(event.target.value)
//         setSelectedProperty(event.target.value);
//         console.log("handleChange 2:", selectedProperty);
//         console.log(event.target.value)

//     };
//     const handleCancle = () => {
//         console.log("cancle")
//         setToken(false);

//     };
//     const handleSelect = () => {
//         store.dispatch({
//             type: EDIT_PROPERTY,
//             payload: selectedProperty
//         })
//         console.log("selectedProperty",selectedProperty);
//         setProperty(selectedProperty)
//     };
//     return (
//         <div className="Login-component" style={{ backgroundImage: `url(${background})` }} >
//             <Container
//                 component="main"
//                 maxWidth="xs"
//                 alignItems="center"
//                 justifyContent="center"
//             >
//                 <Paper className={classes.paper}>
//                     <img className={classes.imglogo} src="loginlogo.png" alt="logo" />
//                     <h5 className={classes.sysname} >Hotel Property Management System </h5>
//                     <Divider variant="middle" />
//                     <h5  ></h5>
//                     <FormControl component="fieldset">
//                         <FormLabel component="legend" className={classes.seletprop}>Please Select Your Property</FormLabel>
//                         <Select name="gender1" id="select" value={selectedProperty} onClick={handleChange} style={{ width: 280 }} defaultValue={selectedProperty} >
//                             {(JSON.parse(sessionStorage.getItem("grantproperty"))).map((item) => (
//                                 <MenuItem key={item.propertycode} value={item.propertycode} label={item.propertycode} >
//                                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                                         <BusinessIcon style={{ paddingRight: 20, color: '#2D62ED' }} />
//                                         <div> {item.propertycode} </div>
//                                     </div>
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     <div variant="middle" style={{ paddingTop: 30 }} />
//                     <Button
//                         fullWidth
//                         variant="contained"
//                         style={{ backgroundColor: "#2D62ED", color: "white" }}
//                         onClick={handleSelect}
//                     >
//                         Select <ArrowForwardIcon style={{ paddingLeft: 10 }} />
//                     </Button>
//                 </Paper>
//             </Container>
//         </div>
//     );
// }

// Property.propTypes = {
//     setToken: PropTypes.func.isRequired,
//     setProperty: PropTypes.func.isRequired


//     // store: PropTypes.func.isRequired

// };
