import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

interface Props {
  text: string;
  textWidth?: number;
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  subtitle: {
    fontSize: "2.4rem",
    fontWeight: theme.bold,
    color: theme.secondary1,
    marginBottom: 30,
    "&:after": {
      height: "10px",
      display: "block",
      marginLeft: (props: Props) => props.textWidth || theme.gap,
      marginTop: "-28px",
      background: "none",
      "border-bottom": `1px solid ${theme.secondary3}`,
      content: "''",
    },
  },
}));

const SubTitle: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { text } = props;

  return <h3 className={classes.subtitle}>{text}</h3>;
};

export default SubTitle;
