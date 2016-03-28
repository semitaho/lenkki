import React from 'react';
import lenkkiService from './../services/lenkkiservice.js';
import AutoCompleter from 'react-autocompleter';

const data = [
  'phrase one',
  'phrase two'
];


class LenkkiModal extends React.Component {

  render() {
    let track = this.props.modal.track ? this.props.modal.track : '';
    let tracks = this.props.modal.tracks;
    let {sports} = this.props;
    return (

      <div id="lenkkiModal" className="modal fade" role="dialog">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.props.onClose} data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Lenkkipäivä {this.props.modal.date}</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="sport">Laji</label>
                  <select className="form-control" id="sport" defaultValue={1}>
                    {sports.map( sport => {
                      return <option value={sport.sport}>{sport.label}</option>
                    }) }
                  </select>

                </div>

                <div className="form-group">
                  <label for="kilometrit">Syötä kilometrit</label>
                  <input type="text" value={this.props.modal.length} onChange={() => this.props.changeLength(this._input.value) }
                         className="form-control" ref={c => this._input = c  }></input>
                </div>
                <div className="form-group">
                  <label for="reitti">Syötä hiihtopaikka</label>
                  {this.props.modal.show ?
                    <AutoCompleter
                      data={tracks}
                      value={track}
                      inputProps={
                        {  
                          autoComplete: 'off',
                          id: 'reitti'
                        }
                      }
                      classes={ {
                        root: 'autocomplete',
                        input: 'form-control',
                        listContainer: 'list-unstyled',
                        
                        listItems: 'autocomplete-items'
                      } }
                      onSelect={ (item) => { 
                        this.props.changeTrack(item);
                    
                      } }
                      onChange={ (value) => { 
                        this.props.changeTrack(value);
                      } }
                      placeholder=''
                      limit={ 10 }
                    /> : ''}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => this.props.onSave(this.props.modal) } className="btn btn-primary" data-dismiss="modal">
                Tallenna
              </button>
            </div>
          </div>

        </div>
      </div>)
  }

  componentDidMount() {
    this._input.focus();
  }

}

LenkkiModal.defaultProps = {sports: [{sport: 1, label: ' Hiihto'}, {sport: 2, label: 'Juoksu'}, {sport: 3, label: 'Pyöräily'}]};
export default LenkkiModal;



