import React from 'react';
import Calendar from './calendar';
import LenkkiModal from './lenkkimodal';
import UserSelect from './userselect';
import lenkkiService from './../services/lenkkiservice.js';



class Lenkki  extends React.Component {

  constructor(){
    super();
    this.state = {month: 1, year: 2016, showmodal: false, lenkkidata: [], userselectvalue: lenkkiService.getUser()};
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
    const onClick = (val, length, _id) => {
      let dateStr = val+'.'+this.state.month+'.'+this.state.year;
      this.setState({date: dateStr, day: val, length, _id})
    }
    const onSave = () => {
      this.loadData();
    };

    const onUserChange = (event) => {
      console.log('new value', event.target.value);
      lenkkiService.storeUser(event.target.value);
      this.setState({userselectvalue: event.target.value});
      this.loadData(event.target.value);
    }

    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10">
              <div
                className="fb-like"
                data-share="true"
                data-width="450"
                data-show-faces="true">
              </div>
            </div>
             <div className="col-md-2 text-right">
              Tervetuloa {this.props.name}.
            </div>
          </div>
          <div className="row">
            <div className="col-md-10">
              <h1>Hiihtopäiväkirja</h1>
            </div>
          </div>
         
          <div className="row">
            <div className="col-md-12">
              <div className="carousel">
                  <div className="carousel-inner">
                      <Calendar onClick={onClick}  year={this.state.year} month={this.state.month} lenkkidata={this.state.lenkkidata} />
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
          <LenkkiModal _id={this.state._id} date={this.state.date} day={this.state.day} length={this.state.length} month={this.state.month-1} year={this.state.year} onSave={onSave} />
        </div>
    )
  }
  loadData(user){
    lenkkiService.read(user ,data => {
      this.setState({lenkkidata: data});
    });
  }

  componentDidMount(){
    this.loadData();
 
  }

}

export default Lenkki;