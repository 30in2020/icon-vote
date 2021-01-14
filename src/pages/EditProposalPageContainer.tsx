import React, { useState, useCallback, useEffect } from "react";

import { EditProposalPage } from "../pages";
import { ProposalType } from "../types";
import Mutation from "../apis/mutation";
import { useHistory } from "react-router-dom";

interface Props {}

const EditProposalPageContainer: React.SFC<Props> = (props) => {
  const history = useHistory();

  // ProposalTypeSelector
  const [selectedProposalType, setProposalType] = useState<ProposalType>(
    ProposalType.COMMUNITY
  );

  const [question, setQuestion] = useState<string>("");

  // OptionInputList
  const INIT_INPUT_ARR = ["", "", ""];
  const [inputs, setInputs] = useState<string[]>(INIT_INPUT_ARR);
  const changeInput = useCallback(
    (idx: number, value: string) =>
      setInputs((inputs) => {
        const outputState = inputs.slice(0);
        outputState[idx] = value;
        return outputState;
      }),
    []
  );
  const addInput = useCallback(
    () =>
      setInputs((inputs) => {
        const outputState = inputs.slice(0);
        outputState.push("");
        return outputState;
      }),
    []
  );
  const removeInput = useCallback(
    (idx: number) =>
      setInputs((inputs) => {
        const outputState = inputs.slice(0);
        outputState.splice(idx, 1);
        return outputState;
      }),
    []
  );

  // Editor
  const [contents, setContents] = useState<string>("");

  // SliderSelector
  const [minimumApprovalRatePct, setMinimumApprovalRatePct] = useState<number>(
    50
  );
  const [requiredParticipationPct, setRequiredParticipationPct] = useState<
    number
  >(50);

  // DurationInput
  const [days, setDays] = useState<string>("0");
  const [hours, setHours] = useState<string>("1");
  const [expireAt, setExpireAt] = useState<number>(0);
  useEffect(() => {
    const curTime = new Date();
    const dateAddedTime = new Date(
      curTime.setDate(curTime.getDate() + Number(days || 0))
    );
    const dateAndHourAddedTime = dateAddedTime.setHours(
      dateAddedTime.getHours() + Number(hours || 0)
    );
    setExpireAt(dateAndHourAddedTime);
  }, [days, hours]);

  // Submit & loading
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = useCallback(async () => {
    try {
      if (!question) {
        throw Error("Question field is empty.");
      }
      if (inputs.length < 2) {
        throw Error("At least two options are required.");
      }
      if (inputs.includes("")) {
        throw Error("Fill-in all option fields.");
      }
      if (!contents) {
        throw Error("Description field is empty.");
      }
      setLoading(true);
      const proposalId = await Mutation.setProposal({
        proposalId: -1,
        published: false,
        isPublicVote: selectedProposalType === ProposalType.COMMUNITY,
        subject: question,
        winningTh: minimumApprovalRatePct,
        electoralTh:
          selectedProposalType === ProposalType.FANS
            ? requiredParticipationPct
            : 0,
        selectItemList: inputs.map((input, i) => ({
          index: i,
          contents: input,
        })),
        contents,
        expireAt: new Date(expireAt).toISOString(),
      });
      await Mutation.setPublish({
        proposalId,
      });
      alert("Proposal submitted successfully.");
      history.push("/");
      setLoading(false);
    } catch (e) {
      console.error(e);
      alert(e.message);
      setLoading(false);
    }
  }, [
    contents,
    expireAt,
    history,
    inputs,
    minimumApprovalRatePct,
    question,
    requiredParticipationPct,
    selectedProposalType,
  ]);

  return (
    <EditProposalPage
      selectedProposalType={selectedProposalType}
      setProposalType={setProposalType}
      question={question}
      setQuestion={setQuestion}
      inputs={inputs}
      changeInput={changeInput}
      removeInput={removeInput}
      addInput={addInput}
      setContents={setContents}
      minimumApprovalRatePct={minimumApprovalRatePct}
      setMinimumApprovalRatePct={setMinimumApprovalRatePct}
      requiredParticipationPct={requiredParticipationPct}
      setRequiredParticipationPct={setRequiredParticipationPct}
      days={days}
      setDays={setDays}
      hours={hours}
      setHours={setHours}
      expireAt={expireAt}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default EditProposalPageContainer;
