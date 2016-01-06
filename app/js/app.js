import ReactDOM from 'react-dom';
import React from 'react';
import Lenkki from './components/lenkki.jsx';
import LoginModal from './components/loginmodal';
import lenkkiService from './services/lenkkiservice';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {setName} from './actions';
import lenkkiApp from './reducers';
let store = createStore(lenkkiApp);
store.subscribe(() => {
  console.log('new state', store.getState());
});

global.jQuery = require('jquery');
require('bootstrap');

const EventCalendar = require('react-event-calendar');

const events = [
  {
    start: '2015-07-20',
    end: '2015-07-02',
    title: 'test event',
    description: 'This is a test description of an event',
  },
  {
    start: '2015-07-19',
    end: '2015-07-25',
    title: 'test event',
    description: 'This is a test description of an event',
    data: 'you can add what ever random data you may want to use later',
  },
];

let app = document.getElementById('app'),
  modaldiv = document.getElementById('loginmodal');
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    FB.api('/me', function (response) {
      console.log('Good to see you', response);
      lenkkiService.storeUser(response.id);
      ReactDOM.render(<Provider store={store}><Lenkki /></Provider>, app);
      store.dispatch(setName(response.name));

    });
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    console.log('Please log into this app.');
    ReactDOM.render(<LoginModal />, modaldiv);

  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    console.log('Please log into Facebook.');
    ReactDOM.render(<LoginModal />, modaldiv);

  }
}

window.fbAsyncInit = function () {

  console.log('window location', window.location.hostname);

  if (window.location.hostname.indexOf('semitaho.github.io') > -1) {
    console.log('going prod');
    FB.init({
      appId: '6632016037',
      xfbml: true,
      version: 'v2.5'
    });
  } else {
    FB.init({
      appId: '10154475914731038',
      xfbml: true,
      version: 'v2.5'
    });
  }

  FB.getLoginStatus(response => {
    statusChangeCallback(response);
  });
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'))
 

   

 