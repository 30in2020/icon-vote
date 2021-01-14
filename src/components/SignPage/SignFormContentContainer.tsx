import React, { useCallback, useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { SignPageType, ISignPageAsset } from "./SignPageWrapper";
import { SignFormContent } from "../";
import Mutation from "../../apis/mutation";
import { UserContext } from "../../contexts/UserContext";

interface Props extends ISignPageAsset {
  signPageType: SignPageType;
}

const SignFormContentContainer: React.SFC<Props> = (props) => {
  const { signPageType } = props;
  const history = useHistory();
  const location = useLocation();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setUsername("");
    setPassword("");
    setError("");
  }, [location]);

  const handleSubmit = useCallback(
    (
      api: (params: { username: string; password: string }) => Promise<void>,
      goTo: string
    ) => {
      if (!username) {
        setError("Username is required.");
        return;
      }

      if (!password) {
        setError("Password is required.");
        return;
      }

      if (password.length <= 6 && signPageType === SignPageType.SIGN_UP) {
        setError("Password should be more than 6 characters.");
        return;
      }

      setLoading(true);
      setError("");
      api({
        username,
        password,
      })
        .then(() => {
          setLoading(false);
          userContext.setUser({ username });
          history.push(goTo);
        })
        .catch((e) => {
          setLoading(false);
          setError(e.message);
          console.error(e);
        });
    },
    [history, password, signPageType, userContext, username]
  );

  return (
    <SignFormContent
      {...props}
      loading={loading}
      handleSubmit={() =>
        signPageType === SignPageType.SIGN_IN
          ? handleSubmit(Mutation.setAuth, "/")
          : handleSubmit(Mutation.setUser, "/verify")
      }
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      error={error}
    />
  );
};

export default SignFormContentContainer;
