import { ThunkAction } from 'redux-thunk';

import { AlertAction, SET_ERROR, SET_SUCCESS } from '../types';
import { RootState } from '..';


// Set error
export const setError = (msg: string): ThunkAction<void, RootState, null, AlertAction> => {
    return dispatch => {
      dispatch({
        type: SET_ERROR,
        payload: msg
      });
    }
  }
  
  // Set success
  export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AlertAction> => {
    return dispatch => {
      dispatch({
        type: SET_SUCCESS,
        payload: msg
      });
    }
  }
  
  