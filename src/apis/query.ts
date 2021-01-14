import iconSDK from "./modules/iconSdk";
import Server from "./modules/server";
import {
  Proposal,
  ProposalStatusType,
  PRep,
  PRepListItem,
  Vote,
  ProposalsStatusCnt,
  VoteCardModel,
  ProposalCardModel,
  ProposalType,
  VotesOnProposalOptionWithTotalVotedPower,
} from "../types";
import BigNumber from "bignumber.js";
import Gql from "./modules/gql";

const _convertProposalData = (proposal: any, _proposer?: string): Proposal => {
  const {
    ID,
    subject,
    select_item,
    type,
    expire_timestamp,
    status,
    address,
    contents,
    electoral_threshold,
    winning_threshold,
    winner,
    transaction,
    final,
    proposer,
  } = proposal;
  const username = proposer || _proposer;
  const _status = _convertToProposalStatusType(status);
  return {
    id: ID,
    proposer: username,
    title: subject,
    options: JSON.parse(select_item).map((name: string) => ({
      name,
      percent: "0",
    })),
    proposalType: _convertToProposalType(type),
    endsAt: Number(expire_timestamp),
    pRepLink: `/proposals/${username}`,
    proposalLink: `/proposal/${username}/${ID}`,
    status: _status,
    address,
    contents,
    electoralThreshold: Number(electoral_threshold),
    winningThreshold: Number(winning_threshold),
    wonOption: Number(_status === ProposalStatusType.APPROVED ? winner : -1),
    txWhenProposalCreated: transaction,
    txWhenProposalFinalized: final,
  };
};

// Comment: Had to add proposer parameter here, since there is some data without proposer value.
const _convertToProposalCardModel = (proposals: any, _proposer?: string) => {
  return (
    // Comment: Had to filter test data added before icon.vote launched.
    proposals
      .filter((proposal: any) => proposal.subject)
      .map((proposal: any, i: number) => {
        const {
          id,
          title,
          proposer,
          options,
          proposalType,
          endsAt,
          pRepLink,
          proposalLink,
          status,
        } = _convertProposalData(proposal, _proposer);
        return {
          id,
          proposer,
          title,
          options,
          proposalType,
          endsAt,
          pRepLink,
          proposalLink,
          status,
        };
      })
  );
};

const _convertToProposalType = (type: string) => {
  switch (type) {
    case "Community":
      return ProposalType.COMMUNITY;
    case "MyVoter":
    default:
      return ProposalType.FANS;
  }
};

const _convertToProposalStatusType = (status: string) => {
  switch (status) {
    case "Voting":
      return ProposalStatusType.VOTING;
    case "Approved":
      return ProposalStatusType.APPROVED;
    case "Rejected":
      return ProposalStatusType.REJECTED;
    case "Cancelled":
    default:
      return ProposalStatusType.CANCELLED;
  }
};

