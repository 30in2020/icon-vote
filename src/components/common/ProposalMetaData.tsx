import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { ProposalType, ProposalStatusType } from "../../types";
import { convertTimestampToString } from "../../utils";

interface Props {
  status: ProposalStatusType;
  proposalType: ProposalType;
  endsAt: number;
  style?: React.CSSProperties;
  pRepName?: string;
}

const ProposalMetaData: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { status, style, proposalType, pRepName, endsAt } = props;

  const getStatusText = () => {
    if (status === ProposalStatusType.VOTING) {
      return convertTimestampToString(endsAt);
    }
    return status;
  };

  const getString = () =>
    `${
      pRepName ? `${pRepName}\u00A0\u00A0\u00A0|\u00A0\u00A0\u00A0` : ""
    }${proposalType}\u00A0\u00A0\u00A0|\u00A0\u00A0\u00A0`;

  return (
    <p style={style} className={classes.meta}>
      {getString()}
      <span>{getStatusText()}</span>
    </p>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  meta: {
    marginBottom: "auto",
    fontSize: "1.4rem",
    paddingTop: 26,
    color: theme.secondary1,
    fontWeight: theme.semiBold,
    "& span": {
      color: (props: Props) => {
        switch (props.status) {
          case ProposalStatusType.APPROVED:
            return theme.primary1;
          case ProposalStatusType.REJECTED:
          case ProposalStatusType.CANCELLED:
            return theme.fail;
          case ProposalStatusType.VOTING:
          default:
            return "inherit";
        }
      },
    },
  },
  [theme["breakpoint-xs"]]: {
    meta: {
      fontSize: "1.2rem!important",
    },
  },
}));

export default ProposalMetaData;
