export {
  userID,
  userType,
  isLawyer,
  isClient,
  getUserDetails,
  getUserToken,
  saveUserToken,
  saveUserDetails,
  updateUserDetails,
  isSignedIn,
  signOut,
  secureRequest,
  mustBeSignedIn,
  hasLocalStorage,
  getLocalStore
} from "./auth";

export { numberValue } from "./basic";

export { scrollTo, scrollUp, scrollDown, scrollToFormReport } from "./dom";

export {
  countryCode,
  getPhoneNumber,
  telAttrs,
  handleFileChange
} from "./form-input";

export { makeReq, tryAgain } from "./http";

export { titleCase } from "./strings";
