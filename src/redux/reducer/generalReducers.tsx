import { fromJS, remove } from "immutable";
import {
  CLEAR_DATA,
  SET_DATA,
  START_REQUEST,
  END_REQUEST,
  SET_TOKEN,
  REMOVE_TOKEN,
  CLEAR_SPECIFIC_DATA,
  SET_ERROR,
  REMOVE_ERROR,
} from "../actionTypes";

import defaultState from "../state/default";

export default function genericReducer(state: any = defaultState, action: any) {
  switch (action.type) {
    case START_REQUEST: {
      let currentRequest = state.get("requestProcess").toJS();

      if (currentRequest.indexOf(action.request) < 0) {
        currentRequest = [...currentRequest, action.request];

        return state.set("requestProcess", fromJS(currentRequest));
      }
      return state;
    }

    case END_REQUEST: {
      const currentRequest = state.get("requestProcess").toJS();

      if (
        currentRequest &&
        currentRequest.length > 0 &&
        currentRequest.indexOf(action.request) > -1
      ) {
        const idx = currentRequest.indexOf(action.request);
        currentRequest.splice(idx, 1);
        return state.set("requestProcess", fromJS(currentRequest));
      }
      // console.log("not in end request");
      return state;
    }

    case CLEAR_DATA: {
      // console.log("I am going to clear the data");
      return defaultState;
    }
    case CLEAR_SPECIFIC_DATA: {
      let newData = state.get("data");

      newData = newData.delete(action.key);

      return state.set("data", newData);
    }

    case SET_DATA: {
      let newState = state.get("data").toJS();
      const newObject = {
        [action.key]: action.value,
      };

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

    case SET_ERROR: {
      let newState = state.get("errorData");
      if (newState) {
        newState = newState.toJS();
      }
      newState = {
        title: action.title,
        message: action.message,
      };
      return state.set("errorData", newState);
    }

    case REMOVE_ERROR: {
      return state.set("errorData", null);
    }

    default:
      return state;
  }
}
