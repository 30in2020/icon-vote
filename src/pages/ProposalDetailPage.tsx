import React from "react";
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
} from "../components";
import { ProposalType, ProposalOptionModel } from "../types";

interface Props {
  options: ProposalOptionModel[];
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  proposal: {
    marginTop: 28,
  },
  proposal__header: {},
  proposal__dashboard: {
    marginTop: 22,
    display: "flex",
  },
  proposal__vote: {
    width: "67%",
  },
  proposal__graph: {
    width: "33%",
  },
  proposal__description: {
    marginTop: 44,
  },
}));

const ProposalDetailPage: React.SFC<Props> = (props) => {
  const classes = useStyles();
  const { options } = props;

  return (
    <div>
      <div className="container">
        <Breadcrumb>
          <Link to="/">Home</Link>
          <Link to="/proposals/icx-station">ICX Station</Link>
          <Link to="/proposal/icx-station/1">
            Which Dapp aggregator proposal do you support?
          </Link>
        </Breadcrumb>
      </div>
      <div className={classes.proposal}>
        <div className={classes.proposal__header}>
          <Title text="Which Dapp aggregator proposal do you support?" />
          <ProposalMetaData
            proposalType={ProposalType.COMMUNITY}
            endsAt={1}
            style={{
              fontSize: "1.8rem",
              paddingTop: 16,
            }}
          />
        </div>
        <div className={classes.proposal__dashboard}>
          <div className={classes.proposal__vote}>
            <ProposalVoteSection
              options={[
                {
                  name: "Dapp.com",
                  percent: 10,
                },
                {
                  name: "State of the DApps",
                  percent: 70,
                },
                {
                  name: "DApp.Review",
                  percent: 5,
                },
                {
                  name: "DAppRadar",
                  percent: 20,
                },
              ]}
              minApprovalRate={50}
            />
          </div>
          <div className={classes.proposal__graph}>
            <Chart votedPct={45} voterCnt={12} requiredPct={50} />
          </div>
        </div>
        <div className={classes.proposal__description}>
          <Title text="Description" />
          <ProposalContent content="" />
        </div>
      </div>
    </div>
  );
};

export default ProposalDetailPage;
