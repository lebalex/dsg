class ChangePwd extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      user_id:this.props.id,
      value_p1:this.propspwd,
      value_p2:'',
      value_p3:'',
      changeOk:false,
      executing:false

    };
  }
    changeP2(e) {
        this.setState({ value_p2: e.target.value })
    }
    changeP3(e) {
        this.setState({ value_p3: e.target.value })
    }
    sendChangeClick() {
        //console.log('sendOrderClick')


        if (this.state.value_p2===this.state.value_p3 && this.state.value_p2!='') {
            this.setState({
            executing: !this.state.executing
        });

            const formData = new FormData()
            formData.append('x', 'setchangepwd')
            formData.append('id', this.state.user_id)
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
                            changeOk: true
                        });
                    } else {
                        this.setState({
                            error: data.error,
                            executing: !this.state.executing
                        });
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }else{
            this.setState({
                            error: "Не правильно повторили пароль!",

                        });
        }
    }



  render() {

    if(this.state.changeOk)
    {
        return (<div className="row">

            <div className="col-12 col-md-4 col-lg-12">
                <div className="shop_grid_product_area">
                    <div className="row">
                        <div className="col-12">
                            <div className="product-topbar d-flex align-items-center justify-content-between">
                                <div className="total-products">
                                <p>Смена пароля</p>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="messages">
                            <div className="error_form2">
                                <p>Вы успешно поменяли пароль.</p>
                            </div>
                            <div className="error_form2">
                                <a href='/catalog'>Перейти в каталог</a>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    );
    }else {
      return (

        <div className="row">

            <div className="col-12 col-md-4 col-lg-12">
                <div className="shop_grid_product_area">
                    <div className="row">
                        <div className="col-12">
                            <div className="product-topbar d-flex align-items-center justify-content-between">
                                <div className="total-products">
                                <p>Смена пароля</p>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="messages">
                            <div style={{ display: (this.state.error != null) ? 'block' : 'none' }} className="error_form2">
                                <p style={{color:'red'}}>{this.state.error}</p>
                            </div>
                        </div>


                        <div className="col-12 mb-3">
                            <label htmlFor="second_password">Новый пароль</label>
                            <input type="password" style={{width:'200px'}} className="form-control" id="second_password" name="second_password"  require="true" onChange={(e) => this.changeP2(e)} />
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="third_password">Повторите новый пароль</label>
                            <input type="password" style={{width:'200px'}} className="form-control" id="third_password" name="third_password" require="true" onChange={(e) => this.changeP3(e)} />
                        </div>
                    
                        <div className="col-12 mb-3">
                            <button id="sendOrder" onClick={() => this.sendChangeClick()} className="btn essence-btn"
                                style={{ display: !this.state.executing ? 'block' : 'none' }}>Сменить</button>
                            <div id="submit_img" style={{ display: !this.state.executing ? 'none' : 'block' }}>
                                <img src="/img/core-img/loading.gif" width="70" height="70" />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
</div>
          
          
      );
    }
    }

}