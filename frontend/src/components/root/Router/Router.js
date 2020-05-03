import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ProtectedRoute } from "../../molecules";
import { Header } from "../../organisms";
import { Contacts, Home, Upload, Login, NotFound } from "../../pages";
import { AuthContext } from "../../../store/contexts/auth";

export default function Router() {
  const { state: authState } = useContext(AuthContext);

  console.log("authState", authState);
  const isAuthenticated = authState.isAuthenticated; //store && store.auth && store.auth.isAuthenticated;
  return (
    <BrowserRouter basename="/">
      <Header />
      <div className="page">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contacts} />
          <Route path="/login" component={Login} />
          <ProtectedRoute
            path="/upload"
            component={Upload}
            isAllowed={isAuthenticated}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
