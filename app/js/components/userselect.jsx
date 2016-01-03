import React from 'react';

class UserSelect extends React.Component {
  render(){
    return (<div className="form-group">
                <label for="sel1">Valitse</label>
                 <select value={this.props.value} onChange={this.props.onChange} className="form-control" id="sel1">
                  <option value="taho">taho</option>
                  <option value="melfstro">melffi</option>
                  <option value="hasu">hasu</option>
                </select>
              </div>);
  }

}

export default UserSelect;