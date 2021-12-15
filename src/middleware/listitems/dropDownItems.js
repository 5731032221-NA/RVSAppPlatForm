import React, { useState, useContext } from "react";
import { ReactReduxContext, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import KingBedIcon from "@material-ui/icons/KingBed";
import ImageAspectRatioIcon from "@material-ui/icons/ImageAspectRatio";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import BuildIcon from "@material-ui/icons/Build";
import SettingsIcon from "@material-ui/icons/Settings";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";

import { EDIT_COMPONENT, EDIT_CONFIGSTATE } from "../action";
import translate_th from "../../static/lang/th.json";
import translate_en from "../../static/lang/en.json";
import { indexTab } from "../action";

export default function MainListItems() {
  const history = useHistory();
  const { store } = useContext(ReactReduxContext);
  const [openFrontDesk, setOpenFrontDesk] = useState(false);
  const [openCashier, setOpenCashier] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openNA, setOpenNA] = useState(false);
  const [openHK, setOpenHK] = useState(false);
  const [openRS, setOpenRS] = useState(false);
  const [openSystemTools, setOpenSystemsTools] = useState(false);
  const [lang, setLang] = useState("en");
  const [translate, setTranslate] = useState(translate_en);

  //indextab
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const indextTab = useSelector((state) => state.reducer.indextTab.indextTab);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (indextTab === 0) {
      handleComponentState("FrontDesk");
      setSelectedIndex(2);
    } else if (indextTab === 1) {
      setSelectedIndex(1);
    } else if (indextTab === 2) {
      store.dispatch({
        type: EDIT_CONFIGSTATE,
        payload: "Cashier",
      });
      handleComponentState("Cashier");
      setSelectedIndex(3);
    } else if (indextTab === 3) {
      // setOpenNA(!openNA)
      handleComponentState("Night Auditor");
      setSelectedIndex(5);
    } else {
      // handleComponentState("Dashboard")
      setSelectedIndex("");
    }
  }, [indextTab]);

  const comps = useSelector((state) => state.reducer.permission);
  console.log("comps", comps);

  const handleListItemClick = (event, index) => {
    // console.log("in", index);
    setSelectedIndex(index);
  };
  const setFontSize = {
    fontSize: 14,
  };

  setInterval(() => {
    let settinglang = store.getState().reducer.lang;
    if (lang != settinglang && lang != null) {
      setLang(settinglang);
      if (settinglang == "th") setTranslate(translate_th);
      else if (settinglang == "en") setTranslate(translate_en);
      else setTranslate(translate_en);
    }
  }, 1000);

  function handleOpenReservation() {
    const ind = 1;
    dispatch(indexTab(ind));
    handleComponentState("Reservation");
    setSelectedIndex(1);
  }
  function handleOpenDashboard() {
    dispatch(indexTab(""));
    // handleComponentState("Dashboard")
    handleComponentState("");
    setSelectedIndex(0);
  }

  function handleOpenFrontDesk() {
    const ind = 0;
    dispatch(indexTab(ind));
    setOpenFrontDesk(!openFrontDesk);
    handleComponentState("FrontDesk");
    setSelectedIndex(2);
  }
  function handleOpenCashier() {
    // setOpenCashier(!openCashier)
    const ind = 2;
    dispatch(indexTab(ind));

    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: "Cashier",
    });
    handleComponentState("Cashier");
    setSelectedIndex(3);
  }
  function handleOpenProfile() {
    setOpenProfile(!openProfile);
    // handleComponentState("Profile")
    setSelectedIndex(4);
  }
  function handleOpenProfileIndividual() {
    // setOpenProfile(!openProfile)
    handleComponentState("ProfilePage");
    setSelectedIndex(4);
  }
  function handleOpenNA() {
    const ind = 3;
    dispatch(indexTab(ind));
    setOpenNA(!openNA);
    setSelectedIndex(5);
  }
  function handleOpenHK() {
    setOpenHK(!openHK);
    setSelectedIndex(6);
  }
  function handleOpenRS() {
    setOpenRS(!openRS);
    setSelectedIndex(8);
  }
  function handleOpenConfig() {
    const ind = 9;
    dispatch(indexTab(ind));
    // setOpenConfig(!openConfig)

    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: "Configuration",
    });
    handleComponentState("Configuration");
    setSelectedIndex(9);
  }
  function handleOpenProfileIndivisual(event, inx) {
    // store.dispatch({
    //   type: EDIT_CONFIGSTATE,
    //   payload: "ProfilePageIndividual",
    // });
    handleComponentState("profileindividual");
    setSelectedIndex(inx);
  }
  function handleOpenProfileTravelAgent(event, inx) {
    // store.dispatch({
    //   type: EDIT_CONFIGSTATE,
    //   payload: "profiletravelagent",
    // });
    handleComponentState("profiletravelagent");
    setSelectedIndex(inx);
  }

  function handleOpenProfileCompany(event, inx) {
    // store.dispatch({
    //   type: EDIT_CONFIGSTATE,
    //   payload: "profilepagecompany",
    // });
    handleComponentState("profilepagecompany");
    setSelectedIndex(inx);
  }
  function handleOpenNA() {
    const ind = 3;
    dispatch(indexTab(ind));
    setOpenNA(!openNA);
    setSelectedIndex(5);
  }
  function handleOpenHK() {
    setOpenHK(!openHK);
    setSelectedIndex(6);
  }
  function handleOpenRS() {
    setOpenRS(!openRS);
    setSelectedIndex(8);
  }
  function handleOpenReports(event, inx) {
    console.log("report Click");
    handleComponentState("reports");
    setSelectedIndex(inx);
  }
  function handleOpenConfig() {
    const ind = 9;
    dispatch(indexTab(ind));
    // setOpenConfig(!openConfig)

    store.dispatch({
      type: EDIT_CONFIGSTATE,
      payload: "Configuration",
    });
    handleComponentState("Configuration");
    setSelectedIndex(9);
  }

  function handleOpenSystemsTools() {
    setOpenSystemsTools(!openSystemTools);
    setSelectedIndex(10);
  }

  function handleComponentState(comp) {
    const comlower = comp.toLowerCase();
    history.replace(`/${comlower}`);
    store.dispatch({
      type: EDIT_COMPONENT,
      payload: comp,
    });
  }

  return (
    <List>
      {/* disablePadding dense */}
      {comps.includes("DB") || comps.includes("*ALL") ? (
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={handleOpenDashboard}
        >
          <ListItemIcon style={{ color: "white" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ style: setFontSize }}
            primary={translate.Dashboard}
          />
        </ListItem>
      ) : null}
      {comps.includes("RV") || comps.includes("*ALL") ? (
        // <ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)} >
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={handleOpenReservation}
        >
          <ListItemIcon style={{ color: "white" }}>
            <KingBedIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ style: setFontSize }}
            primary={translate.Reservation}
          />
        </ListItem>
      ) : null}
      {comps.includes("FD-WN") ||
      comps.includes("FD-CI") ||
      comps.includes("FD-CO") ||
      comps.includes("FD-RS") ||
      comps.includes("*ALL") ? (
        <List style={{ marginTop: -10 }}>
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={handleOpenFrontDesk}
          >
            <ListItemIcon style={{ color: "white" }}>
              <ImageAspectRatioIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary={translate.FrontDesk}
            />
            {openFrontDesk ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openFrontDesk} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {comps.includes("FD-WN") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 21}
                  onClick={(event) => handleListItemClick(event, 21)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Walk-in"
                  />
                </ListItem>
              ) : null}
              {comps.includes("FD-CI") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  primaryTypographyProps={{ style: setFontSize }}
                  selected={selectedIndex === 22}
                  onClick={(event) => handleListItemClick(event, 22)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Check-in"
                  />
                </ListItem>
              ) : null}
              {comps.includes("FD-CO") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  primaryTypographyProps={{ style: setFontSize }}
                  selected={selectedIndex === 23}
                  onClick={(event) => handleListItemClick(event, 23)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Check-out"
                  />
                </ListItem>
              ) : null}
              {comps.includes("FD-RS") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 24}
                  onClick={(event) => handleListItemClick(event, 24)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Room Status"
                  />
                </ListItem>
              ) : null}
            </List>
          </Collapse>
        </List>
      ) : null}
      {comps.includes("CS-RP") ||
      comps.includes("CS-FM") ||
      comps.includes("*ALL") ? (
        <List style={{ marginTop: -15 }}>
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={handleOpenCashier}
          >
            <ListItemIcon style={{ color: "white" }}>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary={translate.Cashier}
            />
            {openCashier ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openCashier} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {comps.includes("CS-FM") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 31}
                  onClick={(event) => handleListItemClick(event, 31)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Folio Management"
                  />
                </ListItem>
              ) : null}
              {comps.includes("CS-RP") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 32}
                  onClick={(event) => handleListItemClick(event, 32)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Report"
                  />
                </ListItem>
              ) : null}
            </List>
          </Collapse>
        </List>
      ) : null}
      {comps.includes("PF-ID") ||
      comps.includes("PF-TA") ||
      comps.includes("PF-CP") ||
      comps.includes("PF-GR") ||
      comps.includes("*ALL") ? (
        <List style={{ marginTop: -15 }}>
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={handleOpenProfile}
          >
            <ListItemIcon style={{ color: "white" }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary={translate.Profile}
            />
            {openProfile ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openProfile} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {comps.includes("PF-ID") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 41}
                  onClick={(event) => handleOpenProfileIndivisual(event, 41)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Individual"
                  />
                </ListItem>
              ) : null}
              {comps.includes("PF-TA") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 42}
                  onClick={(event) => handleOpenProfileTravelAgent(event, 42)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Travel Agent"
                  />
                </ListItem>
              ) : null}
              {comps.includes("PF-CP") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 43}
                  onClick={(event) => handleOpenProfileCompany(event, 43)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Company"
                  />
                </ListItem>
              ) : null}
              {comps.includes("PF-GR") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 44}
                  onClick={(event) => handleListItemClick(event, 44)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Group"
                  />
                </ListItem>
              ) : null}
            </List>
          </Collapse>
        </List>
      ) : null}
      {comps.includes("NA-RP") ||
      comps.includes("NA-HD") ||
      comps.includes("NA-CD") ||
      comps.includes("NA-AS") ||
      comps.includes("*ALL") ? (
        <List style={{ marginTop: -15 }}>
          <ListItem
            button
            selected={selectedIndex === 5}
            onClick={handleOpenNA}
          >
            <ListItemIcon style={{ color: "white" }}>
              <NightsStayIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary={translate.NightAuditor}
            />
            {openNA ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openNA} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {comps.includes("NA-RP") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 51}
                  onClick={(event) => handleListItemClick(event, 51)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Reports"
                  />
                </ListItem>
              ) : null}
              {comps.includes("NA-HD") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 52}
                  onClick={(event) => handleListItemClick(event, 52)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Hotel Date Maintenance"
                  />
                </ListItem>
              ) : null}
              {comps.includes("NA-CD") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 53}
                  onClick={(event) => handleListItemClick(event, 53)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Close-Day Procedure"
                  />
                </ListItem>
              ) : null}
              {comps.includes("NA-AS") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 54}
                  onClick={(event) => handleListItemClick(event, 54)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Auto-Sequence Reports"
                  />
                </ListItem>
              ) : null}
            </List>
          </Collapse>
        </List>
      ) : null}
      {comps.includes("HK-IM") ||
      comps.includes("HK-RS") ||
      comps.includes("*ALL") ? (
        <List style={{ marginTop: -15 }}>
          <ListItem
            button
            selected={selectedIndex === 6}
            onClick={handleOpenHK}
          >
            <ListItemIcon style={{ color: "white" }}>
              <DeleteSweepIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary={translate.HouseKeeping}
            />
            {openHK ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openHK} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              {comps.includes("HK-IM") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 61}
                  onClick={(event) => handleListItemClick(event, 61)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Item Management"
                  />
                </ListItem>
              ) : null}
              {comps.includes("HK-RS") || comps.includes("*ALL") ? (
                <ListItem
                  button
                  selected={selectedIndex === 62}
                  onClick={(event) => handleListItemClick(event, 62)}
                >
                  <ListItemText
                    primaryTypographyProps={{ style: setFontSize }}
                    inset
                    primary="Room Status"
                  />
                </ListItem>
              ) : null}
            </List>
          </Collapse>
        </List>
      ) : null}
      {comps.includes("EN") || comps.includes("*ALL") ? (
        <ListItem
          button
          selected={selectedIndex === 7}
          onClick={(event) => handleListItemClick(event, 7)}
        >
          <ListItemIcon style={{ color: "white" }}>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ style: setFontSize }}
            primary={translate.Engineer}
          />
        </ListItem>
      ) : null}
      {comps.includes("RS") || comps.includes("*ALL") ? (
        <List style={{ marginTop: -15 }}>
          <ListItem
            button
            selected={selectedIndex === 8}
            onClick={handleOpenRS}
          >
            <ListItemIcon style={{ color: "white" }}>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary="Reports"
            />
            {openRS ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openRS} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                selected={selectedIndex === 81}
                onClick={(event) => handleOpenReports(event, 81)}
              >
                <ListItemText
                  primaryTypographyProps={{ style: setFontSize }}
                  inset
                  primary="Customizable"
                />
              </ListItem>
            </List>
          </Collapse>
        </List>
      ) : null}
      {comps.includes("CF") || comps.includes("*ALL") ? (
        <ListItem
          button
          selected={selectedIndex === 9}
          onClick={handleOpenConfig}
        >
          <ListItemIcon style={{ color: "white" }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ style: setFontSize }}
            primary={translate.Configuration}
          />
          {/* {openConfig ? <IconExpandLess /> : <IconExpandMore />} */}
        </ListItem>
      ) : null}
      {comps.includes("CF") || comps.includes("*ALL") ? (
        <List style={{ marginTop: -15 }}>
          <ListItem
            button
            selected={selectedIndex === 10}
            onClick={handleOpenSystemsTools}
          >
            <ListItemIcon style={{ color: "white" }}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ style: setFontSize }}
              primary={translate.SystemsTools}
            />
            {openSystemTools ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openSystemTools} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem
                button
                selected={selectedIndex === 101}
                onClick={(event) => handleListItemClick(event, 101)}
              >
                <ListItemText
                  primaryTypographyProps={{ style: setFontSize }}
                  inset
                  primary="Hotel Status"
                />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 102}
                onClick={(event) => handleListItemClick(event, 102)}
              >
                <ListItemText
                  primaryTypographyProps={{ style: setFontSize }}
                  inset
                  primary="Room Rack"
                />
              </ListItem>
            </List>
          </Collapse>
        </List>
      ) : null}
    </List>
  );
}
