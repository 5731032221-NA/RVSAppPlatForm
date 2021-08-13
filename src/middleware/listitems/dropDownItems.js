import React, { useState, useContext } from 'react';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import KingBedIcon from '@material-ui/icons/KingBed';
import ImageAspectRatioIcon from '@material-ui/icons/ImageAspectRatio';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import { EDIT_COMPONENT, EDIT_CONFIGSTATE } from "../action";


import translate_th from '../../static/lang/th.json'
import translate_en from '../../static/lang/en.json'

import { ReactReduxContext } from 'react-redux'

export default function MainListItems() {
    
    const { store } = useContext(ReactReduxContext);
    const [openFrontDesk, setOpenFrontDesk] = useState(false)
    const [openCashier, setOpenCashier] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [openNA, setOpenNA] = useState(false)
    const [openHK, setOpenHK] = useState(false)
    const [openEngineer, setOpenEngineer] = useState(false)
    const [openRS, setOpenRS] = useState(false)
    const [openConfig, setOpenConfig] = useState(false)
    const [openSystemTools, setOpenSystemsTools] = useState(false)
    const [lang, setLang] = useState('en')
    const [translate, setTranslate] = useState(translate_en)

    const compString = sessionStorage.getItem('comp')
    const comps = JSON.parse(compString);
    console.log("comps", comps);
    const cashier = comps.some(item => item.slug === 'ReportRoomMaster')
    const front = comps.some(item => item.slug === 'ConfigMaster')
    const setting = comps.some(item => item.slug === 'RoleManagement')
    
    const [selectedIndex, setSelectedIndex] = React.useState(1)
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const setFontSize = {
        fontSize:14
    };
    // comps.forEach(element => {
    //     if (element.slug == "ReportRoomMaster") setCashier(true)
    //     if (element.slug == "ConfigMaster") setFront(true)
    //     if (element.slug == "RoleManagement") setSetting(true)

    // });

    setInterval(() => {
        let settinglang = store.getState().reducer.lang;
        if (lang != settinglang && lang != null) {
            setLang(settinglang)
            if (settinglang == 'th') setTranslate(translate_th)
            else if (settinglang == 'en') setTranslate(translate_en)
        }
    }, 1000);

    function handleOpenFrontDesk() {
        setOpenFrontDesk(!openFrontDesk)
        handleComponentState("FrontDesk")
        setSelectedIndex(2)
    }
    function handleOpenCashier() {
        setOpenCashier(!openCashier)
        setSelectedIndex(3)
    }
    function handleOpenProfile() {
        setOpenProfile(!openProfile)
        setSelectedIndex(4)
    }
    function handleOpenNA() {
        setOpenNA(!openNA)
        setSelectedIndex(5)
    }
    function handleOpenHK() {
        setOpenHK(!openHK)
        setSelectedIndex(6)
    }
    function handleOpenRS() {
        setOpenRS(!openRS)
        setSelectedIndex(8)
    }
    function handleOpenConfig() {
        console.log("again")
        // setOpenConfig(!openConfig)
        store.dispatch({
            type: EDIT_CONFIGSTATE,
            payload: "Configuration"
        })
        handleComponentState("Configuration")
        setSelectedIndex(9)
    }
    
    function handleOpenSystemsTools() {
        setOpenSystemsTools(!openSystemTools)
        setSelectedIndex(10)
    }

    function handleComponentState(comp) {
        store.dispatch({
            type: EDIT_COMPONENT,
            payload: comp
        })
    }


    return (
        <List >
            <ListItem button selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)} >
                <ListItemIcon style={{ color: "white" }} >
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{style: setFontSize}} primary={translate.Dashboard} />
            </ListItem>

            <ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event,1)} >
                <ListItemIcon style={{ color: "white" }} >
                    <KingBedIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{style: setFontSize}} primary={translate.Reservation} />
            </ListItem>
            {front ?
                <List style={{marginTop:-10}}>
                    <ListItem button selected={selectedIndex === 2} onClick={handleOpenFrontDesk}>
                        <ListItemIcon style={{ color: "white" }} >
                            <ImageAspectRatioIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{style: setFontSize}} primary={translate.FrontDesk} />
                        {openFrontDesk ? <IconExpandLess /> : <IconExpandMore />}
                    </ListItem>
                    <Collapse in={openFrontDesk} timeout="auto" unmountOnExit>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItem button selected={selectedIndex === 21} onClick={(event) => handleListItemClick(event, 21)} >
                                <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Walk-in" />
                            </ListItem>
                            <ListItem button primaryTypographyProps={{style: setFontSize}} selected={selectedIndex === 22} onClick={(event) => handleListItemClick(event, 22)} >
                                <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Check-in" />
                            </ListItem>
                            <ListItem button primaryTypographyProps={{style: setFontSize}} selected={selectedIndex === 23} onClick={(event) => handleListItemClick(event, 23)} >
                                <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Check-out" />
                            </ListItem>
                            <ListItem button selected={selectedIndex === 24} onClick={(event) => handleListItemClick(event, 24)} >
                                <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Room Status" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                : null}
            {cashier ?
                <List style={{marginTop:-15}}>
                    <ListItem button button selected={selectedIndex === 3} onClick={handleOpenCashier}>
                        <ListItemIcon style={{ color: "white" }} >
                            <MonetizationOnIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{style: setFontSize}} primary={translate.Cashier} />
                        {openCashier ? <IconExpandLess /> : <IconExpandMore />}
                    </ListItem>
                    <Collapse in={openCashier} timeout="auto" unmountOnExit>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItem button selected={selectedIndex === 31} onClick={(event) => handleListItemClick(event, 31)} >
                                <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Folio Management" />
                            </ListItem>
                            <ListItem button selected={selectedIndex === 32} onClick={(event) => handleListItemClick(event, 32)} >
                                <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Report" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                : null}
            {setting ? 
            <List style={{marginTop:-15}}>
                <ListItem button selected={selectedIndex === 4} onClick={handleOpenProfile}>
                    <ListItemIcon style={{ color: "white" }} >
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{style: setFontSize}} primary={translate.Profile} />
                    {openProfile ? <IconExpandLess /> : <IconExpandMore />}
                </ListItem>
                <Collapse in={openProfile} timeout="auto" unmountOnExit>
                    <Divider />
                    <List component="div" disablePadding>
                        <ListItem button selected={selectedIndex === 41} onClick={(event) => handleListItemClick(event, 41)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Individual" />
                        </ListItem>
                        <ListItem button selected={selectedIndex === 42} onClick={(event) => handleListItemClick(event, 42)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Travel Agent" />
                        </ListItem>
                        <ListItem button selected={selectedIndex === 43} onClick={(event) => handleListItemClick(event, 43)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Company" />
                        </ListItem>
                        <ListItem button selected={selectedIndex === 44} onClick={(event) => handleListItemClick(event, 44)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Group" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button selected={selectedIndex === 5} onClick={handleOpenNA}>
                    <ListItemIcon style={{ color: "white" }} >
                        <NightsStayIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{style: setFontSize}} primary={translate.NightAuditor} />
                    {openNA ? <IconExpandLess /> : <IconExpandMore />}
                </ListItem>
                <Collapse in={openNA} timeout="auto" unmountOnExit>
                    <Divider />
                    <List component="div" disablePadding>
                        <ListItem button selected={selectedIndex === 51} onClick={(event) => handleListItemClick(event, 51)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Reports" />
                        </ListItem>
                        <ListItem button selected={selectedIndex === 52} onClick={(event) => handleListItemClick(event, 52)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Hotel Date Maintenance" />
                        </ListItem>
                        <ListItem button selected={selectedIndex === 53} onClick={(event) => handleListItemClick(event, 53)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Close-Day Procedure" />
                        </ListItem>
                        <ListItem button selected={selectedIndex === 54} onClick={(event) => handleListItemClick(event, 54)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Auto-Sequence Reports" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button selected={selectedIndex === 6} onClick={handleOpenHK}>
                    <ListItemIcon style={{ color: "white" }} >
                        <DeleteSweepIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{style: setFontSize}} primary={translate.HouseKeeping} />
                    {openHK ? <IconExpandLess /> : <IconExpandMore />}
                </ListItem>
                <Collapse in={openHK} timeout="auto" unmountOnExit>
                    <Divider />
                    <List component="div" disablePadding>
                        <ListItem button selected={selectedIndex === 61} onClick={(event) => handleListItemClick(event, 61)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Item Management" />
                        </ListItem>
                        <ListItem button selected={selectedIndex === 62} onClick={(event) => handleListItemClick(event, 62)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Room Status" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button selected={selectedIndex === 7} onClick={(event) => handleListItemClick(event, 7)} >
                    <ListItemIcon style={{ color: "white" }} >
                        <BuildIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{style: setFontSize}} primary={translate.Engineer} />
                </ListItem>
                <ListItem button button selected={selectedIndex === 8} onClick={handleOpenRS}>
                    <ListItemIcon style={{ color: "white" }} >
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{style: setFontSize}} primary="Reports" />
                    {openRS ? <IconExpandLess /> : <IconExpandMore />}
                </ListItem>
                <Collapse in={openRS} timeout="auto" unmountOnExit>
                    <Divider />
                    <List component="div" disablePadding>
                        <ListItem button selected={selectedIndex === 81} onClick={(event) => handleListItemClick(event, 81)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Customizable" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button selected={selectedIndex === 9} onClick={handleOpenConfig}>
                    <ListItemIcon style={{ color: "white" }} >
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{style: setFontSize}} primary={translate.Configuration} />
                    {/* {openConfig ? <IconExpandLess /> : <IconExpandMore />} */}
                </ListItem>
                <ListItem button selected={selectedIndex === 10} onClick={handleOpenSystemsTools}>
                    <ListItemIcon style={{ color: "white" }} >
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{style: setFontSize}} primary={translate.SystemsTools} />
                    {openSystemTools ? <IconExpandLess /> : <IconExpandMore />}
                </ListItem>
                <Collapse in={openSystemTools} timeout="auto" unmountOnExit>
                    <Divider />
                    <List component="div" disablePadding>
                        <ListItem button selected={selectedIndex === 101} onClick={(event) => handleListItemClick(event, 101)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Hotel Status" />
                        </ListItem>
                        <ListItem button selected={selectedIndex === 102} onClick={(event) => handleListItemClick(event, 102)} >
                            <ListItemText primaryTypographyProps={{style: setFontSize}} inset primary="Room Rack" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
                : null}
        </List>
    );
}
// export const secondaryListItems_en = (
//     <div>
//         <ListSubheader inset style={{ color: "white" }} >Settings</ListSubheader>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <SettingsIcon />
//             </ListItemIcon>
//             <ListItemText primary="Configuration" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="System Tools" />
//         </ListItem>
//     </div>
// );

// export const mainListItems_th = (
//     <div>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <DashboardIcon />
//             </ListItemIcon>
//             <ListItemText primary="แดชบอร์ด" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <KingBedIcon />
//             </ListItemIcon>
//             <ListItemText primary="การจองห้องพัก" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <ImageAspectRatioIcon />
//             </ListItemIcon>
//             <ListItemText primary="Front Desk" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <MonetizationOnIcon />
//             </ListItemIcon>
//             <ListItemText primary="แคชเชียร์" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <AccountBoxIcon />
//             </ListItemIcon>
//             <ListItemText primary="Profiles" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <NightsStayIcon />
//             </ListItemIcon>
//             <ListItemText primary="Night Auditor" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <DeleteSweepIcon />
//             </ListItemIcon>
//             <ListItemText primary="House Keeping" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <BuildIcon />
//             </ListItemIcon>
//             <ListItemText primary="Engineering" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <LayersIcon />
//             </ListItemIcon>
//             <ListItemText primary="Reports" />
//         </ListItem>
//     </div>
// );

// export const secondaryListItems_th = (
//     <div>
//         <ListSubheader inset style={{ color: "white" }}>ตั้งค่า</ListSubheader>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <SettingsIcon />
//             </ListItemIcon>
//             <ListItemText primary="Configuration" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon style={{ color: "white" }} >
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="System Tools" />
//         </ListItem>
//     </div>
// );