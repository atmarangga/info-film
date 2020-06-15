import { createSelector } from "reselect";
import defaultState from "../state/default";

const selectLoginSession = (state?: any) =>
  state.get("loginSession", defaultState.loginSession);

const selectData = (state?: any) => state.get("data", defaultState.data);
const makeSelectUsername = createSelector(selectData, (data) =>
  data.get("username")
);
const makeSelectPassword = createSelector(selectData, (data) =>
  data.get("password")
);

const makeSelectRequestProcess = createSelector(
  (defaultState) => defaultState,
  (data?: any) => data.get("requestProcess")
);
const makeSelectData = createSelector(selectData, (appData) => appData);
const makeSelectToken = createSelector(selectLoginSession, (loginSessions) =>
  loginSessions.get("token")
);
const makeSelectMovies = createSelector(selectData, (data) =>
  data.get("movies")
);

const makeSelectError = createSelector((defaultState) => defaultState, (data?:any) => data.get("errorData"));

export {
  makeSelectPassword,
  makeSelectUsername,
  makeSelectData,
  makeSelectMovies,
  makeSelectToken,
  makeSelectRequestProcess,
  makeSelectError
};
