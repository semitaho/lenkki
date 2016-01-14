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

export function shareFacebook(day, length, track) {
  return {
    type: SHARE_FACEBOOK,
    day,
    length,
    track
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

export function clickDay(id, userid, length, year, month, day, track) {
  console.log('id', track);
  return {
    type: CLICK_DAY,
    id,
    year,
    month,
    day,
    length,
    userid,
    track
  };
}

export function closeModal(){
  return {
    type: 'CLOSE_MODAL'
  };
}

export function readBestKilometers(month,year){
  return dispatch => {
    return lenkkiService.readBestKilometers(month, year)
      .then((data) => {
        let topArray = [];
        data.forEach(item => {
          if (!isNaN(item.username) && topArray.indexOf(item.username) === -1){
            topArray.push(item.username);
          }
        });
        FB.api('/', {ids: topArray, fields: ['picture', 'name']}, (response) => {
          let responseArray =Object.keys(response).map(x => response[x]);
          let results = [];
          data.forEach(item => {
            let username = item['username'];
            let foundResponse = responseArray.find(x => x.id === username);

            if (foundResponse){
              if (!foundResponse.length){
                foundResponse.length = 0;
              }
              foundResponse.length += item.length;
            }
          });
          responseArray.sort((a,b) => b.length - a.length);
          dispatch({
            type: 'RECEIVE_TOP',
            value: responseArray

          });
        });

      });

  };
}

export function saveDay(data) {
  return (dispatch) => {
    dispatch(toggleSpinner(true));
    return lenkkiService.store(data.id, data.userid, data.day, data.month, data.year, data.length.replace(',', '.') * 100, data.track)
      .then(() => {
        console.log('after store', data.month);
        dispatch(fetchData(data.userid));
        dispatch(readBestKilometers(data.month, data.year));
        let day = data.day + '.' + (data.month + 1) + '.' + data.year;
        dispatch(shareFacebook(day, data.length, data.track));
      });

  };
}

export function changeLength(length) {
  return {
    type: CHANGE_LENGTH,
    length
  }
}

export function changeTrack(track){
  return {
    type: 'CHANGE_TRACK',
    track
  };
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