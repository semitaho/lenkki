import React from 'react';
import Day from './day';
import LenkkiModal from './lenkkimodal';
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
          html.push(<div className="col-box text-right day-box"><Day onClick={this.props.onClick} value={day} state={currentClass} /></div>);
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
                         <h3>{monthName} {this.props.year}</h3>
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




