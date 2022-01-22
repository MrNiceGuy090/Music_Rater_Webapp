import { AlertAction, AlertState, SET_ERROR, SET_SUCCESS } from '../types';

const initialState: AlertState = {
  error: '',
  success: ''
}

export default (state = initialState, action: AlertAction) => {
  switch(action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        success: ''
      }
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
        error: ''
      }
    default: 
      return state;
  }
}