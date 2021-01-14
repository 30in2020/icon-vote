import React, { useRef, RefObject } from "react";
import ReactDOM from "react-dom";
import { useModalStyles } from "../";
import { AlertContext } from "../../contexts/AlertContext";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Fade } from "../";

interface Props {}

const Alert: React.FC<Props> = (props) => {
  const classes = useModalStyles(props);
  const ref = useRef<HTMLDivElement>();
  const { alertContent, handleAlert, isAlertOpened } = React.useContext(
    AlertContext
  );

  useOutsideClick(ref, () => {
    if (isAlertOpened) handleAlert();
  });

  return ReactDOM.createPortal(
    <Fade isShown={isAlertOpened}>
      <div className={classes.dim}>
        <div ref={ref as RefObject<HTMLDivElement>} className={classes.wrap}>
          <button className={classes.close} onClick={() => handleAlert()}>
            &times;
          </button>
          {alertContent}
        </div>
      </div>
    </Fade>,
    document.querySelector("#alert-root")!
  );
};

export default Alert;
