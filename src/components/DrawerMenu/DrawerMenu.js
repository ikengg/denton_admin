import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from './drawerListItem/MainListItems';
import SecondListItems from './drawerListItem/SecondListItem';
import Divider from '@material-ui/core/Divider';
//import useStyles from '../styles';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed    
        backgroundColor: '#FFB81C',
        color: 'black'
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      backgroundColor: '#233044',
      color: 'white',
    },
    listInDrawer: {
      '&:hover': {
        background: "#1c2636",
      },
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    // isActive: {
    //   backgroundColor: "#e0f5fd",
    //   color: "#0080ff"
    // }
}));

const DrawerMenu = (props) => {

    const classes = useStyles();

    let {open, handleDrawerClose} = props;
    return (
        <>
            {/* Left Drawer */}
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                {/* close Drawer Button */}
                <div className={classes.toolbarIcon}>
                    <IconButton
                        onClick={handleDrawerClose}
                        className={classes.listInDrawer}
                    >
                        <ChevronLeftIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
                <Divider />
                {/* Main List */}
                <List>
                    {/* {mainListItems} */}
                    {/* {list} */}
                    <MainListItems />
                </List>
                <Divider />
                {/* Second List */}
                <List>
                    <SecondListItems />
                </List>
            </Drawer>
        </>
    )
}

export default DrawerMenu;
