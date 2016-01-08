import React from 'react';
import Day from './day';
import LenkkiModal from './lenkkimodal';
import lenkkiService from './../services/lenkkiservice.js';

class Calendar extends React.Component {

  constructor(){
    super();
    this.state = {showmodal : false};
  }

  renderDays(){
    let monthdays = [31,28,31,30,31,30,31,31,30,31,30,31];
    var firstDay = new Date(this.props.year, this.props.month-1, 1);
    var startingDay = firstDay.getDay();
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth();
    const MAX_WEEKS = 6;
    const WEEKDAYS = 7;
    const MONTH_LENGTH = monthdays[this.props.month-1];
    var day = 1;
    var html = [];
    for (var i = 0; i < MAX_WEEKS; i++){
      for (let j = 1; j <= WEEKDAYS; j++){
        if (day <= MONTH_LENGTH && (i > 0 || j >= startingDay)){
          let currentClass = day === currentDay && this.props.month === currentMonth+1 ? 'current' : '';
          let item = lenkkiService.getItem(day, this.props.month-1, this.props.year, this.props.id, this.props.lenkkidata);
          let currentday = day;
          let length = item.length ? (item.length / 100).toFixed(2).replace('.', ',') : '';
          html.push(<div className="col-box text-right day-box" onClick={() => this.props.onClick(this.props.year, this.props.month, currentday) }  ><Day _id={item._id} length={length} value={day} state={currentClass} /></div>);
          day++;
        } else {
          html.push(<div className="col-box" />)
        }
      }
      html.push(<div className="clearfix" />);
      if (day > MONTH_LENGTH){
        break;
      }
    }
    return <div className="row">{html}</div>;
  }

  render(){
    let monthName = this.props.months[this.props.month-1];
    return (
        <div id="calendar" className="item active">
          <div className="calendar-width">
          
                <div className="row">
                  <div className="col-md-12 text-center calendar-header">
                         <h3>{monthName} {this.props.year}<br/><small>Kilometrejä tässä kuussa: <b>{lenkkiService.getMonthKilometers(this.props.month-1, this.props.year, this.props.lenkkidata)} km</b></small></h3>

         
                  </div>
                </div>
                <div className="row text-center">
                  {this.props.daynames.map( day => {
                    return (
                     <div className="col-box"><strong>{day}</strong></div> 
                    )

                } ) }</div>
                  {this.renderDays()}
               
          </div>
        </div>
      )

  }
}

Calendar.defaultProps = {
  months: ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],
  daynames: ['Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai']
};


export default Calendar;




