import { combineReducers } from 'redux'
import {SET_NAME, RECEIVE_DATA, TOGGLE_MONTH, CLICK_DAY, SAVE_DAY, CHANGE_LENGTH} from './actions';
import lenkkiService from './services/lenkkiservice';  

const year = new Date().getFullYear();
const month = new Date().getMonth()+1;
const calendarState = {
  data: [],
  year,
  month,
  user: {
  }
};

const modalState = {};

const spinnerState = true;

function spinner(state = spinnerState, action){
  if (action.type === 'TOGGLE_SPINNER'){
    return action.value;
  }
  return state; 
}

function modal(state = modalState, action){
  switch(action.type){
    case CLICK_DAY:
      let currentMonth = new Date(action.year, action.month-1, action.day);
      return Object.assign({}, state, {
          show: true,
          id: action.id,
          userid: action.userid,
          date: action.day+'.'+action.month+'.'+action.year,
          day: action.day,
          month: action.month-1,
          year: action.year,
          length: action.length  
      
      });
    
    case CHANGE_LENGTH:
      var pattern = /^\d+((\,)?\d{0,2})?$/;
      if (action.length.trim() === ''){
        return state;
      }
      if (pattern.test(action.length)){
        return  Object.assign({}, state, {
          length: action.length
        });
      } 
      return state;    
    default:
      return state;  
  }
  return state;

}

function calendar(state = calendarState, action) {
  switch (action.type) {
    case SET_NAME:
      return Object.assign({}, state, {
        user: {
          id: action.id,
          name: action.value
        }
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

const lenkkiApp = combineReducers({
  calendar,
  modal,
  spinner
});
export default lenkkiApp;

