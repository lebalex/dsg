export class RestorePwd extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      value_email:'',
      visibleSendBtn: true,
      emptyInputVisible: false,
      errorSendPwd:'',
      savePwdOk:false,

    };
  }
  changeEmail(e) {
        this.setState({ value_email: e.target.value })
    }
    sendNewPwdClick()
    {
        if (this.state.value_email!='') {
            this.setState({
                visibleSendBtn: !this.state.visibleSendBtn
        });

            const formData = new FormData()
            formData.append('x', 'restore_pwd')
            formData.append('email', this.state.value_email)

            fetch('/includes/set_data.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    if (data.code === 1) {
                        this.setState({
                            savePwdOk: true,
                            visibleSendBtn: !this.state.visibleSendBtn,value_email:''
                        });
                    } else {
                        this.setState({
                            errorSendPwd: data.error,
                            visibleSendBtn: !this.state.visibleSendBtn,value_email:''
                        });
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }else{
            this.setState({
                emptyInputVisible:true
                        });
        }
    }
    render() {
        return (
            <div className="col-12 col-sm-6 col-md-6">
                    <h6>Восстановить пароль</h6>
                        <div className="messages">
                            <div style={{ display: (!this.state.savePwdOk) ? 'none' : 'block' }} className="thanks_form">
                                <h4>Новый пароль отправлен вам по указанному адресу</h4>
                            </div>
                        </div>
                        <div className="messages">
                            <div style={{ display: this.state.emptyInputVisible ? 'block' : 'none' }} className="error_form">
                                <h4>Заполните форму!</h4>
                            </div>
                        </div>
                        <div className="messages">
                            <div style={{ display: (this.state.errorSendPwd === '') ? 'none' : 'block' }} className="error_form2">
                                {this.state.errorSendPwd}

                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="email_address">Email <span>*</span></label>
                            <input type="text" className="form-control" id="email_address" name="email_address" require="true" value={this.state.value_email} onChange={(e) => this.changeEmail(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <button id="saveAccount"  onClick={() => this.sendNewPwdClick()} className="btn essence-btn"
                                style={{ display: this.state.visibleSendBtn ? 'block' : 'none' }}>Отправить</button>
                            <div id="submit_img" style={{ display: this.state.visibleSendBtn ? 'none' : 'block' }}>
                                <img src="/img/core-img/loading.gif" width="70" height="70" />
                            </div>

                        </div>
                        </div>


        );

    }
}
ReactDOM.render(<RestorePwd />, document.getElementById('data_page')  );