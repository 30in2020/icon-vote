import React, { useCallback } from "react";
import { createUseStyles } from "react-jss";
import { Link, useHistory } from "react-router-dom";
import { ThemeType } from "../../styles/theme";
import VotedIcon from "../../assets/voted-icon@2x.png";
import { ProposalCardModel, VoteCardModel } from "../../types";
import { ProposalOptionList, ProposalMetaData, Loader } from "..";
import { ProposalOptionListType } from "./ProposalOptionList";

function isVoteCardModel(
  obj: VoteCardModel | ProposalCardModel
): obj is VoteCardModel {
  return (obj as VoteCardModel).votedOption !== undefined;
}

interface CardProps {
  item: ProposalCardModel | VoteCardModel;
  isLoading?: boolean;
}

const Card: React.SFC<CardProps> = (props) => {
  const history = useHistory();
  const classes = useCardStyles(props);

  const { item, isLoading } = props;
  const onClick = useCallback(() => {
    history.push(item.proposalLink);
  }, [history, item.proposalLink]);

  return (
    <div onClick={onClick} className={classes.wrap}>
      <p className={classes.pRepName}>
        <Link to={item.pRepLink}>{item.proposer}</Link>
      </p>
      <p className={classes.title}>{item.title}</p>
      {isVoteCardModel(item) ? (
        <>
          <div className={classes.votedOption}>
            {item.options[item.votedOption]}
          </div>
          <p>{item.proposalType}</p>
        </>
      ) : (
        <>
          <div className={classes.options}>
            {isLoading ? (
              <Loader height={160} />
            ) : (
              <ProposalOptionList
                options={item.options}
                proposalOptionListType={ProposalOptionListType.UNSELECTABLE}
              />
            )}
          </div>
          <ProposalMetaData
            status={item.status}
            proposalType={item.proposalType}
            endsAt={item.endsAt}
          />
        </>
      )}
    </div>
  );
};

const useCardStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    position: "relative",
    width: 320,
    marginRight: "calc((100% - 960px) / 2)",
    marginBottom: 48,
    padding: theme.gap,
    boxShadow: `0px 8px 20px -2px rgba(0,107,131,0.15)`,
    border: `1px solid ${theme.secondary3}`,
    borderRadius: 10,
    height: "100%",
    cursor: "pointer",

    "&:nth-child(3n)": {
      marginRight: 0,
    },

    "&::after": {
      boxShadow: `0px 13px 20px -2px rgba(0,184,204,0.25)`,
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
  [theme["breakpoint-sm"]]: {
    wrap: {
      width: "100%",
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
    marginBottom: 18,
    lineHeight: "2.5rem",
  },
  options: {
    width: "100%",
    minHeight: 160,
  },
  votedOption: {
    width: "100%",
    background: `url(${VotedIcon}) left center no-repeat`,
    backgroundSize: "23.27px 25px",
    paddingLeft: 35,
    fontWeight: theme.semiBold,
    color: theme.secondary1,
    marginBottom: 18,
    "& + p": {
      color: theme.secondary1,
      fontWeight: theme.semiBold,
      fontSize: "1.4rem",
    },
  },
}));

export default Card;
