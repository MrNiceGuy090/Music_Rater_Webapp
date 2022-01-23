import { ThunkAction } from 'redux-thunk';

import { RateAction, SET_TRACK, SET_REVIEW, SET_RATING, SET_RATER } from '../types';
import { RootState } from '..';


export const setWholeState = (rating: number, rater: string, track: string, review: string ): ThunkAction<void, RootState, null, RateAction> => {
    return dispatch => {
      dispatch({
        type: SET_TRACK,
        payload: track
      });
      dispatch({
        type: SET_RATER,
        payload: rater
      });
      dispatch({
        type: SET_RATING,
        payload: rating
      });
      dispatch({
        type: SET_REVIEW,
        payload: review
      });
    }
  }

export const setRating = (rating: number): ThunkAction<void, RootState, null, RateAction> => {
    return dispatch => {
      dispatch({
        type: SET_RATING,
        payload: rating
      });
    }
  }

export const setRater = (rater: string): ThunkAction<void, RootState, null, RateAction> => {
    return dispatch => {
      dispatch({
        type: SET_RATER,
        payload: rater
      });
    }
  }

export const setTrack = (track: string): ThunkAction<void, RootState, null, RateAction> => {
    return dispatch => {
      dispatch({
        type: SET_TRACK,
        payload: track
      });
    }
  }

export const setReview = (review: string): ThunkAction<void, RootState, null, RateAction> => {
    return dispatch => {
      dispatch({
        type: SET_REVIEW,
        payload: review
      });
    }
  }

