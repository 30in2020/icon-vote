import React from "react";
import { Link, useParams } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../styles/theme";
import {
  Title,
  Breadcrumb,
  ProposalCardListContainer,
  VoteCardList,
  Loader,
} from "../components";
import SWR from "../apis/swr";

const PRepDetailPage: React.SFC = () => {
  const classes = useStyles();
  const { username } = useParams();
  const { data } = SWR.useGetPRepById(username!);
  const { data: votes } = SWR.useGetUserVotes(!!data ? data.address : "");

  if (!data || !votes) {
    return <Loader height={600} />;
  }

  const { name } = data;

  return (
    <div className="container">
      <div>
        <Breadcrumb>
          <Link to="/">Home</Link>
          <Link to={`/proposals/${username}`}>{name}</Link>
        </Breadcrumb>
      </div>
      <div className={classes.main}>
        <div className={classes.main__title}>
          <Title text={name} />
        </div>
        <div className={classes.proposals}>
          <ProposalCardListContainer
            pRepName={name}
            username={username}
            hasFilter={true}
          />
        </div>
        <div className={classes.votes}>
          <VoteCardList name={name} votes={votes} />
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
  votes: {},
}));

export default PRepDetailPage;
