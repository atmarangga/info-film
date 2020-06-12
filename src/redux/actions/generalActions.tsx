import {
  LOGIN_ACTION,
  SET_DATA,
  CLEAR_SPECIFIC_DATA,
  CLEAR_DATA,
  START_REQUEST,
  END_REQUEST,
  SET_ERROR,
  REMOVE_ERROR,
  LOGOUT_ACTION,
  GET_MOVIE_LIST,
  GET_MOVIE_DETAILS,
} from "../actionTypes";

export function loginActions() {
  return {
    type: LOGIN_ACTION,
  };
}

export function logoutActions() {
  return {
    type: LOGOUT_ACTION,
  };
}

export function startRequest(request: string) {
  return {
    type: START_REQUEST,
    request,
  };
}

export function endRequest(request: string) {
  return {
    type: END_REQUEST,
    request,
  };
}
export function setData(key: string, value?: string | number) {
  return {
    type: SET_DATA,
    key,
    value,
  };
}

export function clearDataSpecific(key?: string) {
  return {
    type: CLEAR_SPECIFIC_DATA,
    key,
  };
}

export function clearAllData() {
  return {
    type: CLEAR_DATA,
  };
}

export function setError(title: string, message: string) {
  return {
    type: SET_ERROR,
    title,
    message,
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}

export function getMovieList(){
  return{
    type: GET_MOVIE_LIST
  }
}

export function getMovieDetails(id?: string | number){
  return {
    type: GET_MOVIE_DETAILS,
    id
  }
}
