import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../styles/theme";
import {
  Title,
  PRepList,
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

const MainPage: React.SFC = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.main}>
        <div className={classes.main__title}>
          <Title text="Latest proposals" />
          <Button text="View all" buttonType={ButtonType.FLAT} />
        </div>
        <div>
          <ProposalCardList proposals={mockProposals} />
        </div>
        <div>
          <Title text="P-Reps" />
          <PRepList />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
