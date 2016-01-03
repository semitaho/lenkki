import React from 'react';
import lenkkiService from './../services/lenkkiservice.js';


class LenkkiModal extends React.Component{

  constructor(){
    super();
    this.state = {currentvalue : 0};
  }
  render(){

    const onSave = () => {
      console.log('kilometrit', this._input.value);
      let length = this._input.value.replace(',', '.') * 100;
      lenkkiService.store(this.props._id, 'taho', this.props.day, this.props.month, this.props.year, length, success => {
        console.log('on success', success);
        this.props.onSave(success);

      });
    };

    const onChange = () => {
      var pattern = /^\d+((\,)?\d{0,2})?$/;


      if (this._input.value.trim() === ''){
        this.setState({currentvalue: ''});
      }
      else if (pattern.test(this._input.value)){
        this.setState({currentvalue: this._input.value});
        console.log('valid', this._input.value);
      } else {
        console.log('invalid', this._input.value);
      }
    };

    console.log('props', this.props);
    
    return (
      <div id="lenkkiModal" className="modal fade" role="dialog">
          <div className="modal-dialog modal-sm"  role="document">       
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
               <h4 className="modal-title">Lenkkipäivä {this.props.date}</h4>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="kilometrit">Syötä kilometrit</label>
                    <input type="text" value={this.state.currentvalue} onChange={onChange} className="form-control" ref={c => this._input = c  } ></input>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
               <button type="button" onClick={onSave} className="btn btn-primary" data-dismiss="modal">Tallenna</button>
            </div>
          </div> 
         </div>
      </div>)
  }

  componentWillReceiveProps(nextprops){
    this.setState({currentvalue: nextprops.length})
  }

  componentDidMount(){
    this._input.focus();
  }

}

export default LenkkiModal;



