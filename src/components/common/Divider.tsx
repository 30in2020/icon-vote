import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

interface Props {
  width: string;
  components: React.ReactNode[];
}

const Divider: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { components } = props;

  return (
    <div className={classes.wrap}>
      {components[0]}
      <div className={classes.divider}>
        <span>or</span>
      </div>
      {components[1]}
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    display: "flex",
    justifyContent: "space-between",
    width: (props: Props) => props.width,
    margin: "0 auto",
    [theme["breakpoint-sm"]]: {
      width: "100%!important",
    },
    [theme["breakpoint-xs"]]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  divider: {
    display: "flex",
    alignItems: "center",
    height: "auto",
    width: 1,
    borderLeft: `1px solid ${theme.dim}`,
    "& span": {
      fontWeight: theme.bold,
      fontSize: "1.8rem",
      marginLeft: "-0.9rem",
      color: theme.secondary1,
      background: theme.mono1,
      padding: "10px 0px",
    },
    [theme["breakpoint-xs"]]: {
      width: "100%",
      borderLeft: "none",
      borderBottom: `1px solid ${theme.dim}`,
      flexDirection: "column",
      alignItems: "center",
      margin: "35px 0 40px",
      "& span": {
        width: 30,
        textAlign: "center",
        marginLeft: 0,
        marginBottom: "-2.4rem",
      },
    },
  },
}));

export default Divider;
