import { takeLatest, put, call } from "redux-saga/effects";
import {
  LOGIN_ACTION,
  CLEAR_DATA,
  AUTHENTICATE,
  START_REQUEST,
  END_REQUEST,
} from "../actionTypes";
import { LOGIN_REQUEST } from "../../helpers/request";
import { LOGIN_URL } from "../../helpers/url";

export function* clearDataLogin() {
  yield put({ type: CLEAR_DATA });
}

export function* prepareLogin() {
  yield put({ type: START_REQUEST, request: LOGIN_REQUEST });

  try {
  } catch (e) {
    console.log("Error : ", e);
  }
  const loginResponse = yield call(fetch, LOGIN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"*"
    },
    body: JSON.stringify({
      username: 'test',
      password: 'test'
    }),
  });
  console.log('loginResponse ? ', loginResponse)

}

export default function* defaultSaga() {
  return [yield takeLatest(LOGIN_ACTION, prepareLogin)];
}
