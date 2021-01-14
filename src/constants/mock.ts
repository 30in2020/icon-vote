import { ProposalType, ProposalStatusType } from "../types";

const manyProposals = [
  {
    id: "1",
    proposer: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support?",
    options: [
      {
        name: "Dapp.com",
        percent: "10",
      },
      {
        name: "State of the DApps",
        percent: "10",
      },
      {
        name: "DApp.Review",
        percent: "10",
      },
    ],
    proposalType: ProposalType.FANS,
    endsAt: 123,
    status: ProposalStatusType.APPROVED,
  },
  {
    id: "2",
    proposer: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support?",
    options: [
      {
        name: "Dapp.com",
        percent: "10",
      },
      {
        name: "State of the DApps",
        percent: "10",
      },
      {
        name: "DApp.Review",
        percent: "10",
      },
      {
        name: "DAppRadar",
        percent: "10",
      },
    ],
    proposalType: ProposalType.COMMUNITY,
    endsAt: 123,
    status: ProposalStatusType.VOTING,
  },
  {
    id: "3",
    proposer: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support?",
    options: [
      {
        name: "Dapp.com",
        percent: "10",
      },
      {
        name: "State of the DApps",
        percent: "10",
      },
      {
        name: "DAppRadar",
        percent: "10",
      },
    ],
    proposalType: ProposalType.FANS,
    endsAt: 123,
    status: ProposalStatusType.REJECTED,
  },
  {
    id: "4",
    proposer: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support?",
    options: [
      {
        name: "Dapp.com",
        percent: "10",
      },
      {
        name: "State of the DApps",
        percent: "10",
      },
      {
        name: "DApp.Review",
        percent: "10",
      },
      {
        name: "DAppRadar",
        percent: "10",
      },
    ],
    proposalType: ProposalType.COMMUNITY,
    endsAt: 123,
    status: ProposalStatusType.CANCELLED,
  },
  {
    id: "5",
    proposer: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support? Long Question",
    options: [
      {
        name: "Dapp.com",
        percent: "10",
      },
      {
        name: "State of the DApps",
        percent: "10",
      },
      {
        name: "DApp.Review",
        percent: "10",
      },
      {
        name: "DAppRadar",
        percent: "10",
      },
    ],
    proposalType: ProposalType.FANS,
    endsAt: 123,
    status: ProposalStatusType.VOTING,
  },
  {
    id: "6",
    proposer: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support?",
    options: [
      {
        name: "Dapp.com",
        percent: "10",
      },
      {
        name: "State of the DApps",
        percent: "10",
      },
      {
        name: "DApp.Review",
        percent: "10",
      },
      {
        name: "DAppRadar",
        percent: "10",
      },
    ],
    proposalType: ProposalType.FANS,
    endsAt: 123,
    status: ProposalStatusType.VOTING,
  },
];

const proposals = [
  {
    proposer: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support?",
    options: [
      {
        name: "Dapp.com",
        percent: "10",
      },
      {
        name: "State of the DApps",
        percent: "10",
      },
      {
        name: "DApp.Review",
        percent: "10",
      },
      {
        name: "DAppRadar",
        percent: "10",
      },
    ],
    proposalType: ProposalType.FANS,
    endsAt: 123,
    status: ProposalStatusType.VOTING,
  },
  {
    proposer: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support? Long Question",
    options: [
      {
        name: "Dapp.com",
        percent: "10",
      },
      {
        name: "State of the DApps",
        percent: "10",
      },
      {
        name: "DApp.Review",
        percent: "10",
      },
      {
        name: "DAppRadar",
        percent: "10",
      },
    ],
    proposalType: ProposalType.FANS,
    endsAt: 123,
    status: ProposalStatusType.VOTING,
  },
  {
    proposer: "ICX Station",
    pRepLink: "/proposals/icx-station",
    proposalLink: "/proposal/icx-station/1",
    title: "Which Dapp aggregator proposal do you support?",
    options: [
      {
        name: "Dapp.com",
        percent: "10",
      },
      {
        name: "DApp.Review",
        percent: "10",
      },
      {
        name: "DAppRadar",
        percent: "10",
      },
    ],
    proposalType: ProposalType.FANS,
    endsAt: 123,
    status: ProposalStatusType.VOTING,
  },
];

const votes = manyProposals.map(
  ({ id, proposer, title, proposalType, pRepLink, proposalLink }, i) => ({
    id,
    proposer,
    title,
    proposalType,
    pRepLink,
    proposalLink,
    options: ["1", "2", "3"],
    votedOption: i % 3,
  })
);

export default {
  manyProposals,
  proposals,
  votes,
};
