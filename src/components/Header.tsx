import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Link, useHistory } from "react-router-dom";
import logo from "../assets/logo-all@2x.png";
import { ThemeType } from "../styles/theme";
import { Button, ButtonType } from "./";

interface Props {}

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
  },
  logo: {
    width: 230,
    cursor: "pointer",
  },
}));

const Header: React.SFC<Props> = (props) => {
  const theme = useTheme();
  const classes = useStyles({ ...props, theme });
  const history = useHistory();

  const onClick = () => {
    history.push("/proposal/icx-station/edit");
  };

  return (
    <div className={classes.wrap}>
      <Link to="/">
        <img className={classes.logo} src={logo} alt="ICON VOTE" />
      </Link>
      <div className={classes["right-items"]}>
        <Button text="About" buttonType={ButtonType.FLAT} />
        <Button
          onClick={onClick}
          text="New Proposal"
          buttonType={ButtonType.FLAT}
        />
        <Button text="Sign in" />
      </div>
    </div>
  );
};

export default Header;
