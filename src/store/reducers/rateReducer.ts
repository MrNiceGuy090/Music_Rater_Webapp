import { RateAction, RateState, SET_RATER, SET_MESSAGE, SET_RATING, SET_TRACK } from '../types';

const initialState: RateState = {
    rating: 0,
    track: '',
    rater: '',
    message: ''
}

export default (state = initialState, action: RateAction) => {
  switch(action.type) {
    case SET_RATER:
      return {
        ...state,
        rater: action.payload
      }
    case SET_RATING:
      return {
        ...state,
        rating: action.payload
      }
    case SET_TRACK:
      return {
        ...state,
        track: action.payload
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    default: 
      return state;
  }
}