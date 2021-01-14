import useSWR from "swr";
import Query from "../apis/query";
import {
  ProposalsStatusCnt,
  PRepListItem,
  ProposalCardModel,
  ProposalType,
} from "../types";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useGetPReps = () => {
  return useSWR<PRepListItem[]>("get_preps", Query.getPReps);
};

const useGetProposals = (username: string) => {
  return useSWR(
    `get_proposals_${username}`,
    () =>
      Query.getProposals({
        _proposer: username,
        _start_proposal_id: 0,
        _end_proposal_id: Number.MAX_SAFE_INTEGER,
      }),
    {}
  );
};

const useGetRecentProposals = (count: number) => {
  return useSWR(
    `get_recent_proposals_${count}`,
    () =>
      Query.getRecentProposals({
        _count: count,
      }),
    {}
  );
};

const useGetProposalsStatus = (username: string, fetchData: boolean) => {
  return useSWR<ProposalsStatusCnt>(
    fetchData ? `get_proposals_status_cnt_${username}` : null,
    () =>
      Query.getProposalsStatusCnt({
        _proposer: username,
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
};

const useGetUserVotes = (address: string) => {
  return useSWR(
    address && `get_user_votes_${address}`,
    () =>
      Query.getUserVotes({
        _voter_address: address,
      }),
    {}
  );
};

const useGetPRepById = (username: string) => {
  return useSWR(
    `get_prep_by_id_${username}`,
    () =>
      Query.getPRepInfoById({
        _id: username!,
      }),
    {}
  );
};

const useGetProposal = (username: string, proposalId: string) => {
  return useSWR(`get_proposal_${username}_${proposalId}`, () =>
    Query.getProposal({
      _proposal_id: Number(proposalId!),
      _proposer: username!,
    })
  );
};

const useGetVoteRatesAndTotalVotedPower = (
  username: string,
  proposalId: string,
  options?: {
    proposal: ProposalCardModel;
  }
) => {
  return useSWR(
    `get_vote_rates_and_total_voted_power_${username}_${proposalId}`,
    async () =>
      await Query.getVoteRatesAndTotalVotedPower(
        {
          _proposal_id: Number(proposalId),
          _proposer: username,
        },
        options
      )
  );
};

const useGetTotalDelegated = () => {
  return useSWR(
    `get_total_delegated`,
    async () => await Query.getTotalDelegated()
  );
};

const useGetMyVotingPower = (
  proposer: string,
  proposalType: ProposalType | null
) => {
  const userContext = useContext(UserContext);
  const { address: userAddress } = userContext.user;
  return useSWR(proposalType && `get_my_voting_power`, async () => {
    if (!proposalType) return;
    return await Query.getMyVotingPower({
      proposer,
      proposalType,
      userAddress,
    });
  });
};

const useGetViewer = () => {
  const userContext = useContext(UserContext);
  return useSWR(`get_viewer`, async () => {
    const data = await Query.getViewer();
    userContext.setUser(data);
    return data;
  });
};

export default {
  useGetPReps,
  useGetProposals,
  useGetRecentProposals,
  useGetProposalsStatus,
  useGetUserVotes,
  useGetPRepById,
  useGetTotalDelegated,
  useGetProposal,
  useGetVoteRatesAndTotalVotedPower,
  useGetMyVotingPower,
  useGetViewer,
};
