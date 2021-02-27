import React from 'react';
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {
  return (
    <Route path={props.path}>
      { props.canAccess ? props.children : <Redirect to={props.redirect} /> }
    </Route>
)}

export default ProtectedRoute;