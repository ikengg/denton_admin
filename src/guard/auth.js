import React from "react";
import { 
  Route, 
  // Navigate,
  Redirect 
} from "react-router-dom";
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children, ...rest }) {
  let isAuth = false;

  const profile = useSelector(state => state.authReducer.profile)

  if (profile) {
    isAuth = true;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
          // <Navigate to="/login" /> 
        )
      }
    />
  );
}
