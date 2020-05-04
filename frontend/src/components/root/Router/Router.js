import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ProtectedRoute } from "../../molecules";
import { Header } from "../../organisms";
import {
  Admin,
  About,
  Contact,
  Home,
  Upload,
  Login,
  NotFound,
} from "../../pages";
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
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
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
