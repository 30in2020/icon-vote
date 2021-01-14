import React, { ReactNode } from "react";
import { Alert } from "../components";
import useModal from "../hooks/useModal";

const AlertContext = React.createContext<any>({});
const { Provider } = AlertContext;

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isModalOpened: isAlertOpened,
    handleModal: handleAlert,
    modalContent: alertContent,
  } = useModal();

  return (
    <Provider value={{ isAlertOpened, alertContent, handleAlert }}>
      <Alert />
      {children}
    </Provider>
  );
};

export { AlertContext, AlertProvider };
