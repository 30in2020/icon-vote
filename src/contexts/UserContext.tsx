import React, { useState, useCallback } from "react";

export interface IUserState {
  username: string;
  address: string;
  isPRep: boolean;
}

const defaultState = {
  username: "",
  address: "",
  isPRep: false,
};

const UserContext = React.createContext<any>({});
const { Provider } = UserContext;

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, _setUser] = useState<IUserState>(defaultState);
  const setUser = useCallback(
    (_user: Partial<IUserState>) =>
      _setUser({
        ...user,
        ..._user,
      }),
    [user]
  );
  const resetUser = useCallback(() => setUser(defaultState), [setUser]);
  console.debug(`User: ${JSON.stringify(user)}`);
  return (
    <Provider
      value={{
        user,
        setUser,
        resetUser,
      }}
    >
      {children}
    </Provider>
  );
};

export { UserContext, UserProvider };
