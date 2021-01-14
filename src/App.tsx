import React from "react";
import { createUseStyles } from "react-jss";
import globalStyle from "./styles/global";
import { ThemeType } from "./styles/theme";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { ModalProvider } from "./contexts/ModalContext";
import { UserProvider } from "./contexts/UserContext";
import { AlertProvider } from "./contexts/AlertContext";
//import bg from "./assets/bg.png";

interface Props {}

const useStyles = createUseStyles((theme: ThemeType) => ({
  ...globalStyle(theme),
}));

const App: React.FC<Props> = (props) => {
  useStyles();
  return (
    <>
      <UserProvider>
        <AlertProvider>
          <ModalProvider>
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

            <Router>
              <Routes />
            </Router>
          </ModalProvider>
        </AlertProvider>
      </UserProvider>
    </>
  );
};

export default App;
