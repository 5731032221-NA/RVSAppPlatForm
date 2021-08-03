import React from 'react';
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


export const mainListItems_en = (
  <div >
    <ListItem button >
      <ListItemIcon style={{color:"white"}} >
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <KingBedIcon />
      </ListItemIcon>
      <ListItemText primary="Reservation" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <ImageAspectRatioIcon />
      </ListItemIcon>
      <ListItemText primary="Front Desk" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="Cashier" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profiles" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <NightsStayIcon />
      </ListItemIcon>
      <ListItemText primary="Night Auditor" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <DeleteSweepIcon />
      </ListItemIcon>
      <ListItemText primary="House Keeping" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Engineering" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
  </div>
);

export const secondaryListItems_en = (
  <div>
    <ListSubheader inset  style={{color:"white"}} >Settings</ListSubheader>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Configuration" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="System Tools" />
    </ListItem>
  </div>
);

export const mainListItems_th = (
  <div>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="แดชบอร์ด" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <KingBedIcon />
      </ListItemIcon>
      <ListItemText primary="การจองห้องพัก" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <ImageAspectRatioIcon />
      </ListItemIcon>
      <ListItemText primary="Front Desk" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <MonetizationOnIcon />
      </ListItemIcon>
      <ListItemText primary="แคชเชียร์" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Profiles" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <NightsStayIcon />
      </ListItemIcon>
      <ListItemText primary="Night Auditor" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <DeleteSweepIcon />
      </ListItemIcon>
      <ListItemText primary="House Keeping" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Engineering" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
  </div>
);

export const secondaryListItems_th = (
  <div>
    <ListSubheader inset style={{color:"white"}}>ตั้งค่า</ListSubheader>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Configuration" />
    </ListItem>
    <ListItem button>
      <ListItemIcon style={{color:"white"}} >
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="System Tools" />
    </ListItem>
  </div>
);