import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "./";
import { UserContext } from "../contexts/UserContext";

import ProfileIcon from "../assets/profile-icon@2x.png";
import ProfileIconHover from "../assets/profile-icon--hover@2x.png";
import VerifyIcon from "../assets/check-square-icon@2x.png";
import VerifyIconHover from "../assets/check-square-icon--hover@2x.png";
import LogOutIcon from "../assets/log-out-icon@2x.png";
import LogOutIconHover from "../assets/log-out-icon--hover@2x.png";
import Mutation from "../apis/mutation";

const HeaderContainer: React.SFC = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();

  const goTo = (link: string) => {
    history.push(link);
  };

  const menuList = [
    {
      icon: ProfileIcon,
      iconHover: ProfileIconHover,
      iconSize: "18px 20px",
      text: "Profile",
      onClick: () => goTo("/profile"),
    },
    {
      icon: VerifyIcon,
      iconHover: VerifyIconHover,
      iconSize: "21px 20px",
      text: "Verify",
      onClick: () => goTo("/verify"),
    },
    {
      icon: LogOutIcon,
      iconHover: LogOutIconHover,
      iconSize: "20px 20px",
      text: "Log out",
      onClick: async () => await Mutation.logOut(),
    },
  ];

  if (userContext.user.address) {
    menuList.splice(1, 1);
  }

  return <Header user={userContext.user} goTo={goTo} menuList={menuList} />;
};

export default HeaderContainer;
