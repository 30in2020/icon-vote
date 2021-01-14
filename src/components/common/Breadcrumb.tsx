import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import ForwardArrow from "../../assets/forward-arrow@2x.png";

interface Props {
  children: React.ReactNodeArray;
}

const Breadcrumb: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { children } = props;

  return (
    <div className={classes.wrap}>
      {children.map((child: any, i: number) =>
        React.cloneElement(child, { key: i, className: classes.link })
      )}
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: (props: Props) => ({}),
  link: (props: Props) => ({
    fontSize: "1.8rem",
    fontWeight: theme.bold,
    color: theme.primary1,
    textDecoration: "none",
    background: `url(${ForwardArrow}) right 5px no-repeat`,
    backgroundSize: "7px 13px",
    padding: {
      right: 25,
    },
    margin: {
      right: 16,
    },
    "&:last-of-type": {
      background: "none",
      color: theme.secondary1,
      padding: {
        right: 0,
      },
      margin: {
        right: 0,
      },
    },
  }),
  [theme["breakpoint-sm"]]: {
    link: {
      fontSize: "1.4rem!important",
      backgroundSize: "5px 9.28px!important",
    },
  },
}));

Breadcrumb.defaultProps = {};

export default Breadcrumb;
