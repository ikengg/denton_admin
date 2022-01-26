import './App.css';
import React, { useEffect } from 'react';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from "./redux/actions/authAction";
import {
  CircularProgress,
  Box,
  CssBaseline
} from '@material-ui/core';

import { useRoutes } from 'react-router-dom';
import routes from './routes';


function App() {

  const classes = useStyles();
  const dispatch = useDispatch();

  //check if client login or not
  const {
    loading, 
    isLogedin
  } = useSelector(state => state.authReducer);
  
  const routing = useRoutes(routes(isLogedin));

  // on reflesh page
  useEffect(() => {
    dispatch(getCurrentUser());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div className={classes.root}>
      <CssBaseline />
      { routing }
    </div>
  );
};

export default App;
