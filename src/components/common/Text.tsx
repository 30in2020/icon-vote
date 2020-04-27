import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

interface Props {
  text: string;
  fontSize: number;
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    backgroundColor: "green",
    lineHeight: 0,
  },
  text: {
    backgroundColor: "red",
    lineHeight: "65px",
    fontSize: (props: Props) => `${props.fontSize}rem`,
    verticalAlign: "top",
  },
}));

const Text: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { text } = props;

  return (
    <p className={classes.wrap}>
      <span className={classes.text}>{text}</span>
    </p>
  );
};

export default Text;
