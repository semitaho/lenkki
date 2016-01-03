import React from 'react';

class Day  extends React.Component {
  constructor(){
    super();
    this.state = {showmodal: false};
  }

  render(){
    return (<div data-target="#lenkkiModal" data-toggle="modal" onClick={() => this.props.onClick(this.props.value, this.props.length, this.props._id) }  className={this.props.state}>
        <div>{this.props.value}</div>
        {this.props.length ? <small><b>{this.props.length} km</b></small> : ''}
      
      </div>)
  }
}

export default Day;