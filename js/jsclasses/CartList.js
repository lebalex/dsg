import {ModalYesNo} from './ModalYesNo';
import { CheckOut } from './CheckOut';
export class CartList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      gocheckout:false,
      error: null,
      isLoadedP: false,
      itemsProduct:[],
      value_id:-1,
      user_id:-1
    };
    this.toggleModalYes = this.toggleModalYes.bind(this);
    this.toggleModalNo = this.toggleModalNo.bind(this);
    this.checkout = this.checkout.bind(this);

  }
    componentDidMount() {
      this.ProductLists(this.state.user_id)
  }

  ProductLists(user_id) {
    fetch(`/includes/get_data.php?x=get_cart_products&user_id=${user_id}`)
      .then(res => res.json())
      .then(
        (result) => {
            //console.log(result);
            if(result===-1){
                this.setState({
            user_id: user_id, 
            isLoadedP: true,
          });
            }else{
          this.setState({
            user_id: user_id, 
            isLoadedP: true,
            itemsProduct: result
          });
        }
        },
        (error) => {
          this.setState({
            isLoadedP: true,
            error
          });
        }
      )
  }

  EmptyFavor() {
      if(this.state.itemsProduct.length===0)
        return (
            <div><p>У Вас пока пусто</p></div>
        );
  }
  toggleModalDel(id) {
    this.setState({
      isOpen: !this.state.isOpen,
      value_id:id
    });
  }
  toggleModalNo(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleModalYes(){
      this.delCartProduct(this.state.value_id);
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
delCartProduct(product_id) {
const requestOptions = {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
    body: 'x=delchart_product&product='+product_id
  };
fetch('/includes/set_data.php', requestOptions)
.then(function(response) {
return response.json();
}).then(function(data) {
  $('#count_in_chart').text(data);
});
let tmp=[];
this.state.itemsProduct.forEach(function callback(currentValue, index, array) {
    if(currentValue.id!=product_id)
    {
        tmp.push(currentValue);
    }
});
this.setState({
        itemsProduct:tmp
    });

}
delCart(product_id) {

const requestOptions = {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
    body: 'x=delchart&product='+product_id
  };
fetch('/includes/set_data.php', requestOptions)
.then(function(response) {
return response.json();
}).then(function(data) {
  $('#count_in_chart').text(data);
});
}
addCart(product_id) {

const requestOptions = {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
    body: 'x=addchart&product='+product_id
  };
fetch('/includes/set_data.php', requestOptions)
.then(function(response) {
return response.json();
}).then(function(data) {
  $('#count_in_chart').text(data);
});
}
//minusCount = (idx) => {
  minusCount(idx){
    let tmp = this.state.itemsProduct;
    if(tmp[idx].count>0){
    tmp[idx].count= tmp[idx].count-1;
    this.setState({
        itemsProduct:tmp
    });
    this.delCart(tmp[idx].id);
}
  }
  //plusCount = (idx) => {
    plusCount(idx){
    let tmp = this.state.itemsProduct;
    if(tmp[idx].count<tmp[idx].balance){
    tmp[idx].count= tmp[idx].count+1;
    this.setState({
        itemsProduct:tmp
    });
    this.addCart(tmp[idx].id);
  }
}

sum()
{
    let s=0;
    this.state.itemsProduct.forEach(function callback(currentValue, index, array) {
        s+=parseFloat(currentValue.count)*parseFloat(currentValue.coast);
    });
    return new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0,
  //maximumFractionDigits: 0,
}).format(s);
}

  checkout(){
  this.setState({
        gocheckout:!this.state.gocheckout
    });
}

getImage(img)
{
if(img===null) return '/img/product-img/noPhoto.png';
else 
{
  return '/img/product-img/'+img.split(';')[0];
}
}


  render() {
    //console.log(this.state.categ_id,this.state.product_id);
    //this.ProductLists(this.state.categ_id,this.state.product_id)
    const { error, isLoadedP, gocheckout, itemsProduct } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoadedP) {
      return <div className="row">Загрузка...</div>
    } else if (gocheckout) {
      return (
        <CheckOut items={itemsProduct} sum={this.sum()} onBack={this.checkout}/>
        
        )
    }else {
      return (
        <div>
        <div className="row">
          <div className="button_cart"><p align="right">
            <button style={{ display: itemsProduct.length>0 ? 'block' : 'none', marginRight:20 }} className="btn essence-btn"
            onClick={() => this.checkout()}>оформить</button>
            </p>
          </div>
        <table className="table" >
  <thead>
    <tr>
    <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">Изображение</th>
      <th scope="col" className="border-top-0 border-right border-bottom-0">Название</th>
      <th width="200px" scope="col" className="border-top-0 border-right border-bottom-0">OEM</th>
      <th width="100px" scope="col" className="border-top-0 border-right border-bottom-0">Кол-во</th>
      <th width="70px" scope="col" className="border-top-0 border-right border-bottom-0">Цена</th>
      <th width="70px" scope="col" className="border-top-0 border-right border-bottom-0">Стоимость</th>
      <th width="70px" scope="col" className="border-top-0 border-right border-bottom-0"></th>

    </tr>
  </thead>
  <tbody>


          {itemsProduct.map((item, index) => (
            <tr key={index}>
      <td scope="row" className="border-right border-bottom-0"><img width="100px" src={this.getImage(item.img)}  alt=""/></td>
      <td className="border-right border-bottom-0"><a href={`/catalog/${item.id_categ}/${item.id}`}>{item.name}</a></td>
      <td className="border-right border-bottom-0">{item.oem}</td>
      <td className="border-right border-bottom-0"><i className="icon-minus plus-minus" onClick={() => this.minusCount( index )}/>
      
      &nbsp;{item.count}&nbsp;
      <i className="icon-plus plus-minus" onClick={() => this.plusCount( index )}/>
      
      </td>
      <td className="border-right border-bottom-0">{new Intl.NumberFormat('ru-RU', {style: 'currency',currency: 'RUB',}).format(item.coast)}</td>
      <td className="border-right border-bottom-0">{new Intl.NumberFormat('ru-RU', {style: 'currency',currency: 'RUB',}).format(item.coast*item.count)}</td>
      <td className="border-right border-bottom-0 border-right-0">
        <button onClick={() => this.toggleModalDel( item.id )} className="btn edit-btn-icon-red" data-toggle="modal" data-target="#modalYesNo"><i className="icon-trash-empty"/></button>


      </td>
    </tr>



          ))}
          <tr>
      <th scope="row" colSpan="5">Итого</th>
      <td>{this.sum()}</td>

    </tr>

          </tbody>
</table>
{this.EmptyFavor()}
</div>
<ModalYesNo show={true}
            onYes={this.toggleModalYes}
          onNo={this.toggleModalNo} title="Предупреждение">
          Вы желаете удалить товар?
        </ModalYesNo>

</div>
          
          
      );
    }
}
}
ReactDOM.render(<CartList />,document.getElementById('data_page'));