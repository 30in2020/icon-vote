import Gql from "./modules/gql";
import Server from "./modules/server";

const _handleError = (response: any) => {
  throw new Error(!!response.errors ? response.errors[0].message : "");
};

const setAuth = async (variables: { username: string; password: string }) => {
  try {
    return await Server.post({
      operation: "TokenAuth",
      query: Gql.TOKEN_AUTH,
      variables,
    }).then((response) => {
      if (response.data.tokenAuth) {
        const { token, refreshToken } = response.data.tokenAuth;
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("refreshToken", refreshToken);
        return;
      }

      _handleError(response);
    });
  } catch (e) {
    switch (e.message) {
      case "Please, enter valid credentials": {
        throw new Error("Incorrect ID or Password.");
      }
      default:
        throw new Error("Login failed.");
    }
  }
};

const setUser = async (variables: { username: string; password: string }) => {
  try {
    const response = await Server.post({
      operation: "SetUser",
      query: Gql.SET_USER,
      variables,
    });

    if (response.data.setUser) {
      await setAuth(variables);
      return;
    }

    _handleError(response);
  } catch (e) {
    switch (e.message) {
      case "UNIQUE constraint failed: account_user.username": {
        throw new Error("ID already exists.");
      }
      default:
        throw new Error("Sign up failed.");
    }
  }
};

const setProposal = async (variables: {
  proposalId: number;
  isPublicVote: boolean;
  subject: string;
  contents: string;
  published: boolean;
  electoralTh: number;
  winningTh: number;
  expireAt: string;
  selectItemList: {
    index: number;
    contents: string;
  }[];
}) => {
  try {
    const response = await Server.post({
      operation: "SetProposal",
      query: Gql.SET_PROPOSAL,
      variables,
    });

    if (response.data.setProposal) {
      return response.data.setProposal.proposal.id;
    }

    _handleError(response);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const setPublish = async (variables: { proposalId: number }) => {
  try {
    return await Server.post({
      operation: "Publish",
      query: Gql.SET_PUBLISH,
      variables,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const setVote = async (variables: {
  proposer: string;
  proposalId: number;
  selectItemIndex: number;
}) => {
  try {
    const response = await Server.post({
      operation: "VoteProposal",
      query: Gql.SET_VOTE,
      variables,
    });
    if (!!response.errors) {
      _handleError(response);
    } else {
      return true;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const refreshToken = async (variables: { token: string }) => {
  return await Server.post({
    operation: "RefreshToken",
    query: Gql.REFRESH_TOKEN,
    variables,
  });
};

const logOut = async () => {
  try {
    return await Server.post({
      operationName: "Logout",
      query: Gql.LOG_OUT,
      variables: {},
    }).then(() => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refreshToken");
      window.location.reload();
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const setPRep = async (variables: { iconAddress: string }) => {
  try {
    const response = await Server.post({
      operation: "SetPRep",
      query: Gql.SET_PREP,
      variables,
    });
    if (!!response.data.setPrep) {
      return response.data.setPrep.prep.isPrep;
    }
    _handleError(response);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const addIconAddress = async (variables: { IconAddress: string }) => {
  return await Server.post({
    operation: "AddIconAddress",
    query: Gql.ADD_ICON_ADDRESS,
    variables,
  });
};

export default {
  setProposal,
  setPublish,
  setVote,
  setAuth,
  refreshToken,
  setUser,
  logOut,
  setPRep,
  addIconAddress,
};
