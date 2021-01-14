import React, { useContext, useCallback } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../styles/theme";
import {
  Title,
  VoteCardList,
  Button,
  ButtonType,
  Loader,
  VerifyWithModalContainer,
} from "../components";
import { ModalContext } from "../contexts/ModalContext";
import { UserContext } from "../contexts/UserContext";
import SWR from "../apis/swr";
import { useHistory } from "react-router-dom";

const ProfilePage: React.SFC = () => {
  const history = useHistory();
  const classes = useStyles();
  const { handleModal } = useContext(ModalContext);
  const {
    user: { username, address },
  } = useContext(UserContext);

  const handleOnClick = useCallback(() => {
    handleModal(<VerifyWithModalContainer history={history} />);
  }, [handleModal, history]);

  const { data } = SWR.useGetUserVotes(address || "");
  if (address && !data) {
    return <Loader height={600} />;
  }

  return (
    <div className="container">
      <div className={classes.main}>
        <div className={classes.main__title}>
          <div>
            <Title text={username} />
            {!address && (
              <>
                <div className={classes.tag}>Not verified</div>
                <div className={classes.button}>
                  <Button
                    onClick={handleOnClick}
                    text="Verify now"
                    buttonType={ButtonType.FLAT}
                  />
                </div>
              </>
            )}
          </div>
          {address && <p>{address}</p>}
        </div>
        <div className={classes.votes}>
          <VoteCardList name={username} votes={data || []} />
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  main: {
    marginTop: 30,
  },
  main__title: {
    marginBottom: 30,
    "& > div": {
      display: "flex",
      alignItems: "center",
      marginBottom: 8,
      [theme["breakpoint-xs"]]: {
        flexWrap: "wrap",
        "& > h2": {
          width: "100%",
        },
      },
    },
    "& > p": {
      color: theme.secondary2,
      letterSpacing: "-0.01rem",
      [theme["breakpoint-xs"]]: {
        fontSize: "1.4rem",
      },
    },
  },
  tag: {
    color: theme.fail,
    border: `2px solid ${theme.fail}`,
    borderRadius: 30,
    fontWeight: theme.semiBold,
    padding: "1px 10px 0px",
    margin: "4px 14px 0px -5px",
  },
  button: {
    marginTop: 3,
  },
  votes: {},
}));

export default ProfilePage;
