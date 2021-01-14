/// <reference types="react-vis-types" />
import React, { useCallback, useContext } from "react";
import { RadialChart } from "react-vis";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import clsx from "clsx";
import { ModalContext } from "../../contexts/ModalContext";
import { VoteListModal } from "../";
import SubTitle from "../common/SubTitle";
import { Vote } from "../../types";

export interface ChartData {
  votedPct: number;
  requiredPct: number;
  votesAmount: string;
  maxVotesAmount: string;
  myVotesAmount: string;
  votes: Vote[];
}

interface Props {
  chartData: ChartData;
}

const Chart: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { chartData } = props;
  const {
    votedPct,
    votesAmount,
    maxVotesAmount,
    requiredPct,
    myVotesAmount,
    votes,
  } = chartData;
  const { handleModal } = useContext(ModalContext);

  const handleOnClick = useCallback(() => {
    if (votes.length > 0) {
      handleModal(<VoteListModal votes={votes} />);
    }
  }, [handleModal, votes]);

  return (
    <>
      <SubTitle style={{ marginBottom: 32 }} text="Voter participation" />
      <div className={classes.wrap}>
        <div className={classes.content}>
          <div className={classes["left-item"]}>
            <div className={classes.chart}>
              <div className={classes.voted}>
                <p className={classes.value}>{votedPct}%</p>
                <p className={classes.label}>Voted</p>
              </div>
              <RadialChart
                data={[{ angle: votedPct }, { angle: 100 - votedPct }]}
                width={100}
                height={100}
                innerRadius={35}
                radius={50}
              />
            </div>
          </div>
          <div className={classes["right-item"]}>
            <div>
              <div className={classes["left-values"]}>
                <div className={classes.valueDiv} onClick={handleOnClick}>
                  <p className={clsx(classes.value, classes.highlight)}>
                    {votes.length}
                  </p>
                  <p className={clsx(classes.label, classes.highlight)}>
                    Voters
                  </p>
                </div>
                <div className={classes.valueDiv}>
                  <p className={classes.value}>{votesAmount}</p>
                  <p className={classes.label}>Votes</p>
                </div>
                <div className={classes.valueDiv}>
                  <p className={classes.value}>{maxVotesAmount}</p>
                  <p className={classes.label}>Max Votes</p>
                </div>
              </div>
              <div className={classes["right-values"]}>
                <div className={classes.valueDiv}>
                  <p className={classes.value}>{myVotesAmount}</p>
                  <p className={classes.label}>Your votes</p>
                </div>
              </div>
            </div>
            <p className={classes.text}>
              {`${requiredPct}% participation required for the vote to be valid`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    position: "relative",

    paddingTop: 5,
    color: theme.secondary1,
    fontWeight: theme.bold,
    lineHeight: "2.2rem",
    textAlign: "center",
    "& > p": {
      textAlign: "left",
      fontSize: "2.4rem",
      marginBottom: 13,
    },
  },
  content: {
    display: "flex",
    [theme["breakpoint-xs"]]: {
      justifyContent: "space-between",
    },
  },
  chart: {
    display: "flex",
    width: 100,
    height: 100,
    marginLeft: -5,
    justifyContent: "center",
    alignItems: "center",
    "& path:nth-child(1)": {
      stroke: `${theme.primary3}!important`,
      fill: `${theme.primary3}!important`,
    },
    "& path:nth-child(2)": {
      stroke: `${theme.primary1}!important`,
      fill: `${theme.primary1}!important`,
    },
  },
  voted: {
    position: "absolute",
  },
  "left-item": {
    marginLeft: 5,
    marginRight: 25,
  },
  "right-item": {
    width: "100%",
    display: "flex",
    flexDirection: "column",

    [theme["breakpoint-sm-only"]]: {
      width: 450,
    },

    "& > div": {
      display: "flex",
      marginTop: 10,
      marginBottom: 10,
      [theme["breakpoint-xs"]]: {
        flexDirection: "column",
      },
    },
  },
  "left-values": {
    width: "61%",
    paddingRight: "8%",
    display: "flex",
    justifyContent: "space-between",
    borderRight: `1px solid ${theme.dim}`,
    [theme["breakpoint-xs"]]: {
      width: "100%",
      borderRight: "none",
      borderBottom: `1px solid ${theme.dim}`,
      marginBottom: 6,
      flexDirection: "column",
      textAlign: "right",
      paddingRight: 0,
    },
  },
  "right-values": {
    width: "31%",
    [theme["breakpoint-xs"]]: {
      width: "100%",
    },
  },
  valueDiv: {
    marginTop: -4,
    [theme["breakpoint-xs"]]: {
      display: "flex",
      width: "100%",
      flexDirection: "row-reverse",
      justifyContent: "space-between",
      marginBottom: 4,
    },
  },
  value: {
    fontSize: "1.8rem",
    paddingTop: "0.7rem",
    lineHeight: "1.7rem",
    [theme["breakpoint-xs"]]: {
      fontSize: "1.4rem",
      paddingTop: "0.2rem",
    },
  },
  label: {
    fontSize: "1.6rem",
    fontWeight: theme.semiBold,
    [theme["breakpoint-xs"]]: {
      fontSize: "1.4rem",
    },
  },
  text: {
    fontSize: "1.4rem",
    color: theme.secondary2,
    textAlign: "left",
    fontWeight: theme.medium,
  },
  highlight: {
    cursor: "pointer",
    color: theme.primary2,
  },
}));

export default Chart;
