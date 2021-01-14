import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { Vote } from "../../types";
import Config from "../../constants/config";
import { add0xPrefix, truncateHash } from "../../utils";

interface Props {
  votes: Vote[];
}

const VoteListModal: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { votes } = props;

  return (
    <div className={classes.wrap}>
      <header>
        <h3>Votes</h3>
      </header>
      <div className={classes.content}>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.thead__tr}>
              <th className={classes.thead__th}>Voter</th>
              <th className={classes.thead__th}>Vote transaction</th>
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {votes.map((vote: Vote) => {
              return (
                <tr key={vote.voteTx} className={classes.tbody__tr}>
                  <td className={classes.tbody__td}>{vote.voter}</td>
                  <td className={classes.tbody__td}>
                    {/* 0xbf68f0cbacb2...23asbf68f0cb */}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`${Config.TRACKER_URL}transaction/${add0xPrefix(
                        vote.voteTx
                      )}`}
                    >
                      {truncateHash(add0xPrefix(vote.voteTx))}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    width: 804,
    [theme["breakpoint-md"]]: {
      width: "100%",
    },
    "& h3": {
      fontSize: "2.6rem!important",
    },
  },
  content: {},
  table: {
    display: "block",
    textAlign: "left",
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    display: "block",
  },
  thead__tr: {
    fontWeight: theme.bold,
    fontSize: "2.4rem",
    color: theme.secondary1,
    borderBottom: `1px solid ${theme.dim}`,
    width: "100%",
    display: "flex",
  },
  thead__th: {
    paddingBottom: 16,
    "&:nth-of-type(1)": {
      width: "62%",
    },
    "&:nth-of-type(2)": {
      width: "38%",
    },
    [theme["breakpoint-md"]]: {
      fontSize: "1.8rem",
    },
    [theme["breakpoint-sm"]]: {
      fontSize: "1.6rem",
    },
  },
  tbody: {
    display: "block",
    height: 237,
    overflowY: "auto",
    overflowX: "hidden",
    paddingTop: 25,
  },
  tbody__tr: {
    height: 36,
    width: "100%",
    display: "flex",
  },
  tbody__td: {
    color: theme.primary1,
    fontSize: "1.8rem",
    fontWeight: theme.semiBold,
    letterSpacing: "-0.01rem",
    "&:nth-of-type(1)": {
      width: "62%",
    },
    "&:nth-of-type(2)": {
      width: "38%",
    },
    [theme["breakpoint-md"]]: {
      fontSize: "1.4rem",
    },
    [theme["breakpoint-sm"]]: {
      fontSize: "1.2rem",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
}));

export default VoteListModal;
