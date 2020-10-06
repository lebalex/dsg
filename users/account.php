<?php
include_once 'header_users.php';
?>

<section class="new_arrivals_area section-padding-80-40 clearfix">
    <div class="container">
        <div class="row">
            <div class="col-12" id="editableField">

            </div>
        </div>
    </div>


</section>

<script type="text/babel">
    class AccountUsers extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      value_id:0,
      value_name:'',
      value_phone:'',
      value_email:'',
      value_p1:'',
      value_p2:'',
      value_p3:'',
      visibleSendBtn1: true,
      visibleSendBtn2: true,
      emptyInputVisible1: false,
      emptyInputVisible2: false,
      errorSendAccount:'',
      errorSendPwd:'',
      savePwdOk:false,
      saveAccountOk:false

    };
  }
    componentDidMount() {
        fetch("/includes/get_data.php?x=get_user_account")
      .then(res => res.json())
      .then(
        (result) => {
            //console.log(result)
          this.setState({
            isLoaded: true,
            value_id: result[0].id,
            value_name: result[0].name,
            value_phone: result[0].phone,
            value_email: result[0].email,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }
  changeName(e) {
        this.setState({ value_name: e.target.value })
    }
    changePhone(e) {
        this.setState({ value_phone: e.target.value })
    }
    changeEmail(e) {
        this.setState({ value_email: e.target.value })
    }
    changeP1(e) {
        this.setState({ value_p1: e.target.value })
    }
    changeP2(e) {
        this.setState({ value_p2: e.target.value })
    }
    changeP3(e) {
        this.setState({ value_p3: e.target.value })
    }
    saveAccount()
    {
        let emptyInputVisible = false;
        if(this.state.value_name==='' || this.state.value_phone==='' || this.state.value_email==='')
        {
            emptyInputVisible=true;
        }
        this.setState({
            visibleSendBtn1: emptyInputVisible,
            emptyInputVisible1: emptyInputVisible
        });

        if (!emptyInputVisible) {

            const formData = new FormData()
            formData.append('x', 'save_account')
            formData.append('id', this.state.value_id)
            formData.append('name', this.state.value_name)
            formData.append('phone', this.state.value_phone)
            formData.append('email', this.state.value_email)
            fetch('/includes/set_data.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    /*console.log(data)
                    console.log(data.code)
                    console.log(data.error)*/
                    if (data.code !=-1) {
                        this.setState({
                            saveAccountOk: true,
                            visibleSendBtn1:!this.state.visibleSendBtn1
                        });
                    } else {
                        this.setState({
                            errorSendAccount: data.error,
                            visibleSendBtn1:!this.state.visibleSendBtn1
                        });
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }
    saveNewPwdClick()
    {
        if (this.state.value_p2===this.state.value_p3 && this.state.value_p2!='') {
            this.setState({
                visibleSendBtn2: !this.state.visibleSendBtn2
        });

            const formData = new FormData()
            formData.append('x', 'setchangepwd')
            formData.append('id', this.state.value_id)
            formData.append('p1', this.state.value_p1)
            formData.append('p2', this.state.value_p2)

            fetch('/includes/set_data.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code !=-1) {
                        this.setState({
                            savePwdOk: true,
                            visibleSendBtn2: !this.state.visibleSendBtn2,value_p1:'',value_p2:'',value_p3:''
                        });
                    } else {
                        this.setState({
                            errorSendPwd: data.error,
                            visibleSendBtn2: !this.state.visibleSendBtn2,value_p1:'',value_p2:'',value_p3:''
                        });
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }else{
            this.setState({
                errorSendPwd: "Не правильно повторили пароль!",

                        });
        }
    }
  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else  {
        return (
            <div className="row">
                    <div className="col-12 col-sm-6 col-md-6">
                    <h6>Профиль пользователя</h6>
                        <div className="messages">
                            <div style={{ display: (!this.state.saveAccountOk) ? 'none' : 'block' }} className="thanks_form">
                                <h4>Спасибо, профиль сохранен</h4>
                            </div>
                        </div>
                        <div className="messages">
                            <div style={{ display: this.state.emptyInputVisible1 ? 'block' : 'none' }} className="error_form">
                                <h4>Заполните форму!</h4>
                            </div>
                        </div>
                        <div className="messages">
                            <div style={{ display: (this.state.errorSendAccount === '') ? 'none' : 'block' }} className="error_form2">
                                {this.state.errorSendAccount}

                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="first_name">Имя <span>*</span></label>
                            <input type="text" className="form-control" id="first_name" name="first_name" require="true" value={this.state.value_name} onChange={(e) => this.changeName(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="phone_number">Телефон <span>*</span></label>
                            <input type="number" className="form-control" id="phone_number" name="phone_number" min="0" require="true" value={this.state.value_phone} onChange={(e) => this.changePhone(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="email_address">Email <span>*</span></label>
                            <input type="text" className="form-control" id="email_address" name="email_address" require="true" value={this.state.value_email} onChange={(e) => this.changeEmail(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <button id="saveAccount"  onClick={() => this.saveAccount()} className="btn essence-btn"
                                style={{ display: this.state.visibleSendBtn1 ? 'block' : 'none' }}>Сохранить</button>
                            <div id="submit_img" style={{ display: this.state.visibleSendBtn1 ? 'none' : 'block' }}>
                                <img src="/img/core-img/loading.gif" width="70" height="70" />
                            </div>

                        </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-6">
                        <h6>Изменить пароль</h6>
                        <div className="messages">
                            <div style={{ display: (!this.state.savePwdOk) ? 'none' : 'block' }} className="thanks_form">
                                <h4>Спасибо, новый пароль сохранен</h4>
                            </div>
                        </div>
                        <div className="messages">
                            <div style={{ display: this.state.emptyInputVisible2 ? 'block' : 'none' }} className="error_form">
                                <h4>Заполните форму!</h4>
                            </div>
                        </div>
                        <div className="messages">
                            <div style={{ display: (this.state.errorSendPwd === '') ? 'none' : 'block' }} className="error_form2">
                                {this.state.errorSendPwd}
                                <br/>
                                Мы отправили сообщение администратору сайта.
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="second_password">Старый пароль</label>
                            <input type="password" style={{width:'200px'}} className="form-control" id="first_password" name="first_password" value={this.state.value_p1}  require="true" onChange={(e) => this.changeP1(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="second_password">Новый пароль</label>
                            <input type="password" style={{width:'200px'}} className="form-control" id="second_password" name="second_password" value={this.state.value_p2}  require="true" onChange={(e) => this.changeP2(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="third_password">Повторите новый пароль</label>
                            <input type="password" style={{width:'200px'}} className="form-control" id="third_password" name="third_password" value={this.state.value_p3} require="true" onChange={(e) => this.changeP3(e)} />
                        </div>
                    
                        <div className="col-12 mb-3">
                            <button id="sendOrder" onClick={() => this.saveNewPwdClick()} className="btn essence-btn"
                                style={{ display: this.state.visibleSendBtn2 ? 'block' : 'none' }}>Сменить</button>
                            <div id="submit_img" style={{ display: this.state.visibleSendBtn2 ? 'none' : 'block' }}>
                                <img src="/img/core-img/loading.gif" width="70" height="70" />
                            </div>

                        </div>
                        </div>
                        </div>


        );
    }
}
    }
    ReactDOM.render(
    <AccountUsers />,
    document.getElementById('editableField')
  );

  
  
  </script>

<?php include_once '../footer.php'; ?>