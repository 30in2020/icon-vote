import React, { useCallback } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import Loader from "../common/Loader";
import { Button, ButtonType } from "../";

interface Props {
  loading: boolean;
  error: string;
  handleConfirm: (e: React.MouseEvent<HTMLElement>) => void;
}

const VerifyLoadingAlert: React.SFC<Props> = (props) => {
  const { loading, error, handleConfirm } = props;
  const classes = useStyles();
  const content = useCallback(() => {
    if (loading) {
      return (
        <>
          <Loader height="100px" />
          <p>Please wait a few seconds...</p>
        </>
      );
    }
    if (error) {
      return (
        <>
          <p>Verification failed. Please try again.</p>
          <Button
            style={{ margin: "0 auto" }}
            text="Confirm"
            buttonType={ButtonType.PRIMARY}
            onClick={handleConfirm}
          />
        </>
      );
    }
    return (
      <>
        <p>Verification Success!</p>
        <Button
          style={{ margin: "0 auto" }}
          text="Confirm"
          buttonType={ButtonType.PRIMARY}
          onClick={handleConfirm}
        />
      </>
    );
  }, [error, handleConfirm, loading]);

  return (
    <div className={classes.wrap}>
      <header>
        <h3>Verify</h3>
      </header>
      <div className={classes.content}>
        <p className={classes.text}>{content()}</p>
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

export default VerifyLoadingAlert;
