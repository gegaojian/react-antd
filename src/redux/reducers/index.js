import {GET_PERMISSIONS_REQUEST} from '../actions/index';

const initState = {
  permissions: {
    isLoading: false,
    data: {},
    errMsg: ''
  }
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_PERMISSIONS_REQUEST:
      return {
        ...state,
        permissions: action.permissions
      };
    default:
      return state;
  }

}
