import React from 'react';
import Calendar from './calendar';
import LenkkiModal from './lenkkimodal';
import UserSelect from './userselect';
import { connect } from 'react-redux'
import {toggleMonth, clickDay, saveDay,changeLength} from './../actions';
import lenkkiService from './../services/lenkkiservice.js';


class Lenkki  extends React.Component {


  render(){
    let {dispatch, year, month, modal, user, clickDay} = this.props;

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
                      <Calendar {...user} onClick={clickDay}  year={year} month={this.props.month} lenkkidata={this.props.lenkkidata} />
                  </div>
                <a className="carousel-control left" onClick={this.props.onPrevious}>
                  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                </a>
                <a className="carousel-control right" onClick={this.props.onNext} >
                  <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                </a>
                </div>
            </div> 
          </div>
          <LenkkiModal modal={modal} changeLength={this.props.changeLength} onSave={this.props.saveDay} />
        </div>
    )
  }

}

function select(state){
  return {
    year: state.calendar.year,
    month: state.calendar.month,
    user: state.calendar.user,
    lenkkidata: state.calendar.data,
    modal: state.modal
  };
}
function dispatchToProps(dispatch){
  return {
    onPrevious : () =>  dispatch(toggleMonth(false)),
    onNext: () => dispatch(toggleMonth(true)),
    changeLength: (val) => dispatch(changeLength(val)),
    clickDay: (id, userid, length,year,month,day) => dispatch(clickDay(id, userid,length,year, month, day)),
    saveDay: (modal) => dispatch(saveDay(modal))
  };
}

export default connect(select, dispatchToProps)(Lenkki);