import React from "react";
import { Card } from "..";
import SWR from "../../apis/swr";
import { convertVotedPowerToPercent } from "../../utils/";
import { ProposalCardModel } from "../../types";

interface Props {
  proposal: ProposalCardModel;
}

const ProposalCardContainer: React.SFC<Props> = (props) => {
  const { proposal } = props;
  const { data } = SWR.useGetVoteRatesAndTotalVotedPower(
    proposal.proposer,
    proposal.id,
    {
      proposal,
    }
  );

  return (
    <Card
      item={{
        ...proposal,
        options: data ? convertVotedPowerToPercent(data) : proposal.options,
      }}
      isLoading={!data}
    />
  );
};

export default ProposalCardContainer;
