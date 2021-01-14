import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { Input, OptionInput } from "../";

interface Props {
  question: string;
  setQuestion: (value: string) => void;
  inputs: string[];
  changeInput: (idx: number, value: string) => void;
  removeInput: (idx: number) => void;
}

const OptionInputList: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { question, setQuestion, inputs, changeInput, removeInput } = props;

  return (
    <div className={classes.wrap}>
      <Input
        label="Question"
        value={question}
        onChange={(e) => setQuestion((e.target as HTMLInputElement).value)}
      />
      {inputs.map((input, i) => {
        return (
          <OptionInput
            key={i}
            idx={i}
            input={input}
            changeInput={changeInput}
            removeInput={removeInput}
          />
        );
      })}
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    marginTop: 33,
  },
}));

export default OptionInputList;
