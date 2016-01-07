import { combineReducers } from 'redux'
import {SET_NAME, RECEIVE_DATA, TOGGLE_MONTH} from './actions';
  



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

    case TOGGLE_MONTH:
      var currentMonth = new Date(state.year, state.month-1, 1);
      if (action.direction){
        currentMonth.setMonth(currentMonth.getMonth()+1);
      } else {     
        currentMonth.setMonth(currentMonth.getMonth()-1);
      }
      console.log('current', currentMonth.getMonth());
      return Object.assign({}, state, {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth()+1
      });
        
    default:
      return state;
  }
  return state;
}
export default lenkkiApp;

