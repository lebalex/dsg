export class UsersManagerList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      onlyReg:true,
      items:[],
      search_user:'',
      u_idx:-1,
      u_id:-1,
      u_name:'',
      u_phone:'',
      u_email:'',
      u_discont:0,
      edit_card_user:false

    };
  }
    componentDidMount() {
    this.loadData();
  }
  loadData()
  {
    fetch("/includes/get_data.php?x=get_users&name="+this.state.search_user)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            edit_card_user:false
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
            edit_card_user:false
          });
        }
      )
  }

  registr(exec)
  {
    if(exec==0) return '';
    else return <i className="icon-ok"/>
  }
  changeSearch(e)
  {
    this.setState({ search_user: e.target.value })
  }
  openUser(idx) {
    //console.log(this.state.items[idx].id);
    if(this.state.items[idx].registr!=0)
    this.setState({
      u_idx:idx,
            u_id:this.state.items[idx].id,
            u_name:this.state.items[idx].name,
            u_phone:this.state.items[idx].phone,
            u_email:this.state.items[idx].email,
            u_discont:this.state.items[idx].discont,
            edit_card_user:true});
  }
  changeDiscont(e)
  {
    this.setState({ u_discont: e.target.value })
  }
  close() {
    this.setState({edit_card_user:false})
  }
  save()
  {
    //console.log(this.state.u_id)
    //console.log(this.state.u_discont)
    const formData = new FormData()
        formData.append('x', 'edituser_discont')
        formData.append('id', this.state.u_id)
        formData.append('discont', this.state.u_discont)
    fetch('/includes/set_data.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
        if(data!=0)
            console.log(data)

            var tmp=this.state.items[this.state.u_idx];
            tmp.discont = this.state.u_discont;
            const newList = this.state.items.map(o => {
              if (o.id === this.state.u_id) {
                return tmp;
              }
              return o;
            });

            this.setState({items:newList,
              edit_card_user:false})

          //this.loadData()
          //this.setState({edit_card_user:false})

    })
    .catch(error => {
      console.error(error)
    })
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else  {
      return (

<div className="row section-heading">

{/*<div className="col-12">
  <div className="product-topbar d-flex align-items-center justify-content-between">
    <div className="total-products">
      <input type="search" name="search" id="headerSearch" placeholder="поиск по ФИО и email" onChange={(e) => this.changeSearch(e)}/>
      <button className="btn edit-btn-icon" onClick={() => this.loadData()}><i className="fa fa-search" aria-hidden="true"></i></button>
    </div>
    <div className="product-sorting d-flex">
      <input type="checkbox"  defaultChecked={this.state.onlyReg} className="custom-control-input" id="customCheckonlyReg"/>
      <label className="custom-control-label" htmlFor="customCheck2">Только зарегистрированные клиенты</label>
    </div>
  </div>
      </div>*/}

                <div className="col-12">
                    <div className="product-topbar d-flex align-items-center justify-content-between">
                        <div className="mt-3">

                            <div className="custom-control custom-checkbox d-block mb-2">
                                <input type="checkbox" className="custom-control-input" id="customOnlyReg" checked={this.state.onlyReg}
                                onChange={(e)=> this.setState({onlyReg:!this.state.onlyReg})}/>
                                <label className="custom-control-label" htmlFor="customOnlyReg">Только зарегистрированные клиенты</label>
                            </div>



                        </div>
                        <div className="product-sorting d-flex">
                            <input type="search" name="search" id="headerSearch" placeholder="поиск по ФИО и email" onChange={(e)=> this.changeSearch(e)}/>
                            <button className="btn edit-btn-icon" onClick={()=> this.loadData()}><i className="fa fa-search" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>






<table className="table table-hover" >
  <thead>
    <tr>
      <th scope="col" className="border-top-0 border-right border-bottom-0">ФИО</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0">Телефон</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0">Email</th>
      <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">Скидка</th>
      <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">Рег на сайте</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0 border-right-0">Дата</th>
    </tr>
  </thead>
  <tbody>

{(this.state.onlyReg)?

          items.map((item, index) => (
            (item.registr===1)?
             (<tr key={index} onClick={() => this.openUser(index)}>
      <td scope="row" className="border-right border-bottom-0">{item.name}</td>
      <td className="border-right border-bottom-0">{item.phone}</td>
      <td className="border-right border-bottom-0"><a href={`mailto:${item.email}`}>{item.email}</a></td>
      <td className="border-right border-bottom-0">{(item.discont===0)?'':item.discont+'%'}</td>
      <td className="border-right border-bottom-0">{this.registr(item.registr)}</td>
      <td className="border-right border-bottom-0 border-right-0">{item.dt}</td>
    </tr>):'')):
          items.map((item, index) => (
             <tr key={index} onClick={() => this.openUser(index)}>
      <td scope="row" className="border-right border-bottom-0">{item.name}</td>
      <td className="border-right border-bottom-0">{item.phone}</td>
      <td className="border-right border-bottom-0"><a href={`mailto:${item.email}`}>{item.email}</a></td>
      <td className="border-right border-bottom-0">{(item.discont===0)?'':item.discont+'%'}</td>
      <td className="border-right border-bottom-0">{this.registr(item.registr)}</td>
      <td className="border-right border-bottom-0 border-right-0">{item.dt}</td>
    </tr>))



    }
          </tbody>
</table>


<div className={`${this.state.edit_card_user?'popup_max':'hidden'} `}>
        <div className="modal2">
        <div className="close_btn" title="Закрыть"><i className="icon-cancel" onClick={() => this.close()}></i></div>
        <div className="form-horizontal form-group">
        <div className="formCaption">
				 	Карточка клиента
                </div></div>
                <div className="form-group"></div>
                <div className="form-group">
                <label>ФИО</label>
                <input type="text" className="textFieldName" value={this.state.u_name} readOnly
                    placeholder="Наименование" />
                </div>

                <div className="form-group">
                <label>Телефон</label>
                <input type="tel" className="textField" value={this.state.u_phone} readOnly
                    placeholder="oem" />
                </div>
                <div className="form-group">
                <label>Email</label>
                <input type="text" className="textField" value={this.state.u_email} readOnly
                    placeholder="остаток" />
                </div>
                <div className="form-group">
                <label>Скидка в %</label>
                <input type="number" className="textField" value={(this.state.u_discont===null)?0:this.state.u_discont} onChange={(e) => this.changeDiscont(e)} 
                    placeholder="скидка в %" />
                </div>

				<div className="form-group">
				<input type="hidden" name="action" value="addCategory"/>
                <button onClick={() => this.save()} className="btn edit-btn">сохранить</button>
                </div>
        </div>
        </div>


</div>
);
    }
}

}
ReactDOM.render(<UsersManagerList />, document.getElementById('editableField'));