const _SERVER = process.env.REACT_APP_WAS_URL;
const GRAPHQL_URL = `https://${_SERVER}/graphql/`;
const CSRF_URL = `https://${_SERVER}/csrf/`;
const NODE_URL = "https://ctz.solidwallet.io/";
const TRACKER_URL = "https://tracker.icon.foundation/";
const CONTRACT_ADDRESS = process.env.REACT_APP_SCORE;

export default {
  GRAPHQL_URL,
  CSRF_URL,
  NODE_URL,
  TRACKER_URL,
  CONTRACT_ADDRESS,
};
