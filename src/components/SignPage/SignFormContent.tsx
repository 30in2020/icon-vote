import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { Title, Button, Input, PasswordInput, ISignPageAsset } from "..";
import ErrorMessage from "../common/ErrorMessage";

interface Props extends ISignPageAsset {
  loading: boolean;
  handleSubmit: () => void;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string;
}

const SignFormContent: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const {
    title,
    button,
    loading,
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit,
  } = props;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!loading && e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className={classes.content}>
      <Title text={title} />
      <div className={classes.inputs}>
        <Input
          label="Username"
          value={username}
          onChange={(e) => {
            if (!e.currentTarget.value.includes(" ")) {
              setUsername((e.target as HTMLInputElement).value);
            }
          }}
          onKeyPress={handleKeyPress}
        />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          onKeyPress={handleKeyPress}
        />
        <ErrorMessage text={error} />
      </div>
      <Button
        text={button}
        loading={loading}
        onClick={() => {
          !loading && handleSubmit();
        }}
      />
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  content: {
    position: "relative",
    width: "38%",
    paddingBottom: 50,
    [theme["breakpoint-sm"]]: {
      width: "60%",
    },
    [theme["breakpoint-xs"]]: {
      width: "100%",
    },
  },
  inputs: {
    paddingTop: 35,
    marginBottom: 10,
  },
}));

export default SignFormContent;
