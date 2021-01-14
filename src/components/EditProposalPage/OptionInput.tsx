import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { Input } from "../";
import DeleteIcon from "../../assets/delete@2x.png";

interface Props {
  idx: number;
  input: string;
  changeInput: (idx: number, value: string) => void;
  removeInput: (idx: number) => void;
}

const OptionInput: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { idx, input, changeInput, removeInput } = props;

  return (
    <div className={classes.item}>
      <Input
        label={`Option ${idx + 1}`}
        value={input}
        onChange={(e) => changeInput(idx, (e.target as HTMLInputElement).value)}
      />
      <span onClick={(e) => removeInput(idx)} className={classes.delete}>
        Delete option
      </span>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  item: {
    position: "relative",
  },
  delete: {
    cursor: "pointer",
    position: "absolute",
    bottom: 33,
    right: 14,
    opacity: 0,
    color: theme.fail,
    fontWeight: theme.semiBold,
    background: `url(${DeleteIcon}) right center no-repeat`,
    backgroundSize: "22px 22px",
    paddingRight: 34,
    "&:hover": {
      opacity: 1,
    },
    [theme["breakpoint-sm"]]: {
      opacity: 1,
      textIndent: "300%",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  },
}));

export default OptionInput;
