import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

type InputType = "text" | "password";

interface Props {
  label: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: InputType;
}

const Input: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const {
    label,
    value,
    onChange,
    type = "text",
    onKeyPress = () => {},
  } = props;

  return (
    <>
      <label className={classes.label}>{label}</label>
      <input
        className={classes.input}
        type={type}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  label: {
    display: "block",
    fontWeight: theme.bold,
    fontSize: "1.8rem",
    color: theme.secondary1,
    marginBottom: 14,
  },
  input: {
    width: "calc(100% - 24px)",
    padding: 12,
    backgroundColor: theme.secondary3,
    border: `1px solid #d1d1d1`,
    fontFamily: theme.font,
    fontWeight: theme.bold,
    color: theme.secondary1,
    borderRadius: 10,
    marginBottom: 25,
    height: 15,
    "&:focus": {
      border: `1px solid ${theme.primary1}`,
    },
    "&:hover": {
      "& + span": {
        opacity: 1,
      },
    },
  },
}));

export default Input;
