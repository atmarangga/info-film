import { 
  LOGIN_ACTION,
  SET_DATA,
  CLEAR_SPECIFIC_DATA,
  CLEAR_DATA,
  START_REQUEST,
  END_REQUEST 
} from "../actionTypes";

export function loginActions(username?: string, password?: string) {
  return {
    type: LOGIN_ACTION,
    credentials: {
      username,
      password,
    },
  };
}

export function startRequest(request: string){
  return {
    type: START_REQUEST,
    request
  }
}

export function endRequest(request: string){
  return {
    type: END_REQUEST,
    request
  }
}
export function setData(key:string, value?: string | number){
    return {
        type: SET_DATA,
        key,
        value
    }
}

export function clearDataSpecific (key?: string) {
    return {
        type: CLEAR_SPECIFIC_DATA,
        key,
    }
}

export function clearAllData () {
    return {
        type: CLEAR_DATA,
    }
}