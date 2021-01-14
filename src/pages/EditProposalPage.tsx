import React, { SetStateAction } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
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

interface Props {
  selectedProposalType: ProposalType;
  setProposalType: React.Dispatch<SetStateAction<ProposalType>>;
  question: string;
  setQuestion: React.Dispatch<SetStateAction<string>>;
  inputs: string[];
  changeInput: (idx: number, value: string) => void;
  removeInput: (idx: number) => void;
  addInput: () => void;

  setContents: (value: string) => void;
  minimumApprovalRatePct: number;
  setMinimumApprovalRatePct: React.Dispatch<SetStateAction<number>>;
  requiredParticipationPct: number;
  setRequiredParticipationPct: React.Dispatch<SetStateAction<number>>;
  days: string;
  setDays: React.Dispatch<SetStateAction<string>>;
  hours: string;
  setHours: React.Dispatch<SetStateAction<string>>;
  expireAt: number;
  handleSubmit: () => void;
  loading: boolean;
}

const EditProposalPage: React.SFC<Props> = (props) => {
  const classes = useStyles();
  const {
    selectedProposalType,
    setProposalType,
    question,
    setQuestion,
    inputs,
    changeInput,
    removeInput,
    addInput,
    minimumApprovalRatePct,
    setMinimumApprovalRatePct,
    requiredParticipationPct,
    setRequiredParticipationPct,
    setContents,
    days,
    setDays,
    hours,
    setHours,
    expireAt,
    handleSubmit,
    loading,
  } = props;

  return (
    <div className={clsx(classes.editProposal, "container")}>
      <Title text="New proposal" />
      <div className={classes.editProposal__type}>
        <SubTitle text="Audience" />
        <ProposalTypeSelector
          selectedProposalType={selectedProposalType}
          setProposalType={setProposalType}
        />
      </div>
      <div className={classes.editProposal__details}>
        <SubTitle text="Vote" />
        <OptionInputList
          question={question}
          setQuestion={setQuestion}
          inputs={inputs}
          changeInput={changeInput}
          removeInput={removeInput}
        />
        <div className={classes.editProposal__details_button}>
          <Button
            text="Add another option"
            style={{ width: 222, fontSize: "1.6rem", padding: "15px 0px" }}
            onClick={addInput}
          />
        </div>
      </div>
      <div className={classes.editProposal__description}>
        <SubTitle text="Description" />
        <Editor handleChange={setContents} />
      </div>
      <div className={classes.editProposal__meta}>
        <SliderSelector
          pct={minimumApprovalRatePct}
          setPct={setMinimumApprovalRatePct}
          sliderType={SliderType.MINIMUM_APPROVAL_RATE}
        />
        {selectedProposalType === ProposalType.FANS && (
          <SliderSelector
            pct={requiredParticipationPct}
            setPct={setRequiredParticipationPct}
            sliderType={SliderType.REQUIRED_PARTICIPATION}
          />
        )}
        <DurationInput
          selectedProposalType={selectedProposalType}
          days={days}
          setDays={setDays}
          hours={hours}
          setHours={setHours}
          expireAt={expireAt}
        />
        <div className={classes.editProposal__submit}>
          <p className={classes.warn}>
            You cannot edit your proposal after you submit it.
          </p>
          <Button
            loading={loading}
            text="Submit proposal"
            style={{ width: 222, fontSize: "1.6rem", padding: "15px 0px" }}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  editProposal: {
    marginBottom: 180,
  },
  editProposal__type: {
    marginTop: 36,
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
    marginBottom: 20,
    [theme["breakpoint-xs"]]: {
      flexDirection: "column",
    },
  },
  editProposal__submit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
  },
  warn: {
    color: theme.fail,
    fontWeight: theme.semiBold,
    fontSize: "1.8rem",
    marginBottom: 24,
    [theme["breakpoint-xs"]]: {
      fontSize: "1.5rem",
    },
  },
}));

export default EditProposalPage;
