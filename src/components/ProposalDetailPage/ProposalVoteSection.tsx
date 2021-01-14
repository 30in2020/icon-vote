import React, { SetStateAction, Dispatch } from "react";

import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { Button, SubTitle } from "../";
import { ProposalOptionModel, ProposalStatusType } from "../../types";
import ProposalOptionList, {
  ProposalOptionListType,
} from "../common/ProposalOptionList";

interface Props {
  status: ProposalStatusType;
  options: ProposalOptionModel[];
  minApprovalRate: number;
  selectedOption: number;
  setOption: Dispatch<SetStateAction<number>>;
  setVote: () => Promise<void>;
  loading: boolean;
}

const ProposalVoteSection: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const {
    options,
    status,
    minApprovalRate,
    selectedOption,
    setOption,
    setVote,
    loading,
  } = props;

  const proposalOptionListType = () => {
    switch (status) {
      case ProposalStatusType.VOTING:
        return ProposalOptionListType.SELECTABLE;
      case ProposalStatusType.APPROVED:
        return ProposalOptionListType.VOTED;
      default:
        return ProposalOptionListType.UNSELECTABLE;
    }
  };

  return (
    <>
      <SubTitle style={{ marginBottom: 36 }} text="Proposal" />
      <div className={classes.proposal__vote__options}>
        <ProposalOptionList
          options={options}
          proposalOptionListType={proposalOptionListType()}
          selectedOption={selectedOption}
          setOption={setOption}
        />
      </div>
      <div className={classes.proposal__vote__button}>
        {props.status === ProposalStatusType.VOTING && (
          <div>
            <Button text="Vote" onClick={setVote} loading={loading} />
          </div>
        )}
        <p>An option needs {minApprovalRate}% for it to be approved</p>
      </div>
    </>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  proposal__vote__options: {
    paddingRight: "1%",
  },
  proposal__vote__button: (props: Props) => ({
    display: "flex",
    alignItems: "center",
    paddingTop: "29px",
    marginLeft: "7.2%",
    [theme["breakpoint-xs"]]: {
      flexDirection: "column",
      marginLeft: 0,
    },
    "& > div": {
      paddingRight: 22,
      [theme["breakpoint-xs"]]: {
        paddingRight: 0,
      },
    },
    "& > p": {
      fontWeight: theme.semiBold,
      color: theme.primary1,
      [theme["breakpoint-xs"]]: {
        fontSize: "1.4rem",
        paddingTop: 20,
      },
    },
  }),
}));

export default ProposalVoteSection;
