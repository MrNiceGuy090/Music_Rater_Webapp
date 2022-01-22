import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import alertReducer from './reducers/alertReducer';
import rateReducer from './reducers/rateReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  rate: rateReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;