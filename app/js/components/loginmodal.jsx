import React from 'react';
import ReactDOM from 'react-dom';
import Lenkki from './lenkki';
import $ from 'jquery';
class LoginModal extends React.Component {
  render(){

    const fbStatus = () => {
      console.log('on status');
      FB.login(response => {
        if (response.status === 'connected') {
          location.reload(true);
        }

      });
    };
    return (<div id="modallogin" className="modal fade" tabIndex="-1">
          <div className="modal-dialog">       
            <div className="modal-content">
              <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
               <h4 className="modal-title">Kirjaudu sovellukseen</h4>
              </div>
              <div className="modal-footer">
                <div className="btn btn-primary" data-scope="email" onClick={fbStatus}>Kirjaudu Facebookin kautta</div>
              </div>
            </div>
      </div>
    </div>)  
  }

  componentDidMount(){
    $('#modallogin').modal('show');
  }
}

export default LoginModal;