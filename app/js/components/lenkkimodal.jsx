import React from 'react';
import lenkkiService from './../services/lenkkiservice.js';


class LenkkiModal extends React.Component{

  render(){  
    return (
      <div id="lenkkiModal" className="modal fade" role="dialog">
          <div className="modal-dialog modal-sm"  role="document">       
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
               <h4 className="modal-title">Lenkkipäivä {this.props.modal.date}</h4>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="kilometrit">Syötä kilometrit</label>
                    <input type="text" value={this.props.modal.length} onChange={() => this.props.changeLength(this._input.value) } className="form-control" ref={c => this._input = c  } ></input>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
               <button type="button" onClick={() => this.props.onSave(this.props.modal) } className="btn btn-primary" data-dismiss="modal">Tallenna</button>
            </div>
          </div> 
         </div>
      </div>)
  }

  componentDidMount(){
    this._input.focus();
  }

}

export default LenkkiModal;



