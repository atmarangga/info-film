import { createSelector } from "reselect";
import defaultState from "../state/default";

const selectLoginData = (state?:any) =>
  state.get("loginData", defaultState.loginSession);

const selectData = (state?:any) => state.get("data", defaultState.data);
const makeSelectUsername = createSelector(selectData, (data) =>
  data.get("username")
);
const makeSelectPassword = createSelector(selectLoginData, (data) =>
  data.get("password")
);

const makeSelectData = createSelector(selectData, appData => appData);

export { makeSelectPassword, makeSelectUsername, makeSelectData };
