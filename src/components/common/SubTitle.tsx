import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

interface Props {
  text: string;
  dropdown?: React.ReactNode;
  style?: React.CSSProperties;
}

const SubTitle: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { text, style, dropdown } = props;

  return (
    <h3 style={style} className={classes.subtitle}>
      <div>
        <span className={classes.title}>{text}</span>
        {dropdown && <span className={classes.dropdown}>{dropdown}</span>}
      </div>
    </h3>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  subtitle: {
    fontSize: "2.4rem",
    fontWeight: theme.bold,
    color: theme.secondary1,
    marginBottom: 30,
    "&:after": {
      height: "10px",
      display: "block",
      marginLeft: theme.gap,
      marginTop: "-28px",
      background: "none",
      "border-bottom": `1px solid ${theme.secondary3}`,
      content: "''",
    },
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
    [theme["breakpoint-xs"]]: {
      fontSize: "2.0rem",
    },
  },
  title: {
    background: theme.mono1,
    paddingRight: 12,
  },
  dropdown: {
    marginTop: 3,
    background: theme.mono1,
    paddingRight: 20,
  },
}));

export default SubTitle;
