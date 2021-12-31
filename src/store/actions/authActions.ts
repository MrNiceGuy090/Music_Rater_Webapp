import { ThunkAction } from 'redux-thunk';

import { SignUpData, AuthAction, SET_USER, User, SET_LOADING, SIGN_OUT, SignInData, SET_ERROR, NEED_VERIFICATION, SET_SUCCESS } from '../types';
import { RootState } from '..';
import { localAuth, db } from '../../firebase';
import * as firebaseAuth from 'firebase/auth';
import { doc, collection, setDoc, getDoc, addDoc, updateDoc  } from 'firebase/firestore';

// Create user
export const signup = (data: SignUpData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const res = await firebaseAuth.createUserWithEmailAndPassword(localAuth, data.email, data.password);
      if(res.user) {
        const userData: User = {
          email: data.email,
          firstName: data.firstName,
          id: res.user.uid
        };
        await setDoc(doc(db, '/users', res.user.uid), userData)
        dispatch({
          type: NEED_VERIFICATION
        });
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (err: any) {
      console.log(err);
      onError();
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  }
}

// Get user by id
export const getUserById = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const user = await getDoc(doc(db, 'users', id));
      if(user.exists()) {
        const userData = user.data() as User;
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

// Set loading
export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: value
    });
  }
}

// Log in
export const signin = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      await firebaseAuth.signInWithEmailAndPassword(localAuth, data.email, data.password).then((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      onError();
      dispatch(setError(err.message));
    }
  }
}

// Log out
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      await firebaseAuth.signOut(localAuth);
      dispatch({
        type: SIGN_OUT
      });
    } catch (err: any) {
      console.log(err);
      dispatch(setLoading(false));
    }
  }
}

// Set error
export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: msg
    });
  }
}

// Set need verification
export const setNeedVerification = (): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: NEED_VERIFICATION
    });
  }
}

// Set success
export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_SUCCESS,
      payload: msg
    });
  }
}

// Send password reset email
export const sendPasswordResetEmail = (email: string, successMsg: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      await firebaseAuth.sendPasswordResetEmail(localAuth, email);
      dispatch(setSuccess(successMsg));
    } catch (err: any) {
      console.log(err);
      dispatch(setError(err.message));
    }
  }
}