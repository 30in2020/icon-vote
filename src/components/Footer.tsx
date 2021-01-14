import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../styles/theme";
import TwitterIcon from "../assets/twitter@2x.png";
import TelegramIcon from "../assets/telegram@2x.png";
import clsx from "clsx";

interface Props {}

const Footer: React.SFC<Props> = (props) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });

  const openUrl = (link: string) => {
    window.open(link);
  };

  return (
    <div className={clsx(classes.wrap, "container")}>
      <p className={classes.text}>Copyright © ICON Vote 2020</p>
      <div className={classes.icons}>
        <div
          onClick={() => openUrl("https://twitter.com/ICONvote")}
          className={clsx(classes.icon, classes.twitter)}
        ></div>
        <div
          onClick={() => openUrl("https://t.me/iconvote")}
          className={clsx(classes.icon, classes.telegram)}
        ></div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "30px 0",
    [theme["breakpoint-xs"]]: {
      padding: "40px 0",
    },
  },
  text: {
    marginRight: 25,
    fontWeight: theme.bold,
    color: theme.secondary1,
    [theme["breakpoint-xs"]]: {
      fontSize: "1.4rem",
    },
  },
  icons: {
    display: "flex",
  },
  icon: {
    width: 22,
    height: 20,
    marginRight: 7,
    cursor: "pointer",
  },
  twitter: {
    background: `url(${TwitterIcon}) center center no-repeat`,
    backgroundSize: "20px 18px",
  },
  telegram: {
    background: `url(${TelegramIcon}) center center no-repeat`,
    backgroundSize: "22px 20px",
  },
}));

export default Footer;
