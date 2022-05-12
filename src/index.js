import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { UserAuthContextProvider } from "./context/UserAuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserAuthContextProvider>
      <App />
      </UserAuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
