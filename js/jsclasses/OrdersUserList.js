export class OrdersUserList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items:[],
      itemOrder: [],
      order_id:-1,
      order_id_search:'',
      itemExec:0,
      o_name:'',
      o_phone:'',
      o_email:'',
      o_description:'',
      description_manager:'',
      date_manager:'',
    };
  }
    componentDidMount() {
    fetch("/includes/get_data.php?x=get_orders&users=1")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result);
          this.setState({
            isLoaded: true,
            items: result
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
  loadDataS(){
    this.loadData(this.state.order_id_search)
    /*var item = this.state.items.find(item => item.id === parseInt(this.state.order_id_search));
    if(item!=undefined)
      this.openOrder( item.id, item.exec, item.name, item.phone, item.email, item.description, item.descript_manager, item.date_manager );*/
  }
  loadData(c){
    fetch(`/includes/get_data.php?x=get_orders&order_id=${c}`)
      .then(res => res.json())
      .then(
        (result) => {
            //console.log(result);
            if(result.length > 1){
          this.setState({
            isLoaded: true,
            order_id:result[0].id,
            o_name:result[0].name,
            o_phone:result[0].phone,
            o_email:result[0].email,
            o_description:result[0].description,
            description_manager:result[0].descript_manager,
            date_manager:result[0].date_manager,
            itemExec:result[0].exec,
            itemOrder: result[1],
            order_id:c
          });
        }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  openOrder(id_order,exec, n,p,e,d,dm,ddm) {
    this.setState({
            isLoaded: false,
            o_name:n,
            o_phone:p,
            o_email:e,
            o_description:d,
            description_manager:dm,
            date_manager:ddm,
            itemExec:exec});

      this.loadData(id_order)


  }


  execute(exec)
  {
    if(exec==2) return <i className="icon-ok"/>
    else if(exec==3) return <i className="icon-cancel"/>
    else return '';
  }

  AllSum()
{
    let s=0;
    this.state.itemOrder.forEach(function callback(currentValue, index, array) {
      /*console.log(currentValue.sum)*/
        s+=(currentValue.sum===null)?0:parseFloat(currentValue.sum);
        /*console.log(s)*/
    });
    return new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
}).format(s);
}
changeSearch(e)
  {
    this.setState({ order_id_search: e.target.value })
  }
  onEnterPress(event)
  {
    //console.log(this.state.order_id_search);
    //console.log(event.key);
    if (event.key === 'Enter') {
      this.loadDataS()
    }
  }
  searchClear()
  {
    this.setState({
      order_id_search: ''
    });
    this.loadData(this.state.order_id_search)
  }
  date_parse(d)
  {
    var date = new Date(d);
    var time = date.toLocaleTimeString();
    return date.toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })+' '+time;

  }
  execText(exec)
  {
    if(exec==1) return <b className="order_ready">Готов к выдаче</b>
    else if(exec==2) return <b className="order_exec">Заказ выполнен</b>
    else if(exec==3) return <b className="order_cancel">Заказ отменен</b>
    else return '';
    
  }
  render() {
    const { error, isLoaded, items, itemOrder, order_id } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else if(order_id==-1) {
      return (

<div className="row section-heading">
<input type="search" name="search" id="headerSearch" value={this.state.order_id_search} className="col-2 form-control" placeholder="поиск по номеру" 
onChange={(e) => this.changeSearch(e)} onKeyPress={event => this.onEnterPress(event)}/>
<button className="btn bg-transparent" style={{marginLeft:'-40px', zIndex: '100'}}  onClick={() => this.searchClear()}>
      <i className="fa fa-times"></i>
    </button>
<button className="btn edit-btn-search-icon" onClick={() => this.loadDataS()}><i className="fa fa-search" aria-hidden="true"></i></button>



<table className="table table-hover" >
  <thead>
    <tr>
      <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">№</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0">Дата и время</th>
      <th scope="col" className="border-top-0 border-right border-bottom-0">ФИО</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0">Стоимость</th>
      <th width="50px" scope="col" className="border-top-0 border-right border-bottom-0 border-right-0">Выполнен</th>
    </tr>
  </thead>
  <tbody>


          {items.map((item, index) => (
            <tr key={index} className={(item.exec==0)?'table-light':(item.exec==2)?'table-success':(item.exec==1)?'table-info':'table-danger'} onClick={() => this.openOrder( item.id, item.exec, item.name, item.phone, item.email, item.description, item.descript_manager, item.date_manager )}>
      <td scope="row" className="border-right border-bottom-0">{item.id}</td>
      <td className="border-right border-bottom-0">{item.date_order}</td>
      <td className="border-right border-bottom-0">{item.name}</td>
      <td className="border-right border-bottom-0">{new Intl.NumberFormat('ru-RU', {style: 'currency',currency: 'RUB',}).format(item.coast)}</td>
      <td className="border-right border-bottom-0 border-right-0">{this.execute(item.exec)}</td>
    </tr>



          ))}
          </tbody>
</table>
</div>
);
    }else  {
      return (
        <div>
<div className="row section-heading">
<a href="orders" >назад</a>
</div>
<div className="row section-heading">

<div className="col-12 mb-3">
                            <label htmlFor="first_name"><h4>Заказ №{this.state.order_id}</h4></label>
                        </div>

<div className="col-12 mb-1">
    <label htmlFor="first_name">{this.state.o_name}</label>
</div>
<div className="col-12 mb-1">
    <label htmlFor="first_name">{this.state.o_phone}</label>
</div>
<div className="col-12 mb-1">
    <label htmlFor="first_name">{this.state.o_email}</label>
</div>
<div className="col-12 mb-1" style={{display:(this.state.o_description!='')?'block':'none'}}>
    <label htmlFor="first_name">{this.state.o_description}</label>
</div>

<table className="table" >
  <thead>
    <tr>
      <th scope="col" className="border-top-0 border-right border-bottom-0">Наименование</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0">OEM</th>
      <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">Кол-во</th>
      <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">Цена</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0 border-right-0">Стоимость</th>
    </tr>
  </thead>
  <tbody>


          {itemOrder.map((item, index) => (
            <tr key={index}>
      <td scope="row" className="border-right border-bottom-0">{item.name}</td>
      <td className="border-right border-bottom-0">{item.oem}</td>
      <td className="border-right border-bottom-0">{item.count}</td>
      <td className="border-right border-bottom-0">{new Intl.NumberFormat('ru-RU', {style: 'currency',currency: 'RUB',}).format(item.price)}</td>
      <td className="border-right border-bottom-0 border-right-0">{new Intl.NumberFormat('ru-RU', {style: 'currency',currency: 'RUB',}).format(item.sum)}</td>
    </tr>



          ))}
          </tbody>
</table>
<div className="col-12 mb-1">
    <label htmlFor="first_name"> Полная стоимость заказа {this.AllSum()}</label>
</div>
<div className="col-12 mb-2">
  {this.execText(this.state.itemExec)}
  
</div>
<div className="col-12 mb-1" style={{display:(this.state.description_manager===null || this.state.description_manager==='')?'none':'block'}}>
<label>Комментарий менеджера </label>
  <textarea rows="3" cols="90"  className="textField" readOnly defaultValue={(this.state.description_manager===null || this.state.description_manager==='null')?'':this.state.description_manager}></textarea>
</div>
<div className="col-12 mb-1" style={{display:(this.state.date_manager===null)?'none':'block'}}>
  <p>Время обновления заказа {this.date_parse(this.state.date_manager)}</p>
  </div>
  </div>
</div>
);
    }
}

}
ReactDOM.render(<OrdersUserList />,    document.getElementById('editableField'));