import Config from "../../constants/config";
import Cookie from "js-cookie";
import "whatwg-fetch";

async function _getCSRFToken() {
  const csrfToken = await fetch(Config.CSRF_URL)
    .then((response) => response.json())
    .then((data) => data.csrfToken);
  Cookie.set("csrftoken", csrfToken);
  return csrfToken;
}

async function post(payload: {
  operationName?: string | null;
  operation?: string | null;
  query?: string;
  variables: any;
}) {
  const headers: any = {
    "Content-Type": "application/json",
    Accept: "*/*",
  };
  const csrf = Cookie.get("csrftoken");
  headers["X-CSRFToken"] = csrf || (await _getCSRFToken());

  return fetch(`${Config.GRAPHQL_URL}`, {
    method: "POST",
    headers,
    credentials: "include",

    body: JSON.stringify(payload || {}),
  })
    .then((response) => response.json())
    .catch((e) => {
      console.error(e.message);
      throw e;
    });
}

export default {
  post,
};
