import React from "react";
import Router from "../Router/Router";

import { AuthProvider } from "../../../store/contexts/auth";

import "./App.scss";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
