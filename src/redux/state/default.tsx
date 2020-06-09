import { fromJS } from 'immutable';

const defaultState = {
  data: {
  },
  loginData: {
    username: null,
    password: null,
  },
  token: null,
  requestProcess: [],
};

export default fromJS(defaultState);
