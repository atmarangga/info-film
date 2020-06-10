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
  errorData:null,
};

export default fromJS(defaultState);
