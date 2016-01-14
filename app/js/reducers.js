import { combineReducers } from 'redux'
import {SET_NAME, RECEIVE_DATA, TOGGLE_MONTH, CLICK_DAY, SAVE_DAY, CHANGE_LENGTH, SHARE_FACEBOOK, DID_SHARE} from './actions';
import lenkkiService from './services/lenkkiservice';

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const calendarState = {
  data: [],
  year,
  month,
  user: {}
};

const appState ={showapp: false, showlogin:false};
const modalState = {};
const fbshareState = {showdialog: false};

const spinnerState = true;
const topState = {visible: 3, items: []};

function top(state=topState, action){
  if (action.type === 'RECEIVE_TOP'){
    return Object.assign({}, state, {
      items: action.value
    });
  }
  return state;
}

function app(state = appState, action){
  if (action.type == 'SHOW_LOGIN'){
    return Object.assign({}, state, {
      showlogin: true
    });
  }

   if (action.type == 'SHOW_APP'){
    return Object.assign({}, state, {
      showapp: true,
      showlogin: false
    });
  }
  return state;
}

function spinner(state = spinnerState, action) {
  if (action.type === 'TOGGLE_SPINNER') {
    return action.value;
  }
  return state;
}

function fbshare(state = fbshareState, action) {
  switch (action.type) {
    case SHARE_FACEBOOK:
      return Object.assign({}, state, {
        day: action.day,
        showdialog: true,
        track: action.track,
        length: action.length
      });
    case DID_SHARE:
      return {showdialog: false};
    default:
      return state;
  }

  return state;
}

function modal(state = modalState, action) {
  switch (action.type) {

    case 'RECEIVE_TRACKS':
      let tracks = action.tracks;
      return Object.assign({}, state, {tracks});
      
    case CLICK_DAY:
      let currentMonth = new Date(action.year, action.month - 1, action.day);
      return Object.assign({}, state, {
        show: true,
        id: action.id,
        userid: action.userid,
        date: action.day + '.' + action.month + '.' + action.year,
        day: action.day,
        month: action.month - 1,
        year: action.year,
        length: action.length,
        track: action.track

      });
    case 'CLOSE_MODAL':
      return {show: false};

    case 'CHANGE_TRACK':
      return Object.assign({}, state, {
        track: action.track
      });  

    case CHANGE_LENGTH:
      var pattern = /^\d+((\,)?\d{0,2})?$/;
      if (action.length.trim() === '') {
        return state;
      }
      if (pattern.test(action.length)) {
        return Object.assign({}, state, {
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
      var currentMonth = new Date(state.year, state.month - 1, 1);
      if (action.direction) {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
      } else {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
      }
      console.log('current', currentMonth.getMonth());
      return Object.assign({}, state, {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1
      });

    default:
      return state;
  }
  return state;
}

const lenkkiApp = combineReducers({
  app,
  calendar,
  modal,
  spinner,
  fbshare,
  top
});
export default lenkkiApp;

