import React, { useCallback, useContext } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import {
  Title,
  Button,
  SignPageType,
  ISignPageAsset,
  VerifyWithModalContainer,
} from "..";
import { ButtonType } from "../common/Button";
import { ModalContext } from "../../contexts/ModalContext";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

interface Props extends ISignPageAsset {
  signPageType: SignPageType;
}

const VerifyContent: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const history = useHistory();
  const { title, button } = props;
  const {
    user: { username },
  } = useContext(UserContext);
  const { handleModal } = useContext(ModalContext);

  const handleOnClick = useCallback(() => {
    handleModal(<VerifyWithModalContainer history={history} />);
  }, [handleModal, history]);

  return (
    <div className={classes.content}>
      <Title text={title} />
      <div className={classes.text}>
        <h3>{username}</h3>
        <p>
          Use a Ledger or{" "}
          <span
            onClick={() =>
              window.open(
                "https://chrome.google.com/webstore/detail/iconex/flpiciilemghbmfalicajoolhkkenfel/"
              )
            }
          >
            ICONex extension
          </span>{" "}
          on browsers, such as Brave or Chrome.
        </p>
      </div>
      <div className={classes.buttons}>
        <Button onClick={handleOnClick} text={button} />
        <Button
          text="Not now"
          buttonType={ButtonType.FLAT}
          onClick={() => history.push("/")}
        />
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  content: {
    position: "relative",
    width: "32%",
    paddingBottom: 50,
    [theme["breakpoint-sm"]]: {
      width: 400,
    },
    [theme["breakpoint-xs"]]: {
      width: 360,
    },
  },
  text: {
    paddingTop: 35,
    marginBottom: 20,
    "& h3": {
      fontSize: "2.4rem",
      color: theme.secondary1,
      marginBottom: 12,
    },
    "& p": {
      lineHeight: "3.0rem",
      "& span": {
        color: theme.primary1,
        cursor: "pointer",
      },
    },
  },
  buttons: {
    display: "flex",
    "& > div": {
      marginRight: 26,
      "&:last-of-type": {
        marginRight: 0,
      },
    },
  },
}));

export default VerifyContent;
