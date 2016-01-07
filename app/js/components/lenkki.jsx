import React from 'react';
import Calendar from './calendar';
import LenkkiModal from './lenkkimodal';
import UserSelect from './userselect';
import { connect } from 'react-redux'
import {toggleMonth} from './../actions';
import lenkkiService from './../services/lenkkiservice.js';


class Lenkki  extends React.Component {

  constructor(){
    super();
    this.state = {month: 1, year: 2016, showmodal: false,  userselectvalue: lenkkiService.getUser()};
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
                      <Calendar onClick={onClick}  year={this.props.year} month={this.props.month} lenkkidata={this.props.lenkkidata} />
                  </div>
                <a className="carousel-control left" onClick={() => {this.props.dispatch(toggleMonth(false)) } }>
                  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                </a>
                <a className="carousel-control right" onClick={() => {this.props.dispatch(toggleMonth(true)) } } >
                  <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                </a>
                </div>
            </div> 
          </div>
          <LenkkiModal _id={this.state._id} date={this.state.date} day={this.state.day} length={this.state.length} month={this.state.month-1} year={this.state.year} onSave={onSave} />
        </div>
    )
  }

}

function select(state){
  return {
    name: state.name,
    year: state.year,
    month: state.month,
    lenkkidata: state.data
  };

}

export default connect(select)(Lenkki);