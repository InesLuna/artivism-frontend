import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../services/AuthProvider";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";

// El componente <PrivateRoute /> recibe como argumento un objeto con las propiedades: isLoggedIn y el resto de las props, y además un componente en la key component

function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {

  
    // devuelve un componente <Route /> donde su prop render recibe las props, y si el usuario está logueado, devuelve el componente con sus props (history, etc.), en caso contrario, el componente <Redirect /> redirige a /login
  return (
   <Route
    {...rest}
    render={ (props)  => isLoggedIn ?<> <TopNavbar />  <Component {...props} /><BottomNavbar/> </>: <Redirect to="/login" />}
   />
  );
}

export default withAuth(PrivateRoute);