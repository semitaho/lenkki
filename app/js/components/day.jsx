import React from 'react';

class Day  extends React.Component {
  constructor(){
    super();
    this.state = {showmodal: false};
  }

  render(){
    return (<div className="row" data-target="#lenkkiModal" data-toggle="modal"  className={this.props.state}>
        <div className="col-md-12">{this.props.value}</div>

        {this.props.length ? <div className="col-md-12"><small><b>{this.props.length} km</b></small></div> : ''}
        {this.props.track ? <div className="col-md-12"><small>{this.props.track}</small></div>: ''}
       
      </div>)
  }
}

export default Day;