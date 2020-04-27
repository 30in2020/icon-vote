import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "react-jss";
import Theme from "./styles/theme";
import App from "./App";
import "./styles/reset.css";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
