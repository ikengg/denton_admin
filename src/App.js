import './App.css';
import React from 'react';
import DashboardPage from './pages/DashboardPage';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './styles';
import DrawerMenu from './components/DrawerMenu/DrawerMenu';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RepairPage from './pages/RepairPage/RepairPage';
import LoginPage from './pages/LoginPage';


function App() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Header */}
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Router>
        {/* Left Drawer */}
        <DrawerMenu
          open={open}
          handleDrawerClose={handleDrawerClose}
        />
        <Switch>
          {/* Main Route */}
          <Route exact path="/">
            <LoginPage />
            {/* <LoginOriginal /> */}
          </Route>
          {/* Dashboard Route */}
          <Route exact path="/dashboard">
            <DashboardPage />
          </Route>
          {/* Repair Page */}
          <Route exact path="/repair">
            <RepairPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
