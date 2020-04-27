import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { SubTitle } from "../";
import { ProposalType } from "../../types";

interface Props {
  selectedProposalType: ProposalType;
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    width: (props: Props) =>
      props.selectedProposalType === ProposalType.REPRESENTATIVE
        ? "100%"
        : "46%",
    color: theme.secondary1,
    fontWeight: theme.bold,
    fontSize: "1.8rem",
  },
  content: {
    paddingTop: 30,
    display: "flex",
    flexWrap: "wrap",
  },
  inputs: {
    display: "flex",
    alignItems: "center",
    marginRight: 70,
  },
  input: {
    textAlign: "center",
    width: 30,
    padding: "4.8% 6.0%",
    backgroundColor: theme.secondary3,
    border: `1px solid #d1d1d1`,
    fontFamily: theme.font,
    fontWeight: theme.bold,
    color: theme.secondary1,
    fontSize: "2.0rem",
    borderRadius: 10,
    margin: "0 15px",
    "&:first-of-type": {
      marginLeft: 0,
    },
  },
  desc: {
    fontWeight: theme.semiBold,
    paddingTop: 12,
  },
}));

const DurationInput: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  // TODO: Time Calc
  return (
    <div className={classes.wrap}>
      <SubTitle text={"Duration"} textWidth={120} />
      <div className={classes.content}>
        <div className={classes.inputs}>
          <input className={classes.input} type="number" />
          Days
          <input className={classes.input} type="number" />
          Hours
        </div>
        <p className={classes.desc}>
          Voting will end on Monday, January 27 at 4:20 p.m.
        </p>
      </div>
    </div>
  );
};

export default DurationInput;
