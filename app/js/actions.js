import lenkkiService from './services/lenkkiservice';
export const SET_NAME = 'SET_NAME';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const CLICK_DAY = 'CLICK_DAY';
export const SAVE_DAY = 'SAVE_DAY';
export const CHANGE_LENGTH = 'CHANGE_LENGTH';
export const SHARE_FACEBOOK = 'SHARE_FACEBOOK';
export const DID_SHARE = 'DID_SHARE';
export const TOGGLE_MONTH = 'TOGGLE_MONTH';
export const RECEIVING = 'RECEIVING';
export const TOGGLE_SPINNER = 'TOGGLE_SPINNER';
export const READ_BEST_KILOMETERS = 'READ_BEST_KILOMETERS';

export function toggleSpinner(value) {
  return {
    type: TOGGLE_SPINNER,
    value
  };
}

export function shareFacebook(day, length) {
  return {
    type: SHARE_FACEBOOK,
    day,
    length
  }
}

export function didShare() {
  return {
    type: DID_SHARE
  };
}

export function setName(id, value) {
  return {
    type: SET_NAME,
    id,
    value
  };
}

export function clickDay(id, userid, length, year, month, day) {
  console.log('id', id);
  return {
    type: CLICK_DAY,
    id,
    year,
    month,
    day,
    length,
    userid
  };
}

export function readBestKilometers(month,year){
  return dispatch => {
    return lenkkiService.readBestKilometers(month, year)
      .then((data) => {
        console.log('kolikki', data);
        let topArray = [];
        data.forEach(item => {

        });

      });

  };
}

export function saveDay(data) {
  return (dispatch) => {
    dispatch(toggleSpinner(true));
    return lenkkiService.store(data.id, data.userid, data.day, data.month, data.year, data.length.replace(',', '.') * 100)
      .then(() => {
        console.log('after store', data.month);
        dispatch(fetchData(data.userid));
        dispath(readBestKilometers(data.month, data.year));
        let day = data.day + '.' + (data.month + 1) + '.' + data.year;
        dispatch(shareFacebook(day, data.length));
      });

  };
}

export function changeLength(length) {
  return {
    type: CHANGE_LENGTH,
    length
  }
}

export function toggleMonth(direction) {
  return {
    type: TOGGLE_MONTH,
    direction
  };
}

export function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data
  }
}

export function fetchData(username) {
  console.log('fetching data...');
  return (dispatch) => {
    dispatch({type: RECEIVING});
    return lenkkiService.read(username).then(data => {
      console.log('data read', data);
      dispatch(receiveData(data));
      dispatch(toggleSpinner(false));

    });
  };
};