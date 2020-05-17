import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ProtectedRoute } from "../../molecules";
import { Header } from "../../organisms";
import {
  About,
  Admin,
  Category,
  Contact,
  Home,
  Login,
  NotFound,
} from "../../pages";
import { AuthContext } from "../../../store/contexts/auth";

export default function Router() {
  const { state: authState } = useContext(AuthContext);

  const isAuthenticated = authState.isAuthenticated; //store && store.auth && store.auth.isAuthenticated;
  return (
    <BrowserRouter basename="/">
      <Header />
      <div className="page">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <ProtectedRoute
            path="/admin"
            component={Admin}
            isAllowed={isAuthenticated}
          />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/category/:title" component={Category} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
