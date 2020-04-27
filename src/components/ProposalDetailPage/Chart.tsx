/// <reference types="react-vis-types" />
import React from "react";
import { RadialChart } from "react-vis";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../../styles/theme";
import clsx from "clsx";

interface Props {
  votedPct: number;
  requiredPct: number;
  voterCnt: number;
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    position: "relative",
    height: 200,
    borderLeft: `1px solid ${theme.dim}`,
    paddingLeft: 30,
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
  },
  chart: {
    display: "flex",
    width: 180,
    height: 180,
    marginLeft: -5,
    justifyContent: "center",
    alignItems: "center",
    "& path:nth-child(1)": {
      stroke: `${theme.primary2}!important`,
      fill: `${theme.primary2}!important`,
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
    marginRight: 15,
  },
  "right-item": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  value: {
    fontSize: "2.4rem",
    "&.highlight": {
      color: theme.primary2,
    },
  },
  label: {
    fontSize: "1.8rem",
  },
}));

const Chart: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { votedPct, requiredPct, voterCnt } = props;

  return (
    <div className={classes.wrap}>
      <p>Voter participation</p>
      <div className={classes.content}>
        <div className={classes["left-item"]}>
          <div className={classes.chart}>
            <div className={classes.voted}>
              <p className={classes.value}>{votedPct}%</p>
              <p className={classes.label}>voted</p>
            </div>
            <RadialChart
              data={[{ angle: votedPct }, { angle: 100 - votedPct }]}
              width={180}
              height={180}
              innerRadius={55}
              radius={80}
            />
          </div>
        </div>
        <div className={classes["right-item"]}>
          <div>
            <p className={classes.value}>{requiredPct}%</p>
            <p className={classes.label}>required</p>
          </div>
          <div>
            <p className={clsx(classes.value, "highlight")}>{voterCnt}</p>
            <p className={classes.label}>voters</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
