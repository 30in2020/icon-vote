import React, { useRef, RefObject } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../../contexts/ModalContext";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import CloseIcon from "../../assets/close@2x.png";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Fade } from "../";

interface Props {}

const Modal: React.FC<Props> = (props) => {
  const classes = useModalStyles(props);
  const ref = useRef<HTMLDivElement>();
  const { modalContent, handleModal, isModalOpened } = React.useContext(
    ModalContext
  );

  useOutsideClick(ref, () => {
    if (isModalOpened) handleModal();
  });

  return ReactDOM.createPortal(
    <Fade isShown={isModalOpened}>
      <div className={classes.dim}>
        <div ref={ref as RefObject<HTMLDivElement>} className={classes.wrap}>
          <button className={classes.close} onClick={() => handleModal()}>
            &times;
          </button>
          {modalContent}
        </div>
      </div>
    </Fade>,
    document.querySelector("#modal-root")!
  );
};

export const useModalStyles = createUseStyles((theme: ThemeType) => ({
  dim: {
    position: "fixed",
    background: "rgba(255, 255, 255, 0.8)",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    zIndex: 99999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrap: {
    padding: "36px 45px",
    position: "absolute",
    background: theme.mono1,
    border: `1px solid ${theme.dim}`,
    boxShadow: `0px 12px 25px 2px rgba(0,107,131,0.2)`,
    borderRadius: 10,
    "& > div> header": {
      width: "100%",
      marginBottom: 35,
      "& h3": {
        fontSize: "3.6rem",
        color: theme.secondary1,
      },
    },
    [theme["breakpoint-xs"]]: {
      width: 350,
    },
  },
  close: {
    position: "absolute",
    cursor: "pointer",
    right: 45,
    top: 36,
    backgroundSize: "37px 36px",
    background: `url(${CloseIcon}) center center no-repeat`,
    width: 37,
    height: 36,
    fontSize: "0.1rem",
    [theme["breakpoint-xs"]]: {
      backgroundSize: "31px 30px",
    },
  },
}));

export default Modal;
