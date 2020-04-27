import React, { useState, useCallback, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../styles/theme";
import {
  Editor,
  Title,
  ProposalTypeSelector,
  SubTitle,
  Button,
  OptionInputList,
  SliderSelector,
  SliderType,
  DurationInput,
} from "../components";
import { ProposalType } from "../types";

interface Props {}

const useStyles = createUseStyles((theme: ThemeType) => ({
  editProposal: {
    marginTop: 72,
    marginBottom: 180,
  },
  editProposal__type: {
    marginTop: 44,
    marginBottom: -4,
  },
  editProposal__details: {
    marginTop: 72,
    display: "flex",
    flexDirection: "column",
    marginBottom: 98,
  },
  editProposal__details_button: {
    margin: "0 auto",
  },
  editProposal__description: {
    marginBottom: 68,
  },
  editProposal__meta: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: 70,
  },
  editProposal__submit: {
    width: 222,
    display: "block",
    margin: "0 auto",
  },
}));

const INIT_INPUT_ARR = ["", "", ""];

const EditProposalPage: React.SFC<Props> = (props) => {
  const classes = useStyles();

  // ProposalTypeSelector
  const [selectedProposalType, setProposalType] = useState<ProposalType>(
    ProposalType.REPRESENTATIVE
  );

  const [question, setQuestion] = useState<string>("");
  // OptionInputList
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

  // SliderSelector
  const [minimumApprovalRatePct, setMinimumApprovalRatePct] = useState<number>(
    0
  );
  const [requiredParticipationPct, setRequiredParticipationPct] = useState<
    number
  >(0);
  useEffect(() => {
    setMinimumApprovalRatePct(50);
    setRequiredParticipationPct(50);
  }, []);

  return (
    <div className={classes.editProposal}>
      <Title text="New proposal" />
      <div className={classes.editProposal__type}>
        <SubTitle text="Type" textWidth={80} />
        <ProposalTypeSelector
          selectedProposalType={selectedProposalType}
          setProposalType={setProposalType}
        />
      </div>
      <div className={classes.editProposal__details}>
        <SubTitle text="Details" textWidth={105} />
        <OptionInputList
          question={question}
          setQuestion={setQuestion}
          inputs={inputs}
          changeInput={changeInput}
          removeInput={removeInput}
        />
        <div className={classes.editProposal__details_button}>
          {/* TODO: Big Button Style */}
          <Button
            text="Add another option"
            style={{ width: 222, fontSize: "1.6rem", padding: "15px 0px" }}
            onClick={addInput}
          />
        </div>
      </div>
      <div className={classes.editProposal__description}>
        <SubTitle text="Description" textWidth={160} />
        <Editor />
      </div>
      <div className={classes.editProposal__meta}>
        <SliderSelector
          pct={minimumApprovalRatePct}
          setPct={setMinimumApprovalRatePct}
          sliderType={SliderType.MINIMUM_APPROVAL_RATE}
        />
        {selectedProposalType === ProposalType.REPRESENTATIVE && (
          <SliderSelector
            pct={requiredParticipationPct}
            setPct={setRequiredParticipationPct}
            sliderType={SliderType.REQUIRED_PARTICIPATION}
          />
        )}
        <DurationInput selectedProposalType={selectedProposalType} />
      </div>
      <div className={classes.editProposal__submit}>
        <Button
          text="Submit proposal"
          style={{ width: 222, fontSize: "1.6rem", padding: "15px 0px" }}
        />
      </div>
    </div>
  );
};

export default EditProposalPage;
