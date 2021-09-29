import React from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
//import AssignmentIcon from '@material-ui/icons/Assignment';
// import BuildIcon from '@material-ui/icons/Build';
// import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';


export const mainListItems = [
  {
    icon: <DashboardIcon style={{ color: 'white' }} />,
    text: 'Dashboard',
    route: '/',
    isDisable: false
  },
  {
    icon: <ShoppingCartIcon style={{ color: 'white' }} />,
    text: 'Orders',
    route: '/a',
    isDisable: true
  },
  {
    icon: <PeopleIcon style={{ color: 'white' }} />,
    text: 'Customers',
    route: '/b',
    isDisable: true
  },
  {
    icon: <BarChartIcon style={{ color: 'white' }} />,
    text: 'Reports',
    route: '/c',
    isDisable: true
  },
  {
    icon: <LayersIcon style={{ color: 'white' }} />,
    text: 'Integrations',
    route: '/d',
    isDisable: true
  },
  ///ส่งซ่อม
  // {
  //   icon: <BuildIcon style={{ color: 'white' }} />,
  //   text: 'ส่งสินค้าซ่อม',
  //   route: '/repair',
  //   isDisable: false
  // },
  // {
  //   icon: <FormatAlignLeftIcon style={{ color: 'white' }} />,
  //   text: 'อัพเดทสถานะ',
  //   route: '/adminrepair',
  //   isDisable: false
  // },
  // {
  //   icon: <EventAvailableIcon style={{ color: 'white' }} />,
  //   text: 'ติดตามสถานะ',
  //   route: '/status',
  //   isDisable: false
  // },
];


export const mySpecialCareListItem = [
  {
    icon: <FormatAlignRightIcon style={{ color: 'white' }} />,
    text: 'Article',
    route: '/admin/article',
    isDisable: false
  },
  {
    icon: <LocalOfferIcon style={{ color: 'white' }} />,
    text: 'Category',
    route: '/admin/category',
    isDisable: false
  },
  {
    icon: <EventAvailableIcon style={{ color: 'white' }} />,
    text: 'ติดตามสถานะ',
    route: '/status',
    isDisable: false
  },
]