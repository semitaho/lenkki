import reducer from './../app/js/reducers';
import {setName, receiveData} from './../app/js/actions';
import assert from 'assert';
describe('todos reducer', () => {
  it('set name to toni', () =>{
    const initialState = {
      name: '',
      data: []
    };
    const expectedState = {
      name: 'toni',
      data: []
    };
    assert.deepEqual(expectedState, reducer(initialState, setName('toni')));
  });

  it('sets lenkkidata correctly', ()=>{
     const initialState = {
      name: 'toni',
      data: []
    };

    let dataFromServer = [{ "_id" : { "$oid" : "568a5cd1e4b0348ab913ec23"} , "username" : "527189480", "day": 29, month: 5},  
                          { "_id" : { "$oid" : "568a5cd1e4b0948ab913ec23"} , "username" : "527189480" , "day" : 31 , "month" : 11 , "year" : 2015 , "length" : 1180 , "date" : "2016-01-04T11:51:44.477Z"}];


    const expectedState = {
      name: 'toni',
      data: dataFromServer
    };

    assert.deepEqual(expectedState, reducer(initialState, receiveData(dataFromServer)));

  });
});
