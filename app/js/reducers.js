import { combineReducers } from 'redux'
import {SET_NAME, RECEIVE_DATA} from './actions';




const year = new Date().getFullYear();
const month = new Date().getMonth()+1;
const initialState = {
  name: 'Rauno',
  data: [],
  year,
  month
};

function lenkkiApp(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return Object.assign({}, state, {
        name: action.value
      });
    case RECEIVE_DATA: 
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
  return state;
}
export default lenkkiApp;

