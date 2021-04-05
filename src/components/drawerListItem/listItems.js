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
import BuildIcon from '@material-ui/icons/Build';

export const mainListItems = [
  {
    icon: <DashboardIcon style={{ color: 'white' }} />,
    text: 'Dashboard'
  },
  {
    icon: <ShoppingCartIcon style={{ color: 'white' }} />,
    text: 'Orders'
  },
  {
    icon: <PeopleIcon style={{ color: 'white' }} />,
    text: 'Customers'
  },
  {
    icon: <BarChartIcon style={{ color: 'white' }} />,
    text: 'Reports'
  },
  {
    icon: <LayersIcon style={{ color: 'white' }} />,
    text: 'Integrations'
  },
  ///ส่งซ่อม
  {
    icon: <BuildIcon style={{ color: 'white' }} />,
    text: 'ส่งสินค้าซ่อม'
  },
];


export const secondaryListItems = [
  {
    icon: <AssignmentIcon style={{ color: 'white' }} />,
    text: 'Current month'
  },
  {
    icon: <AssignmentIcon style={{ color: 'white' }} />,
    text: 'Last quarter'
  },
  {
    icon: <AssignmentIcon style={{ color: 'white' }} />,
    text: 'Year-end sale'
  },  
]