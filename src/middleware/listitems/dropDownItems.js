import React, { useState,useContext } from 'react';
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


import KingBedIcon from '@material-ui/icons/KingBed';
import ImageAspectRatioIcon from '@material-ui/icons/ImageAspectRatio';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import BuildIcon from '@material-ui/icons/Build';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
// import IconDashboard from '@material-ui/icons/Dashboard'
// import IconShoppingCart from '@material-ui/icons/ShoppingCart'
// import IconPeople from '@material-ui/icons/People'
// import IconBarChart from '@material-ui/icons/BarChart'
// import IconLibraryBooks from '@material-ui/icons/LibraryBooks'

import { EDIT_COMPONENT } from "../action";


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

    setInterval(() => {
        let settinglang = store.getState().reducer.lang;
        // console.log("settinglang",settinglang,lang)
        // console.log("is",lang != settinglang && lang != null)
        if (lang != settinglang && lang != null) {
            setLang(settinglang)
            if(settinglang == 'th') setTranslate(translate_th)
            else if(settinglang == 'en') setTranslate(translate_en)
        }
    }, 500);

    function handleOpenFrontDesk() {
        setOpenFrontDesk(!openFrontDesk)
        handleComponentState("FrontDesk")
    }
    function handleOpenCashier() {
        setOpenCashier(!openCashier)
    }
    function handleOpenProfile() {
        setOpenProfile(!openProfile)
    }
    function handleOpenNA() {
        setOpenNA(!openNA)
    }
    function handleOpenHK() {
        setOpenHK(!openHK)
    }
    function handleOpenRS() {
        setOpenRS(!openRS)
    }
    function handleOpenConfig() {
        // setOpenConfig(!openConfig)
        handleComponentState("Configuration")
    }
    function handleOpenSystemsTools() {
        setOpenSystemsTools(!openSystemTools)
    }

    function handleComponentState(comp){
        store.dispatch({
            type: EDIT_COMPONENT,
            payload: comp
        })
    }

    return (
        <List>
            <ListItem button >
                <ListItemIcon style={{ color: "white" }} >
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={translate.Dashboard} />
            </ListItem>
            <ListItem button>
                <ListItemIcon style={{ color: "white" }} >
                    <KingBedIcon />
                </ListItemIcon>
                <ListItemText primary={translate.Reservation} />

            </ListItem>
            <ListItem button onClick={handleOpenFrontDesk}>
                <ListItemIcon style={{ color: "white" }} >
                    <ImageAspectRatioIcon />
                </ListItemIcon>
                <ListItemText primary={translate.FrontDesk} />
                {openFrontDesk ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={openFrontDesk} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    <ListItem button >
                        <ListItemText inset primary="Walk-in" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Check-in" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Check-out" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Room Status" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={handleOpenCashier}>
                <ListItemIcon style={{ color: "white" }} >
                    <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary={translate.Cashier} />
                {openCashier ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={openCashier} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    <ListItem button >
                        <ListItemText inset primary="Folio Management" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Report" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={handleOpenProfile}>
                <ListItemIcon style={{ color: "white" }} >
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={translate.Profile} />
                {openProfile ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={openProfile} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    <ListItem button >
                        <ListItemText inset primary="Individual" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Travel Agent" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Company" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Group" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={handleOpenNA}>
                <ListItemIcon style={{ color: "white" }} >
                    <NightsStayIcon />
                </ListItemIcon>
                <ListItemText primary={translate.NightAuditor}/>
                {openNA ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={openNA} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    <ListItem button >
                        <ListItemText inset primary="Reports" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Hotel Date Maintenance" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Close-Day Procedure" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Auto-Sequence Reports" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={handleOpenHK}>
                <ListItemIcon style={{ color: "white" }} >
                    <DeleteSweepIcon />
                </ListItemIcon>
                <ListItemText primary={translate.HouseKeeping} />
                {openHK ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={openHK} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    <ListItem button >
                        <ListItemText inset primary="Item Management" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Room Status" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button>
                <ListItemIcon style={{ color: "white" }} >
                    <BuildIcon />
                </ListItemIcon>
                <ListItemText primary={translate.Engineer} />
            </ListItem>
            <ListItem button onClick={handleOpenRS}>
                <ListItemIcon style={{ color: "white" }} >
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
                {openRS ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={openRS} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    <ListItem button >
                        <ListItemText inset primary="Customizable" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={handleOpenConfig}>
                <ListItemIcon style={{ color: "white" }} >
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={translate.Configuration} />
                {/* {openConfig ? <IconExpandLess /> : <IconExpandMore />} */}
            </ListItem>
            <ListItem button onClick={handleOpenSystemsTools}>
                <ListItemIcon style={{ color: "white" }} >
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={translate.SystemsTools} />
                {openSystemTools ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>
            <Collapse in={openSystemTools} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    <ListItem button >
                        <ListItemText inset primary="Hotel Status" />
                    </ListItem>
                    <ListItem button >
                        <ListItemText inset primary="Room Rack" />
                    </ListItem>
                </List>
            </Collapse>
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