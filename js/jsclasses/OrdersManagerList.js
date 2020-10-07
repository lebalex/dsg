export class OrdersManagerList extends React.Component {
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
      o_description:''
    };
  }
    componentDidMount() {
    fetch("/includes/get_data.php?x=get_orders")
      .then(res => res.json())
      .then(
        (result) => {
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
    //this.loadData(this.state.order_id_search)
    var item = this.state.items.find(item => item.id === parseInt(this.state.order_id_search));
    if(item!=undefined)
      this.openOrder( item.id, item.exec, item.name, item.phone, item.email, item.description );

  }
  loadData(c){
    fetch(`/includes/get_data.php?x=get_orders&order_id=${c}`)
      .then(res => res.json())
      .then(
        (result) => {
            //console.log(result);
          this.setState({
            isLoaded: true,
            itemOrder: result,
            order_id:c
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
  openOrder(id_order,exec, n,p,e,d) {
    this.setState({
            isLoaded: false,
            o_name:n,
            o_phone:p,
            o_email:e,
            o_description:d,
            itemExec:exec});

      this.loadData(id_order)


  }
  setExec()
  {
    //console.log(this.state.order_id)
    const formData = new FormData()
            formData.append('x', 'set_exec_order')
            formData.append('id_order', this.state.order_id)
  fetch('/includes/set_data.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .catch(error => {
    console.error(error)
  })
  }

  execute(exec)
  {
    if(exec==0) return '';
    else return <i className="icon-ok"/>
  }
  executeText(exec)
  {
    let list=[];
    if(exec==0) {
        list.push(<div key="1" className="custom-control custom-checkbox d-block mb-2">
                                <input type="checkbox" className="custom-control-input" id="customCheck2" onClick={() => this.setExec()} />
                                <label className="custom-control-label" htmlFor="customCheck2">Выполнить</label>
                            </div>);
    }else list.push(<b key='2'>Заказ выполнен</b>);
    return list;
  }
  AllSum()
{
    let s=0;
    this.state.itemOrder.forEach(function callback(currentValue, index, array) {
        s+=currentValue.sum;
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
  render() {
    const { error, isLoaded, items, itemOrder, order_id } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else if(order_id==-1) {
      return (

<div className="row section-heading">
<input type="search" name="search" id="headerSearch" placeholder="поиск по номеру" onChange={(e) => this.changeSearch(e)}/>
                        <button className="btn edit-btn-icon" onClick={() => this.loadDataS()}><i className="fa fa-search" aria-hidden="true"></i></button>

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
            <tr key={index} className={(item.exec==0)?'table-light':'table-primary'} onClick={() => this.openOrder( item.id, item.exec, item.name, item.phone, item.email, item.description )}>
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

<div className="col-12 mb-3">
    <label htmlFor="first_name">{this.state.o_name}</label>
</div>
<div className="col-12 mb-3">
    <label htmlFor="first_name">{this.state.o_phone}</label>
</div>
<div className="col-12 mb-3">
    <label htmlFor="first_name">{this.state.o_email}</label>
</div>
<div className="col-12 mb-3" style={{display:(this.state.o_description!='')?'block':'none'}}>
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
</div>
<div className="row">
    Полная стоимость заказа {this.AllSum()}
</div>
<div className="row">
  
  {this.executeText(this.state.itemExec)}

</div>
</div>
);
    }
}

}
ReactDOM.render(<OrdersManagerList />, document.getElementById('editableField'));