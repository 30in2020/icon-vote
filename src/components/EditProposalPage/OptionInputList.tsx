import React, { SetStateAction } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import deleteIcon from "../../assets/delete@2x.png";

interface Props {
  question: string;
  setQuestion: (value: string) => void;
  inputs: string[];
  changeInput: (idx: number, value: string) => void;
  removeInput: (idx: number) => void;
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    marginTop: 33,
  },
  item: {
    position: "relative",
  },
  label: {
    display: "block",
    fontWeight: theme.semiBold,
    fontSize: "1.8rem",
    color: theme.secondary1,
    marginBottom: 14,
  },
  input: {
    width: "97.6%",
    padding: "1.2%",
    backgroundColor: theme.secondary3,
    border: `1px solid #d1d1d1`,
    fontFamily: theme.font,
    fontWeight: theme.bold,
    color: theme.secondary1,
    borderRadius: 10,
    marginBottom: 25,
    "&:focus": {
      border: `1px solid ${theme.primary1}`,
    },
    "&:hover": {
      "& + span": {
        opacity: 1,
      },
    },
  },
  delete: {
    cursor: "pointer",
    position: "absolute",
    bottom: 35,
    right: 14,
    opacity: 0,
    color: theme.fail,
    fontWeight: theme.semiBold,
    background: `url(${deleteIcon}) right center no-repeat`,
    backgroundSize: "22px 22px",
    paddingRight: 34,
    "&:hover": {
      opacity: 1,
    },
  },
}));

const OptionInputList: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { question, setQuestion, inputs, changeInput, removeInput } = props;

  return (
    <div className={classes.wrap}>
      <div className={classes.item}>
        <label className={classes.label}>Question</label>
        <input
          className={classes.input}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      {inputs.map((input, i) => {
        return (
          <div key={i} className={classes.item}>
            <label className={classes.label}>Option {i + 1}</label>
            <input
              className={classes.input}
              type="text"
              value={input}
              onChange={(e) => changeInput(i, e.target.value)}
            />
            <span onClick={(e) => removeInput(i)} className={classes.delete}>
              Delete option
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default OptionInputList;
