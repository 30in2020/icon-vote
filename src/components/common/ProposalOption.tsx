import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import Radio from "./Radio";
import { ProposalOptionModel } from "../../types";
import { ProposalOptionListType } from "./ProposalOptionList";

export interface ProposalOptionProps {
  option: ProposalOptionModel;
  proposalOptionListType: ProposalOptionListType;
  isSelected?: boolean;
  onClick?: () => void;
}

const ProposalOption: React.SFC<ProposalOptionProps> = (props) => {
  const {
    option,
    proposalOptionListType = false,
    isSelected = false,
    onClick = () => {},
  } = props;
  const isSelectable =
    proposalOptionListType === ProposalOptionListType.SELECTABLE;
  const isVoted = proposalOptionListType === ProposalOptionListType.VOTED;
  const isUnselectable =
    proposalOptionListType === ProposalOptionListType.UNSELECTABLE;
  const classes = useOptionStyles({
    ...props,
    isSelectable,
    isUnselectable,
  });
  return (
    <div onClick={isSelectable ? onClick : () => {}} className={classes.option}>
      <div className={classes.option__radio}>
        {(isSelectable || (isVoted && isSelected)) && (
          <Radio isSelected={isSelected} />
        )}
      </div>

      <div className={classes.option__content}>
        <div className={classes.option__bar}></div>
        <p className={classes.option__name}>{option.name}</p>
        <p className={classes.option__percent}>{option.percent}%</p>
      </div>
    </div>
  );
};

interface StyleProps extends ProposalOptionProps {
  isSelectable: boolean;
  isUnselectable: boolean;
}

const useOptionStyles = createUseStyles((theme: ThemeType) => ({
  option: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 34,
    cursor: (props: StyleProps) => (props.isSelectable ? "pointer" : "inherit"),
    marginBottom: (props: StyleProps) => (props.isUnselectable ? 12 : 8),
    "&:last-of-type": {
      marginBottom: 0,
    },
    "&:hover > div": {
      opacity: (props: StyleProps) => (props.isSelectable ? 0.7 : 1),
    },
  },
  option__radio: {
    width: (props: StyleProps) => (props.isUnselectable ? 0 : 23.27),
    marginRight: (props: StyleProps) => (props.isUnselectable ? 0 : "3%"),
    height: 23.27,
    marginTop: -2,
  },
  option__content: {
    width: (props: StyleProps) => (props.isUnselectable ? "100%" : "92%"),
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.6rem",
  },
  option__bar: {
    position: "absolute",
    width: (props: StyleProps) => `${props.option.percent}%`,
    background: theme.primary3,
    borderRadius: 10,
    height: 34,
    zIndex: -1,
  },
  option__name: {
    color: theme.secondary1,
    paddingLeft: "12px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "85%",
    fontWeight: theme.semiBold,
  },
  option__percent: {
    fontWeight: theme.bold,
    color: theme.secondary1,
  },
}));

export default ProposalOption;
