import React, { ReactNode } from "react";
import { Modal } from "../components";
import useModal from "../hooks/useModal";

const ModalContext = React.createContext<any>({});
const { Provider } = ModalContext;

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { isModalOpened, handleModal, modalContent } = useModal();
  return (
    <Provider value={{ isModalOpened, modalContent, handleModal }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
