import React from "react";
import { ToastContainer } from "react-toastify";

import Router from "../Router/Router";

import { AuthProvider } from "../../../store/contexts/auth";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

export default function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router />
    </AuthProvider>
  );
}
