import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import logo from "../assets/logo-all@2x.png";
import { ThemeType } from "../styles/theme";
import { Button, ButtonType } from "./";

interface Props {}

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
    padding: "30px 0",
    fontWeight: theme.bold,
    color: theme.secondary1,
  },
  "right-items": {},
}));

//TODO: Social ICON

const Footer: React.SFC<Props> = (props) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });

  return (
    <div className={classes.wrap}>
      <div>
        <p>Copyright © ICON Vote 2020</p>
      </div>
      <div className={classes["right-items"]}></div>
    </div>
  );
};

export default Footer;
