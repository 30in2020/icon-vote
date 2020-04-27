import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import Radio from "./Radio";
import { ProposalOptionModel } from "../../types";

export interface ProposalOptionProps {
  option: ProposalOptionModel;
  isSelectMode?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const useOptionStyles = createUseStyles((theme: ThemeType) => ({
  option: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 34,
    cursor: (props: ProposalOptionProps) =>
      props.isSelectMode ? "pointer" : "inherit",
    marginBottom: (props: ProposalOptionProps) => (props.isSelectMode ? 19 : 8),
    "&:last-of-type": {
      marginBottom: 0,
    },
    "&:hover > div": {
      opacity: (props: ProposalOptionProps) => (props.isSelectMode ? 0.7 : 1),
    },
  },
  option__radio: {
    width: "3%",
    marginRight: "3%",
    marginTop: -2,
  },
  option__content: {
    width: "93%",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: (props: ProposalOptionProps) =>
      props.isSelectMode ? "1.8rem" : "1.6rem",
  },
  option__bar: {
    position: "absolute",
    width: (props: ProposalOptionProps) => `${props.option.percent}%`,
    background: theme.primary3,
    borderRadius: 10,
    height: 34,
    zIndex: 0,
  },
  option__name: {
    color: theme.secondary1,
    zIndex: 1,
    paddingLeft: "12px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "80%",
    fontWeight: theme.semiBold,
  },
  option__percent: {
    fontWeight: theme.bold,
    color: theme.secondary1,
    zIndex: 1,
  },
}));

const ProposalOption: React.SFC<ProposalOptionProps> = (props) => {
  const classes = useOptionStyles(props);
  const {
    option,
    isSelectMode = false,
    isSelected = false,
    onClick = () => {},
  } = props;
  return (
    <div onClick={isSelectMode ? onClick : () => {}} className={classes.option}>
      {isSelectMode && (
        <div className={classes.option__radio}>
          <Radio isSelected={isSelected} />
        </div>
      )}
      <div className={classes.option__content}>
        <div className={classes.option__bar}></div>
        <p className={classes.option__name}>{option.name}</p>
        <p className={classes.option__percent}>{option.percent}%</p>
      </div>
    </div>
  );
};

export default ProposalOption;
