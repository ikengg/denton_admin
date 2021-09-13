import './App.css';
import React, { useEffect } from 'react';
import DashboardPage from './pages/DashboardPage';
import useStyles from './styles';
import DrawerMenu from './components/DrawerMenu/DrawerMenu';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RepairPage from './pages/RepairPage/RepairPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './guard/auth';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, getCurrentUser, signOut } from "./redux/actions/authAction";

import AdminRepair from './pages/AdminRepair/AdminRepair';
import RepairStatusTracking from './pages/RepairStatusTracking/RepairStatusTracking';
import RepairQRCode from './pages/RepairPage/StepperForm/RepairQRCode';
import {
  CircularProgress,
  Box,
  CssBaseline
} from '@material-ui/core';


function App() {

  const classes = useStyles();
  const profile = useSelector(state => state.authReducer.profile)
  const loading = useSelector(state => state.authReducer.loading)
  const isLogedin = useSelector(state => state.authReducer.isLogedin)

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // //on reflesh page
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [])

  const logout = e => {
    dispatch(signOut());
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        marginTop={15}
      >
        <CircularProgress />
      </Box>
    );
  }

  // if (profile) {
  //   return (
  //     <div>
  //       <p>Login complete {profile.email}</p>
  //       <button onClick={logout} >Logout</button>
  //     </div>
  //   )
  // }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        {/* Header */}
        {
          isLogedin && <Header
            open={open}
            handleDrawerOpen={handleDrawerOpen}
          />
        }
        {/* Left Drawer */}
        {
          isLogedin && <DrawerMenu
            open={open}
            handleDrawerClose={handleDrawerClose}
          />
        }
        <Switch>
          {/* LoginPage */}
          <Route exact path="/login">
            <LoginPage />
          </Route>
          {/* Status tracking public page */}
          <Route exact path="/status">
            <RepairStatusTracking />
          </Route>
          {/* Home */}
          <PrivateRoute exact path="/">
            <DashboardPage />
          </PrivateRoute>
          {/* Repair */}
          <PrivateRoute exact path="/repair">
            <RepairPage />
          </PrivateRoute>
          <PrivateRoute exact path="/adminrepair">
            <AdminRepair />
          </PrivateRoute>
          <PrivateRoute exact path="/print">
            <RepairQRCode />
          </PrivateRoute>
          <PrivateRoute >
            <NotFoundPage />
          </PrivateRoute>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
