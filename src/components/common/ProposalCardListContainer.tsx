import React from "react";
import { useLocation } from "react-router-dom";
import { ProposalCardList, Loader } from "..";
import SWR from "../../apis/swr";

interface Props {
  hasFilter: boolean;
  username?: string;
  pRepName?: string;
}

const ProposalCardListContainer: React.SFC<Props> = ({
  username,
  hasFilter,
  pRepName,
}) => {
  const { pathname } = useLocation();

  const { data } = !!username
    ? // P-Rep Page
      SWR.useGetProposals(username)
    : // Latest Proposals Page
    pathname === "/latest-proposals"
    ? SWR.useGetRecentProposals(12)
    : // Main Page
      SWR.useGetRecentProposals(3);

  if (!data) {
    return <Loader height={438} />;
  }

  return (
    <ProposalCardList
      pRepName={pRepName}
      proposals={data}
      hasFilter={hasFilter}
    />
  );
};

export default ProposalCardListContainer;
