import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

interface Props {
  text: string;
}

const Title: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { text } = props;

  return <h2 className={classes.title}>{text}</h2>;
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  title: {
    color: theme.secondary1,
    fontSize: "3.6rem",
    fontWeight: theme.bold,
    marginRight: 20,
    fontStretch: "condensed",
    [theme["breakpoint-xs"]]: {
      fontSize: "2.8rem",
    },
  },
}));

export default Title;
