import { ThunkAction } from 'redux-thunk';

import { SignUpData, AuthAction, SET_USER, User, SIGN_OUT, SignInData, SET_LOADING } from '../types';
import { RootState } from '..';
import { localAuth, db } from '../../firebase';
import * as firebaseAuth from 'firebase/auth';
import { doc, setDoc, getDoc  } from 'firebase/firestore';
import { setSuccess, setError } from '../../store/actions/alertActions';

import firebaseErrors from '../../store/errors';

// Create user
export const signup = (data: SignUpData, onSuccess? : () => void, onError? : (error: string) => void): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const res = await firebaseAuth.createUserWithEmailAndPassword(localAuth, data.email, data.password);
      if(res.user) {
        const userData: User = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          id: res.user.uid,
          credits: 0,
          profileImage: "",
          finnishedInit: false,
          preferredGenres: []
        };
        
        // sign in user as soon as it signs up
        // dispatch({
        //   type: SET_USER,
        //   payload: userData
        // });
        dispatch(setSuccess('Succesfully created an account for ' + data.firstName + "!"));
        await setDoc(doc(db, '/users', res.user.uid), userData);
        
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      dispatch(setError(''))
      if (onError) onError(firebaseErrors[error.code]);
    }
  }
}

// Log in
export const signin = (data: SignInData,  onSuccess? : () => void, onError?: (error: string) => void): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const res = await firebaseAuth.signInWithEmailAndPassword(localAuth, data.email, data.password);
      const userDoc: any = await (await getDoc(doc(db, '/users', res.user.uid))).data()
      
      const userData: User = {
        email: userDoc.email,
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        id: userDoc.id,
        credits: userDoc.credits,
        profileImage: userDoc.profileImage,
        finnishedInit: userDoc.finnishedInit,
        preferredGenres: userDoc.preferredGenres
      };        

      dispatch({
        type: SET_USER,
        payload: userData
      });
      dispatch(setSuccess(''))
      if(onSuccess) onSuccess();
    } catch (err: any) {
      dispatch(setError(''))
      if(onError)onError(firebaseErrors[err.code]);
    }
  }
}

// Log out
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      await firebaseAuth.signOut(localAuth);
      dispatch({
        type: SIGN_OUT
      });
    } catch (err: any) {
      console.log(err);
    }
  }
}

// set User
export const setUser = (user: User): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_USER,
      payload: user
    });
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


