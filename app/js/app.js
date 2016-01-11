import ReactDOM from 'react-dom';
import React from 'react';
import Lenkki from './components/lenkki.jsx';
import LoginModal from './components/loginmodal';
import thunkMiddleware from 'redux-thunk'

import lenkkiService from './services/lenkkiservice';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import {setName, fetchData, toggleMonth} from './actions';
import lenkkiApp from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
let store = createStoreWithMiddleware(lenkkiApp);
console.log('current store', store.getState());
store.subscribe(() => {
  console.log('new state', store.getState());
});

global.jQuery = require('jquery');
require('bootstrap');

let app = document.getElementById('app'),
    modaldiv = document.getElementById('loginmodal');
// This is called with the results from from FB.getLoginStatus().

ReactDOM.render(<Provider store={store}><Lenkki /></Provider>, app);




   

 