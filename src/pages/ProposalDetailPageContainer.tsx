import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import BigNumber from "bignumber.js";
import { Loader, ChartData } from "../components";
import SWR from "../apis/swr";
import { ProposalDetailPage } from "./";
import {
  convertVotedPowerToPercent,
  convertToPercent,
  convertICXValueToAbbreviateNumber,
} from "../utils";
import Mutation from "../apis/mutation";
import { UserContext } from "../contexts/UserContext";
import { ProposalStatusType, ProposalType } from "../types";

interface Props {}

const ProposalDetailPageContainer: React.SFC<Props> = (props) => {
  const {
    user: { username: name, address: userAddress },
  } = useContext(UserContext);
  const history = useHistory();
  const { username, proposalId } = useParams();
  const { data: proposal, error: proposalError } = SWR.useGetProposal(
    username!,
    proposalId!
  );
  const { data: pRep } = SWR.useGetPRepById(username!);
  const { data: networkTotalDelegated } = SWR.useGetTotalDelegated();
  const {
    data: votedPowers,
    revalidate,
  } = SWR.useGetVoteRatesAndTotalVotedPower(username!, proposalId!);
  const { data: myVotesAmount } = SWR.useGetMyVotingPower(
    username!,
    proposal ? proposal.proposalType : null
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setOption] = useState<number>(-1);
  const _revalidate = useCallback(() => {
    setTimeout(() => {
      revalidate();
    }, 3000);
  }, [revalidate]);

  const setVote = useCallback(async () => {
    try {
      if (!name) {
        history.push("/signin");
        return;
      }
      if (myVotesAmount!.eq(0)) {
        alert("You don't have any voting power for this proposal.");
        return;
      }

      setLoading(true);
      await Mutation.setVote({
        proposer: username!,
        proposalId: Number(proposalId)!,
        selectItemIndex: selectedOption,
      });
      alert("Voted successfully.");
      _revalidate();
      setLoading(false);
    } catch (e) {
      console.error(e);
      alert(e.message);
      setLoading(false);
    }
  }, [
    _revalidate,
    history,
    myVotesAmount,
    name,
    proposalId,
    selectedOption,
    username,
  ]);

  useEffect(() => {
    if (proposal && proposal.status === ProposalStatusType.APPROVED) {
      setOption(proposal.wonOption);
      return;
    }

    if (
      proposal &&
      proposal.status === ProposalStatusType.VOTING &&
      votedPowers
    ) {
      const userVote = votedPowers.votes.filter(
        (vote) => vote.voter === userAddress
      );
      if (userVote.length > 0) {
        setOption(userVote[0].votedOption);
        return;
      }
    }
  }, [proposal, setOption, userAddress, votedPowers]);

  if (!!proposalError) {
    if (proposalError.message === "NO_RESULT") {
      history.push("/");
      alert("Proposal does not exist or has already been deleted.");
    }
  }

  if (
    !pRep ||
    !proposal ||
    !networkTotalDelegated ||
    !votedPowers ||
    !myVotesAmount
  ) {
    return <Loader height={600} />;
  }

  const options = convertVotedPowerToPercent(votedPowers!);
  const totalDelegated = new BigNumber(pRep.delegated);
  const proposalWithOptions = {
    ...proposal,
    options,
  };

  const chartData: ChartData = {
    votedPct: convertToPercent(votedPowers.totalVotedPower, totalDelegated),
    votesAmount: convertICXValueToAbbreviateNumber(votedPowers.totalVotedPower),
    requiredPct: proposal.electoralThreshold,
    maxVotesAmount: convertICXValueToAbbreviateNumber(
      proposal.proposalType === ProposalType.COMMUNITY
        ? networkTotalDelegated
        : totalDelegated
    ),
    myVotesAmount: convertICXValueToAbbreviateNumber(myVotesAmount),
    votes: votedPowers.votes,
  };

  return (
    <ProposalDetailPage
      username={username!}
      pRep={pRep}
      proposal={proposalWithOptions}
      selectedOption={selectedOption}
      setOption={setOption}
      votedPowers={votedPowers}
      chartData={chartData}
      loading={loading}
      setVote={setVote}
      userAddress={userAddress}
    />
  );
};

export default ProposalDetailPageContainer;
