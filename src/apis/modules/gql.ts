const SET_PROPOSAL = `
  mutation SetProposal(
    $proposalId: Int
    $isPublicVote: Boolean!
    $subject: String!
    $contents: String!
    $published: Boolean!
    $electoralTh: Int!
    $winningTh: Int!
    $expireAt: DateTime!
    $selectItemList: [SelectItemInput]
  ) {
    setProposal(
      proposalId: $proposalId
      isPublicVote: $isPublicVote
      subject: $subject
      contents: $contents
      published: $published
      electoralTh: $electoralTh
      winningTh: $winningTh
      expireAt: $expireAt
      selectItemList: $selectItemList
    ) {
      proposal {
        id
        selectitemmodelSet {
          id
        }
      }
    }
  }
`;

const SET_PUBLISH = `
mutation PublishProposal($proposalId: Int!) {
  publishProposal(proposalId: $proposalId) {
    tx
  }
}
`;

const SET_VOTE = `
mutation VoteProposal(
  $proposer: String!
  $proposalId: Int!
  $selectItemIndex: Int!
) {
  voteProposal(
    proposer: $proposer
    proposalId: $proposalId
    selectItemIndex: $selectItemIndex
  ) {
    tx
  }
}
`;

const TOKEN_AUTH = `mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
    refreshToken
  }
}
`;

const SET_USER = `
mutation SetUser($username: String!, $password: String!) {
  setUser(username: $username, password: $password) {
    user {
      username
      email
    }
  }
}
`;

const LOG_OUT = `mutation Logout {
  logout {
    noop
    __typename
  }
}`;

const SET_PREP = `
mutation SetPRep($iconAddress: String!) {
  setPrep(iconAddress: $iconAddress) {
    prep {
      id
      username
      iconAddress
      isPrep
    }
  }
}
`;

const ADD_ICON_ADDRESS = `
mutation AddIconAddress($IconAddress: String!) {
  addIconAddress(iconAddress: $IconAddress) {
    user {
      username
      iconAddress
    }
  }
}
`;

const REFRESH_TOKEN = `
mutation RefreshToken($token: String!) {
  refreshToken(token: $token) {
    token
  }
}
`;

const GET_VIEWER = `
 {
  me {
    username
  }
}
`;

export default {
  SET_PROPOSAL,
  SET_PUBLISH,
  SET_VOTE,
  TOKEN_AUTH,
  SET_USER,
  LOG_OUT,
  SET_PREP,
  ADD_ICON_ADDRESS,
  REFRESH_TOKEN,
  GET_VIEWER,
};
