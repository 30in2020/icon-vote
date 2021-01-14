import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../styles/theme";
import { Title, Breadcrumb, ProposalCardListContainer } from "../components";

const LatestProposalPage: React.SFC = () => {
  const classes = useStyles();
  return (
    <div className="container">
      <div>
        <Breadcrumb>
          <Link to="/">Home</Link>
          <Link to="/latest-proposals">Latest proposals</Link>
        </Breadcrumb>
      </div>
      <div className={classes.main}>
        <div className={classes.main__title}>
          <Title text="Latest proposals" />
        </div>

        <div className={classes.proposals}>
          <ProposalCardListContainer hasFilter={true} />
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
    display: "flex",
    alignItems: "baseline",
    marginBottom: 30,
  },
  proposals: {},
}));

export default LatestProposalPage;
