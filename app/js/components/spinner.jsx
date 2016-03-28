import React from 'react';
import ReactDOM from 'react-dom';
import Spinjs from '../vendor/spin.js';
import $ from 'jquery';

class Spinner extends React.Component {

  render() {
    return <div />
  }

  componentWillUnmount() {
    var jht = $('body');
    jht.removeClass('darkened');
  }

  componentDidMount() {
    var spinjs = new Spinjs().spin();
    console.log('spinjs', spinjs);
    ReactDOM.findDOMNode(this).appendChild(spinjs.el);
    var jht = '';
    if (this.props.dimm) {
      var jht = $('#' + this.props.dimm);
    } else {
      jht = $('body');
    }
    jht.addClass('darkened');
  }

}

export default Spinner