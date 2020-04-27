import React, { useCallback } from "react";
import { createUseStyles } from "react-jss";
import { Link, useHistory } from "react-router-dom";
import { ThemeType } from "../../styles/theme";
import { ProposalModel } from "../../types";
import { ProposalOption, ProposalMetaData } from "../";

interface ProposalCardProps {
  proposal: ProposalModel;
}

const useProposalCardStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    position: "relative",
    width: 320,
    marginBottom: 60,
    padding: theme.gap,
    boxShadow: `0px 17px 19px -5px rgba(0,107,131,0.2)`,
    border: `1px solid ${theme.secondary3}`,
    borderRadius: 10,
    height: "100%",
    cursor: "pointer",
    /* Hover animation */

    "&::after": {
      boxShadow: `0px 20px 20px 5px rgba(0,184,204,0.25)`,
      opacity: 0,
      transition: "opacity 300ms",
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    },
    "&:hover::after": {
      opacity: 1,
    },
  },
  pRepName: {
    fontSize: "1.6rem",
    color: theme.secondary1,
    marginBottom: 8,
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: theme.bold,
    color: theme.secondary1,
    marginBottom: 27,
    lineHeight: "2.5rem",
  },
  options: {
    width: "100%",
    height: 160,
  },
}));

const ProposalCard: React.SFC<ProposalCardProps> = (props) => {
  const history = useHistory();
  const classes = useProposalCardStyles(props);

  // TODO: implement endsAt -> closed, voted
  const {
    pRepName,
    pRepLink,
    title,
    options,
    proposalType,
    endsAt,
    proposalLink,
  } = props.proposal;

  const onClick = useCallback(() => {
    history.push(proposalLink);
  }, [history, proposalLink]);

  return (
    <div onClick={onClick} className={classes.wrap}>
      <p className={classes.pRepName}>
        <Link to={pRepLink}>{pRepName}</Link>
      </p>
      <p className={classes.title}>{title}</p>
      <div className={classes.options}>
        {options.map((option, i) => (
          <ProposalOption key={option.name} option={option} />
        ))}
      </div>
      <ProposalMetaData proposalType={proposalType} endsAt={endsAt} />
    </div>
  );
};

export default ProposalCard;