const getProposals = async (params: {
  _proposer: string;
  _start_proposal_id: number;
  _end_proposal_id: number;
}): Promise<ProposalCardModel[]> => {
  try {
    const response = JSON.parse(
      await iconSDK.call("get_proposals", {
        ...params,
        _start_proposal_id: `${params._start_proposal_id}`,
        _end_proposal_id: `${params._end_proposal_id}`,
      })
    );
    return _convertToProposalCardModel(response, params._proposer).reverse();
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getRecentProposals = async ({
  _count,
}: {
  _count: number;
}): Promise<ProposalCardModel[]> => {
  try {
    const response = await iconSDK.call("get_recent_proposals", {
      _count: `${_count}`,
    });
    return _convertToProposalCardModel(response);
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getProposal = async (params: {
  _proposer: string;
  _proposal_id: number;
}): Promise<Proposal | null> => {
  try {
    const response = await iconSDK.call("get_proposal", {
      ...params,
      _proposal_id: `${params._proposal_id}`,
    });

    if (response.startsWith("No Proposal:")) {
      throw Error("NO_RESULT");
    }

    return _convertProposalData(JSON.parse(response), params._proposer);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getVerifyInfoById = async (params: {
  _id: string;
}): Promise<{
  address: string;
  ID: string;
  block_hash: string;
  count: number;
}> => {
  const defaultValue = {
    address: "",
    ID: "",
    block_hash: "",
    count: 0,
  };
  try {
    const response = await iconSDK.call("get_verify_info_by_id", params);
    if (typeof response === "string" && response.includes("is not verified")) {
      return defaultValue;
    } else {
      return JSON.parse(response);
    }
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
};

const isPRep = async (params: { _id: string }): Promise<boolean> => {
  try {
    return !!Number(await iconSDK.call("is_prep", params));
  } catch (e) {
    console.error(e);
    return false;
  }
};

const getLastProposalId = async (params: {
  _proposer: string;
}): Promise<number> => {
  return Number(JSON.parse(await iconSDK.call("get_last_proposal_id", params)));
};

const getVotes = async (params: {
  _proposer: string;
  _proposal_id: number;
}): Promise<Vote[]> => {
  const { vote } = JSON.parse(
    await iconSDK.call("get_votes", {
      ...params,
      _proposal_id: `${params._proposal_id}`,
    })
  );
  return vote.map((_vote: any) => ({
    voter: _vote.voter,
    votedOption: _vote.select_item,
    voteTx: _vote.vote_tx,
    delegateTxId: _vote.final_delegate_tx_id,
    delegateAmount: new BigNumber(_vote.final_delegate_amount),
  }));
};

const getPRepInfoById = async (params: { _id: string }): Promise<PRep> => {
  try {
    const verifyInfoResponse = await getVerifyInfoById(params);
    const response = await iconSDK.governanceCall("getPRep", {
      address: verifyInfoResponse.address,
    });
    return response;
  } catch (e) {
    throw new Error("not verified");
  }
};

const getPRepInfoByAddress = async (params: {
  _address: string;
}): Promise<PRep> => {
  try {
    const { _address } = params;
    return await iconSDK.governanceCall("getPRep", {
      address: _address,
    });
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};

const getDelegation = async (params: {
  _address: string;
}): Promise<{
  delegations: {
    address: string;
    value: string;
  }[];
  totalDelegated: BigNumber;
  votingPower: BigNumber;
}> => {
  try {
    const { _address } = params;
    const result = await iconSDK.governanceCall("getDelegation", {
      address: _address,
    });
    return {
      ...result,
      totalDelegated: new BigNumber(result.totalDelegated),
      votingPower: new BigNumber(result.votingPower),
    };
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};

const getDelegationById = async (params: {
  _id: string;
}): Promise<{
  delegations: {
    address: string;
    value: string;
  }[];
  totalDelegated: BigNumber;
  votingPower: BigNumber;
}> => {
  try {
    const { address } = await getVerifyInfoById(params);
    return await iconSDK.governanceCall("getDelegation", {
      address,
    });
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};

const getPReps = async (): Promise<PRepListItem[]> => {
  try {
    const { preps } = await iconSDK.governanceCall("getPReps", {});
    const pRepsMap: {
      [key: string]: string;
    } = {};

    for (const { address, name } of preps) {
      pRepsMap[address] = name;
    }

    const registeredPReps = await iconSDK.call("get_preps", {});
    return registeredPReps.map(
      (registeredPRep: { username: string; address: string }) => {
        const _registeredPRep = {
          ...registeredPRep,
          pRepName: "",
        };
        const _pRepName = pRepsMap[_registeredPRep.address];
        _registeredPRep.pRepName = _pRepName || _registeredPRep.username;
        return _registeredPRep;
      }
    );
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};

const getTotalDelegated = async (): Promise<BigNumber> => {
  try {
    const { totalDelegated } = await iconSDK.governanceCall("getPReps", {});
    return new BigNumber(totalDelegated);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};

const getMyVotingPower = async (params: {
  proposer: string;
  proposalType: ProposalType;
  userAddress: string;
}): Promise<BigNumber> => {
  try {
    if (!params.userAddress) return new BigNumber(0);

    const { delegations, totalDelegated } = await iconSDK.governanceCall(
      "getDelegation",
      {
        address: params.userAddress,
      }
    );
    const verifyInfoResult = await getVerifyInfoById({
      _id: params.proposer,
    });

    if (params.proposalType === ProposalType.COMMUNITY) {
      return new BigNumber(totalDelegated);
    }

    for (const delegation of delegations) {
      if (delegation.address === verifyInfoResult.address) {
        return new BigNumber(delegation.value);
      }
    }

    return new BigNumber(0);
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};

const getVoteRatesAndTotalVotedPower = async (
  params: {
    _proposer: string;
    _proposal_id: number;
  },
  options?: {
    proposal: ProposalCardModel;
  }
): Promise<VotesOnProposalOptionWithTotalVotedPower> => {
  try {
    const votes = (await getVotes(params))!;
    const proposal = !!options
      ? options.proposal
      : (await getProposal(params))!;

    const votesOnProposalOption: {
      item: string;
      voteList: Vote[];
      votedPower: BigNumber;
    }[] = proposal.options.map((option) => ({
      item: option.name,
      voteList: [],
      votedPower: new BigNumber(0),
    }));

    for (const vote of votes) {
      if (votesOnProposalOption[vote.votedOption]) {
        votesOnProposalOption[vote.votedOption].voteList.push(vote);
      } else {
        votesOnProposalOption[vote.votedOption].voteList = [vote];
      }
    }

    const isCommunityProposal =
      proposal.proposalType === ProposalType.COMMUNITY;

    let totalVotedPower = new BigNumber(0);

    let i = 0;
    for (const voteOnProposalOption of votesOnProposalOption) {
      let votedPowerSum = new BigNumber(0);
      for (const vote of voteOnProposalOption.voteList) {
        if (isCommunityProposal) {
          const { delegations } = await iconSDK.governanceCall(
            "getDelegation",
            {
              address: vote.voter,
            }
          );

          for (const delegation of delegations) {
            votedPowerSum = votedPowerSum.plus(delegation.value);
          }
        } else if (proposal.status === ProposalStatusType.VOTING) {
          const votingPower = await getVotingPower({
            _proposer: params._proposer,
            _user: vote.voter,
          });
          votedPowerSum = votedPowerSum.plus(votingPower);
        } else {
          votedPowerSum = votedPowerSum.plus(vote.delegateAmount);
        }
      }
      votesOnProposalOption[i].votedPower = votedPowerSum;

      totalVotedPower = totalVotedPower.plus(votedPowerSum);
      i++;
    }

    return {
      votes,
      votesOnProposalOption,
      totalVotedPower,
    };
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};

const getVotingPower = async (params: {
  _proposer: string;
  _user: string;
}): Promise<BigNumber> => {
  try {
    const { address = "" } = await getVerifyInfoById({
      _id: params._proposer,
    });

    const { delegations = [] } = await iconSDK.governanceCall("getDelegation", {
      address: params._user,
    });

    if (!!address) {
      for (const delegation of delegations) {
        if (delegation.address === address) {
          return new BigNumber(delegation.value);
        }
      }
    }
    return new BigNumber(0);
  } catch (e) {
    console.error(e);
    return new BigNumber(0);
  }
};

const getProposalsStatusCnt = async (params: {
  _proposer: string;
}): Promise<ProposalsStatusCnt> => {
  try {
    const {
      Voting,
      Approved,
      Rejected,
      Canceled,
    }: {
      Voting: number;
      Approved: number;
      Rejected: number;
      Canceled: number;
      Removed: number;
    } = JSON.parse(await iconSDK.call("get_proposals_status", params));

    return {
      openCnt: Number(Voting),
      closeCnt: Number(Approved) + Number(Rejected) + Number(Canceled),
    };
  } catch (e) {
    return {
      openCnt: 0,
      closeCnt: 0,
    };
  }
};

const getUserVotes = async (params: {
  _voter_address: string;
}): Promise<VoteCardModel[]> => {
  try {
    const {
      votes,
    }: {
      votes: [];
    } = JSON.parse(await iconSDK.call("get_user_votes", params));

    return votes.map((vote: any) => ({
      id: vote.proposal_id,
      proposer: vote.proposer,
      title: vote.subject,
      proposalType: _convertToProposalType(vote.type),
      options: JSON.parse(vote.select_item),
      votedOption: Number(vote.vote_item),
      pRepLink: `/proposals/${vote.proposer}`,
      proposalLink: `/proposal/${vote.proposer}/${vote.proposal_id}`,
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
};

const getViewer = async (): Promise<{
  username: string;
  address: string;
  isPRep: boolean;
}> => {
  try {
    const getViewerResponse = await Server.post({
      operation: null,
      query: Gql.GET_VIEWER,
      variables: {},
    });
    const user = getViewerResponse.data.me;
    if (!user) {
      return {
        username: "",
        address: "",
        isPRep: false,
      };
    }

    const { username } = user;
    const { address } = await getVerifyInfoById({
      _id: username,
    });
    if (!address) {
      return {
        username,
        address: "",
        isPRep: false,
      };
    }

    const isPRepResponse = await isPRep({
      _id: username,
    });
    return {
      username,
      address,
      isPRep: isPRepResponse,
    };
  } catch (e) {
    console.error(e);
    return {
      username: "",
      address: "",
      isPRep: false,
    };
  }
};

export default {
  getProposals,
  getProposal,
  getRecentProposals,
  getVerifyInfoById,
  getLastProposalId,
  getVotes,
  getPRepInfoById,
  getPRepInfoByAddress,
  getDelegation,
  getDelegationById,
  getPReps,
  getTotalDelegated,
  getMyVotingPower,
  getVoteRatesAndTotalVotedPower,
  getVotingPower,
  getProposalsStatusCnt,
  getUserVotes,
  getViewer,
  isPRep,
};
