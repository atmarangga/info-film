import { fromJS, remove } from "immutable";
import {
  CLEAR_DATA,
  SET_DATA,
  START_REQUEST,
  END_REQUEST,
  SET_TOKEN,
  REMOVE_TOKEN,
  CLEAR_SPECIFIC_DATA,
} from "../actionTypes";

import defaultState from "../state/default";

export default function genericReducer(state: any = defaultState, action: any) {
  switch (action.type) {
    case START_REQUEST: {
      let currentRequest = state.get("requestProcess").toJS();
      console.log("start_request", action);
      if (currentRequest.indexOf(action.request) < 0) {
        console.log("isEmpty start Request");
        currentRequest = [...currentRequest, action.request];
        console.log("currentRequest", currentRequest);
        return state.set("requestProcess", fromJS(currentRequest));
      }
      return state;
    }

    case END_REQUEST: {
      let currentRequest = state.get("requestProcess").toJS();
      if (
        currentRequest &&
        currentRequest.length > 0 &&
        currentRequest.indexOf(action.request) > -1
      ) {
        
        const [request, ...otherDetails] = currentRequest;
        return state.set("requestProcess", fromJS(otherDetails));
        // return remove(state.get("requestProcess"),currentRequest.indexOf(action.request))
      }
      return state;
    }

    case CLEAR_DATA: {
      // console.log("I am going to clear the data");
      return defaultState;
    }
    case CLEAR_SPECIFIC_DATA:{
      let newData = state.get("data");
      console.log('deleting', action.key);
      newData = newData.delete(action.key);
      console.log("newData ::", newData);
      return state.set("data", newData);
    }

    case SET_DATA: {
      console.log("action ??", action);
      let newState = state.get("data").toJS();
      const newObject = {
        [action.key]: action.value,
      };
      console.log("newObject ?", newObject);
      newState = { ...newState, ...newObject };
      return state.set("data", fromJS(newState));
    }

    case SET_TOKEN: {
      let newState = state.get("loginSession").toJS();
      newState = {
        ...newState,
        token: action.token,
      };
      return state.set("loginSession", fromJS(newState));
    }

    case REMOVE_TOKEN: {
      let newState = state.get("loginSession").toJS();
      newState = {
        ...newState,
        token: null,
      };
      return state.set("loginSession", fromJS(newState));
    }

    default:
      return state;
  }
}
