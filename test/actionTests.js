import * as actions from './../app/js/actions'
import assert from 'assert';

describe('tests action creators', () => {
  it('tests setname action', () => {
    let name = 'toni';
    let expectedAction = {type: 'SET_NAME', value: name};
    assert.deepEqual(expectedAction,actions.setName(name));
  });

  it('tests receiving data', () => {
    let data = {name: 'toni'};
    let expectedData = {type: 'RECEIVE_DATA', data};
    assert.deepEqual(expectedData,actions.receiveData(data));
  })

});