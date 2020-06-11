import { takeLatest, put, call, select } from "redux-saga/effects";
import {
  LOGIN_ACTION,
  CLEAR_DATA,
  AUTHENTICATE,
  START_REQUEST,
  END_REQUEST,
} from "../actionTypes";
import { LOGIN_REQUEST } from "../../helpers/request";
import { LOGIN_URL } from "../../helpers/url";
import { makeSelectUsername, makeSelectPassword } from "../selector";

export function* clearDataLogin() {
  yield put({ type: CLEAR_DATA });
}

export function* prepareLogin() {
  yield put({ type: START_REQUEST, request: LOGIN_REQUEST });

  try {
    const inputUsername = yield select(makeSelectUsername);
    const inputPassword = yield select(makeSelectPassword);
    console.log('inputUsername : ', inputUsername);
    console.log('inputPassword : ', inputPassword);
    const loginResponse = yield call(fetch, LOGIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Authorization": "Basic " + btoa(inputUsername+":"+inputPassword),
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
      }
    });
    
    const dataHere = yield loginResponse.json();
    console.log('responseJson ? ', dataHere);
  } catch (e) {
    console.log("Error : ", e);
  }
}
export default function* defaultSaga() {
  return [yield takeLatest(LOGIN_ACTION, prepareLogin)];
}
