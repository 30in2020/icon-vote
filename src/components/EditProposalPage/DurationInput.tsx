import React, { SetStateAction } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { SubTitle } from "../";
import { ProposalType } from "../../types";

interface Props {
  selectedProposalType: ProposalType;
  days: string;
  setDays: React.Dispatch<SetStateAction<string>>;
  hours: string;
  setHours: React.Dispatch<SetStateAction<string>>;
  expireAt: number;
}

const DurationInput: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { days, setDays, hours, setHours, expireAt } = props;

  const validateNumber = (
    e: any,
    setState: React.Dispatch<SetStateAction<string>>
  ) => {
    e.preventDefault();
    if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value)) {
      setState(e.target.value);
    }
  };

  return (
    <div className={classes.wrap}>
      <SubTitle text={"Duration"} />
      <div className={classes.content}>
        <div className={classes.inputs}>
          <input
            className={classes.input}
            type="text"
            onChange={(e) => validateNumber(e, setDays)}
            value={days}
          />
          Days
          <input
            className={classes.input}
            type="text"
            onChange={(e) => validateNumber(e, setHours)}
            value={hours}
          />
          Hours
        </div>
        <p className={classes.desc}>
          Voting will end on {new Date(expireAt).toLocaleString("en-US")}
        </p>
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    width: (props: Props) =>
      props.selectedProposalType === ProposalType.FANS ? "100%" : "46%",
    color: theme.secondary1,
    fontWeight: theme.bold,
    fontSize: "1.8rem",
    marginBottom: 50,
    [theme["breakpoint-sm"]]: {
      width: "100%!important",
    },
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
    [theme["breakpoint-xs"]]: {
      fontSize: "1.4rem",
    },
  },
}));

export default DurationInput;
