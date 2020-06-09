import { fromJS } from "immutable";
import { LOGIN_ACTION, CLEAR_DATA, SET_DATA } from "../actionTypes";

import defaultState from "../state/default";

export default function genericReducer(state: any = defaultState, action: any) {
  switch (action.type) {
    case LOGIN_ACTION: {
      console.log("login baby !");
      return state;
    }

    case CLEAR_DATA: {
      console.log("I am going to clear the data");
      return state;
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
    default:
      return state;
  }
}
