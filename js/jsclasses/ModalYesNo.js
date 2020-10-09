export class ModalYesNo extends React.Component {
    render() {
      if(!this.props.show) {
        return null;
      }

       /*<div className="popup">
          <div className="modal2">
            {this.props.children}
  
            <div className="footerModal2">
              <button onClick={this.props.onYes} className="btn edit-btn-yes">
              <i className="icon-ok"/>Да
              </button>
              <button onClick={this.props.onNo} className="btn edit-btn">
              <i className="icon-cancel"/>Нет
              </button>
            </div>
          </div>
      </div>*/

      return (

        <div className="modal fade" id="modalYesNo" tabIndex="-1" role="dialog" aria-labelledby="modalYesNoTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                {this.props.children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.props.onYes}>Да</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">Нет</button>
            </div>
          </div>
        </div>
      </div>

         
        
      );
    }
  }