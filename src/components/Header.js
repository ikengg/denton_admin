import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { updateProfile } from '../redux/actions/authAction'
import { useSelector, useDispatch } from 'react-redux' //ไว้เรียก action
import { useHistory } from 'react-router-dom'
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed    
        backgroundColor: '#FFB81C',
        color: 'black'
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    appBarSpacer: theme.mixins.toolbar,
      title: {
        flexGrow: 1,
    },
}));

const Header = (props) => {

    const classes = useStyles();    
    let { open, handleDrawerOpen } = props;
    const userProfile = useSelector((state) => state.authReducer.profile);
    //console.log(userProfile);
    const dispatch = useDispatch();
    const history = useHistory()
    
    return (
        <>
            {/* Header */}
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        POSPOS <small>Beta v0.1</small>
                    </Typography>
                    {userProfile && (
                        <Typography component="p" color="inherit" noWrap>
                            สวัสดีคุณ {userProfile}
                        </Typography>
                    )}
                    <IconButton color="inherit">
                        <Badge color="secondary">
                            <ExitToAppIcon 
                                onClick={()=>{
                                    dispatch(updateProfile(null));
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('profile');
                                    history.replace('/login');
                                }}
                            />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
