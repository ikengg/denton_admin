import './App.css';
import React, {useEffect} from 'react';
import DashboardPage from './pages/DashboardPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './styles';
import DrawerMenu from './components/DrawerMenu/DrawerMenu';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RepairPage from './pages/RepairPage/RepairPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './guard/auth';

import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from './redux/actions/authAction'
import AdminRepair from './pages/AdminRepair/AdminRepair';

function App() {

  const classes = useStyles();
  const profile = useSelector(state => state.authReducer.profile)
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
    let profile = JSON.parse(localStorage.getItem("profile"));
    dispatch(updateProfile(profile));
    // eslint-disable-next-line
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        {/* Header */}
        {
          profile && <Header
            open={open}
            handleDrawerOpen={handleDrawerOpen}
          />
        }
        {/* Left Drawer */}
        {
          profile && <DrawerMenu
            open={open}
            handleDrawerClose={handleDrawerClose}
          />
        }
        <Switch>
          {/* LoginPage */}
          <Route exact path="/login">
            <LoginPage />
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
          <PrivateRoute >
            <NotFoundPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
