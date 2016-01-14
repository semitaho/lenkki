import React from 'react';
import Calendar from './calendar';
import LenkkiModal from './lenkkimodal';
import UserSelect from './userselect';
import { connect } from 'react-redux'
import {toggleMonth, clickDay, saveDay,changeLength, closeModal,changeTrack, fetchTracks,didShare, setName, fetchData,readBestKilometers} from './../actions';
import lenkkiService from './../services/lenkkiservice.js';
import Spinner from './spinner.jsx';
import FBShare from './fbshare.jsx';
import Top from './top.jsx';

import LoginModal from './loginmodal.jsx';
class Lenkki extends React.Component {

  render() {
    let {app, dispatch, year, month, modal, user, clickDay} = this.props;
  
    return (
      <div className="container-fluid">
        {app.showlogin ? <LoginModal /> : ''}
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
            Tervetuloa {this.props.user.name}.
          </div>
        </div>
        {app.showapp ? <div>
        
        <div className="row">
          <div className="col-md-10">
            <h1>Hiihtopäiväkirja</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="carousel">
              <div className="carousel-inner">
                <Calendar {...user} onClick={clickDay} year={year} month={this.props.month}
                                    lenkkidata={this.props.lenkkidata}/>
              </div>
              <a className="carousel-control left" onClick={this.props.onPrevious}>
                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              </a>
              <a className="carousel-control right" onClick={this.props.onNext}>
                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              </a>
            </div>
          </div>
        </div></div> : ''}
        <div className="row">
          <div className="col-md-9">
            <div className="fb-page" data-href="https://www.facebook.com/Latutilanne/" data-tabs="timeline" data-width="500" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
              <div className="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/Latutilanne/"><a href="https://www.facebook.com/Latutilanne/">Latutilanne</a></blockquote></div>
            </div>
          </div>
          <div className="col-md-3">
            <Top {...this.props.top} />
          </div>
        </div>
     {this.props.fbshare && this.props.fbshare.showdialog ?
          <FBShare track={this.props.fbshare.track} length={this.props.fbshare.length} day={this.props.fbshare.day} didShare={this.props.didShare}/>
          : '' }
        <LenkkiModal modal={modal} onClose={this.props.closeModal} changeTrack={this.props.changeTrack} changeLength={this.props.changeLength} onSave={this.props.saveDay}/> 
        {this.props.spinner && !app.showlogin ?
          <Spinner /> : ''}
     </div>
      
     
    )
  }

  componentDidMount(){
    window.fbAsyncInit = () =>  {
     if (window.location.hostname.indexOf('semitaho.github.io') > -1) {
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
        this.statusChangeCallback(response);
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
  }

  statusChangeCallback(response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    FB.api('/me', (response) => {
      console.log('Good to see you', response);
      this.props.showApp();
      this.props.setName(response.id, response.name);
      this.props.fetchTracks();
      this.props.fetchData(response.id);
      this.props.readBestKilometers(this.props.month-1, this.props.year);

   

    });
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    console.log('Please log into this app.');
    this.props.showLogin();
  } else {
    console.log('Please log into Facebook.');
    this.props.showLogin();

  }
}

}

function select(state) {
  return {
    year: state.calendar.year,
    month: state.calendar.month,
    user: state.calendar.user,
    lenkkidata: state.calendar.data,
    modal: state.modal,
    spinner: state.spinner,
    fbshare: state.fbshare,
    app : state.app,
    top: state.top
  };
}
function dispatchToProps(dispatch) {
  return {
    onPrevious: () =>  dispatch(toggleMonth(false)),
    onNext: () => dispatch(toggleMonth(true)),
    changeLength: (val) => dispatch(changeLength(val)),
    clickDay: (id, userid, length, year, month, day, track) => dispatch(clickDay(id, userid, length, year, month, day, track)),
    saveDay: (modal) => dispatch(saveDay(modal)),
    didShare: () => dispatch(didShare()),
    showApp : () => dispatch({type: 'SHOW_APP'}),
    setName : (param1, param2) => dispatch(setName(param1, param2)),
    fetchData : (param1) => dispatch(fetchData(param1)),
    fetchTracks : () => dispatch(fetchTracks()),
    readBestKilometers: (month,year) => dispatch(readBestKilometers(month,year)),
    showLogin : () => dispatch({type: 'SHOW_LOGIN'}),
    changeTrack: (track) => dispatch(changeTrack(track)),
    closeModal: () => dispatch(closeModal())
  };
}

export default connect(select, dispatchToProps)(Lenkki);