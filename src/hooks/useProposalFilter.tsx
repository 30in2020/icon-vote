import { useState } from "react";
import { ProposalType, ProposalCardModel, VoteCardModel } from "../types";

export default function useProposalFilter<
  T extends ProposalCardModel | VoteCardModel
>(originalData: Array<T>) {
  let filteredData: Array<T> = [];
  const [
    proposalTypeFilter,
    setProposalTypeFilter,
  ] = useState<ProposalType | null>(null);

  if (!!proposalTypeFilter) {
    filteredData = originalData.filter(
      (data: T) => data.proposalType === proposalTypeFilter
    );
  } else {
    filteredData = originalData;
  }

  return { filteredData, proposalTypeFilter, setProposalTypeFilter };
}
