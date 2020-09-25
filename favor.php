<?php

include_once 'header.php';
$categ_id = getParam('categ_id', -1);
$product_id= getParam('product', -1);


$title_page="Избранное";
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
      items:[],
      user_id:-1/*<php=$user_id?>*/
    };
  }
    componentDidMount() {
        fetch("/includes/get_data.php?x=get_categ")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
      this.ProductLists(this.state.user_id)
  }

  ProductLists(user_id) {
    fetch(`/includes/get_data.php?x=get_favor_products&user_id=${user_id}`)
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
  getCategName(categ_id)
  {
      let d="Все товары";
      this.state.items.forEach(function(item, i, arr) {
          if(item.id===categ_id) d = item.name;
        });
        return d;
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

            <div className="col-12 col-md-4 col-lg-12">
                <div className="shop_grid_product_area">
                    <div className="row">
                        <div className="col-12">
                            <div className="product-topbar d-flex align-items-center justify-content-between">
                                <div className="total-products">
                                <p><span>{itemsProduct.length}</span> товаров</p>
                                </div>
                                <div className="product-sorting d-flex">
                                        <p>Избранное</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row" id="products_list">


                    {itemsProduct.map(item => (
                      <ProductOne  key={item.id} items={item} url={`/catalog/${item.id_categ}/${item.id}`} />
                    ))}
                    {this.EmptyFavor()}
                    

                    </div>

                </div>
            </div>
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
<script type="text/babel" src="/js/ProductOne.js"></script>


<?php
include_once 'footer.php';
?>