import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { Button, ButtonType } from "../";

interface Props {
  isSigned: boolean;
  handleConfirm: (e: React.MouseEvent<HTMLElement>) => void;
}

const LedgerSignAlert: React.SFC<Props> = (props) => {
  const { isSigned, handleConfirm } = props;
  const classes = useStyles();
  return (
    <div className={classes.wrap}>
      <header>
        <h3>Verify</h3>
      </header>
      <div className={classes.content}>
        <p className={classes.text}>
          <>
            <p>
              {isSigned
                ? `Ledger Wallet has verified your request. Please press the "Confirm" below.`
                : `Please press the “Confirm” button on your Ledger for signing.`}
            </p>
            <Button
              style={{ margin: "0 auto" }}
              text="Confirm"
              buttonType={ButtonType.PRIMARY}
              onClick={handleConfirm}
              disabled={!isSigned}
            />
          </>
        </p>
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    width: 428,
    [theme["breakpoint-sm"]]: {
      width: 428,
    },
    [theme["breakpoint-xs"]]: {
      width: "100%",
      "& h3": {
        fontSize: "2.6rem!important",
      },
    },
    "& > header": {
      marginBottom: "20px!important",
    },
  },
  content: {},
  text: {
    color: theme.secondary1,
    textAlign: "center",
    fontWeight: theme.semiBold,
    fontSize: "1.8rem",
    "& > p": {
      marginBottom: 30,
    },
  },
}));

export default LedgerSignAlert;
