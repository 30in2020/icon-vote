import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeType } from "../../styles/theme";
import useToggleScroll from "../../hooks/useToggleScroll";
import Mutation from "../../apis/mutation";

interface Props {
  isPRep: boolean;
  isVerified: boolean;
  isLoggedIn?: boolean;
}

const MobileMenu: React.SFC<Props> = (props) => {
  const { isLoggedIn, isPRep, isVerified } = props;
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  const [checked, setChecked] = useState<boolean>(false);
  const history = useHistory();

  useToggleScroll(checked);

  const handleOnChange = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  const handleMenuClick = useCallback(
    (url: string) => {
      setChecked(false);
      history.push(url);
    },
    [history]
  );

  return (
    <>
      <input
        className={classes["menu-btn"]}
        type="checkbox"
        id="menu-btn"
        checked={checked}
        onChange={handleOnChange}
      />
      <label className={classes["menu-icon"]} htmlFor="menu-btn">
        <span className="icon"></span>
      </label>
      <div onClick={() => setChecked(false)} className={classes.dim}></div>
      <section className={classes.drawer}>
        <ul>
          <li onClick={() => handleMenuClick("/")}>Home</li>
          <li onClick={() => handleMenuClick("/about")}>About</li>
        </ul>
        <ul>
          {!isLoggedIn && (
            <>
              <li onClick={() => handleMenuClick("/signup")}>Register</li>
              <li onClick={() => handleMenuClick("/signin")}>Sign in</li>
            </>
          )}
          {isPRep && (
            <li onClick={() => handleMenuClick("/proposal/edit")}>
              New Proposal
            </li>
          )}
          {isLoggedIn && (
            <>
              <li onClick={() => handleMenuClick("/profile")}>Profile</li>
              {!isVerified && (
                <li onClick={() => handleMenuClick("/verify")}>Verify</li>
              )}
              <li onClick={async () => await Mutation.logOut()}>Log out</li>
            </>
          )}
        </ul>
      </section>
    </>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  dim: {
    position: "fixed",
    background: "rgba(255, 255, 255, 0.8)",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    zIndex: 99998,
    justifyContent: "center",
    alignItems: "center",
    display: "none",
  },
  "menu-btn": {
    display: "none",
    "&:checked ~ section": {
      left: 400,
      [theme["breakpoint-xs"]]: {
        left: 125,
      },
    },
    "&:checked ~ div": {
      display: "block",
    },
    "&:checked ~ label > .icon": {
      background: "transparent",
    },
    "&:checked ~ label > .icon:before": {
      transform: "rotate(-45deg)",
    },
    "&:checked ~ label > .icon:after": {
      transform: "rotate(45deg)",
    },
    "&:checked ~ label:not(.steps) > .icon:before": {
      top: 0,
    },
    "&:checked ~ label:not(.steps) > .icon:after": {
      top: 0,
    },
  },
  "menu-icon": {
    display: "none",
    cursor: "pointer",
    padding: "18px 20px",
    marginTop: 5,
    marginRight: -20,
    position: "relative",
    userSelect: "none",
    "& .icon": {
      background: theme.secondary1,
      display: "block",
      height: "2px",
      position: "relative",
      transition: " background .2s ease-out",
      width: "18px",
      "&:before": {
        background: theme.secondary1,
        content: "''",
        display: "block",
        height: "100%",
        position: "absolute",
        transition: "all .2s ease-out",
        width: "100%",
        top: 5,
      },
      "&:after": {
        background: theme.secondary1,
        content: "''",
        display: "block",
        height: "100%",
        position: "absolute",
        transition: "all .2s ease-out",
        width: "100%",
        top: -5,
      },
    },
    [theme["breakpoint-sm"]]: {
      display: "inline-block",
    },
    zIndex: 99999,
  },
  drawer: {
    display: "none",
    [theme["breakpoint-sm"]]: {
      display: "block",
      background: theme.mono1,
      color: theme.secondary1,
      borderLeft: `1px solid ${theme.dim}`,
      boxShadow: `0px 12px 25px 2px rgba(0,107,131,0.2)`,
      position: "fixed",
      top: 0,
      left: "100vw",
      width: "100%",
      height: "100vh",
      padding: 40,
      transition: "left 200ms cubic-bezier(0.17, 0.04, 0.03, 0.94)",
      overflow: "hidden",
      boxSizing: "border-box",
      zIndex: 99998,
      "& ul": {
        fontSize: "2.4rem",
        color: theme.secondary1,
        fontWeight: theme.bold,
        listStyle: "none",
        padding: 0,
        "&:first-of-type": {
          borderBottom: `1px solid ${theme.dim}`,
          paddingBottom: 22,
        },
        "& li": {
          marginBottom: 5,
          cursor: "pointer",
          "&:hover": {
            color: theme.primary1,
          },
        },
      },
    },
  },
}));

export default MobileMenu;
