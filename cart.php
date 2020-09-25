<?php

include_once 'header.php';


$title_page="Корзина";
$video_file="vag2";
include_once 'video_baner.php';

?>


<section class="shop_grid_area section-padding-0-80">
    <div class="overlay3 container" id="data_page">

    </div>
</section>

<script type="text/babel">

class CategListSimpleLeft extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoadedP: false,
      itemsProduct:[],
      value_id:-1,
      user_id:-1/*<php=$user_id?>*/
    };
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
  toggleModalDel = (id) => {
    this.setState({
      isOpen: !this.state.isOpen,
      value_id:id
    });
  }
  toggleModalNo = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleModalYes = () => {
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
minusCount = (idx) => {
    let tmp = this.state.itemsProduct;
    if(tmp[idx].count>0){
    tmp[idx].count= tmp[idx].count-1;
    this.setState({
        itemsProduct:tmp
    });
    this.delCart(tmp[idx].id);
}
  }
  plusCount = (idx) => {
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
        s+=currentValue.count*currentValue.coast;
    });
    return new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0,
  //maximumFractionDigits: 0,
}).format(s);



}




  render() {
    //console.log(this.state.categ_id,this.state.product_id);
    //this.ProductLists(this.state.categ_id,this.state.product_id)
    const { error, isLoadedP, itemsProduct } = this.state;

    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoadedP) {
      return <div className="row">Загрузка...</div>
    } else {
      return (
        <div className="row">
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
      <td scope="row" className="border-right border-bottom-0"><img width="100px" src={(item.img!=null)?`/img/product-img/${item.img}`:'/img/product-img/noPhoto.png'}  alt=""/></td>
      <td className="border-right border-bottom-0"><a href={`/catalog/${item.id_categ}/${item.id}`}>{item.name}</a></td>
      <td className="border-right border-bottom-0">{item.oem}</td>
      <td className="border-right border-bottom-0"><i className="icon-minus plus-minus" onClick={() => this.minusCount( index )}/>
      
      &nbsp;{item.count}&nbsp;
      <i className="icon-plus plus-minus" onClick={() => this.plusCount( index )}/>
      
      </td>
      <td className="border-right border-bottom-0">{item.coast}</td>
      <td className="border-right border-bottom-0">{item.coast*item.count}</td>
      <td className="border-right border-bottom-0 border-right-0">
        <button onClick={() => this.toggleModalDel( item.id )} className="btn edit-btn-icon-red"><i className="icon-trash-empty"/></button>


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
<ModalYesNo show={this.state.isOpen}
            onYes={this.toggleModalYes}
          onNo={this.toggleModalNo}>
          Вы желаете удалить товар?
        </ModalYesNo>

</div>
          
          
      );
    }
}
}
ReactDOM.render(
  <CategListSimpleLeft />,
  document.getElementById('data_page')
);



</script>
<script type="text/babel" src="/js/ModalYesNo.js"></script>

<?php
include_once 'footer.php';
?>