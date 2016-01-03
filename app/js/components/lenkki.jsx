import React from 'react';
import Calendar from './calendar';
import LenkkiModal from './lenkkimodal';
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
class Lenkki  extends React.Component {

  constructor(){
    super();
    this.state = {month: 1, year: 2016, showmodal: false};
    this.toggleMonth = this.toggleMonth.bind(this);
  }

  toggleMonth(direction){
    var currentMonth = new Date(this.state.year, this.state.month-1, 1);
    if (direction){
      currentMonth.setMonth(currentMonth.getMonth()+1);
    } else {     
      currentMonth.setMonth(currentMonth.getMonth()-1);
    }
    console.log('current', currentMonth.getMonth());
    this.setState({year: currentMonth.getFullYear(), month: currentMonth.getMonth()+1});
    
  }

  render(){
    const onClick = (val) => {
      let dateStr = val+'.'+this.state.month+'.'+this.state.year;
      console.log('datestr', dateStr);
      this.setState({date: dateStr, day: val})
      console.log('on click', val);
    }

    return (
        <div className="container-fluid">
          <h1>hello world</h1>
          <div className="row">
            <div className="col-md-12">
              <div className="carousel">
                  <div className="carousel-inner">
                      <Calendar onClick={onClick}  year={this.state.year} month={this.state.month} />
                  </div>
                <a className="carousel-control left" onClick={() => {this.toggleMonth(false) } }>
                  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                </a>
                <a className="carousel-control right" onClick={() => {this.toggleMonth(true) } } >
                  <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                </a>
                </div>
            </div> 
          </div>
          <LenkkiModal date={this.state.date} day={this.state.day} month={this.state.month-1} year={this.state.year} />
        </div>
    )
  }

}

export default Lenkki;