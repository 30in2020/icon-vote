import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { Input } from "../";
import EyeIcon from "../../assets/eye@2x.png";

interface Props {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.SFC<Props> = (props) => {
  const { password, setPassword, onKeyPress = () => {} } = props;
  const classes = useStyles(props);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setPasswordShown(!passwordShown)}
        className={classes.toggle}
      >
        {passwordShown ? "Hide" : "Show"}
      </div>
      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        onKeyPress={onKeyPress}
        type={passwordShown ? "text" : "password"}
      />
    </>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  toggle: {
    position: "absolute",
    right: 0,
    paddingRight: 32,
    color: theme.primary1,
    marginTop: -2,
    fontWeight: theme.semiBold,
    background: `url(${EyeIcon}) center right no-repeat`,
    backgroundSize: "24px 18px",
    cursor: "pointer",
  },
}));

export default PasswordInput;
