import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../styles/theme";
import {
  Title,
  Breadcrumb,
  Button,
  ButtonType,
  ProposalCardList,
} from "../components";
import { ProposalType } from "../types";

const mockProposals = [
  {
    pRepName: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support?",
    options: [
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
    ],
    proposalType: ProposalType.REPRESENTATIVE,
    endsAt: 123,
  },
  {
    pRepName: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support? Long Question",
    options: [
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
    ],
    proposalType: ProposalType.REPRESENTATIVE,
    endsAt: 123,
  },
  {
    pRepName: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support?",
    options: [
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
    ],
    proposalType: ProposalType.REPRESENTATIVE,
    endsAt: 123,
  },
  {
    pRepName: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support?",
    options: [
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
    ],
    proposalType: ProposalType.REPRESENTATIVE,
    endsAt: 123,
  },
  {
    pRepName: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support? Long Question",
    options: [
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
    ],
    proposalType: ProposalType.REPRESENTATIVE,
    endsAt: 123,
  },
  {
    pRepName: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support?",
    options: [
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
    ],
    proposalType: ProposalType.REPRESENTATIVE,
    endsAt: 123,
  },
];

const useStyles = createUseStyles((theme: ThemeType) => ({
  main: {
    marginTop: 18,
  },
  main__title: {
    display: "flex",
    alignItems: "baseline",
  },
}));

const PRepDetailPage: React.SFC = () => {
  const classes = useStyles();
  return (
    <div>
      <div className="container">
        <Breadcrumb>
          <Link to="/">Home</Link>
          <Link to="/proposals/icx-station">ICX Station</Link>
        </Breadcrumb>
      </div>
      <div className={classes.main}>
        <div className={classes.main__title}>
          <Title text="ICX Station" />
        </div>
        <div>
          <ProposalCardList proposals={mockProposals} />
        </div>
      </div>
    </div>
  );
};

export default PRepDetailPage;
