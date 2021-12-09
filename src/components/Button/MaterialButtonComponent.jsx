import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from "@material-ui/icons/Clear";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { connect, useSelector } from "react-redux";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import {
    Container,
    Grid,
    Typography,
    Button,
    Breadcrumbs,
    Link,
  } from "@material-ui/core";
  import { useTheme } from "@material-ui/core/styles";
  import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const func1Default = () => {
    console.log("func1");
  };
  
  const func2Default = () => {
    console.log("func2");
  };
  
  const setStatus = () => {
    console.log("func2");
  };


function MaterialButtonComponent(
    {
        setStatus = null,
        dataStatus = null,
        handleData = null,
        handleNewData = null,
        handleNewText = null,
  
   }
  ) {
    const [themeState, setThemeState] = React.useState({
        background: "#FFFFFF",
        color: "#000000",
        paper: "#FFFFFF",
        colorlevel: "900",
      });

    const themeBackground = useSelector((state) => state.reducer.themeBackground);
    const [mainColor, setMainColor] = React.useState("#2D62ED");
    const maincolor = useSelector((state) => state.reducer.color);

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"));
    const mdUp = useMediaQuery(theme.breakpoints.up("md"));
    let customfontsize = "10px";

    if(smUp){
      customfontsize = "10px";
    }
    if(mdUp){
      customfontsize = "16px";
    
    }
  
    React.useEffect(() => {
      if (themeBackground === "#FFFFFF") {
        setMainColor(maincolor);
      } else {
        setMainColor("#2D62ED");
      }
    }, [maincolor]);
    const classes = useStyles(themeState);

    return (
        <>
         { handleNewData === null ? (
         <Grid
            item
            xs={6}
            sm={2}
            md={2}
            style={{ textAlign: "right" }}
          >
            <Button
              variant="contained"
              style={{ backgroundColor: "gray", color: "white",  marginBottom: 10 }}
              startIcon={<ClearIcon />}
              onClick={() => setStatus(dataStatus)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: mainColor, color: "white",  marginLeft: 10, marginBottom: 10 }}
              startIcon={<SaveOutlinedIcon />}
              onClick={() => handleData()}
            >
              Save
            </Button>
          </Grid>
         ): (
            <Grid item xs={6} sm={2} md={2} style={{ textAlign: "right", marginBottom: 25 }}>
            <Button
              variant="contained"
              noWrap
              style={{ backgroundColor: mainColor, color: "white", fontSize: customfontsize }}
              startIcon={<AddRoundedIcon />}
              onClick={() => handleNewData()}
            >
              {handleNewText}
            </Button>
          </Grid> 
         )
          }
    </>
    )
}

export default MaterialButtonComponent
