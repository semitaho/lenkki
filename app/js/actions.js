export const SET_NAME = 'SET_NAME';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export function setName(value) {
  return {
    type: SET_NAME,
    value
  };

}

export function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    data
  }
}