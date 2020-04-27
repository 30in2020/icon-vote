import React from "react";
import withStyles from "react-jss";
import { ThemeType } from "./styles/theme";
import Routes from "./Routes";
import bg from "./assets/bg.png";

const globalStyle = (theme: ThemeType) => ({
  "@global": {
    html: {
      fontSize: "62.5%",
      fontFamily: theme.font,
      letterSpacing: "-0.05rem",
    },
    body: {
      fontSize: "1.6rem",
      margin: 0,
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
    },
    ".container": {
      width: theme["container-width-lg"],
      margin: "0 auto",
    },
    a: {
      color: "inherit",
      "&:hover": {
        color: theme.secondary2,
      },
    },
  },
});

interface AppProps {
  classes: object;
}

function App({ classes }: AppProps) {
  return (
    <>
      {/*
      <div
        style={{
          opacity: 0.4,
          position: "absolute",
          width: "1116px",
          left: "50%",
          marginLeft: "-557px",
          marginTop: 36,
        }}
      >
        <img src={bg} alt="" />
      </div>
 */}
      <div className="container">
        <Routes />
      </div>
    </>
  );
}

export default withStyles(globalStyle)(App);
