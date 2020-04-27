export enum ProposalType {
  REPRESENTATIVE,
  COMMUNITY,
}

export interface ProposalOptionModel {
  name: string;
  percent: number;
}

export interface ProposalModel {
  pRepName: string;
  title: string;
  options: ProposalOptionModel[];
  proposalType: ProposalType;
  endsAt: number;
  pRepLink: string;
  proposalLink: string;
}
