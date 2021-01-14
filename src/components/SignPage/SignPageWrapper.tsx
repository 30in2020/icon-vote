import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { VerifyContent } from "..";
import SignInBg from "../../assets/signin-bg@2x.png";
import SignUpBg from "../../assets/signup-bg@2x.png";
import VerifyBg from "../../assets/verify-bg@2x.png";
import SignFormContentContainer from "./SignFormContentContainer";

export enum SignPageType {
  SIGN_IN,
  SIGN_UP,
  VERIFY,
}

export interface ISignPageAsset {
  title: string;
  button: string;
  bg: string;
  bgSize: string;
}

const SIGN_PAGE_ASSETS = {
  [SignPageType.SIGN_IN]: {
    title: "Sign In",
    button: "Sign In",
    bg: SignInBg,
    bgSize: "517px 452px",
  },
  [SignPageType.SIGN_UP]: {
    title: "Sign Up",
    button: "Register",
    bg: SignUpBg,
    bgSize: "514px 434px",
  },
  [SignPageType.VERIFY]: {
    title: "Verify address",
    button: "Verify",
    bg: VerifyBg,
    bgSize: "398px 503px",
  },
};

interface Props {
  signPageType: SignPageType;
}

const SignPageWrapper: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { signPageType } = props;

  return (
    <div className="container">
      <div className={classes.wrap}>
        {signPageType === SignPageType.VERIFY ? (
          <VerifyContent {...props} {...SIGN_PAGE_ASSETS[signPageType]} />
        ) : (
          <SignFormContentContainer
            {...props}
            {...SIGN_PAGE_ASSETS[signPageType]}
          />
        )}
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    height: `calc(100vh - 248px)`,
    width: "100%",
    background: ({ signPageType }: Props) =>
      `url(${SIGN_PAGE_ASSETS[signPageType].bg}) right center no-repeat`,
    backgroundSize: ({ signPageType }: Props) =>
      SIGN_PAGE_ASSETS[signPageType].bgSize,
    display: "flex",
    alignItems: "center",
  },
  [theme["breakpoint-sm"]]: {
    wrap: {
      background: ({ signPageType }: Props) =>
        `url(${SIGN_PAGE_ASSETS[signPageType].bg}) right bottom no-repeat`,
      backgroundSize: "48% auto!important",
      alignItems: "normal",
    },
  },
  [theme["breakpoint-xs"]]: {
    wrap: {
      backgroundSize: "60% auto!important",
    },
  },
}));

export default SignPageWrapper;
