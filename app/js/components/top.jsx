import React from 'react';

class Top extends React.Component{

  render(){
    return (<div>
              <h3>TOP {this.props.visible}</h3>
              <ol>
              {this.props.items.map(item => {
                return <li><b>{item.name}</b><small className="pull-right">{(item.length / 100).toString().replace('.', ',')} km</small></li>
              })}
              </ol>

            </div>)  
  }

}

export default Top;