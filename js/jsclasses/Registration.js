export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyInputVisible: false,
            registrationSend: false,
            registrationSendError: '',
            emailValid: true,
            enableSendBtn: false,
            visibleSendBtn: true,
            pwdDiff: false,
            value_name: '',
            value_phone: '',
            value_email: '',
            value_p1: '',
            value_p2: '',



        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {

    }
    changeName(e) {
        this.setState({ value_name: e.target.value, emptyName: false })
    }
    changePhone(e) {
        this.setState({ value_phone: e.target.value, emptyPhone: false })
    }
    changeEmail(e) {
        this.setState({ value_email: e.target.value, emailValid: true })
    }
    changeP1(e) {
        this.setState({ value_p1: e.target.value, pwdDiff: false })
    }
    changeP2(e) {
        this.setState({ value_p2: e.target.value, pwdDiff: false })
    }
    setRegistration() {
        this.setState({
            enableSendBtn: !this.state.enableSendBtn
        });
    }

    handleSubmit(event) {
        let emptyInputVisible = false;


        if (this.state.value_p1 === '' || this.state.value_p2 === '') {
            emptyInputVisible = true;
            this.setState({ pwdDiff: true })
        }
        let emailValid = this.state.value_email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (!emailValid) emptyInputVisible = true;


        if (this.state.value_p1 != this.state.value_p2) {
            emptyInputVisible = true;
            this.setState({ pwdDiff: true })
        } else {
            if (this.state.value_p1.length < 8) {
                emptyInputVisible = true;
                this.setState({ registrationSendError: 'Пароль не может быть короче 8 символов!' })
            }
        }


        this.setState({
            visibleSendBtn: emptyInputVisible,
            emptyInputVisible: emptyInputVisible,
            emailValid: emailValid
        });
        if (!emptyInputVisible) {
            /*console.log(this.state.value_name);
            console.log(this.state.value_phone);
            console.log(this.state.value_email);
            console.log(this.state.value_p1);*/
            const formData = new FormData()
            formData.append('x', 'registration')
            formData.append('name', this.state.value_name)
            formData.append('phone', this.state.value_phone)
            formData.append('email', this.state.value_email)
            formData.append('pwd', this.state.value_p1)
            formData.append('token', event.target.elements.token.value)
            formData.append('action', event.target.elements.action.value)



            fetch('/includes/set_data.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    if (data.code === 0) {
                        this.setState({
                            registrationSend: true
                        });
                    } else {
                        this.setState({
                            registrationSendError: data.error,
                            visibleSendBtn: !this.state.visibleSendBtn,
                            emptyInputVisible: false
                        });
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.setState({
                        registrationSendError: error,
                        visibleSendBtn: !this.state.visibleSendBtn,
                        emptyInputVisible: false
                    });
                })
        }
        event.preventDefault();
    }
    render() {
        if (this.state.registrationSend) {
            return (
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="col-12 mb-3">
                            <div className="row">
                                <div className="col-12">
                                    <h5>Спасибо, вам отправлено письмо с подтверждение регистрации на сайте DSG Комплект. Письмо может попасть в папку "СПАМ"!</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {

            return (
                <div className="row">
                    
                    <div className="col-12 col-sm-6 col-md-6">
                        <h6>Регистрация на сайте DSG Комплект</h6>
                        <div className="messages">
                            <div style={{ display: this.state.emptyInputVisible ? 'block' : 'none' }} className="error_form">
                                <h4>Заполните форму!</h4>
                            </div>
                        </div>
                        <div className="messages">
                            <div style={{ display: (this.state.registrationSendError === '') ? 'none' : 'block' }} className="error_form2">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.registrationSendError}
                                </div>
                            </div>
                        </div>
                        <form className="needs-validation"  onSubmit={this.handleSubmit}>

                        <div className="col-12 mb-3">
                            <label htmlFor="first_name">Имя <span>*</span></label>
                            <input type="text" className="form-control" id="first_name" name="first_name" required value={this.state.value_name} onChange={(e) => this.changeName(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="phone_number">Телефон <span>*</span></label>
                            <input type="tel" className="form-control" id="phone_number" name="phone_number"  required value={this.state.value_phone} onChange={(e) => this.changePhone(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="email_address">Email <span>*</span></label>
                            <input type="text" className={(this.state.emailValid) ? "form-control" : "form-control is-invalid"}  id="email_address" name="email_address" required value={this.state.value_email} onChange={(e) => this.changeEmail(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="second_password">Пароль <span>*</span></label>
                            <input type="password" style={{ width: '200px' }} className={(!this.state.pwdDiff) ? "form-control" : "form-control is-invalid"} id="first_password" name="first_password" required onChange={(e) => this.changeP1(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="third_password">Повторите пароль <span>*</span></label>
                            <input type="password" style={{ width: '200px' }} className={(!this.state.pwdDiff) ? "form-control" : "form-control is-invalid"} id="second_password" name="second_password" required onChange={(e) => this.changeP2(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <div className="custom-control custom-checkbox d-block mb-2">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" onClick={() => this.setRegistration()} />
                                <label className="custom-control-label" htmlFor="customCheck1">Я согласен на обработку персональных данных!&nbsp;
                        <a data-toggle="modal" data-target="#agreementModalLong">Правила обработки</a></label>
                            </div>
                        </div>

                        <input type="hidden" name="action" value="registration"/>
                    <input type="hidden" name="token" id="token"/>





                        <div className="col-12 mb-3">
                            <button id="sendOrder" disabled={!this.state.enableSendBtn}  type="submit"  className="btn btn-primary"
                                style={{ display: this.state.visibleSendBtn ? 'block' : 'none' }}>Зарегистрироваться</button>
                            <div id="submit_img" style={{ display: this.state.visibleSendBtn ? 'none' : 'block' }}>
                                <img src="/img/core-img/loading.gif" width="70" height="70" />
                            </div>

                        </div>

                        </form>


                    </div>
                    
                </div>



            );
        }
    }

}
ReactDOM.render(<Registration />, document.getElementById('data_page'));