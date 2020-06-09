import { takeLatest, put } from "redux-saga/effects";
import { LOGIN_ACTION, CLEAR_DATA } from "../actionTypes";

export function* clearDataLogin() {  
    yield put({type: CLEAR_DATA});
}

export default function* defaultSaga() {
  return [yield takeLatest(LOGIN_ACTION, clearDataLogin)];
}
