import { combineReducers } from 'redux'
import {SET_NAME, RECEIVE_DATA, TOGGLE_MONTH, CLICK_DAY, SAVE_DAY, CHANGE_LENGTH} from './actions';
import lenkkiService from './services/lenkkiservice';  



const year = new Date().getFullYear();
const month = new Date().getMonth()+1;
const initialState = {
  data: [],
  year,
  month,
  user: {
  },
  modal: {
    show: false
  }
};

function lenkkiApp(state = initialState, action) {
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
    case CLICK_DAY:
        let currentMonth = new Date(action.year, action.month-1, action.day);
        let item = lenkkiService.getItem(action.day, action.month-1, action.year, state.user.id, state.data);
        return Object.assign({}, state, {
          modal: {
            show: true,
            id: item._id,
            userid: state.user.id,
            date: action.day+'.'+action.month+'.'+action.year,
            day: action.day,
            month: action.month-1,
            year: action.year,
            length: lenkkiService.formatLength(item.length)
          } 
      });
    case CHANGE_LENGTH:
      console.log('suggested', action.length);
      var pattern = /^\d+((\,)?\d{0,2})?$/;
      if (action.length.trim() === ''){
        return state;
      }
      if (pattern.test(action.length)){
        let newmodal = Object.assign({}, state.modal, {
          length: action.length
        });
        return Object.assign({}, state, {
          modal: newmodal
        });
      } 
      return state;    
    case SAVE_DAY:
      console.log('modal', action.modal)
      return;    

        

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

