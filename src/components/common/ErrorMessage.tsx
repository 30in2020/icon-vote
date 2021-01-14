import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

interface Props {
  text: string;
}

const ErrorMessage: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { text } = props;

  return <p className={classes.wrap}>{text}</p>;
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    color: theme.fail,
    fontWeight: theme.semiBold,
    marginBottom: 20,
  },
}));

export default ErrorMessage;
