import React from "react";
import clsx from "clsx";
import { createUseStyles, useTheme } from "react-jss";
import { Link } from "react-router-dom";
import { ThemeType } from "../styles/theme";
import { Button, ButtonType, MobileMenu, Dropdown, DropdownType } from "./";
import { IUserState } from "../contexts/UserContext";

import Logo from "../assets/logo-all@2x.png";

interface Props {
  user: IUserState;
  goTo: (url: string) => void;
  menuList: {
    icon: string;
    iconHover: string;
    iconSize: string;
    text: string;
    onClick: () => void;
  }[];
}

const Header: React.SFC<Props> = (props) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  let {
    user: { username, address, isPRep },
    goTo,
    menuList,
  } = props;
  const isLoggedIn = !!username;

  return (
    <header className={clsx(classes.wrap, "container")}>
      <Link to="/">
        <img className={classes.logo} src={Logo} alt="ICON VOTE" />
      </Link>
      <div className={classes["right-items"]}>
        <Button
          onClick={() => goTo("/about")}
          text="About"
          buttonType={ButtonType.FLAT}
        />
        {!isLoggedIn && (
          <Button
            onClick={() => goTo("/signup")}
            text="Register"
            buttonType={ButtonType.FLAT}
          />
        )}
        {isPRep && (
          <Button
            onClick={() => goTo("/proposal/edit")}
            text="New Proposal"
            buttonType={ButtonType.FLAT}
          />
        )}
        {isLoggedIn ? (
          <div className={classes.profile}>
            <div className={classes.profileText}>
              <p className={classes.username}>{username}</p>
              {isPRep && <p className={classes.pRepLabel}>P-Rep</p>}
            </div>
            <Dropdown
              style={{
                marginTop: 20,
                marginLeft: 30,
              }}
              menuList={menuList}
              dropdownType={DropdownType.MENU}
            />
          </div>
        ) : (
          <Button text="Sign in" onClick={() => goTo("/signin")} />
        )}
      </div>
      <MobileMenu
        isLoggedIn={isLoggedIn}
        isPRep={isPRep}
        isVerified={!!address}
      />
    </header>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 56,
    marginBottom: 54,
  },
  "right-items": {
    display: "flex",
    "& > div": {
      marginRight: 26,
      "&:last-of-type": {
        marginRight: 0,
      },
    },
    [theme["breakpoint-sm"]]: {
      display: "none",
    },
  },
  logo: {
    width: 230,
    cursor: "pointer",
    [theme["breakpoint-xs"]]: {
      width: 150,
    },
  },
  profile: {
    marginTop: -8,
    display: "flex",
  },
  profileText: {
    textAlign: "right",
    marginRight: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  username: {
    fontWeight: theme.bold,
    color: theme.secondary1,
  },
  pRepLabel: {
    fontWeight: theme.semiBold,
    color: theme.secondary2,
    fontSize: "1.4rem",
  },
}));

export default Header;
