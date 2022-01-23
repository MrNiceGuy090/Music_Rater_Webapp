export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_RATING = 'SET_RATING';
export const SET_RATER = 'SET_RATER';
export const SET_TRACK = 'SET_TRACK';
export const SET_REVIEW = 'SET_REVIEW';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  credits: number;
  profileImage: string,
  finnishedInit: boolean,
  preferredGenres: string[]
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
}

export interface AlertState {
  error: string;
  success: string;
}

export interface RateState{
  rating: number;
  track: string;
  rater: string;
  review: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Actions
  // Auth
interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

  // Alert
interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

  // Rating
interface SetRatingAction {
  type: typeof SET_RATING;
  payload: number;
}

interface SetRaterAction {
  type: typeof SET_RATER;
  payload: string;
}

interface SetTrackAction {
  type: typeof SET_TRACK;
  payload: string;
}

interface SetReviewAction {
  type: typeof SET_REVIEW;
  payload: string;
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction;
export type AlertAction =  SetErrorAction | SetSuccessAction;
export type RateAction = SetRatingAction | SetRaterAction | SetTrackAction| SetReviewAction;