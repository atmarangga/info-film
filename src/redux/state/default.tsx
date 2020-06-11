import { fromJS } from "immutable";

const defaultState = {
  data: {},
  loginSession: {
    token: null
  },
  errorData: null,
};

export default fromJS(defaultState);
