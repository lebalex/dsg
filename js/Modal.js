class Modal extends React.Component {
    render() {
      // Render nothing if the "show" prop is false
      if(!this.props.show) {
        return null;
      }
  
  
      return (
          <div className="popup">
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
        </div>
      );
    }
  }