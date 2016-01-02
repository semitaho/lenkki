import React from 'react';
import Calendar from './calendar';

const events = [
    {
        start: '2016-01-01',
        end: '2016-01-02',
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
const Lenkki  = (props) => {
  
  return (
    <div className="container-fluid">
    <h1>hello world</h1>
      <div className="row">
        <div className="col-md-10  col-md-offset-2">
          <Calendar year={2016} month={1} />
        </div>
      </div>
    </div>

  )

};

export default Lenkki;