import { takeEvery, takeLatest, put, call, select } from "redux-saga/effects";
import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  CLEAR_DATA,
  START_REQUEST,
  END_REQUEST,
  SET_TOKEN,
  REMOVE_TOKEN,
  GET_MOVIE_LIST,
  SET_DATA,
  GET_MOVIE_DETAILS,
} from "../actionTypes";
import { LOGIN_REQUEST } from "../../helpers/request";
import { LOGIN_URL, MOVIE_LIST_URL, MOVIE_DETAIL_URL } from "../../helpers/url";
import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectToken,
} from "../selector";

export function* prepareLogin() {
  yield put({ type: START_REQUEST, request: LOGIN_REQUEST });

  try {
    const inputUsername = yield select(makeSelectUsername);
    const inputPassword = yield select(makeSelectPassword);
    console.log("inputUsername : ", inputUsername);
    console.log("inputPassword : ", inputPassword);
    const loginResponse = yield call(fetch, LOGIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + btoa(inputUsername + ":" + inputPassword),
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const dataHere = yield loginResponse.json();
    console.log("responseJson ? ", dataHere);
    if (dataHere.status === "ok") {
      //retrieve token
      const tokenData = dataHere.data && dataHere.data.token;
      yield put({ type: SET_TOKEN, token: tokenData });
    }
    yield put({ type: END_REQUEST, request: LOGIN_REQUEST });
  } catch (e) {
    console.log("Error : ", e);
  }
}

function* prepareLogout() {
  try {
    yield put({ type: REMOVE_TOKEN });
    yield put({ type: CLEAR_DATA });
  } catch (e) {
    console.log("Failed to logout :", e);
  }
}

function* prepareMovieDetails(action?:any) {
  try {
    const token = yield select(makeSelectToken);
    let newURL = `${MOVIE_DETAIL_URL}?id=${action.id}`
    
    
    const movieDetailResponse = yield call(fetch, newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
      },  
      
    })
    console.log('movieDetailResponse', movieDetailResponse);
    const dataResponse = yield movieDetailResponse.json();
    if(dataResponse && dataResponse.status === "ok"){
      yield put({type: SET_DATA, key: "details", value: dataResponse.data})
    }
  } catch (e) {
    console.log("Exception on preparing movie details : ", e);
  }
}

function* prepareMovieList() {
  try {
    const token = yield select(makeSelectToken);
    const movieResponse = yield call(fetch, MOVIE_LIST_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const dataResponse = yield movieResponse.json();
    if (dataResponse && dataResponse.status === "ok") {
      if (dataResponse && dataResponse.data && dataResponse.data.length > 0) {
        yield put({ type: SET_DATA, key: "movies", value: dataResponse.data });
      }
    }
  } catch (e) {
    console.log("failed to prepareMovie list");
  }
}

export default function* defaultSaga() {
  return [
    yield takeEvery(GET_MOVIE_DETAILS, prepareMovieDetails),
    yield takeEvery(GET_MOVIE_LIST, prepareMovieList),
    yield takeLatest(LOGOUT_ACTION, prepareLogout),
    yield takeLatest(LOGIN_ACTION, prepareLogin),
  ];
}
