import { makeReq } from "./http";

export const tokenKey = "legal_citizen_access_token";
export const userKey = "legal_citizen_details";

export const hasLocalStorage = () => window && "localStorage" in window;
export const getLocalStore = key =>
  hasLocalStorage() ? window.localStorage.getItem(key) : false;

export const getUserToken = () => getLocalStore(tokenKey);

export const getUserDetails = () => {
  try {
    return JSON.parse(getLocalStore(userKey));
  } catch (err) {
    return false;
  }
};

export const saveUserToken = token => {
  if (!hasLocalStorage() || typeof token === "undefined") return false;
  window.localStorage.setItem(tokenKey, token);
};

export const saveUserDetails = data => {
  if (!hasLocalStorage() || !data || typeof data !== "object") return false;
  window.localStorage.setItem(userKey, JSON.stringify(data));
};

export const updateUserDetails = data => {
  if (!hasLocalStorage() || !data || typeof data !== "object") return false;
  const userDetails = { ...(getUserDetails() || {}), ...data };
  saveUserDetails(userDetails);
};

export const isSignedIn = () => {
  const userToken = getUserToken();
  const userDetails = getUserDetails();

  return (
    typeof userToken === "string" &&
    userToken &&
    userDetails &&
    typeof userDetails === "object" &&
    Object.keys(userDetails).length > 0
  );
};

export const signOut = () => {
  if (!hasLocalStorage()) return;

  window.localStorage.setItem(tokenKey, "");
  window.localStorage.setItem(userKey, "");

  const loginPath = "/";
  if (window.location.pathname !== loginPath) window.location.href = loginPath;
};

let userID, userType;
const userDetails = getUserDetails();
if (userDetails) {
  userID = userDetails.username || userDetails.email;
  userType = userDetails.user_type;
}

export const mustBeSignedIn = () => {
  if (!isSignedIn() || !userID) signOut();
};

export const isClient = userType === "client";
export const isLawyer = userType === "lawyer";

export const secureRequest = data => {
  let { url, headers } = data;
  const { method = "GET", successCallback } = data;

  const userToken = getUserToken();

  if (/^(GET|HEAD)$/i.test(method)) {
    url +=
      (url.indexOf("?") >= 0 ? "&" : "?") +
      "access_key=" +
      encodeURIComponent(userToken) +
      "&visiting_user=" +
      encodeURIComponent(userID);
    data = { ...data, url };
  } else {
    if (!headers || typeof headers !== "object") headers = {};
    headers = {
      ...headers,
      "X-Access-Key": userToken,
      "X-Visiting-User": userID
    };
    data = { ...data, headers };
  }

  return makeReq({
    ...data,
    successCallback: resp => {
      const { status } = resp;
      let security = {},
        insecure = false;
      if (status === 401) {
        signOut();
        security = { ...security, loggedOut: true };
      }
      if (status === 403) security = { ...security, accessDenied: true };
      if (status === 401 || status === 403) insecure = true;
      successCallback({ ...resp, insecure, security });
    }
  });
};

export { userID, userType };
