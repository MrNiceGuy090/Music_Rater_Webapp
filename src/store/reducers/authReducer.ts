import { AuthAction, AuthState, SET_USER, SET_LOADING, SIGN_OUT} from '../types';

const initialState: AuthState = {
  user: null,
  authenticated: false,
  loading: false
}

export default (state = initialState, action: AuthAction) => {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        loading: false
      }
    default: 
      return state;
  }
}