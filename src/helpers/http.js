import { apiOrigin } from "../config";

export const makeReq = data => {
  const {
    method = "GET",
    body,
    noContent,
    successCallback,
    jsonError,
    errorCallback,
    requestType = "json",
    responseType,
    sessionCache,
    foreverCache,
    debug
  } = data;

  let { headers, url } = data;

  let reqOptions = {
    method
  };

  if (method !== "GET" && requestType !== "multi") {
    let reqType;
    switch (requestType) {
      case "json":
        reqType = "application/json";
        break;
      default:
        reqType = "application/x-www-form-urlencoded";
    }
    if (!headers) headers = {};
    headers = {
      ...headers,
      ...{ "Content-Type": reqType }
    };
  }

  if (body) reqOptions.body = body;
  if (headers) reqOptions.headers = headers;

  if (apiOrigin && !/^(https?:)?\/\//i.test(url))
    url = apiOrigin + (url.charAt(0) === "/" ? "" : "/") + url;

  const store = (foreverCache ? "local" : "session") + "Storage";

  const saveToStore = data => {
    if (!window || (!foreverCache && !sessionCache) || !(store in window))
      return;
    window[store].setItem(url, JSON.stringify(data));
  };

  const isValidErrorCallback = typeof errorCallback === "function";
  const isValidSuccessCallback = typeof successCallback === "function";

  const fetchNow = ({ json: cacheJson, status: cacheStatus }) =>
    cacheJson && cacheStatus
      ? (() => {
          if (isValidSuccessCallback) successCallback(cacheJson, cacheStatus);
        })()
      : fetch(url, reqOptions)
          .then(res => {
            try {
              const resp = res.clone();

              const { status } = resp;

              resp[responseType === "text" ? "text" : "json"]()
                .then(json => {
                  saveToStore({ json, status });
                  if (isValidSuccessCallback) successCallback(json, status);
                  else if (debug)
                    console.error("Success callback passed was not a function");
                })
                .catch(err => {
                  if (status === 204) {
                    if (typeof noContent === "function") noContent();
                    else reportError(err);
                    return;
                  }
                  if (typeof jsonError === "function") jsonError(status, err);
                  else reportError(err, true);
                  if (!debug) return;
                  console.error("Error", err);
                  console.error("Unusual json error while fetching data", data);
                });
            } catch (err) {
              reportError(err);
            }
          })
          .catch(err => reportError(err));

  var reportError = (err, noTalk) => {
    if (isValidErrorCallback) errorCallback(err);
    if (!noTalk && debug) console.error(err);
  };

  if (!window || (!foreverCache && !sessionCache) || !(store in window))
    return fetchNow({});
  try {
    return fetchNow(JSON.parse(window[store].getItem(url)) || {});
  } catch (err) {
    return fetchNow({});
  }
};

export const tryAgain = () =>
  "Please try again in a few minutes time" +
  (window && window.navigator && window.navigator.onLine === false
    ? ". Making sure you are connected to the internet"
    : "");
