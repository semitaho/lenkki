import lenkkiService from './services/lenkkiservice';
export const SET_NAME = 'SET_NAME';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const TOGGLE_MONTH = 'TOGGLE_MONTH';
export const RECEIVING = 'RECEIVING';
export const REQUEST_DATA = 'REQUEST_DATA'

export function setName(value) {
  return {
    type: SET_NAME,
    value
  };
}

export function toggleMonth(direction){
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

export function fetchData(username){
  console.log('fetching data...');
  return (dispatch) => {
    dispatch({type: RECEIVING});
    return lenkkiService.read(username).then(data => {
      console.log('data read', data);
      dispatch(receiveData(data));
    });
  };
};