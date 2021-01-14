import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../styles/theme";
import {
  Title,
  Breadcrumb,
  ProposalVoteSection,
  ProposalMetaData,
  ProposalContent,
  Chart,
  ChartData,
} from "../components";
import {
  PRep,
  Proposal,
  VotesOnProposalOptionWithTotalVotedPower,
} from "../types";

interface Props {
  username: string;
  pRep: PRep;
  proposal: Proposal;
  votedPowers: VotesOnProposalOptionWithTotalVotedPower;
  chartData: ChartData;
  selectedOption: number;
  setOption: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setVote: () => Promise<void>;
  userAddress: string;
}

const ProposalDetailPage: React.SFC<Props> = ({
  username,
  pRep,
  proposal,
  chartData,
  selectedOption,
  setOption,
  setVote,
  loading,
  userAddress,
}) => {
  const classes = useStyles();

  const { name: pRepName } = pRep;

  const {
    title,
    status,
    winningThreshold,
    pRepLink,
    proposalLink,
    proposalType,
    contents,
    endsAt,
    options,
  } = proposal;

  return (
    <div className="container">
      <div>
        <Breadcrumb>
          <Link to="/">Home</Link>
          <Link to={pRepLink}>{pRepName}</Link>
          <Link to={proposalLink}>{title}</Link>
        </Breadcrumb>
      </div>
      <div className={classes.proposal}>
        <div className={classes.proposal__header}>
          <Title text={title} />
          <ProposalMetaData
            status={status}
            pRepName={username}
            proposalType={proposalType}
            endsAt={endsAt}
            style={{
              fontSize: "1.6rem",
              paddingTop: 16,
            }}
          />
        </div>
        <div className={classes.proposal__dashboard}>
          <div className={classes.proposal__vote}>
            <ProposalVoteSection
              status={status}
              options={options}
              selectedOption={selectedOption}
              setOption={setOption}
              minApprovalRate={winningThreshold}
              setVote={setVote}
              loading={loading}
            />
          </div>
          <div className={classes.proposal__graph}>
            <Chart chartData={chartData} />
          </div>
        </div>
        <div className={classes.proposal__description}>
          <Title text="Description" />
          <ProposalContent content={contents} />
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  proposal: {
    marginTop: 28,
  },
  proposal__header: {},
  proposal__dashboard: {
    marginTop: 22,
    marginBottom: 64,
    display: "flex",
    flexWrap: "wrap",
  },
  proposal__vote: {
    width: "48%",
    marginRight: "4%",
    [theme["breakpoint-sm"]]: {
      width: "100%",
      marginRight: 0,
      marginBottom: 40,
    },
  },
  proposal__graph: {
    width: "48%",
    [theme["breakpoint-sm"]]: {
      width: "100%",
    },
  },
  proposal__description: {
    marginTop: 44,
  },
}));

export default ProposalDetailPage;
