import React,{useState} from 'react';
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
import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'

export default function MainListItems_en() {
    const [openFrontDesk, setOpenFrontDesk] = useState(false)
    const [openCashier, setOpenCashier] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [openNA, setOpenNA] = useState(false)
    const [openHK, setOpenHK] = useState(false)
    const [openEngineer, setOpenEngineer] = useState(false)
    const [openRS, setOpenRS] = useState(false)
    const [openConfig, setOpenConfig] = useState(false)
    const [openSystemTools, setOpenSystemsTools] = useState(false)

    function handleOpenFrontDesk() {
        setOpenFrontDesk(!openFrontDesk)
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
        setOpenConfig(!openConfig)
    }
    function handleOpenSystemsTools() {
        setOpenSystemsTools(!openSystemTools)
    }
  
    
    return (
        <List >
            <ListItem button >
                <ListItemIcon style={{ color: "white" }} >
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
                <ListItemIcon style={{ color: "white" }} >
                    <KingBedIcon />
                </ListItemIcon>
                <ListItemText primary="Reservation" />
                
            </ListItem>
            <ListItem button  onClick={handleOpenFrontDesk}>
                <ListItemIcon style={{ color: "white" }} >
                    <ImageAspectRatioIcon />
                </ListItemIcon>
                <ListItemText primary="Front Desk" />
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
                <ListItemText primary="Cashier" />
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
                <ListItemText primary="Profiles" />
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
                <ListItemText primary="Night Auditor" />
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
                <ListItemText primary="House Keeping" />
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
                <ListItemText primary="Engineering" />
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
             <ListItemText primary="Configuration" />
             {/* {openConfig ? <IconExpandLess /> : <IconExpandMore />} */}
         </ListItem>
         <ListItem button onClick={handleOpenSystemsTools}>
             <ListItemIcon style={{ color: "white" }} >
                 <AssignmentIcon />
             </ListItemIcon>
             <ListItemText primary="System Tools" />
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