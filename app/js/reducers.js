import { combineReducers } from 'redux'
import {SET_NAME} from './actions';

const initialState = {
  name: 'Rauno',
  data: []
};

function lenkkiApp(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return Object.assign({}, state, {
        name: action.value
      });
    default:
      return state;
  }
  return state;
}
export default lenkkiApp;

