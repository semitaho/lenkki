import React from 'react';

class Day  extends React.Component {
  constructor(){
    super();
    this.state = {showmodal: false};
  }

  render(){
    return (<div data-target="#lenkkiModal" data-toggle="modal" onClick={() => this.props.onClick(this.props.value) }  className={this.props.state}>
        <div>{this.props.value}</div>
      
      </div>)
  }
}

export default Day;