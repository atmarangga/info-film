import { fromJS } from "immutable";

const defaultState = {
  data: {},
  loginSession: {
    token: null
  },
  errorData: null,
  requestProcess:[],
};

export default fromJS(defaultState);
