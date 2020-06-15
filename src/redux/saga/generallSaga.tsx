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
  SET_ERROR,
} from "../actionTypes";
import { LOGIN_REQUEST, MOVIE_DETAIL_REQUEST, MOVIE_LIST_REQUEST } from "../../helpers/request";
import { LOGIN_URL, MOVIE_LIST_URL, MOVIE_DETAIL_URL } from "../../helpers/url";
import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectToken,
  makeSelectMovies,
} from "../selector";

export function* prepareLogin() {
  yield put({ type: START_REQUEST, request: LOGIN_REQUEST });

  try {
    const inputUsername = yield select(makeSelectUsername);
    const inputPassword = yield select(makeSelectPassword);
    const loginResponse = yield call(fetch, LOGIN_URL, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(inputUsername + ":" + inputPassword),
        "Access-Control-Allow-Credentials" : "true",
        "Access-Control-Allow-Origin": "http://localhost:3000"
      },
    });

    const dataHere = yield loginResponse.json();
    if (dataHere.status === "ok") {
      //retrieve token
      const tokenData = dataHere.data && dataHere.data.token;
      yield put({ type: SET_TOKEN, token: tokenData });
    } else if (dataHere.status === "error") {
      
      yield put({
        type: SET_ERROR,
        message: dataHere.message,
        title: "Login Error",
      });
    }
    yield put({ type: END_REQUEST, request: LOGIN_REQUEST });
  } catch (e) {
    console.log("Error : ", e);
    yield put({
      type: SET_ERROR,
      message: "Failed to login. Please try again later",
      title: "Login Error",
    });
    yield put({ type: END_REQUEST, request: LOGIN_REQUEST });
    
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

function* prepareMovieDetails(action?: any) {
  try {
    
    const token = yield select(makeSelectToken);
    
    let newURL = `${MOVIE_DETAIL_URL}?id=${action.id}`;
    // yield put({type: START_REQUEST, request: MOVIE_DETAIL_REQUEST})
    const movieDetailResponse = yield call(fetch, newURL, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const dataResponse = yield movieDetailResponse.json();
    let movies = yield select(makeSelectMovies);
      movies = movies.toJS() || [];
    // yield put({type: END_REQUEST, request: MOVIE_DETAIL_REQUEST})
      for(let i = 0; i < movies.length; i += 1){
        if(movies[i].id === action.id){
          if (dataResponse && dataResponse.status === "ok") {
            movies[i] = dataResponse.data;
          } else {
            movies[i] = {
              id: action.id,
              name: `${movieDetailResponse.status} : ${movieDetailResponse.statusText}`
            }
          }
          break;
        }
      }
      yield put({ type: SET_DATA, key: "movies", value: movies });

  } catch (e) {
    console.log("Exception on preparing movie details : ", e);
    yield put({type: SET_ERROR, message: "Failed to connect", title: "Server failure"})
    yield put({type: END_REQUEST, request: MOVIE_DETAIL_REQUEST})
  }
}

function* prepareMovieList() {
  try {
    const token = yield select(makeSelectToken);
    yield put({type: START_REQUEST, request: MOVIE_LIST_REQUEST})
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
        const idMov = [];
        for(let c = 0; c < dataResponse.data.length; c += 1){
          idMov.push({id: dataResponse.data[c]})
        }
        yield put({type: END_REQUEST, request: MOVIE_LIST_REQUEST})
        yield put({type: SET_DATA, key: "movies", value: idMov})
        for(let y = 0; y < dataResponse.data.length; y += 1){
            yield put({type: GET_MOVIE_DETAILS, id: dataResponse.data[y]})
        }
      }
    }
    

  } catch (e) {
    console.log("failed to prepareMovie list");
    yield put({type: END_REQUEST, request: MOVIE_LIST_REQUEST})
    
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
