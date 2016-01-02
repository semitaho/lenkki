import React from 'react';
class Calendar extends React.Component {

  constructor(){
    super();
  }

  render(){
    return (
        <div id="calendar">
          <div className="row text-center">
            {this.props.daynames.map( day => {
              return (
               <div className="col-md-1"><strong>{day}</strong></div> 
              )

          } ) }</div>
        </div>
      )

  }
}

Calendar.defaultProps = {
  daynames: ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai']
};


export default Calendar;




