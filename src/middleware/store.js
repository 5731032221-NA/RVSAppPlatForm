import { createStore, combineReducers } from 'redux';
import reducer from './reducer';

const rootReducer = combineReducers({
  reducer
  // reducer: reducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;