import reducer from './../app/js/reducers';
import {setName, receiveData} from './../app/js/actions';
import assert from 'assert';
describe('todos reducer', () => {
  it('set name to toni', () =>{
    const initialState = {
      calendar: {
        data: [],
      },
      modal:{}
    };
    const expectedState = {
      calendar: {
        user: {
          name: 'toni',
          id: 'plaa'
        },
         data: []
      },
      modal:{}
    };
    console.log('tila', reducer(initialState, setName('plaa', 'toni')));
    assert.deepEqual(expectedState, reducer(initialState, setName('plaa', 'toni')));
  });

  

  it('sets lenkkidata correctly', ()=>{
     const initialState = {
      calendar:{
        user: {
          name: 'toni'
        },
        data: []
      },
      modal: {}
    };

    let dataFromServer = [{ "_id" : { "$oid" : "568a5cd1e4b0348ab913ec23"} , "username" : "527189480", "day": 29, month: 5},  
                          { "_id" : { "$oid" : "568a5cd1e4b0948ab913ec23"} , "username" : "527189480" , "day" : 31 , "month" : 11 , "year" : 2015 , "length" : 1180 , "date" : "2016-01-04T11:51:44.477Z"}];


    const expectedState = {
      calendar:{
        user:{
          name: 'toni'
        },
        data: dataFromServer
      },
      modal: {}
    };

    assert.deepEqual(expectedState, reducer(initialState, receiveData(dataFromServer)));
  });

});
