import { createSelector } from "reselect";
import defaultState from "../state/default";

const selectLoginData = (state) =>
  state.get("loginData", defaultState.loginSession);

const selectData = (state) => state.get("data", defaultState.data);
const makeSelectUsername = createSelector(selectLoginData, (loginData) =>
  loginData.get("username")
);
const makeSelectPassword = createSelector(selectLoginData, (loginData) =>
  loginData.get("password")
);

const makeSelectData = createSelector(selectData, appData => appData);

export { makeSelectPassword, makeSelectUsername, makeSelectData };
