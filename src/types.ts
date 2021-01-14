import BigNumber from "bignumber.js";

export enum ProposalType {
  FANS = "Fans only",
  COMMUNITY = "Community",
}

export enum ProposalStatusType {
  VOTING = "VOTING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export interface Proposal {
  id: string;
  proposer: string;
  title: string;
  options: ProposalOptionModel[];
  proposalType: ProposalType;
  endsAt: number;
  pRepLink: string;
  proposalLink: string;
  status: ProposalStatusType;

  address: string;
  contents: string;
  electoralThreshold: number;
  winningThreshold: number;
  wonOption: number;

  txWhenProposalCreated: string;
  txWhenProposalFinalized: string;
}

export type ProposalCardModel = Pick<
  Proposal,
  | "id"
  | "proposer"
  | "title"
  | "options"
  | "proposalType"
  | "endsAt"
  | "pRepLink"
  | "proposalLink"
  | "status"
>;

export type VoteCardModel = Pick<
  Proposal,
  "id" | "proposer" | "title" | "proposalType" | "pRepLink" | "proposalLink"
> & {
  options: string[];
  votedOption: number;
};

export interface ProposalOptionModel {
  name: string;
  percent: string;
}

export interface PRep {
  address: string;
  status: string;
  penalty: string;
  grade: string;
  name: string;
  country: string;
  city: string;
  stake: string;
  delegated: string;
  totalBlocks: string;
  validatedBlocks: string;
  unvalidatedSequenceBlocks: string;
  irep: string;
  irepUpdateBlockHeight: string;
  lastGenerateBlockHeight: string;
  blockHeight: string;
  txIndex: string;
  email: string;
  website: string;
  details: string;
  p2pEndpoint: string;
}

export interface PRepListItem {
  username: string;
  address: string;
  pRepName: string;
}

export interface ProposalsStatusCnt {
  openCnt: number;
  closeCnt: number;
}

export interface Vote {
  voter: string;
  votedOption: number;
  voteTx: string;
  delegateTxId: string;
  delegateAmount: BigNumber;
}

export interface VotesOnProposalOption {
  item: string;
  voteList: Vote[];
  votedPower: BigNumber;
}

export interface VotesOnProposalOptionWithTotalVotedPower {
  votes: Vote[];
  votesOnProposalOption: VotesOnProposalOption[];
  totalVotedPower: BigNumber;
}

export interface LedgerWallet {
  path: string;
  balance: BigNumber;
  address: string;
}
