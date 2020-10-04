class CheckOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleSendBtn: true,
            enableSendBtn: false,
            registration: false,
            emptyInputVisible: false,
            value_name: '',
            value_phone: '',
            value_email: '',
            value_description: '',
            itemsProduct: this.props.items,
            orderSend: false,
            orderSendData: ''
        };
    }



    tovar() {
        switch (this.countProd()) {
            case 1: return 'товар';
            case 2:
            case 3:
            case 4: return 'товара';
            default: return 'товаров';
        }

    }
    countProd() {
        let result = 0;
        { this.state.itemsProduct.map(item => (result += item.count)) }
        return result;
    }
    setEnableSendBtn() {
        console.log('setEnableSendBtn')
        this.setState({
            enableSendBtn: !this.state.enableSendBtn
        });
    }
    setRegistration() {
        console.log('setRegistration')
        this.setState({
            registration: !this.state.registration
        });
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
    changeDescription(e) {
        this.setState({ value_description: e.target.value })
    }

    sendOrderClick() {
        //console.log('sendOrderClick')
        let emptyInputVisible = false;
        if(this.state.value_name==='' || this.state.value_phone==='' || this.state.value_email==='')
        {
            emptyInputVisible=true;
        }
        this.setState({
            visibleSendBtn: emptyInputVisible,
            emptyInputVisible: emptyInputVisible
        });
        var json_arr = JSON.stringify(this.state.itemsProduct);
        //console.log(json_arr)
        if (!emptyInputVisible) {
            const formData = new FormData()
            formData.append('x', 'setorder')
            formData.append('name', this.state.value_name)
            formData.append('phone', this.state.value_phone)
            formData.append('email', this.state.value_email)
            formData.append('description', this.state.value_description)
            formData.append('registration', this.state.registration)

            formData.append('items', json_arr)
            fetch('/includes/set_data.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    console.log(data.code)
                    console.log(data.error)
                    if (data.code !=-1) {
                        this.setState({
                            orderSend: true,
                            orderSendData: data.code,
                        });
                    } else {
                        this.setState({
                            orderSendData: data.error,
                            visibleSendBtn:!this.state.visibleSendBtn
                        });
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

    render() {


        let sumprod = this.props.sum
        if (this.state.orderSend) {
            return (
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-6">
                        <div className="col-12 mb-3">
                            <div className="row">
                                <div className="col-10">
            <h4>Ваш заказ №{this.state.orderSendData} отправлен</h4>
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
                        <div className="col-12 mb-3">

                            <div className="row">
                                <div className="col-5">
                                    <a onClick={this.props.onBack}>назад в корзину</a>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-5">
                                    <h4>Ваш заказ</h4>
                                </div>
                                <div className="col-5">
                                    <h6>{this.countProd()} {this.tovar()}</h6>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-5">
                                    <h5>Итого</h5>
                                </div>
                                <div className="col-5">
                                    <h6>{sumprod}</h6>
                                </div>
                            </div>

                        </div>


                    </div>
                    <div className="col-12 col-sm-6 col-md-6">
                        <h6>Оформление заказа</h6>
                        <div className="messages">
                            <div style={{ display: 'none' }} className="thanks_form">
                                <h4>Спасибо, ваш заказ отправлен.</h4>
                            </div>
                        </div>
                        <div className="messages">
                            <div style={{ display: this.state.emptyInputVisible ? 'block' : 'none' }} className="error_form">
                                <h4>Заполните форму!</h4>
                            </div>
                        </div>
                        <div className="messages">
                            <div style={{ display: (this.state.orderSendData === '') ? 'none' : 'block' }} className="error_form2">
                                {this.state.orderSendData}
                                <br/>
                                Мы отправили сообщение администратору сайта.
                            </div>
                        </div>


                        <div className="col-12 mb-3">
                            <label htmlFor="first_name">Имя <span>*</span></label>
                            <input type="text" className="form-control" id="first_name" name="first_name" require="true" onChange={(e) => this.changeName(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="phone_number">Телефон <span>*</span></label>
                            <input type="number" className="form-control" id="phone_number" name="phone_number" min="0" require="true" onChange={(e) => this.changePhone(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="email_address">Email <span>*</span></label>
                            <input type="text" className="form-control" id="email_address" name="email_address" require="true" onChange={(e) => this.changeEmail(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="description">Коментарий</label>
                            <textarea className='form-control' id="description" name="description" onChange={(e) => this.changeDescription(e)} ></textarea>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="custom-control custom-checkbox d-block mb-2">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" onClick={() => this.setEnableSendBtn()} />
                                <label className="custom-control-label" htmlFor="customCheck1">Я согласен на обработку персональных данных!&nbsp;
                            <a id="agreement_show">Правила обработки</a></label>
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="custom-control custom-checkbox d-block mb-2">
                                <input type="checkbox" className="custom-control-input" id="customCheck2" onClick={() => this.setRegistration()} />
                                <label className="custom-control-label" htmlFor="customCheck2">Зарегистрироваться на сайте</label>
                            </div>
                        </div>
                        <input type="hidden" name="action" value="checkout" />



                        <div className="col-12 mb-3">
                            <button id="sendOrder" disabled={!this.state.enableSendBtn} onClick={() => this.sendOrderClick()} className="btn essence-btn"
                                style={{ display: this.state.visibleSendBtn ? 'block' : 'none' }}>Отправить</button>
                            <div id="submit_img" style={{ display: this.state.visibleSendBtn ? 'none' : 'block' }}>
                                <img src="/img/core-img/loading.gif" width="70" height="70" />
                            </div>

                        </div>




                    </div>
                </div>



            );
        }
    }

}