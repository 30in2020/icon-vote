/** @format */

import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../styles/theme";
import {
  Title,
  Button,
  ButtonType,
  PRepListContainer,
  ProposalCardListContainer,
} from "../components";
import { useHistory } from "react-router-dom";

const MainPage: React.SFC = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className="container">
      <div className={classes.main}>
        <div className={classes.main__title}>
          <Title text="Latest proposals" />
          <Button
            onClick={() => {
              history.push("/latest-proposals");
            }}
            text="View more"
            buttonType={ButtonType.FLAT}
          />
        </div>
        <div>
          <ProposalCardListContainer hasFilter={false} />
        </div>
        <div>
          <Title text="P-Reps with proposals" />
          <PRepListContainer />
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  main: {
    marginTop: 18,
  },
  main__title: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: 42,
  },
}));

export default MainPage;
