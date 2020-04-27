import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { ProposalType } from "../../types";

interface Props {
  proposalType: ProposalType;
  endsAt: number;
  style?: React.CSSProperties;
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  meta: {
    marginBottom: "auto",
    fontSize: "1.4rem",
    paddingTop: 26,
    color: theme.secondary2,
  },
}));

const ProposalMetaData: React.SFC<Props> = (props) => {
  const classes = useStyles(props);

  // TODO: implement endsAt -> closed, voted
  const { style, proposalType, endsAt } = props;

  const proposalTypeText =
    proposalType === ProposalType.REPRESENTATIVE
      ? "Representative"
      : "Community";

  return (
    <p style={style} className={classes.meta}>
      {`${proposalTypeText} vote`}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;3 weeks
      left
    </p>
  );
};

export default ProposalMetaData;
