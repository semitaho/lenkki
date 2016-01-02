import ReactDOM from 'react-dom';
import React from 'react';
import Lenkki from './components/lenkki.jsx';

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

let app = document.getElementById('app');
ReactDOM.render(<Lenkki />, app);
 